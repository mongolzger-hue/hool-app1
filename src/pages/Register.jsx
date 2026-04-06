import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Нууц үг зөрүүтэй байна!');
      return;
    }
    if (register(email, password)) {
      navigate('/profile');
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
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Имэйл хаяг</label>
              <input 
                type="email" 
                placeholder="example@mail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
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
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Бүртгүүлэх
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
