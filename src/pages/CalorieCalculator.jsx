import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CalorieCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState(null);
  
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const calculate = () => {
    if (!age || !weight || !height) return;

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    // Mifflin-St Jeor formula
    let bmr;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * act;
    const bmi = w / ((h / 100) * (h / 100));

    let bmiCategory;
    if (bmi < 18.5) bmiCategory = 'Жин дутуу';
    else if (bmi < 25) bmiCategory = 'Хэвийн';
    else if (bmi < 30) bmiCategory = 'Илүүдэл жинтэй';
    else bmiCategory = 'Таргалалт';

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      bmi: bmi.toFixed(1),
      bmiCategory,
      lose: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
      protein: Math.round(w * 1.8),
      fat: Math.round((tdee * 0.25) / 9),
      carbs: Math.round((tdee - (w * 1.8 * 4) - ((tdee * 0.25))) / 4),
    });
  };

  const activityLevels = [
    { value: '1.2', label: 'Идэвхгүй (суугаа ажил)' },
    { value: '1.375', label: 'Бага идэвхтэй (7 хоногт 1-3 удаа)' },
    { value: '1.55', label: 'Дунд идэвхтэй (7 хоногт 3-5 удаа)' },
    { value: '1.725', label: 'Их идэвхтэй (7 хоногт 6-7 удаа)' },
    { value: '1.9', label: 'Маш их идэвхтэй (өдөрт 2 удаа)' },
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>🔥 Калори Тооцоолуур</h1>
          <p>Өдрийн шаардлагатай калори, BMI тооцоолоорой</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          <div className="calc-layout">
            {/* Input form */}
            <div className="calc-form card">
              <div className="card-body">
                <h3 style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-xl)',
                  marginBottom: 'var(--space-lg)',
                }}>
                  Мэдээллээ оруулна уу
                </h3>

                {/* Gender */}
                <div className="form-group">
                  <label className="form-label">Хүйс</label>
                  <div className="gender-toggle">
                    <button
                      className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
                      onClick={() => setGender('male')}
                    >
                      👨 Эрэгтэй
                    </button>
                    <button
                      className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
                      onClick={() => setGender('female')}
                    >
                      👩 Эмэгтэй
                    </button>
                  </div>
                </div>

                {/* Age */}
                <div className="form-group">
                  <label className="form-label">Нас</label>
                  <input
                    type="number"
                    placeholder="Жнь: 25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="10"
                    max="100"
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Weight */}
                <div className="form-group">
                  <label className="form-label">Жин (кг)</label>
                  <input
                    type="number"
                    placeholder="Жнь: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="30"
                    max="300"
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Height */}
                <div className="form-group">
                  <label className="form-label">Өндөр (см)</label>
                  <input
                    type="number"
                    placeholder="Жнь: 170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="100"
                    max="250"
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Activity */}
                <div className="form-group">
                  <label className="form-label">Идэвхийн түвшин</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    {activityLevels.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 'var(--space-md)' }}
                  onClick={calculate}
                >
                  📊 Тооцоолох
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="calc-results">
              {!result ? (
                <div className="card" style={{ textAlign: 'center' }}>
                  <div className="card-body" style={{ padding: 'var(--space-3xl)' }}>
                    <div style={{ fontSize: 64, marginBottom: 'var(--space-md)' }}>📊</div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)' }}>
                      Мэдээллээ оруулаад тооцоолох товч дарна уу
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* BMI */}
                  <div className="card">
                    <div className="card-body">
                      <h3 className="calc-result-title">📏 BMI (Биеийн жингийн индекс)</h3>
                      <div className="calc-big-number">{result.bmi}</div>
                      <div className={`bmi-badge bmi-${result.bmi < 18.5 ? 'under' : result.bmi < 25 ? 'normal' : result.bmi < 30 ? 'over' : 'obese'}`}>
                        {result.bmiCategory}
                      </div>
                      <div className="bmi-bar">
                        <div className="bmi-bar-fill" style={{
                          width: `${Math.min((result.bmi / 40) * 100, 100)}%`,
                        }} />
                      </div>
                      <div className="bmi-scale">
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                      </div>
                    </div>
                  </div>

                  {/* TDEE */}
                  <div className="card">
                    <div className="card-body">
                      <h3 className="calc-result-title">🔥 Өдрийн калори</h3>
                      <div className="nutrition-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <div className="nutrition-item">
                          <div className="nutrition-value" style={{ color: 'var(--color-secondary)' }}>
                            {result.lose}
                          </div>
                          <div className="nutrition-label">Жин хасах</div>
                        </div>
                        <div className="nutrition-item" style={{ background: 'var(--color-primary-bg)' }}>
                          <div className="nutrition-value">{result.tdee}</div>
                          <div className="nutrition-label">Хэвийн</div>
                        </div>
                        <div className="nutrition-item">
                          <div className="nutrition-value" style={{ color: 'var(--color-tertiary)' }}>
                            {result.gain}
                          </div>
                          <div className="nutrition-label">Жин нэмэх</div>
                        </div>
                      </div>
                      <p style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                        textAlign: 'center',
                        marginTop: 'var(--space-sm)',
                      }}>
                        BMR (суурь бодисын солилцоо): {result.bmr} ккал
                      </p>
                    </div>
                  </div>

                  {/* Macros */}
                  <div className="card">
                    <div className="card-body">
                      <h3 className="calc-result-title">🥩 Өдрийн макро тэжээл</h3>
                      <div className="nutrition-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <div className="nutrition-item">
                          <div className="nutrition-value">{result.protein}г</div>
                          <div className="nutrition-label">Уураг</div>
                        </div>
                        <div className="nutrition-item">
                          <div className="nutrition-value">{result.fat}г</div>
                          <div className="nutrition-label">Өөх тос</div>
                        </div>
                        <div className="nutrition-item">
                          <div className="nutrition-value">{result.carbs}г</div>
                          <div className="nutrition-label">Нүүрс ус</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <h3 style={{ fontFamily: 'var(--font-headline)', marginBottom: 'var(--space-sm)' }}>🤖 AI Хувийн Зөвлөх</h3>
                      <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)', opacity: 0.9 }}>
                        Таны энэхүү тооцоололд үндэслэн 7 хоногийн тусгай хоолны дэглэм үүсгэх үү?
                      </p>
                      <button 
                        className="btn btn-tertiary" 
                        style={{ width: '100%', fontWeight: 700 }}
                        onClick={() => {
                          updateProfile(result);
                          navigate('/ai-planner');
                        }}
                      >
                        ⚡️ Төлөвлөгөө Үүсгэх
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
