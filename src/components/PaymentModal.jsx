import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function PaymentModal({ isOpen, onClose, planName, price }) {
  const [step, setStep] = useState('info'); // info, processing, success
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const bankDetails = {
    bankName: "Хаан Банк", 
    accountNumber: "5779326522",
    iban: "23000500 5779326522", 
    accountName: "Nyambayar",
    description: user ? `${user.phone || user.name || user.email?.split('@')[0] || 'User'} - ${planName}` : "Ortskhon Subscription"
  };

  const handleConfirmPayment = async () => {
    if (!user) return;
    
    setStep('processing');
    setError(null);

    try {
      // Create a claim in the database
      const { error: claimError } = await supabase
        .from('payment_claims')
        .insert({
          user_id: user.id,
          user_email: user.email,
          user_phone: user.phone,
          plan_name: planName,
          price: price
        });

      if (claimError) throw claimError;

      // Set to success (which is now "pending verification" in UI)
      setStep('success');
    } catch (err) {
      console.error('Error submitting payment claim:', err);
      setError(`Алдаа: ${err.message || 'Хүсэлт илгээж чадсангүй.'} (SQL хүснэгт үүссэн эсэхийг шалгана уу)`);
      setStep('info');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="payment-modal modal-content card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="payment-header">
          <div className="payment-icon">💳</div>
          <h3>Төлбөр Шилжүүлэх Заавар</h3>
        </div>

        <div className="payment-body">
          {step === 'info' && (
            <>
              <div className="plan-summary">
                <p>Таны сонгосон <strong>{planName}</strong> багц</p>
                <div className="price-tag">{price}</div>
              </div>

              <div className="bank-info-card highlighted">
                <div className="info-row">
                  <span>Банк:</span>
                  <strong>{bankDetails.bankName}</strong>
                </div>
                <div className="info-row">
                  <span>Дансны дугаар:</span>
                  <strong className="copyable highlight">{bankDetails.accountNumber}</strong>
                </div>
                <div className="info-row">
                  <span>IBAN:</span>
                  <strong className="copyable">{bankDetails.iban}</strong>
                </div>
                <div className="info-row">
                  <span>Хүлээн авагч:</span>
                  <strong>{bankDetails.accountName}</strong>
                </div>
                <div className="info-row description-row">
                  <span>Гүйлгээний утга (ЧУХАЛ!):</span>
                  <strong className="accent-text highlight">{bankDetails.description}</strong>
                </div>
              </div>

              <div className="payment-guide">
                <div className="guide-step">
                  <div className="step-num">1</div>
                  <div className="step-text">Дээрх данс руу <strong>{price}</strong>-ийг шилжүүлнэ үү.</div>
                </div>
                <div className="guide-step">
                  <div className="step-num">2</div>
                  <div className="step-text">Гүйлгээний утга дээр <strong>{bankDetails.description}</strong>-г заавал бичнэ.</div>
                </div>
                <div className="guide-step">
                  <div className="step-num">3</div>
                  <div className="step-text">Шилжүүлэг дууссаны дараа доорх товчийг дарж хүсэлтээ илгээнэ үү.</div>
                </div>
              </div>

              {error && <div className="alert alert-error">{error}</div>}

              <button className="btn btn-primary btn-block" onClick={handleConfirmPayment}>
                Төлбөр төлсөн, мэдэгдэх
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="processing-state">
              <div className="spinner"></div>
              <h3>Хүсэлт илгээж байна...</h3>
              <p>Төлбөрийн мэдээллийг хянахаар илгээж байна.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="success-state">
              <div className="success-icon notice">📡</div>
              <h3>Хүсэлт бүртгэгдлээ!</h3>
              <p>Таны төлбөрийн мэдээлэл системд амжилттай бүртгэгдлээ.</p>
              <div className="success-info-box">
                 <p>Админ таны гүйлгээг шалгаад <strong>4-5 минутын дотор</strong> таны Премиум эрхийг идэвхжүүлэх болно.</p>
                 <small>Түр хүлээнэ үү, баярлалаа!</small>
              </div>
              <button className="btn btn-primary btn-block" onClick={onClose}>
                Ойлголоо
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
