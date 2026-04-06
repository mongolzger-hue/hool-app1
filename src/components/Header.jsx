import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useShopping } from '../context/ShoppingContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { items } = useShopping();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const cartCount = items.length;

  const navItems = [
    { path: '/', label: 'Нүүр' },
    { path: '/meal-plan', label: 'Дэглэм' },
    { path: '/recipes', label: 'Жорын сан' },
    { path: '/recipe-finder', label: 'Жор олох' },
    { path: '/videos', label: 'Бичлэг' },
    { path: '/calculator', label: 'Тооцоолуур' },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="header-logo-icon">🍽️</span>
          Хоол
        </Link>

        {/* Action icons always visible */}
        <div className="header-icons-row">
          <Link to="/shopping-list" className="header-icon-link" title="Сагс">
            🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Горим солих"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <Link to="/profile" className="header-icon-link" title="Профайл">
              <div className="user-avatar-sm">{user.name.charAt(0).toUpperCase()}</div>
            </Link>
          ) : (
            <Link to="/login" className="header-icon-link" title="Нэвтрэх">👤</Link>
          )}

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
             <Link to="/profile" className="header-cta" style={{ background: user.isPremium ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'var(--color-primary)' }}>
               {user.isPremium ? '💎 Premium' : 'Миний Профайл'}
             </Link>
          ) : (
            <Link to="/pricing" className="header-cta">
              Багц авах
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
