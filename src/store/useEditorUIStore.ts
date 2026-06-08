import { create } from 'zustand';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'warning' | 'error';
  duration?: number;
}

interface EditorUIState {
  // Sidebar mode
  sidebarMode: 'sections' | 'templates';
  setSidebarMode: (mode: 'sections' | 'templates') => void;
  
  // Template preview (UI-only, not persisted)
  previewTemplateId: string | null;
  setPreviewTemplateId: (id: string | null) => void;
  
  // Active template (persisted to user profile, not resume data)
  activeTemplateId: string | null;
  setActiveTemplateId: (id: string | null) => void;
  
  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

export const useEditorUIStore = create<EditorUIState>((set) => ({
  sidebarMode: 'sections',
  setSidebarMode: (mode) => set({ sidebarMode: mode }),
  
  previewTemplateId: null,
  setPreviewTemplateId: (id) => set({ previewTemplateId: id }),
  
  activeTemplateId: null,
  setActiveTemplateId: (id) => set({ activeTemplateId: id }),
  
  toasts: [],
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
  })),
  dismissToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),
}));
