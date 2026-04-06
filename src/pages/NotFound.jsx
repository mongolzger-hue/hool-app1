import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-header" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 120, marginBottom: 'var(--space-md)', lineHeight: 1 }}>🍜</div>
        <h1 style={{
          fontSize: 'var(--text-6xl)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 'var(--space-md)',
        }}>
          404
        </h1>
        <p style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          fontFamily: 'var(--font-headline)',
          marginBottom: 'var(--space-sm)',
        }}>
          Хуудас олдсонгүй
        </p>
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-xl)',
          maxWidth: 400,
          margin: '0 auto var(--space-xl)',
        }}>
          Уучлаарай, та хайж буй хуудас устсан эсвэл зөөгдсөн байна.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            🏠 Нүүр хуудас
          </Link>
          <Link to="/recipes" className="btn btn-secondary btn-lg">
            📖 Жорын сан
          </Link>
        </div>
      </div>
    </div>
  );
}
