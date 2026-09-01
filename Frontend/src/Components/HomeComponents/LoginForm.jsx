import React, { useState } from 'react';
import { Shield, UserCog, Users, AlertTriangle, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

function LoginForm() {
  const [activeTab, setActiveTab] = useState('manager');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tabs = [
    { 
      id: 'manager', 
      label: 'Manager', 
      icon: Shield, 
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-600',
      description: 'Full system access and control'
    },
    { 
      id: 'analyst', 
      label: 'Analyst', 
      icon: UserCog, 
      color: 'bg-violet-500',
      lightBg: 'bg-violet-50',
      border: 'border-violet-500',
      text: 'text-violet-600',
      description: 'Data insights and reporting'
    },
    { 
      id: 'employee', 
      label: 'Employee', 
      icon: Users, 
      color: 'bg-teal-500',
      lightBg: 'bg-teal-50',
      border: 'border-teal-500',
      text: 'text-teal-600',
      description: 'Employee portal access'
    },
    { 
      id: 'attacker', 
      label: 'Attacker', 
      icon: AlertTriangle, 
      color: 'bg-rose-500',
      lightBg: 'bg-rose-50',
      border: 'border-rose-500',
      text: 'text-rose-600',
      description: 'Security testing mode'
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'manager') {
        if (email === 'manager@gmail.com' && password === '123') {
          window.location.href = '/managerDB';
        } else {
          setError('Invalid manager credentials');
        }
      } else if (activeTab === 'attacker') {
        if (email === 'attacker@gmail.com' && password === '123') {
          window.location.href = '/attackerDb';
        } else {
          setError('Invalid attacker credentials');
        }
      } else if (activeTab === 'employee') {
        const response = await fetch('http://localhost:8082/api/emp/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
          sessionStorage.setItem("employeeEmail", email);
          const data = await response.json();
          alert("Login Successfull!");
          window.location.href = '/employeeDB';
        } else {
          setError('Invalid employee credentials');
        }
      } else if (activeTab === 'analyst') {
        const response = await fetch('http://localhost:8082/api/analyst/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
          sessionStorage.setItem("analystEmail", email);
           alert("Login Successfull!");
          const data = await response.json();
          window.location.href = '/analystDB';
        } else {
          setError('Invalid analyst credentials');
        }
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                <Lock className="w-16 h-16 text-purple-600" />
              </div>
              <h1 className="text-6xl font-black text-gray-800 leading-tight">
                Welcome to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                  AI Threat Monitoring System
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Multi-role authentication system designed for enterprise security and seamless access management.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Role-Based Access</h3>
                  <p className="text-gray-600 text-sm">Secure authentication for different user roles with custom permissions</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Enterprise Security</h3>
                  <p className="text-gray-600 text-sm">Bank-grade encryption and security protocols protect your data</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-100">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Seamless Integration</h3>
                  <p className="text-gray-600 text-sm">Connect with your existing systems through our robust API</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Logged In</h2>
                <p className="text-gray-500">Select your role and enter credentials</p>
              </div>

              {/* Tabs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setError('');
                        setEmail('');
                        setPassword('');
                      }}
                      className={`relative p-5 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? `${currentTab.color} text-white shadow-xl`
                          : `${tab.lightBg} border-2 ${tab.border} border-opacity-20 hover:border-opacity-40`
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Icon className={`w-8 h-8 ${isActive ? 'text-white' : tab.text}`} />
                        <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>
                          {tab.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Role Description */}
              <div className={`${currentTab.lightBg} rounded-xl p-4 mb-6 border-l-4 ${currentTab.border}`}>
                <div className="flex items-center gap-3">
                  {React.createElement(currentTab.icon, { className: `w-5 h-5 ${currentTab.text}` })}
                  <p className={`font-semibold ${currentTab.text}`}>{currentTab.description}</p>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <p className="text-red-700 font-semibold text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : `${currentTab.color} hover:shadow-xl`
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In as {currentTab.label}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;