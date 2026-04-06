import { useState, useRef } from 'react';
import { recipes } from '../data/recipes';
import { analyzeIngredients } from '../services/gemini';

export default function RecipeFinder() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [dragover, setDragover] = useState(false);
  const fileRef = useRef();
  const cameraRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|webp|heic)$/i)) {
      window.alert('Зөвхөн зураг оруулна уу (JPG, PNG, HEIC)');
      return;
    }

    setImage(file);
    setResult(null);
    setDetectedIngredients([]);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result;
      setImagePreview(base64Image);

      // Real AI analysis
      setAnalyzing(true);
      try {
        const ingredients = await analyzeIngredients(base64Image);
        setDetectedIngredients(ingredients);
        
        // Find a matching recipe or just suggest a random one from our data for now
        // Based on the first few ingredients
        const matched = recipes.find(r => 
          ingredients.some(ing => r.name.toLowerCase().includes(ing.toLowerCase()) || r.description.toLowerCase().includes(ing.toLowerCase()))
        );
        
        setResult(matched || recipes[Math.floor(Math.random() * recipes.length)]);
      } catch (error) {
        console.error('Error analyzing image:', error);
        const msg = error.message.includes("API key") 
          ? "AI-ийн нууц түлхүүр (API Key) тохируулагдаагүй байна. Вэрсэл дээрх тохиргоогоо шалгана уу." 
          : `Зураг шинжлэхэд алдаа гарлаа: ${error.message} (Дахин оролдоно уу)`;
        window.alert(msg);
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragover(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const reset = () => {
    setImage(null);
    setImagePreview(null);
    setAnalyzing(false);
    setResult(null);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>📸 Зургаар Жор Олох</h1>
          <p>Хөргөгчний зургаа оруулаад, хиймээр хоолныхоо жорыг олоорой</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          {!image && (
            <div className="upload-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div
                className={`upload-zone ${dragover ? 'dragover' : ''}`}
                onClick={() => fileRef.current.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragover(true);
                }}
                onDragLeave={() => setDragover(false)}
                onDrop={handleDrop}
                style={{ marginBottom: 'var(--space-lg)' }}
              >
                <span className="upload-zone-icon">📁</span>
                <div className="upload-zone-text">
                  Зургаа энд чирж оруулна уу
                </div>
                <div className="upload-zone-hint">
                  эсвэл дарж файлаас сонгоно уу
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="camera-option" style={{ textAlign: 'center' }}>
                <p style={{ 
                  margin: '15px 0', 
                  color: 'var(--color-text-muted)', 
                  fontSize: 'var(--text-sm)',
                  position: 'relative'
                }}>
                  <span style={{ backgroundColor: 'var(--color-bg)', padding: '0 10px', position: 'relative', zIndex: 1 }}>эсвэл</span>
                  <span style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid var(--color-border)', zIndex: 0 }}></span>
                </p>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px' }}
                  onClick={() => cameraRef.current.click()}
                >
                  <span style={{ fontSize: '20px' }}>📸</span> Зураг авах
                </button>
                <input
                  ref={cameraRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          )}

          {imagePreview && (
            <div className="upload-preview">
              <img src={imagePreview} alt="Оруулсан зураг" />
            </div>
          )}

          {analyzing && (
            <div className="analyzing">
              <div className="analyzing-spinner"></div>
              <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                Орц таньж байна...
              </p>
              
              <div className="detected-ingredients">
                {detectedIngredients.map((ing, i) => (
                  <span key={i} className="detected-badge">✓ {ing}</span>
                ))}
              </div>

              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  marginTop: 8,
                }}
              >
                Хөргөгчний орц найрлагыг шинжилж байна
              </p>
            </div>
          )}

          {result && (
            <>
              <div className="recipe-result">
                <div className="recipe-result-header">
                  <h2>
                    {result.image} {result.name}
                  </h2>
                  <div className="recipe-meta">
                    <span className="recipe-meta-item">⏱ {result.time}</span>
                    <span className="recipe-meta-item">
                      🔥 {result.calories} ккал
                    </span>
                    <span className="recipe-meta-item">
                      📊 {result.difficulty}
                    </span>
                    <span className="recipe-meta-item">
                      📁 {result.category}
                    </span>
                  </div>
                </div>
                <div className="recipe-result-body">
                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-lg)',
                      lineHeight: 1.7,
                    }}
                  >
                    {result.description}
                  </p>

                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <div className="nutrition-value">{result.calories}</div>
                      <div className="nutrition-label">Калори</div>
                    </div>
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

                  <h3 className="recipe-section-title">🥬 Орц найрлага</h3>
                  <div className="ingredient-list">
                    {result.ingredients.map((ing, i) => (
                      <div key={i} className="ingredient-item">
                        <span className="ingredient-check">✓</span>
                        {ing}
                      </div>
                    ))}
                  </div>

                  <h3 className="recipe-section-title">👨‍🍳 Хийх дараалал</h3>
                  <div className="step-list">
                    {result.steps.map((step, i) => (
                      <div key={i} className="step-item">
                        <div className="step-number">{i + 1}</div>
                        <div className="step-text">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
                <button className="btn btn-secondary" onClick={reset}>
                  🔄 Дахин оруулах
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
