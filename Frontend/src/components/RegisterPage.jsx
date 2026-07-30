import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clapperboard, Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../api/AuthApi';

export default function RegisterPage({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const { confirmPassword, ...payload } = formData;
      const response = await registerUser(payload);
      const user = response.data.data;
      onLogin(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mdb-cream flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tight text-mdb-green mb-2">
            <Clapperboard className="h-7 w-7 stroke-[2.5]" />
            <span>MOMENT<span className="text-mdb-blue">DB</span></span>
          </div>
          <p className="text-mdb-blue/60 text-sm">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-mdb-taupe/20 p-8">
          <h1 className="text-xl font-black text-mdb-blue mb-6">Join MomentDB</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-mdb-blue/70 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mdb-taupe" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2.5 border border-mdb-taupe/40 rounded-lg text-sm text-mdb-blue placeholder-mdb-taupe/60 focus:outline-none focus:border-mdb-green focus:ring-1 focus:ring-mdb-green/30 transition-all"
                />
              </div>
            </div>

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
                  minLength={6}
                  placeholder="At least 6 characters"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-mdb-blue/70 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mdb-taupe" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat your password"
                  className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm text-mdb-blue placeholder-mdb-taupe/60 focus:outline-none focus:ring-1 transition-all ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                      : 'border-mdb-taupe/40 focus:border-mdb-green focus:ring-mdb-green/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mdb-taupe hover:text-mdb-blue transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-mdb-green hover:bg-mdb-green/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-mdb-blue/60">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-mdb-blue hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
