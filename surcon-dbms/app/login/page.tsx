'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, Server } from 'lucide-react';

const demoCredentials = [
  { role: 'Super Admin', email: 'admin@surcon.demo', password: 'password123' },
  { role: 'Registry Officer', email: 'registry@surcon.demo', password: 'password123' },
  { role: 'Exam Officer', email: 'exam@surcon.demo', password: 'password123' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function fillDemo(e: string, p: string) {
    setEmail(e);
    setPassword(p);
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const valid = demoCredentials.find((c) => c.email === email && c.password === password);
    if (!valid) {
      setError('Invalid credentials. Use one of the demo accounts below.');
      return;
    }
    setLoading(true);
    setTimeout(() => router.push('/dashboard'), 800);
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-green-900 p-12 text-white">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-green-900 font-black text-lg">S</span>
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">SURCON</p>
              <p className="text-green-300 text-xs">Surveyors Council of Nigeria</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold leading-snug mb-4">Database Management &amp; Examination Reporting System</h2>
          <p className="text-green-200 text-sm leading-relaxed">
            A centralized on-premise platform for managing surveyor records, certifications, examination data, and professional regulation across Nigeria.
          </p>
        </div>
        <div className="space-y-3">
          {['Role-based access control', 'Secure on-premise deployment', 'Examination result generation', 'CSV import & document management'].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-green-100">
              <Shield size={14} className="text-green-400" />
              {f}
            </div>
          ))}
          <div className="flex items-center gap-2 text-xs text-green-400 mt-4">
            <Server size={12} />
            Deployed on SURCON-SRV01 · Version 1.0.0
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">SURCON DBMS</p>
              <p className="text-gray-500 text-xs">Surveyors Council of Nigeria</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-8">Sign in to access the management portal</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email / Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@surcon.demo"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-green-700"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Demo Credentials</p>
            <div className="space-y-2">
              {demoCredentials.map((c) => (
                <button
                  key={c.email}
                  onClick={() => fillDemo(c.email, c.password)}
                  className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-colors group"
                >
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{c.role}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </div>
                  <span className="text-xs text-green-700 opacity-0 group-hover:opacity-100 transition-opacity">Use →</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Password for all accounts: <code className="bg-gray-200 px-1 rounded">password123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
