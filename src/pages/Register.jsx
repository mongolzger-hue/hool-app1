import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Нууц үг зөрүүтэй байна!');
      return;
    }

    if (phone.length < 8) {
      setError('Утасны дугаар дор хаяж 8 оронтой байх ёстой!');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await register(email, password, fullName, phone);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Бүртгүүлэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <h2>Бүртгүүлэх</h2>
            <p>Өөрийн эрүүл амьдралын хэв маягийг өнөөдөр эхлүүл</p>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Бүтэн нэр</label>
              <input 
                type="text" 
                placeholder="Таны нэр" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
                data-testid="register-name"
              />
            </div>
            <div className="form-group">
              <label>Утасны дугаар</label>
              <input 
                type="tel" 
                placeholder="Утасны дугаар" 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={8}
                required 
                data-testid="register-phone"
              />
            </div>
            <div className="form-group">
              <label>Имэйл хаяг</label>
              <input 
                type="email" 
                placeholder="example@mail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                data-testid="register-email"
              />
            </div>
            <div className="form-group">
              <label>Нууц үг</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                data-testid="register-password"
              />
            </div>
            <div className="form-group">
              <label>Нууц үг давтах</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                data-testid="register-confirm-password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading} data-testid="register-submit">
              {loading ? 'Уншиж байна...' : 'Бүртгүүлэх'}
            </button>
          </form>
          <div className="auth-footer">
            Хэрэглэгч болчихсон уу? <Link to="/login">Нэвтрэх</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
