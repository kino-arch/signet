import type { ResumeSection } from '@/types/resume';
import type { SectionConfig, TemplateSchema } from '../types';
import type { MinimalTemplateProps } from './MinimalTemplate';

export function CreativeTemplate({ data, schema, preview }: MinimalTemplateProps) {
  const { typography } = schema;
  const accentColor = typography.accentColor || 'var(--color-nordic-accent)';
  
  return (
    <div style={{
      fontFamily: typography.bodyFont || 'sans-serif',
      color: 'var(--color-nordic-surface)',
      background: 'var(--color-nordic-text)',
      padding: '0',
      maxWidth: '8.5in',
      margin: '0 auto',
      minHeight: '11in',
      position: 'relative',
      boxShadow: preview ? '0 0 0 1px rgba(0,0,0,0.1)' : 'none',
      overflow: 'hidden',
    }}>
      {preview && (
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
      )}
      
      {/* Bold header with accent bar */}
      <header style={{
        background: 'var(--color-nordic-surface-hover)',
        color: 'var(--color-nordic-text)',
        padding: '64px 48px',
        marginBottom: '48px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '8px',
          background: accentColor,
        }} />
        <h1 style={{
          fontFamily: typography.headingFont || 'sans-serif',
          fontSize: '48px',
          fontWeight: 800,
          marginBottom: '12px',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          {data.identity?.name || 'Your Name'}
        </h1>
        <p style={{ 
          fontSize: '20px', 
          opacity: 0.9, 
          fontWeight: 300,
          letterSpacing: '0.02em',
        }}>
          {data.identity?.title || 'Professional Title'}
        </p>
        
        <div style={{ 
          marginTop: '32px',
          display: 'flex',
          gap: '24px',
          fontSize: '14px',
          opacity: 0.7,
          flexWrap: 'wrap',
        }}>
          {data.identity?.email && <span>{data.identity.email}</span>}
          {data.identity?.phone && <span>{data.identity.phone}</span>}
          {data.identity?.location && <span>{data.identity.location}</span>}
          {data.identity?.url && <span>{data.identity.url}</span>}
        </div>
      </header>
      
      <div style={{ padding: '0 48px 48px', zIndex: 1, position: 'relative' }}>
        {schema.sections.map(config => {
          const section = data.sections?.find(s => s.type === config.type);
          if (!section?.visible) return null;
          return <CreativeSection key={config.type} section={section} config={config} typography={typography} accentColor={accentColor} />;
        })}
      </div>
    </div>
  );
}

function CreativeSection({ section, config, typography, accentColor }: {
  section: ResumeSection;
  config: SectionConfig;
  typography: TemplateSchema['typography'];
  accentColor: string;
}) {
  return (
    <section style={{ marginBottom: '40px', display: 'flex', gap: '48px' }}>
      <div style={{ width: '160px', flexShrink: 0 }}>
        <h2 style={{
          fontFamily: typography.headingFont || 'sans-serif',
          fontSize: '18px',
          fontWeight: 800,
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          position: 'sticky',
          top: '40px',
        }}>
          {config.label}
        </h2>
      </div>
      
      <div style={{ flex: 1 }}>
        {section.entries?.map((entry, i) => (
          <div key={i} style={{ marginBottom: '28px', position: 'relative' }}>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: '18px', 
              color: 'var(--color-nordic-surface-hover)',
              marginBottom: '4px'
            }}>
              {entry.title}
            </h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              {entry.subtitle && (
                <span style={{ fontSize: '15px', color: 'var(--color-nordic-text-tertiary)', fontWeight: 500 }}>
                  {entry.subtitle}
                </span>
              )}
              {entry.subtitle && entry.dateRange && (
                <span style={{ color: 'var(--color-nordic-text-secondary)' }}>|</span>
              )}
              <span style={{ fontSize: '14px', color: 'var(--color-nordic-text-secondary)', fontWeight: 600 }}>
                {entry.dateRange}
              </span>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--color-nordic-text-tertiary)', lineHeight: 1.7 }}>{entry.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
