import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function useScrollReveal() {
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((child) => {
        observer.observe(child);
      });
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef}>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-badge">🌿 Эрүүл амьдрал энд эхэлнэ</div>
              <h1 className="hero-title">
                Эрүүл <span className="highlight">хоолоор</span> амьдралаа{' '}
                <span className="highlight">өөрчил</span>
              </h1>
              <p className="hero-desc">
                Монгол хоолны дэглэм барих, хөргөгчний зургаас жор олох,
                хоол хийх бичлэг үзэх — бүгд нэг дор.
              </p>
              <div className="hero-actions">
                <Link to="/meal-plan" className="btn btn-primary btn-lg">
                  Дэглэм эхлүүлэх
                </Link>
                <Link to="/recipe-finder" className="btn btn-secondary btn-lg">
                  📸 Жор олох
                </Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-value">15+</div>
                  <div className="hero-stat-label">Жорын сан</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">7</div>
                  <div className="hero-stat-label">Хоногийн дэглэм</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">8+</div>
                  <div className="hero-stat-label">Бичлэг</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-wrapper">
                <img
                  src="/hero.png"
                  alt="Монгол хоол"
                />
              </div>
              <div className="hero-image-float top">
                <span className="hero-float-icon">🥟</span>
                <div>
                  <div className="hero-float-text">Бууз</div>
                  <div className="hero-float-sub">350 ккал</div>
                </div>
              </div>
              <div className="hero-image-float bottom">
                <span className="hero-float-icon">🔥</span>
                <div>
                  <div className="hero-float-text">Калори тооцоолох</div>
                  <div className="hero-float-sub">Автомат</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ display: 'inline-block' }}>
              Юу хийж болох вэ?
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Таны эрүүл амьдралын хамгийн ойр дотны туслах
            </p>
          </div>
          <div className="features-grid">
            <Link to="/meal-plan" className="feature-card animate-on-scroll">
              <div className="feature-icon primary">🍽️</div>
              <h3 className="feature-title">Хоолны Дэглэм</h3>
              <p className="feature-desc">
                7 хоногийн өглөө, өдөр, оройн хоолны бэлэн дэглэм. Калори,
                уураг, өөх тосны тооцоолол.
              </p>
            </Link>
            <Link to="/recipe-finder" className="feature-card animate-on-scroll">
              <div className="feature-icon secondary">📸</div>
              <h3 className="feature-title">Зургаар Жор Олох</h3>
              <p className="feature-desc">
                Хөргөгчний зургаа авахуулаад, хиймээр хоолныхоо жорыг авна.
                AI технологид суурилсан.
              </p>
            </Link>
            <Link to="/videos" className="feature-card animate-on-scroll">
              <div className="feature-icon tertiary">🎬</div>
              <h3 className="feature-title">Хоол Хийх Бичлэг</h3>
              <p className="feature-desc">
                YouTube дээрх Монгол хоол хийх бичлэгүүд. Алхам алхмаар
                заавар.
              </p>
            </Link>
            <Link to="/recipes" className="feature-card animate-on-scroll">
              <div className="feature-icon primary">📖</div>
              <h3 className="feature-title">Жорын Сан</h3>
              <p className="feature-desc">
                15+ Монгол хоолны жор. Бууз, Хуушуур, Цуйван, Банштай шөл
                гэх мэт бүгд нэг дор.
              </p>
            </Link>
            <Link to="/calculator" className="feature-card animate-on-scroll">
              <div className="feature-icon secondary">🔥</div>
              <h3 className="feature-title">Калори Тооцоолуур</h3>
              <p className="feature-desc">
                BMI, өдрийн калори, уураг, өөх тос, нүүрс усны
                хэрэгцээг тооцоол.
              </p>
            </Link>
            <Link to="/pricing" className="feature-card animate-on-scroll">
              <div className="feature-icon tertiary">💎</div>
              <h3 className="feature-title">Премиум Багц</h3>
              <p className="feature-desc">
                Бүх боломжийг нээж, хувийн зөвлөгөө аваарай.
                ₮9,900-с эхэлнэ.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section animate-on-scroll">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            className="section-title"
            style={{ display: 'inline-block', marginBottom: 16 }}
          >
            Бэлэн үү?
          </h2>
          <p
            className="section-subtitle"
            style={{ margin: '0 auto var(--space-xl)' }}
          >
            Өнөөдрөөс эхлэн эрүүл хоолны дэглэмээ барина.
            Премиум багцаар бүх боломжийг нээ.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pricing" className="btn btn-accent btn-lg">
              💳 Багц харах
            </Link>
            <Link to="/recipes" className="btn btn-secondary btn-lg">
              📖 Жорын сан
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
