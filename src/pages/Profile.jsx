import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { recipes } from '../data/recipes';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const favRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>👤 Миний Профайл</h1>
          <p>Таны эрүүл мэндийн аялал энд хадгалагдана</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="profile-grid">
            <div className="profile-sidebar">
              <div className="profile-info card">
                <div className={`profile-avatar ${user.isPremium ? 'premium' : ''}`}>
                  {user.name.charAt(0).toUpperCase()}
                  {user.isPremium && <span className="premium-star">💎</span>}
                </div>
                <div className="profile-details">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  {user.phone && <p className="profile-phone">📞 {user.phone}</p>}
                  <div className={`premium-badge ${user.isPremium ? 'active' : ''}`}>
                    {user.isPremium ? '💎 Premium Member' : 'Стандарт хэрэглэгч'}
                  </div>
                  <p className="join-date">Нэгдсэн: {user.joinDate}</p>
                </div>
                <div className="profile-actions">
                  <button 
                    className="btn btn-outline btn-block" 
                    onClick={() => navigate('/install')}
                    style={{ marginBottom: '10px' }}
                  >
                    📲 Гар утсанд суулгах
                  </button>
                  <button className="btn btn-secondary btn-block logout-btn" onClick={logout}>
                    Гарах
                  </button>
                </div>
              </div>
            </div>

            <div className="profile-main">
              <div className="profile-section card" style={{ padding: 'var(--space-xl)' }}>
                <h3>🔖 Миний Багц</h3>
                <div className="subscription-status">
                   <div className="status-label">Одоогийн багц:</div>
                   <div className="status-value">{user.isPremium ? <strong style={{ color: '#FFA500' }}>👑 Премиум</strong> : 'Үнэгүй'}</div>
                   <p className="status-desc">
                     {user.isPremium 
                       ? "Та бүх жорыг үзэх, AI зөвлөх ашиглах эрхтэй байна." 
                       : "Та хязгаарлагдмал эрхтэй байна. Бүх боломжийг нээхийн тулд багцаа ахиулна уу."}
                   </p>
                </div>
              </div>

              <div className="profile-section">
                <div className="section-header">
                  <h3>❤️ Хадгалсан жорууд ({favRecipes.length})</h3>
                  <button className="btn btn-sm btn-secondary" onClick={() => navigate('/recipes')}>
                    Жор нэмэх
                  </button>
                </div>
                {favRecipes.length === 0 ? (
                  <p className="empty-msg">Одоогоор хадгалсан жор алга байна.</p>
                ) : (
                  <div className="fav-mini-grid">
                    {favRecipes.map(recipe => (
                      <div key={recipe.id} className="fav-mini-card card" onClick={() => navigate(`/recipes`)}>
                        <span className="fav-icon">{recipe.image}</span>
                        <span className="fav-name">{recipe.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!user.isPremium && (
                <div className="profile-section premium-upgrade-card card">
                  <div className="upgrade-content">
                    <h3>💎 Premium багц руу шилжих үү?</h3>
                    <p>7 хоногийн тусгай дэглэм, AI зөвлөгч болон бүх жорыг үзэх эрх нээгдэнэ.</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => navigate('/pricing')}>
                    Идэвхжүүлэх
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
