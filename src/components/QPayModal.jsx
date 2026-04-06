import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function QPayModal({ isOpen, onClose, planName, price }) {
  const [step, setStep] = useState('qr'); // qr, processing, success
  const { setPremium } = useAuth();

  useEffect(() => {
    if (step === 'processing') {
      const timer = setTimeout(() => {
        setStep('success');
        setPremium(true);
      }, 5000); // 5 second simulation as discussed
      return () => clearTimeout(timer);
    }
  }, [step, setPremium]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="qpay-modal modal-content card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="qpay-header">
          <img src="https://qpay.mn/logo.png" alt="QPay" className="qpay-logo" />
          <h3>Төлбөр Төлөх</h3>
        </div>

        <div className="qpay-body">
          {step === 'qr' && (
            <>
              <div className="order-info">
                <div className="info-row">
                  <span>Багц:</span>
                  <strong>{planName}</strong>
                </div>
                <div className="info-row">
                  <span>Төлөх дүн:</span>
                  <strong>{price}</strong>
                </div>
              </div>
              
              <div className="qr-container">
                <div className="qr-placeholder">
                  {/* Real QPay QR would go here */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QPay_Simulation_Success" alt="QR Code" />
                  <div className="qr-overlay-logo">Q</div>
                </div>
                <p className="qr-hint">Банкны аппликейшнаараа уншуулна уу</p>
              </div>

              <div className="bank-icons">
                <span>🏦 Хаан банк</span>
                <span>🏦 Голомт банк</span>
                <span>🏦 ХХБ</span>
              </div>

              <button className="btn btn-primary btn-block" onClick={() => setStep('processing')}>
                Төлбөр шалгах
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="processing-state">
              <div className="spinner"></div>
              <h3>Төлбөр хүлээж байна...</h3>
              <p>Та банкны апп-аараа төлбөрөө баталгаажуулна уу.</p>
              <p className="sim-hint">(Simulation: 5 секундын дараа автоматаар батлагдана)</p>
            </div>
          )}

          {step === 'success' && (
            <div className="success-state">
              <div className="success-icon">🎉</div>
              <h3>Баяр хүргэе!</h3>
              <p>Таны Premium эрх амжилттай идэвхжлээ.</p>
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
