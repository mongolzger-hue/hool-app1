import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🍽️ Орцхон</h3>
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
