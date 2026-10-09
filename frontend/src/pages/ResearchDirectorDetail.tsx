import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import './shared.css';
import './ResearchDirectorDetail.css';

type Director = {
  id: string;
  name: string;
  role: string;
  faculty: string;
  specialization: string;
  bio: string;
  photo: string | null;
};

export default function ResearchDirectorDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const directors = t('research.directors', { returnObjects: true }) as Director[];

  const director = directors.find((d) => d.id.toLowerCase() === id?.toLowerCase());

  if (!director) {
    return (
      <main className="rdd-not-found">
        <div className="rdd-not-found-inner">
          <span className="rdd-not-found-icon">🔍</span>
          <h2>Profile Not Found</h2>
          <p>The director ID <strong>{id}</strong> does not match any record in our Research Unit.</p>
          <Link to="/research" className="btn btn-dark">← Back to Research</Link>
        </div>
      </main>
    );
  }

  const isTBA = director.name === 'To Be Announced';

  return (
    <main>
      <SEO
        title={`${director.name} | UGCSL Research Unit`}
        description={`${director.role} – ${director.faculty}. ${director.bio}`}
        canonical={`https://ugcsl.lk/research/directors/${director.id.toLowerCase()}`}
      />

      {/* Hero banner */}
      <section className="rdd-hero">
        <div className="rdd-hero-bg" />
        <div className="rdd-hero-shapes">
          <div className="rdd-shape rdd-shape-1" />
          <div className="rdd-shape rdd-shape-2" />
        </div>
        <div className="container rdd-hero-content">
          <Link to="/research" className="rdd-back">← Research Unit</Link>
          <div className="rdd-hero-badge">
            <span className="rdd-hero-badge-label">UGCSL · RESEARCH UNIT</span>
            <span className="rdd-hero-badge-id">{director.id}</span>
          </div>
        </div>
      </section>

      {/* Main profile card */}
      <section className="section">
        <div className="container">
          <div className="rdd-card">

            {/* Left: Photo + ID strip */}
            <div className="rdd-photo-col">
              <div className="rdd-photo-wrap">
                {director.photo
                  ? <img src={director.photo} alt={director.name} className="rdd-photo" />
                  : <div className="rdd-photo-placeholder">👤</div>
                }
                {!isTBA && (
                  <div className="rdd-verified-badge">
                    <span>✓</span> Verified Member
                  </div>
                )}
              </div>
              <div className="rdd-id-strip">
                <div className="rdd-id-strip-left">
                  <span className="rdd-id-strip-id">{director.id}</span>
                  <span className="rdd-id-strip-unit">Research Unit</span>
                </div>
                <span className="rdd-id-strip-logo">UGCSL</span>
              </div>
            </div>

            {/* Right: Info */}
            <div className="rdd-info-col">
              <div className="rdd-info-top">
                <span className="rdd-info-label">Research Unit Director</span>
                <h1 className="rdd-name">{director.name}</h1>
                <p className="rdd-role">{director.role}</p>
                <div className="rdd-tags">
                  <span className="rdd-tag rdd-tag-faculty">{director.faculty}</span>
                  {!isTBA && <span className="rdd-tag rdd-tag-spec">{director.specialization}</span>}
                </div>
              </div>

              {!isTBA && (
                <div className="rdd-bio-block">
                  <h3 className="rdd-bio-title">Profile</h3>
                  <p className="rdd-bio">{director.bio}</p>
                </div>
              )}

              {isTBA && (
                <div className="rdd-tba-block">
                  <span className="rdd-tba-icon">📋</span>
                  <p>This position is currently open. The appointment will be announced soon.</p>
                </div>
              )}

              {/* Metadata grid */}
              <div className="rdd-meta-grid">
                <div className="rdd-meta-item">
                  <span className="rdd-meta-label">Faculty</span>
                  <span className="rdd-meta-value">{director.faculty}</span>
                </div>
                <div className="rdd-meta-item">
                  <span className="rdd-meta-label">Member ID</span>
                  <span className="rdd-meta-value rdd-meta-id">{director.id}</span>
                </div>
                <div className="rdd-meta-item">
                  <span className="rdd-meta-label">Institution</span>
                  <span className="rdd-meta-value">United Global Campus of Sri Lanka</span>
                </div>
                <div className="rdd-meta-item">
                  <span className="rdd-meta-label">Unit</span>
                  <span className="rdd-meta-value">Research Directorate</span>
                </div>
              </div>

              <div className="rdd-actions">
                <Link to="/research" className="btn btn-dark">← All Directors</Link>
                <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              </div>
            </div>
          </div>

          {/* Institution footer seal */}
          <div className="rdd-institution-seal">
            <div className="rdd-seal-line" />
            <div className="rdd-seal-content">
              <span className="rdd-seal-icon">🏛️</span>
              <div>
                <p className="rdd-seal-name">United Global Campus of Sri Lanka</p>
                <p className="rdd-seal-sub">Official Research Unit Member Profile · ugcsl.lk</p>
              </div>
            </div>
            <div className="rdd-seal-line" />
          </div>
        </div>
      </section>
    </main>
  );
}
