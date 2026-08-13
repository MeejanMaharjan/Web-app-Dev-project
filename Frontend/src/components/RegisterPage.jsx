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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="sparkle-hover flex items-center gap-2 font-display text-2xl mb-2">
            <Clapperboard className="h-7 w-7 stroke-[2.5] text-mdb-lime" />
            <span className="y2k-gradient-text">MOMENTDB</span>
          </div>
          <p className="text-mdb-taupe text-sm font-body">Create your account</p>
        </div>

        {/* Card */}
        <div className="y2k-panel p-8 text-mdb-cream">
          <h1 className="text-xl font-display mb-6">Join MomentDB</h1>

          {error && (
            <div className="y2k-border mb-4 p-3 bg-mdb-hotpink/20 text-mdb-yellow text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-display text-mdb-cyan mb-1.5">
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
                  className="y2k-border w-full pl-10 pr-4 py-2.5 text-sm bg-mdb-void text-mdb-cream placeholder-mdb-taupe/60 focus:outline-none transition-all font-body"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-display text-mdb-cyan mb-1.5">
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
                  className="y2k-border w-full pl-10 pr-4 py-2.5 text-sm bg-mdb-void text-mdb-cream placeholder-mdb-taupe/60 focus:outline-none transition-all font-body"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-display text-mdb-cyan mb-1.5">
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
                  className="y2k-border w-full pl-10 pr-10 py-2.5 text-sm bg-mdb-void text-mdb-cream placeholder-mdb-taupe/60 focus:outline-none transition-all font-body"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mdb-taupe hover:text-mdb-cyan transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-display text-mdb-cyan mb-1.5">
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
                  className={`y2k-border w-full pl-10 pr-10 py-2.5 text-sm bg-mdb-void text-mdb-cream placeholder-mdb-taupe/60 focus:outline-none transition-all font-body ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? '!border-mdb-hotpink'
                      : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mdb-taupe hover:text-mdb-cyan transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-mdb-hotpink font-body">Passwords don't match</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="y2k-btn w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed text-mdb-void font-display py-2.5 flex items-center justify-center gap-2 transition-all"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-mdb-void/30 border-t-mdb-void rounded-full animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-mdb-taupe font-body">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-mdb-lime hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
