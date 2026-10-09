import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import banner from '../assets/campus/banner.jpeg';
import './shared.css';
import './About.css';

const roadmapYears = ['2026', '2027', '2028', '2029'];
const CARD_GAP = 24;

function getCardsPerView() {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth < 560) return 1;
  if (window.innerWidth < 900) return 2;
  return 4;
}

type CarouselMember = { name: string; role: string; bio?: string; photo: string | null };

function MemberModal({ member, onClose }: { member: CarouselMember | null; onClose: () => void }) {
  useEffect(() => {
    if (member) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [member]);

  if (!member) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-body">
          <div className="modal-photo-wrap">
            {member.photo
              ? <img src={member.photo} alt={member.name} className="modal-photo" />
              : <div className="modal-photo-placeholder">👤</div>
            }
          </div>
          <div className="modal-info">
            <h3>{member.name}</h3>
            <p className="modal-role">{member.role}</p>
            {member.bio && <p className="modal-bio">{member.bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberCarousel({ members }: { members: CarouselMember[] }) {
  const [cardsPerView, setCardsPerView] = useState(() => Math.min(getCardsPerView(), members.length));
  const [index, setIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<CarouselMember | null>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => { setCardsPerView(Math.min(getCardsPerView(), members.length)); setIndex(0); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [members.length]);

  const maxIndex = Math.max(0, members.length - cardsPerView);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const getOffset = () => {
    const wrap = trackWrapRef.current;
    if (!wrap) return 0;
    const cardW = (wrap.offsetWidth - CARD_GAP * (cardsPerView - 1)) / cardsPerView;
    return index * (cardW + CARD_GAP);
  };

  return (
    <>
      {maxIndex === 0 ? (
        <div className="board-cards-centered">
          {members.map((member, i) => (
            <div key={i} className="board-card" onClick={() => setSelectedMember(member)}>
              <div className="board-photo-wrap">
                {member.photo
                  ? <img src={member.photo} alt={member.name} className="board-photo" />
                  : <div className="board-photo-placeholder">👤</div>
                }
              </div>
              <div className="board-info">
                <h4>{member.name}</h4>
                <p className="board-role">{member.role}</p>
                {member.bio && <p className="board-bio">{member.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="board-carousel-wrap">
          <div className="board-carousel-track-wrap" ref={trackWrapRef}>
            <div className="board-carousel-track" style={{ transform: `translateX(-${getOffset()}px)` }}>
              {members.map((member, i) => (
                <div key={i} className="board-card" onClick={() => setSelectedMember(member)}>
                  <div className="board-photo-wrap">
                    {member.photo
                      ? <img src={member.photo} alt={member.name} className="board-photo" />
                      : <div className="board-photo-placeholder">👤</div>
                    }
                  </div>
                  <div className="board-info">
                    <h4>{member.name}</h4>
                    <p className="board-role">{member.role}</p>
                    {member.bio && <p className="board-bio">{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={prev} disabled={index === 0} aria-label="Previous">‹</button>
            <div className="carousel-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button key={i} className={`carousel-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
            <button className="carousel-btn" onClick={next} disabled={index === maxIndex} aria-label="Next">›</button>
          </div>
        </div>
      )}
      <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}

export default function About() {
  const { t } = useTranslation();
  const objectives = t('about.objectives', { returnObjects: true }) as string[];
  const roadmap = t('about.roadmap', { returnObjects: true }) as string[];
  const board = t('about.board', { returnObjects: true }) as CarouselMember[];
  const operationalTeam = t('about.operationalTeam', { returnObjects: true }) as CarouselMember[];
  const academicStaff = t('about.academicStaff', { returnObjects: true }) as CarouselMember[];

  return (
    <main className="about-page">
      <SEO 
        title="About Us | UGCSL - United Global Campus of Sri Lanka"
        description="Learn about UGCSL's vision, mission, and commitment to accessible online higher education in Sri Lanka. Meet our board of directors, leadership team, and academic staff."
        canonical="https://ugcsl.lk/about"
      />
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <span className="section-label" style={{ color: 'var(--accent-light)' }}>{t('about.label')}</span>
          <h1 className="page-hero-title">{t('about.heroTitle1')}<br />{t('about.heroTitle2')}</h1>
          <p>{t('about.heroDesc')}</p>
        </div>
      </section>

      <section className="campus-banner">
        <img src={banner} alt="United Global Campus of Sri Lanka" />
      </section>

      <section className="section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card vision">
              <div className="mv-card-header">
                <span className="mv-icon">🔭</span>
                <h3>{t('about.visionTitle')}</h3>
              </div>
              <p>{t('about.visionDesc')}</p>
            </div>
            <div className="mv-card mission">
              <div className="mv-card-header">
                <span className="mv-icon">🎯</span>
                <h3>{t('about.missionTitle')}</h3>
              </div>
              <p>{t('about.missionDesc')}</p>
            </div>
            <div className="mv-card values">
              <div className="mv-card-header">
                <span className="mv-icon">💎</span>
                <h3>{t('about.objectivesTitle')}</h3>
              </div>
              <ul className="mv-objectives">
                {objectives.map((obj, i) => <li key={i}><span className="mv-obj-dot" />{obj}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('about.boardLabel')}</span>
            <h2 className="section-title">{t('about.boardTitle')}</h2>
            <p className="section-subtitle">{t('about.boardSubtitle')}</p>
          </div>
          <MemberCarousel members={board} />
        </div>
      </section>

      {/* Operational Leadership */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('about.operationalLabel')}</span>
            <h2 className="section-title">{t('about.operationalTitle')}</h2>
            <p className="section-subtitle">{t('about.operationalSubtitle')}</p>
          </div>
          <MemberCarousel members={operationalTeam} />
        </div>
      </section>

      {/* Academic Staff */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('about.academicLabel')}</span>
            <h2 className="section-title">{t('about.academicTitle')}</h2>
            <p className="section-subtitle">{t('about.academicSubtitle')}</p>
          </div>
          <MemberCarousel members={academicStaff} />
        </div>
      </section>

      {/* Roadmap */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{t('about.roadmapLabel')}</span>
            <h2 className="section-title">{t('about.roadmapTitle')}</h2>
          </div>
          <div className="timeline">
            {roadmap.map((event, i) => (
              <div key={roadmapYears[i]} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{roadmapYears[i]}</span>
                  <p>{event}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
