import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PaymentModal({ isOpen, onClose, planName, price }) {
  const [step, setStep] = useState('info'); // info, processing, success
  const { user, setPremium } = useAuth();

  // Bank Details - User can change these placeholders
  const bankDetails = {
    bankName: "Хаан Банк", 
    accountNumber: "5779326522",
    iban: "MN43230005005779326522", // Хаан Банкны IBAN формат руу шилжүүлж орууллаа
    accountName: "Nyambayar",
    description: user ? `${user.phone || user.name} - ${planName}` : "Ortskhon Subscription"
  };

  useEffect(() => {
    if (step === 'processing') {
      const timer = setTimeout(() => {
        setStep('success');
        setPremium(true);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [step, setPremium]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="payment-modal modal-content card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="payment-header">
          <div className="payment-icon">💳</div>
          <h3>Төлбөр Шилжүүлэх</h3>
        </div>

        <div className="payment-body">
          {step === 'info' && (
            <>
              <div className="plan-summary">
                <p>Та <strong>{planName}</strong> багцыг сонгосон байна.</p>
                <div className="price-tag">{price}</div>
              </div>

              <div className="bank-info-card">
                <div className="info-row">
                  <span>Банк:</span>
                  <strong>{bankDetails.bankName}</strong>
                </div>
                <div className="info-row">
                  <span>Дансны дугаар:</span>
                  <strong className="copyable">{bankDetails.accountNumber}</strong>
                </div>
                <div className="info-row">
                  <span>IBAN:</span>
                  <strong className="copyable">{bankDetails.iban}</strong>
                </div>
                <div className="info-row">
                  <span>Хүлээн авагч:</span>
                  <strong>{bankDetails.accountName}</strong>
                </div>
                <div className="info-row">
                  <span>Гүйлгээний утга:</span>
                  <strong className="accent-text">{bankDetails.description}</strong>
                </div>
              </div>
              
              <div className="qr-section">
                <p className="qr-title">Эсвэл QR уншуулна уу:</p>
                <div className="qr-box">
                  {/* Placeholder for Social Pay / Bank QR */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BANK_TRANSFER_DEMO" alt="QR Code" />
                  <div className="qr-badge">Social Pay / QR</div>
                </div>
              </div>

              <div className="payment-notice">
                ⚠️ Гүйлгээний утга дээр <strong>өөрийн нэр эсвэл утсаа</strong> заавал бичээрэй.
              </div>

              <button className="btn btn-primary btn-block" onClick={() => setStep('processing')}>
                Төлбөр төлсөн
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="processing-state">
              <div className="spinner"></div>
              <h3>Төлбөр шалгаж байна...</h3>
              <p>Та түр хүлээнэ үү. Бид таны шилжүүлгийг шалгаж байна.</p>
              <p className="sim-hint">(Энэ хэсэг нь Demo систем тул 3 секундын дараа автоматаар батлагдана)</p>
            </div>
          )}

          {step === 'success' && (
            <div className="success-state">
              <div className="success-icon">✨</div>
              <h3>Баяр хүргэе!</h3>
              <p>Таны <strong>{planName}</strong> эрх амжилттай идэвхжлээ. Одоо та бүх боломжийг ашиглах боломжтой.</p>
              <button className="btn btn-primary btn-block" onClick={onClose}>
                Ашиглаж эхлэх
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
