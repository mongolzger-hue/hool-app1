import { useState } from 'react';
import { mealPlans } from '../data/mealplans';
import { recipes } from '../data/recipes';
import RecipeModal from '../components/RecipeModal';

const mealTypes = [
  { key: 'breakfast', label: 'Өглөө', icon: '🌅' },
  { key: 'lunch', label: 'Өдөр', icon: '☀️' },
  { key: 'dinner', label: 'Орой', icon: '🌙' },
  { key: 'snack', label: 'Завсрын', icon: '🍎' },
];

export default function MealPlan() {
  const [planIndex, setPlanIndex] = useState(0);
  const [dayIndex, setDayIndex] = useState(0);
  const [modalRecipeId, setModalRecipeId] = useState(null);

  const plan = mealPlans[planIndex];
  const day = plan.days[dayIndex];

  const dailyTotal = Object.values(day.meals).reduce(
    (sum, m) => sum + m.calories,
    0
  );

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>🍽️ Хоолны Дэглэм</h1>
          <p>7 хоногийн тэжээллэг хоолны төлөвлөгөө</p>

          <div className="plan-selector">
            {mealPlans.map((p, i) => (
              <button
                key={p.id}
                className={`plan-option ${planIndex === i ? 'active' : ''}`}
                onClick={() => {
                  setPlanIndex(i);
                  setDayIndex(0);
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              marginTop: 'var(--space-sm)',
            }}
          >
            {plan.description}
          </p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          <div className="day-tabs">
            {plan.days.map((d, i) => (
              <button
                key={d.day}
                className={`day-tab ${dayIndex === i ? 'active' : ''}`}
                onClick={() => setDayIndex(i)}
              >
                {d.day}
              </button>
            ))}
          </div>

          <div className="meals-grid">
            {mealTypes.map(({ key, label, icon }) => {
              const meal = day.meals[key];
              if (!meal) return null;

              // Simple suggestions logic: pick 2 other recipes excluding the current one
              const suggestions = recipes
                .filter(r => r.id !== meal.recipeId)
                .sort(() => 0.5 - Math.random())
                .slice(0, 2);

              return (
                <div
                  key={key}
                  className="meal-card"
                  style={{ cursor: 'default' }}
                >
                  <div className="meal-type">
                    <span className="meal-type-icon">{icon}</span> {label}
                  </div>
                  <div 
                    className="meal-name" 
                    onClick={() => meal.recipeId && setModalRecipeId(meal.recipeId)}
                    style={{ cursor: meal.recipeId ? 'pointer' : 'default' }}
                  >
                    {meal.name}
                  </div>
                  <div className="meal-calories">🔥 {meal.calories} ккал</div>
                  
                  {meal.recipeId && (
                    <div
                      className="view-recipe-link"
                      onClick={() => setModalRecipeId(meal.recipeId)}
                    >
                      Жор харах →
                    </div>
                  )}

                  {/* Suggestions Section */}
                  <div className="meal-suggestions">
                    <span className="suggestion-title">💡 Өөр хоол</span>
                    <div className="suggestion-chips">
                      {suggestions.map(s => (
                        <div 
                          key={s.id} 
                          className="suggestion-chip"
                          onClick={() => setModalRecipeId(s.id)}
                        >
                          {s.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="daily-total">
            <div className="daily-total-label">Өдрийн нийт калори</div>
            <div className="daily-total-value">{dailyTotal} ккал</div>
            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                marginTop: 4,
              }}
            >
              Зорилго: {plan.targetCalories} ккал
            </div>
          </div>
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
