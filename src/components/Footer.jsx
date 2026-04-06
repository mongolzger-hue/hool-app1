import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <img src="/pwa-icon.png" alt="Ortskhon Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
              <h3 style={{ margin: 0 }}>Орцхон</h3>
            </div>
            <p>
              Монгол хоолны дэглэм барих, жор олох, бичлэг үзэх бүрэн
              платформ. Эрүүл хоолоор амьдралаа өөрчил.
            </p>
          </div>
          <div className="footer-links">
            <h4>Хуудаснууд</h4>
            <Link to="/">Нүүр</Link>
            <Link to="/meal-plan">Хоолны Дэглэм</Link>
            <Link to="/recipes">Жорын Сан</Link>
            <Link to="/recipe-finder">Жор Олох</Link>
            <Link to="/videos">Бичлэг</Link>
            <Link to="/calculator">Тооцоолуур</Link>
            <Link to="/pricing">Багц</Link>
            <Link to="/install" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>Апп татах заавар</Link>
          </div>
          <div className="footer-links">
            <h4>Холбоо барих</h4>
            <a href="mailto:info@hool.mn">info@hool.mn</a>
            <a href="tel:+97699001122">+976 9900-1122</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Орцхон. Бүх эрх хуулиар хамгаалагдсан.
        </div>
      </div>
    </footer>
  );
}
