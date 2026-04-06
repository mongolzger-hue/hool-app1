import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShopping } from '../context/ShoppingContext';
import { generateMealPlan } from '../services/gemini';

export default function AIPlanner() {
  const { user } = useAuth();
  const { addToCart } = useShopping();
  const [plan, setPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState('maintain'); // maintain, lose, gain

  // Real AI Plan Generation
  const generatePlan = async () => {
    if (!user?.profile) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const newPlan = await generateMealPlan(user.profile, goal);
      setPlan(newPlan);
    } catch (err) {
      console.error('Error generating AI plan:', err);
      const msg = err.message.includes("API key") 
        ? "AI-ийн нууц түлхүүр (API Key) тохируулагдаагүй байна. Вэрсэл дээрх тохиргоогоо шалгана уу." 
        : `AI-д алдаа гарлаа: ${err.message} (Сервер эсвэл API холболтыг шалгана уу)`;
      setError(msg);
      window.alert(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (user?.profile && !plan) {
      generatePlan();
    }
  }, [user, goal]);

  if (!user) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2>Нэвтрэх шаардлагатай</h2>
        <p>AI Төлөвлөгөө ашиглахын тулд нэвтэрнэ үү.</p>
        <Link to="/login" className="btn btn-primary">Нэвтрэх</Link>
      </div>
    );
  }

  if (!user.profile) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="card-body">
            <div style={{ fontSize: 64, marginBottom: 'var(--space-md)' }}>🤖</div>
            <h2>Калори тооцоолоогүй байна</h2>
            <p style={{ marginBottom: 'var(--space-lg)' }}>AI Төлөвлөгөө үүсгэхийн тулд эхлээд өөрийн биеийн мэдээллээ оруулж калори тооцоолуур ашиглана уу.</p>
            <Link to="/calculator" className="btn btn-primary">📊 Тооцоолуур руу очих</Link>
          </div>
        </div>
      </div>
    );
  }

  const addWholePlanToCart = () => {
    if (!plan) return;
    const allIngredients = [];
    plan.forEach(day => {
      Object.values(day.meals).forEach(meal => {
        if (meal && meal.ingredients) {
          allIngredients.push(...meal.ingredients);
        }
      });
    });
    
    // De-duplicate slightly (optional but good)
    const uniqueIngredients = [...new Set(allIngredients)];
    addToCart(uniqueIngredients);
    window.alert('7 хоногийн бүх материалыг сагсанд нэмлээ! 🛒');
  };

  const currentTargetCals = goal === 'lose' ? user.profile.lose : goal === 'gain' ? user.profile.gain : user.profile.tdee;

  return (
    <>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white' }}>
        <div className="container">
          <h1>🤖 AI Хувийн Зөвлөх</h1>
          <p>Таны илчлэгийн хэрэгцээ: <strong>{currentTargetCals} ккал</strong></p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Goal Selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
            <button className={`btn ${goal === 'lose' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGoal('lose')}>📉 Жин хасах</button>
            <button className={`btn ${goal === 'maintain' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGoal('maintain')}>⚖️ Жин барих</button>
            <button className={`btn ${goal === 'gain' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGoal('gain')}>📈 Жин нэмэх</button>
          </div>

          {isGenerating ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
              <div className="loading-spinner" style={{ margin: '0 auto var(--space-md)' }}></div>
              <h3>AI Төлөвлөгөө боловсруулж байна...</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>Таны илчлэг болон шим тэжээлд тохирсон хоолыг сонгож байна.</p>
            </div>
          ) : plan ? (
            <>
              <div className="planner-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                <h2 style={{ fontFamily: 'var(--font-headline)' }}>📅 7 хоногийн цэс</h2>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button className="btn btn-outline btn-sm" onClick={generatePlan}>🔄 Дахин үүсгэх</button>
                  <button className="btn btn-primary btn-sm" onClick={addWholePlanToCart}>🛒 Бүгдийг сагслах</button>
                </div>
              </div>

              <div className="ai-plan-grid">
                {plan.map((day, idx) => (
                  <div key={idx} className="ai-plan-day card">
                    <div className="card-header" style={{ background: 'var(--color-primary-bg)', padding: 'var(--space-sm) var(--space-md)', fontWeight: 700 }}>
                      {day.day}
                    </div>
                    <div className="card-body" style={{ padding: 'var(--space-md)' }}>
                      <div className="ai-meal-item">
                        <span className="meal-label">🥐 Өглөө:</span>
                        <span className="meal-name">{day.meals.breakfast.name}</span>
                      </div>
                      <div className="ai-meal-item">
                        <span className="meal-label">🍱 Өдөр:</span>
                        <span className="meal-name">{day.meals.lunch.name}</span>
                      </div>
                      <div className="ai-meal-item">
                        <span className="meal-label">🍲 Орой:</span>
                        <span className="meal-name">{day.meals.dinner.name}</span>
                      </div>
                      <div className="ai-meal-item">
                        <span className="meal-label">🍎 Зууш:</span>
                        <span className="meal-name">{day.meals.snack.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
