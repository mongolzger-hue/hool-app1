import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Нэвтрэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <h2>Нэвтрэх</h2>
            <p>Хоолны дэглэмээ хянахын тулд нэвтэрнэ үү</p>
          </div>

          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Имэйл хаяг</label>
              <input 
                type="email" 
                placeholder="example@mail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                data-testid="login-email"
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
                data-testid="login-password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading} data-testid="login-submit">
              {loading ? 'Уншиж байна...' : 'Нэвтрэх'}
            </button>
          </form>
          <div className="auth-footer">
            Хэрэглэгч болоогүй юу? <Link to="/register">Бүртгүүлэх</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
