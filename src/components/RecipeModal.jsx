import { useFavorites } from '../context/FavoritesContext';
import { useShopping } from '../context/ShoppingContext';
import { recipes } from '../data/recipes';

export default function RecipeModal({ recipeId, onClose }) {
  const recipe = recipes.find((r) => r.id === recipeId);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useShopping();

  if (!recipe) return null;

  const handleAddToCart = () => {
    addToCart(recipe.ingredients);
    alert('Бүх орцууд сагсанд нэмэгдлээ! 🛒');
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `${recipe.name} — ${recipe.description}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `${recipe.name}\n${recipe.description}\nХоол апп-с: ${window.location.href}`
      );
      alert('Холбоосыг хуулсан! 📋');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>
              {recipe.image} {recipe.name}
            </h2>
            <div className="recipe-meta" style={{ marginTop: 8 }}>
              <span className="recipe-meta-item">⏱ {recipe.time}</span>
              <span className="recipe-meta-item">🔥 {recipe.calories} ккал</span>
              <span className="recipe-meta-item">📊 {recipe.difficulty}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="modal-close"
              onClick={() => toggleFavorite(recipe.id)}
              title={isFavorite(recipe.id) ? 'Хасах' : 'Дуртай нэмэх'}
            >
              {isFavorite(recipe.id) ? '❤️' : '🤍'}
            </button>
            <button className="modal-close" onClick={handleAddToCart} title="Сагсанд нэмэх">
              🛒
            </button>
            <button className="modal-close" onClick={share} title="Хуваалцах">
              📤
            </button>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>
        <div className="modal-body">
          <p
            style={{
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-lg)',
              lineHeight: 1.7,
            }}
          >
            {recipe.description}
          </p>

          <div className="nutrition-grid">
            <div className="nutrition-item">
              <div className="nutrition-value">{recipe.calories}</div>
              <div className="nutrition-label">Калори</div>
            </div>
            <div className="nutrition-item">
              <div className="nutrition-value">{recipe.protein}г</div>
              <div className="nutrition-label">Уураг</div>
            </div>
            <div className="nutrition-item">
              <div className="nutrition-value">{recipe.fat}г</div>
              <div className="nutrition-label">Өөх тос</div>
            </div>
            <div className="nutrition-item">
              <div className="nutrition-value">{recipe.carbs}г</div>
              <div className="nutrition-label">Нүүрс ус</div>
            </div>
          </div>

          <h3 className="recipe-section-title">🥬 Орц найрлага</h3>
          <div className="ingredient-list">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="ingredient-item">
                <span className="ingredient-check">✓</span>
                {ing}
              </div>
            ))}
          </div>

          <h3 className="recipe-section-title">👨‍🍳 Хийх дараалал</h3>
          <div className="step-list">
            {recipe.steps.map((step, i) => (
              <div key={i} className="step-item">
                <div className="step-number">{i + 1}</div>
                <div className="step-text">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
