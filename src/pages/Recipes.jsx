import { useState } from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { useFavorites } from '../context/FavoritesContext';
import RecipeModal from '../components/RecipeModal';

const categories = ['Бүгд', ...new Set(recipes.map((r) => r.category))];
const origins = ['Бүгд', 'Монгол', 'Солонгос', 'Европ'];

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState('Бүгд');
  const [activeOrigin, setActiveOrigin] = useState('Бүгд');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalRecipeId, setModalRecipeId] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  const filtered = recipes.filter((r) => {
    const matchCategory = activeCategory === 'Бүгд' || r.category === activeCategory;
    const matchOrigin = activeOrigin === 'Бүгд' || r.origin === activeOrigin;
    const matchSearch =
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchOrigin && matchSearch;
  });

  const share = (recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `${recipe.name} — ${recipe.description}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `${recipe.name}\n${recipe.description}\nОрцхон апп-с: ${window.location.href}`
      );
      window.alert('Холбоосыг хуулсан! 📋');
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>📖 Жорын Сан</h1>
          <p>20+ Монгол болон Олон улсын хоолны жор</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          {/* Search */}
          <div style={{ maxWidth: 500, margin: '0 auto var(--space-xl)' }}>
            <input
              type="text"
              placeholder="🔍 Жор хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: 'var(--radius-xl)',
              }}
            />
          </div>

          {/* Nationality Filters */}
          <div style={{ marginBottom: 'var(--space-md)', textAlign: 'center' }}>
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', display: 'block', marginBottom: 'var(--space-xs)' }}>Үндэс:</span>
            <div className="video-filters" style={{ justifyContent: 'center' }}>
              {origins.map((org) => (
                <button
                  key={org}
                  className={`video-filter ${activeOrigin === org ? 'active' : ''}`}
                  onClick={() => setActiveOrigin(org)}
                >
                  {org}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div style={{ marginBottom: 'var(--space-xl)', textAlign: 'center' }}>
             <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', display: 'block', marginBottom: 'var(--space-xs)' }}>Төрөл:</span>
            <div className="video-filters" style={{ justifyContent: 'center' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`video-filter ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
              <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-muted)' }}>
                😕 Жор олдсонгүй
              </p>
            </div>
          ) : (
            <div className="recipes-grid">
              {filtered.map((recipe) => (
                <div key={recipe.id} className="recipe-card card">
                  <div className="recipe-card-top">
                    <span className="recipe-card-emoji">{recipe.image}</span>
                    <div className="recipe-card-actions">
                      <button
                        className="icon-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe.id);
                        }}
                        title={isFavorite(recipe.id) ? 'Хасах' : 'Дуртай нэмэх'}
                      >
                        {isFavorite(recipe.id) ? '❤️' : '🤍'}
                      </button>
                      <button
                        className="icon-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          share(recipe);
                        }}
                        title="Хуваалцах"
                      >
                        📤
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)', flexWrap: 'wrap' }}>
                      <span className="badge" style={{ background: recipe.origin === 'Солонгос' ? '#ff4d4d' : recipe.origin === 'Европ' ? '#4d7cff' : 'var(--color-secondary)' }}>{recipe.origin}</span>
                      <span className="badge badge-primary">{recipe.category}</span>
                      <span className="badge badge-tertiary">{recipe.difficulty}</span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-headline)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 700,
                      marginBottom: 'var(--space-xs)',
                    }}>
                      {recipe.name}
                    </h3>
                    <p style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-md)',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {recipe.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      marginBottom: 'var(--space-md)',
                    }}>
                      <span>⏱ {recipe.time}</span>
                      <span>🔥 {recipe.calories} ккал</span>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                      onClick={() => setModalRecipeId(recipe.id)}
                    >
                      Жор харах
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {modalRecipeId && (
        <RecipeModal
          recipeId={modalRecipeId}
          onClose={() => setModalRecipeId(null)}
        />
      )}
    </>
  );
}
