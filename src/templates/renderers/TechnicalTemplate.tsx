import type { ResumeSection } from '@/types/resume';
import type { SectionConfig, TemplateSchema } from '../types';
import type { MinimalTemplateProps } from './MinimalTemplate';

export function TechnicalTemplate({ data, schema, preview }: MinimalTemplateProps) {
  const { typography } = schema;
  
  return (
    <div style={{
      fontFamily: typography.bodyFont || 'sans-serif',
      color: 'var(--color-nordic-surface)',
      background: 'var(--color-nordic-text)',
      padding: '40px',
      maxWidth: '8.5in',
      margin: '0 auto',
      minHeight: '11in',
      display: 'grid',
      gridTemplateColumns: '1fr 240px',
      gap: '32px',
      position: 'relative',
      boxShadow: preview ? '0 0 0 1px rgba(0,0,0,0.1)' : 'none',
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
      
      {/* Main column */}
      <div style={{ zIndex: 1 }}>
        <header style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontFamily: typography.headingFont || 'sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--color-nordic-surface-hover)',
            marginBottom: '4px',
          }}>
            {data.identity?.name || 'Your Name'}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-nordic-text-tertiary)' }}>{data.identity?.title || 'Professional Title'}</p>
        </header>
        
        {/* Experience, Projects, etc. */}
        {schema.sections
          .filter(s => s.column === 'main')
          .map(config => {
            const section = data.sections?.find(s => s.type === config.type);
            if (!section?.visible) return null;
            return <TechnicalMainSection key={config.type} section={section} config={config} typography={typography} />;
          })}
      </div>
      
      {/* Sidebar column */}
      <div style={{ borderLeft: '1px solid var(--color-nordic-border)', paddingLeft: '24px', zIndex: 1 }}>
        <div style={{ marginBottom: '24px', fontSize: '13px', color: 'var(--color-nordic-text-tertiary)' }}>
          {data.identity?.email && <div style={{ marginBottom: '8px' }}>{data.identity.email}</div>}
          {data.identity?.phone && <div style={{ marginBottom: '8px' }}>{data.identity.phone}</div>}
          {data.identity?.location && <div style={{ marginBottom: '8px' }}>{data.identity.location}</div>}
          {data.identity?.url && <div style={{ marginBottom: '8px' }}>{data.identity.url}</div>}
        </div>
        {/* Skills, Education, Contact */}
        {schema.sections
          .filter(s => s.column === 'sidebar')
          .map(config => {
            const section = data.sections?.find(s => s.type === config.type);
            if (!section?.visible) return null;
            return <TechnicalSidebarSection key={config.type} section={section} config={config} typography={typography} />;
          })}
      </div>
    </div>
  );
}

function TechnicalMainSection({ section, config, typography }: {
  section: ResumeSection;
  config: SectionConfig;
  typography: TemplateSchema['typography'];
}) {
  return (
    <section style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontFamily: typography.headingFont || 'sans-serif',
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--color-nordic-surface-hover)',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--color-nordic-text-secondary)',
      }}>
        {config.label}
      </h2>
      
      {section.entries?.map((entry, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
            <h3 style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-nordic-surface-hover)' }}>{entry.title}</h3>
            <span style={{ fontSize: '13px', color: 'var(--color-nordic-text-secondary)', fontWeight: 500 }}>{entry.dateRange}</span>
          </div>
          {entry.subtitle && (
            <div style={{ fontSize: '14px', color: 'var(--color-nordic-text-tertiary)', fontWeight: 500, marginBottom: '8px' }}>
              {entry.subtitle}
            </div>
          )}
          <p style={{ fontSize: '14px', color: 'var(--color-nordic-text-tertiary)', lineHeight: 1.6 }}>{entry.description}</p>
        </div>
      ))}
    </section>
  );
}

function TechnicalSidebarSection({ section, config, typography }: {
  section: ResumeSection;
  config: SectionConfig;
  typography: TemplateSchema['typography'];
}) {
  return (
    <section style={{ marginBottom: '28px' }}>
      <h2 style={{
        fontFamily: typography.headingFont || 'sans-serif',
        fontSize: '14px',
        fontWeight: 700,
        color: 'var(--color-nordic-surface-hover)',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {config.label}
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {section.entries?.map((entry, i) => (
          <div key={i}>
            <h3 style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-nordic-surface-hover)', marginBottom: '2px' }}>{entry.title}</h3>
            {entry.subtitle && (
              <div style={{ fontSize: '12px', color: 'var(--color-nordic-text-secondary)', marginBottom: '4px' }}>
                {entry.subtitle}
              </div>
            )}
            {entry.keywords && entry.keywords.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                {entry.keywords.map((kw, j) => (
                  <span key={j} style={{ 
                    fontSize: '11px', 
                    padding: '2px 6px', 
                    background: 'var(--color-nordic-border)', 
                    color: 'var(--color-nordic-text-tertiary)',
                    borderRadius: '4px'
                  }}>
                    {kw}
                  </span>
                ))}
              </div>
            )}
            {entry.description && !entry.keywords && (
              <p style={{ fontSize: '12px', color: 'var(--color-nordic-text-tertiary)', lineHeight: 1.5 }}>{entry.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
