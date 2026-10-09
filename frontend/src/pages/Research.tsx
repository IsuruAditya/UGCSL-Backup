import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import SEO from '../components/SEO';
import './shared.css';
import './Research.css';

const areaIcons = ['🧠', '🕊️', '📈', '🌍'];

type Director = {
  id: string;
  name: string;
  role: string;
  faculty: string;
  specialization: string;
  bio: string;
  photo: string | null;
};

function QRCanvas({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 160,
        margin: 2,
        color: { dark: '#1a3a6b', light: '#ffffff' },
      });
    }
  }, [url]);

  return <canvas ref={canvasRef} className="rd-qr-canvas" />;
}

function DirectorModal({ director, onClose }: { director: Director | null; onClose: () => void }) {
  const profileUrl = director ? `https://ugcsl.lk/research/directors/${director.id.toLowerCase()}` : '';

  useEffect(() => {
    if (!director) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [director, onClose]);

  if (!director) return null;
  const isTBA = director.name === 'To Be Announced';

  return (
    <div className="rd-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="rd-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rd-modal-close" onClick={onClose} aria-label="Close">×</button>

        {/* ID Card Header */}
        <div className="rd-modal-header">
          <div className="rd-modal-id-badge">
            <span className="rd-modal-id-label">UGCSL RESEARCH UNIT</span>
            <span className="rd-modal-id-num">{director.id}</span>
          </div>
          <div className="rd-modal-photo-wrap">
            {director.photo
              ? <img src={director.photo} alt={director.name} className="rd-modal-photo" />
              : <div className="rd-modal-photo-placeholder">👤</div>
            }
          </div>
        </div>

        {/* Details */}
        <div className="rd-modal-body">
          <div className="rd-modal-info">
            <h2 className="rd-modal-name">{director.name}</h2>
            <p className="rd-modal-role">{director.role}</p>
            <div className="rd-modal-tags">
              <span className="rd-modal-tag rd-tag-faculty">{director.faculty}</span>
              {!isTBA && <span className="rd-modal-tag rd-tag-spec">{director.specialization}</span>}
            </div>
            {!isTBA && <p className="rd-modal-bio">{director.bio}</p>}
            {isTBA && <p className="rd-modal-bio rd-tba-note">This position is currently open. Appointment will be announced soon.</p>}
          </div>

          {/* QR Code Section */}
          <div className="rd-modal-qr-section">
            <div className="rd-qr-wrap">
              <QRCanvas url={profileUrl} />
              <p className="rd-qr-label">Scan to verify ID</p>
              <p className="rd-qr-url">{profileUrl}</p>
            </div>
            <a
              href={`/research/directors/${director.id.toLowerCase()}`}
              className="rd-modal-open-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Full Profile →
            </a>
            <div className="rd-modal-id-card-footer">
              <span>🏛️ United Global Campus of Sri Lanka</span>
              <span>ugcsl.lk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectorCard({ director, index, onClick }: { director: Director; index: number; onClick: () => void }) {
  const isTBA = director.name === 'To Be Announced';
  return (
    <button
      className="rd-card"
      onClick={onClick}
      style={{ animationDelay: `${index * 40}ms` }}
      aria-label={`View profile of ${director.name}`}
    >
      <div className="rd-card-photo-wrap">
        {director.photo
          ? <img src={director.photo} alt={director.name} className="rd-card-photo" loading="lazy" />
          : <div className="rd-card-photo-placeholder">👤</div>
        }
        <div className="rd-card-overlay">
          <span className="rd-card-view-btn">View Profile</span>
        </div>
        <span className="rd-card-id">{director.id}</span>
      </div>
      <div className="rd-card-body">
        <p className="rd-card-name">{isTBA ? 'To Be Announced' : director.name}</p>
        <p className="rd-card-role">{director.role}</p>
        <span className="rd-card-faculty">{director.faculty}</span>
      </div>
    </button>
  );
}

export default function Research() {
  const { t } = useTranslation();
  const areas = t('research.areas', { returnObjects: true }) as { name: string; desc: string }[];
  const directors = t('research.directors', { returnObjects: true }) as Director[];
  const [selected, setSelected] = useState<Director | null>(null);

  return (
    <main>
      <SEO
        title="Research | UGCSL - Building a Culture of Inquiry"
        description="Explore UGCSL's research focus areas in Psychology, Human Rights, Business Development, and Social Development. Partner with us for collaborative research."
        canonical="https://ugcsl.lk/research"
      />
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('research.label')}</span>
          <h1 className="page-hero-title">{t('research.heroTitle1')}<br />{t('research.heroTitle2')}</h1>
          <p>{t('research.heroDesc')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('research.focusLabel')}</span>
            <h2 className="section-title">{t('research.focusTitle')}</h2>
            <p className="section-subtitle">{t('research.focusSubtitle')}</p>
          </div>
          <div className="grid-2">
            {areas.map((c, i) => (
              <div key={i} className="research-card card">
                <div className="research-icon">{areaIcons[i]}</div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Directors Gallery */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('research.directorsLabel')}</span>
            <h2 className="section-title">{t('research.directorsTitle')}</h2>
            <p className="section-subtitle">{t('research.directorsSubtitle')}</p>
          </div>
          <div className="rd-grid">
            {directors.map((d, i) => (
              <DirectorCard key={d.id} director={d} index={i} onClick={() => setSelected(d)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="collab-banner">
            <div className="collab-content">
              <span className="section-label">{t('research.collaborateLabel')}</span>
              <h2 className="section-title">{t('research.collaborateTitle')}</h2>
              <p className="section-subtitle">{t('research.collaborateDesc')}</p>
              <Link to="/contact" className="btn btn-dark" style={{ marginTop: '28px' }}>{t('research.getInTouch')}</Link>
            </div>
            <div className="collab-visual">
              {['🏛️', '🌐', '🤝', '💡', '📚', '🔍'].map((e, i) => (
                <div key={i} className="collab-bubble">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DirectorModal director={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
