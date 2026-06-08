import type { ResumeData, ResumeSection } from '@/types/resume';
import type { TemplateSchema, SectionConfig } from '../types';

export interface MinimalTemplateProps {
  data: ResumeData;
  schema: TemplateSchema;
  preview?: boolean;
}

export function MinimalTemplate({ data, schema, preview }: MinimalTemplateProps) {
  const { typography } = schema;
  
  return (
    <div 
      className="template-minimal"
      style={{ 
        fontFamily: typography.bodyFont || 'serif',
        color: 'var(--color-nordic-surface)',
        background: 'var(--color-nordic-text)',
        padding: '48px',
        maxWidth: '8.5in',
        margin: '0 auto',
        minHeight: '11in',
        position: 'relative',
        boxShadow: preview ? '0 0 0 1px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      {preview && <PreviewWatermark />}
      
      {/* Header: Name + Title + Contact */}
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '32px',
        borderBottom: '1px solid var(--color-nordic-border)',
        paddingBottom: '24px',
      }}>
        <h1 style={{ 
          fontFamily: typography.headingFont || 'sans-serif',
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '8px',
          letterSpacing: '-0.02em',
          color: 'var(--color-nordic-bg)',
        }}>
          {data.identity?.name || 'Your Name'}
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: 'var(--color-nordic-text-secondary)',
          marginBottom: '12px',
        }}>
          {data.identity?.title || 'Professional Title'}
        </p>
        <div style={{ 
          fontSize: '13px', 
          color: 'var(--color-nordic-text-secondary)',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          {data.identity?.email && <span>{data.identity.email}</span>}
          {data.identity?.phone && <span>{data.identity.phone}</span>}
          {data.identity?.location && <span>{data.identity.location}</span>}
          {data.identity?.url && <span>{data.identity.url}</span>}
        </div>
      </header>

      {/* Sections in schema order */}
      {schema.sections.map((sectionConfig) => {
        const section = data.sections?.find(s => s.type === sectionConfig.type);
        if (!section || !section.visible) return null;
        
        return (
          <MinimalSection
            key={sectionConfig.type}
            section={section}
            config={sectionConfig}
            typography={typography}
          />
        );
      })}
    </div>
  );
}

function MinimalSection({ section, config, typography }: {
  section: ResumeSection;
  config: SectionConfig;
  typography: TemplateSchema['typography'];
}) {
  return (
    <section style={{ marginBottom: '28px' }}>
      <h2 style={{
        fontFamily: typography.headingFont || 'sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--color-nordic-bg)',
        marginBottom: '16px',
        borderBottom: '2px solid var(--color-nordic-bg)',
        paddingBottom: '4px',
      }}>
        {config.label}
      </h2>
      
      {section.entries?.map((entry, i) => (
        <div key={i} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <h3 style={{ fontWeight: 600, fontSize: '15px' }}>{entry.title}</h3>
            <span style={{ fontSize: '13px', color: 'var(--color-nordic-text-secondary)' }}>{entry.dateRange}</span>
          </div>
          {entry.subtitle && (
            <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--color-nordic-text-tertiary)', marginBottom: '4px' }}>
              {entry.subtitle}
            </div>
          )}
          <p style={{ fontSize: '14px', color: 'var(--color-nordic-text-tertiary)', lineHeight: 1.6 }}>{entry.description}</p>
        </div>
      ))}
    </section>
  );
}

function PreviewWatermark() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-30deg)',
      fontSize: '96px',
      fontWeight: 900,
      color: 'rgba(0,0,0,0.04)',
      letterSpacing: '0.15em',
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 0,
    }}>
      PREVIEW
    </div>
  );
}
