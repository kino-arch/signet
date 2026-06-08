import { useState, useCallback, useRef } from 'react';
import { useEditorUIStore } from '@/store/useEditorUIStore';
import { exportPDF } from '@/lib/export/pdf';
import { exportJSON } from '@/lib/export/json';
import { exportMarkdown } from '@/lib/export/markdown';
import { useTemplateData } from '@/utils/resumeAdapter';

export type ExportFormat = 'pdf' | 'json' | 'markdown';

interface ExportState {
  isExporting: boolean;
  progress: number;
  format: ExportFormat | null;
  error: string | null;
}

export function useExportEngine() {
  const [state, setState] = useState<ExportState>({
    isExporting: false,
    progress: 0,
    format: null,
    error: null,
  });
  
  const data = useTemplateData();
  const { activeTemplateId } = useEditorUIStore();
  const { addToast } = useEditorUIStore();
  
  // Track blob URL for cleanup
  const blobUrlRef = useRef<string | null>(null);

  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    // Cleanup previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    
    const url = URL.createObjectURL(blob);
    blobUrlRef.current = url;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Delay cleanup to ensure download starts
    setTimeout(() => {
      if (blobUrlRef.current === url) {
        URL.revokeObjectURL(url);
        blobUrlRef.current = null;
      }
    }, 5000);
  }, []);

  const exportResume = useCallback(async (format: ExportFormat) => {
    setState({ isExporting: true, progress: 0, format, error: null });

    try {
      let blob: Blob;
      const timestamp = new Date().toISOString().split('T')[0];
      const name = data.identity.name?.replace(/\s+/g, '_') || 'resume';

      switch (format) {
        case 'pdf':
          blob = await exportPDF(data, activeTemplateId, (p) => 
            setState(s => ({ ...s, progress: p }))
          );
          downloadBlob(blob, `${name}_${timestamp}.pdf`);
          break;
          
        case 'json':
          blob = await exportJSON(data);
          downloadBlob(blob, `${name}_${timestamp}.json`);
          setState(s => ({ ...s, progress: 100 }));
          break;
          
        case 'markdown':
          blob = await exportMarkdown(data);
          downloadBlob(blob, `${name}_${timestamp}.md`);
          setState(s => ({ ...s, progress: 100 }));
          break;
      }

      addToast({
        title: 'Export Complete',
        description: `${format.toUpperCase()} downloaded successfully.`,
        variant: 'success',
        duration: 4000,
      });
      
      setState(s => ({ ...s, isExporting: false }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Export failed';
      setState(s => ({ ...s, isExporting: false, error: message }));
      
      addToast({
        title: 'Export Failed',
        description: message,
        variant: 'error',
        duration: 6000,
      });
    }
  }, [data, activeTemplateId, downloadBlob, addToast]);

  const dismissError = useCallback(() => {
    setState(s => ({ ...s, error: null }));
  }, []);

  return {
    ...state,
    exportResume,
    dismissError,
  };
}
