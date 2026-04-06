import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';

const plans = [
  {
    name: 'Үнэгүй',
    icon: '🌱',
    price: '₮0',
    period: 'Үүрд',
    featured: false,
    features: [
      { text: '3 хоолны жор үзэх', enabled: true },
      { text: 'YouTube бичлэг үзэх', enabled: true },
      { text: '1 хоногийн дэглэм', enabled: true },
      { text: 'Зургаар жор олох', enabled: false },
      { text: '7 хоногийн дэглэм', enabled: false },
      { text: 'Калори тооцоолуур', enabled: false },
      { text: 'Хувийн зөвлөгөө', enabled: false },
    ],
  },
  {
    name: 'Стандарт',
    icon: '⭐',
    price: '₮9,900',
    period: '/ сар',
    featured: true,
    popular: 'Хамгийн их сонгодог',
    features: [
      { text: 'Бүх хоолны жор үзэх', enabled: true },
      { text: 'YouTube бичлэг үзэх', enabled: true },
      { text: '7 хоногийн дэглэм', enabled: true },
      { text: 'Зургаар жор олох (AI)', enabled: true },
      { text: 'Калори тооцоолуур', enabled: true },
      { text: 'Хувийн зөвлөгөө', enabled: false },
      { text: '24/7 Дэмжлэг', enabled: false },
    ],
  },
  {
    name: 'Премиум',
    icon: '👑',
    price: '₮19,900',
    period: '/ сар',
    featured: false,
    features: [
      { text: 'Бүх хоолны жор үзэх', enabled: true },
      { text: 'YouTube бичлэг үзэх', enabled: true },
      { text: '7 хоногийн дэглэм', enabled: true },
      { text: 'Зургаар жор олох (AI)', enabled: true },
      { text: 'Калори тооцоолуур', enabled: true },
      { text: 'Хувийн зөвлөгөө', enabled: true },
      { text: '24/7 Дэмжлэг', enabled: true },
    ],
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBuy = (plan) => {
    if (!user) {
      navigate('/login', { state: { from: '/pricing' } });
      return;
    }
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>💳 Багц & Үнэ</h1>
          <p>Өөрт тохирох багцаа сонгоорой</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card ${plan.featured ? 'featured' : ''}`}
              >
                {plan.popular && (
                  <div className="pricing-popular">{plan.popular}</div>
                )}
                <div className="pricing-icon">{plan.icon}</div>
                <h3 className="pricing-name">{plan.name}</h3>
                <div className="pricing-price">{plan.price}</div>
                <div className="pricing-period">{plan.period}</div>
                <div className="pricing-features">
                  {plan.features.map((f, i) => (
                    <div
                      key={i}
                      className={`pricing-feature ${!f.enabled ? 'disabled' : ''}`}
                    >
                      <span className="pricing-feature-icon">
                        {f.enabled ? '✓' : '✕'}
                      </span>
                      {f.text}
                    </div>
                  ))}
                </div>
                {plan.price === '₮0' ? (
                  <Link to="/meal-plan" className="btn btn-secondary" style={{ width: '100%' }}>
                    Үнэгүй эхлэх
                  </Link>
                ) : user?.isPremium ? (
                  <button className="btn btn-outline disabled" style={{ width: '100%', opacity: 0.7 }}>
                    Идэвхтэй байна
                  </button>
                ) : (
                  <button
                    className={`btn ${plan.featured ? 'btn-primary' : 'btn-accent'}`}
                    style={{ width: '100%' }}
                    onClick={() => handleBuy(plan)}
                  >
                    Худалдаж авах
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        planName={selectedPlan?.name}
        price={selectedPlan?.price}
      />
    </>
  );
}
