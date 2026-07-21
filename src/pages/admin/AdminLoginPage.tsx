import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { FormError } from '../../components/ui/FormError';
import { Eye, EyeOff, Wrench } from 'lucide-react';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, isAuthenticated, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || '/admin';
  if (!from.startsWith('/admin')) {
    from = '/admin';
  }

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isAuthLoading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Vui lòng nhập email.');
      return;
    }
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email không đúng định dạng.');
      return;
    }

    if (!password) {
      setError('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      // Navigation is handled by the useEffect above when isAuthenticated becomes true
    } catch (err: any) {
      console.warn('Login error:', err);
      setPassword(''); // Clear password on error
      
      // Map Firebase errors to Vietnamese, avoiding exposing technical details
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Email hoặc mật khẩu không chính xác.');
          break;
        case 'auth/too-many-requests':
          setError('Tài khoản bị tạm khóa do đăng nhập sai nhiều lần. Vui lòng thử lại sau.');
          break;
        default:
          setError('Đã có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Prevent flashing login form if already authenticated
  if (isAuthenticated) {
    return null; 
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-md w-full space-y-8 bg-surface-muted/30 p-8 rounded-xl border border-border/50 shadow-sm">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Wrench size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Đăng nhập quản trị</h2>
          <p className="mt-2 text-sm text-text-accent">
            Điện lạnh Gia Định
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <FormError error={error} className="text-center bg-error/10 p-3 rounded-md" />}
          
          <div className="space-y-4">
            <Input
              label="Email"
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="admin@dienlanhgiadinh.com"
            />
            
            <Input
              label="Mật khẩu"
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              iconRight={
                <button
                  type="button"
                  className="pointer-events-auto text-text-accent hover:text-text-primary p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-primary hover:text-primary-dark transition-colors">
              &larr; Trở về trang chủ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
