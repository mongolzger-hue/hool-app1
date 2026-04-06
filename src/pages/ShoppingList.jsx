import { useShopping } from '../context/ShoppingContext';
import { useNavigate } from 'react-router-dom';

export default function ShoppingList() {
  const { items, toggleItem, removeItem, clearChecked, clearAll } = useShopping();
  const navigate = useNavigate();

  const checkedCount = items.filter(i => i.checked).length;

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>🛒 Материалын Сагс</h1>
          <p>Хоол хийхэд хэрэгтэй бүх орцуудын жагсаалт</p>
        </div>
      </div>

      <section className="section" style={{ minHeight: '60vh' }}>
        <div className="container">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Таны сагс хоосон байна</h3>
              <p>Жор үзэх явцдаа "Сагсанд нэмэх" товчийг ашиглан материалаа цуглуулаарай.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/recipes')}
                style={{ marginTop: 'var(--space-lg)' }}
              >
                Жор харах
              </button>
            </div>
          ) : (
            <div className="shopping-container">
              <div className="shopping-header">
                <h3>{items.length} орц хадгалагдсан ({checkedCount} авсан)</h3>
                <div className="shopping-actions">
                  <button className="btn btn-sm btn-secondary" onClick={clearChecked}>
                    Авснуудыг арилгах
                  </button>
                  <button className="btn btn-sm btn-accent" onClick={clearAll}>
                    Бүгдийг устгах
                  </button>
                </div>
              </div>

              <div className="shopping-list">
                {items.map((item) => (
                  <div key={item.id} className={`shopping-item ${item.checked ? 'checked' : ''}`}>
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={item.checked} 
                        onChange={() => toggleItem(item.id)}
                      />
                      <span className="checkmark"></span>
                      <span className="item-name">{item.name}</span>
                    </label>
                    <button className="remove-item" onClick={() => removeItem(item.id)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
