import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clapperboard, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../api/AuthApi';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await loginUser(formData);
      const user = response.data.data;
      onLogin(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mdb-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tight text-mdb-green mb-2">
            <Clapperboard className="h-7 w-7 stroke-[2.5]" />
            <span>MOMENT<span className="text-mdb-blue">DB</span></span>
          </div>
          <p className="text-mdb-blue/60 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-mdb-taupe/20 p-8">
          <h1 className="text-xl font-black text-mdb-blue mb-6">Welcome back</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-mdb-blue/70 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mdb-taupe" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-mdb-taupe/40 rounded-lg text-sm text-mdb-blue placeholder-mdb-taupe/60 focus:outline-none focus:border-mdb-green focus:ring-1 focus:ring-mdb-green/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-mdb-blue/70 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mdb-taupe" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-mdb-taupe/40 rounded-lg text-sm text-mdb-blue placeholder-mdb-taupe/60 focus:outline-none focus:border-mdb-green focus:ring-1 focus:ring-mdb-green/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mdb-taupe hover:text-mdb-blue transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-mdb-blue hover:bg-mdb-blue/90 disabled:opacity-60 disabled:cursor-not-allowed text-mdb-cream font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-mdb-cream/30 border-t-mdb-cream rounded-full animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-mdb-blue/60">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-mdb-green hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
