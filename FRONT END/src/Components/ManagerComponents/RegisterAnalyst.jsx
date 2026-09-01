import React, { useState, useEffect } from 'react';
import { Shield, Users, FileText, BarChart3, LogOut, Menu, X, UserPlus, Check, AlertCircle, Mail, Lock, Building, User, Search, RefreshCw, AlertTriangle } from 'lucide-react';

function RegisterAnalyst() {
  const [currentPath, setCurrentPath] = useState('/analystDict');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [analysts, setAnalysts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchAnalysts();
  }, []);

  const fetchAnalysts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8082/api/analyst/all');
      if (response.ok) {
        const data = await response.json();
        setAnalysts(data);
      }
    } catch (error) {
      console.error('Error fetching analysts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.log('Session storage cleared');
    }
    window.location.href = '/';
  };

  const handleNavigation = (path) => {
    setCurrentPath(path);
    window.location.href = path;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:8082/api/analyst/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newAnalyst = await response.json();
        setMessage({ 
          type: 'success', 
          text: `Security Analyst ${newAnalyst.name} registered successfully!` 
        });
        setFormData({ name: '', email: '', password: '', department: '' });
        setShowForm(false);
        // Add new analyst to the list in real-time
        setAnalysts([newAnalyst, ...analysts]);
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        const errorText = await response.text();
        setMessage({ 
          type: 'error', 
          text: errorText || 'Registration failed. Please try again.' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAnalysts = analysts.filter(analyst => 
    analyst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    analyst.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (analyst.department && analyst.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const navItems = [
    { name: 'Home', path: '/managerDB', icon: Shield },
    { name: 'Employees', path: '/empDict', icon: Users },
    { name: 'Analysts', path: '/analystDict', icon: Users },
    { name: 'Logs', path: '/mngLogs', icon: FileText },
    { name: 'Analytics', path: '/mngAnalytics', icon: BarChart3 },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isScrolled ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-white/20'
              }`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  AI Threat Monitoring
                </span>
                <span className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}>
                  Manager Portal
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? isScrolled
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-2 ${
                  isScrolled
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-violet-100 text-violet-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                <AlertTriangle className="w-10 h-10 text-blue-600" />
                Security Analyst Directory
              </h1>
              <p className="text-gray-600 mt-2">Manage and view all registered security analysts</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              <UserPlus className="w-5 h-5" />
              {showForm ? 'Cancel' : 'Add Analyst'}
            </button>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 shadow-lg ${
              message.type === 'success' 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-2 border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-2 border-red-200'
            } animate-fade-in`}>
              {message.type === 'success' ? (
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="flex-1">
                <span className="font-bold text-lg">{message.text}</span>
              </div>
              <button
                onClick={() => setMessage({ type: '', text: '' })}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Registration Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-2 border-blue-100 animate-fade-in">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Register New Security Analyst</h2>
                  <p className="text-sm text-gray-500">Add a new analyst to the threat monitoring team</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Security Operations"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Register Analyst
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: '', email: '', password: '', department: '' });
                      setMessage({ type: '', text: '' });
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or department..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Analyst List */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Security Analysts</h2>
                  <p className="text-sm text-gray-500">{filteredAnalysts.length} analysts registered</p>
                </div>
              </div>
              <button
                onClick={fetchAnalysts}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {loading && !showForm ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading analysts...</p>
              </div>
            ) : filteredAnalysts.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-semibold">No analysts found</p>
                <p className="text-gray-400 text-sm mt-2">Start by adding a new security analyst</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnalysts.map((analyst, index) => (
                  <div
                    key={analyst.email}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all transform hover:-translate-y-1 hover:border-blue-400"
                    style={{ 
                      animation: 'fadeIn 0.5s ease-in',
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-blue-600 border-2 border-blue-300 shadow-sm">
                        {analyst.department || 'N/A'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{analyst.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm truncate">{analyst.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default RegisterAnalyst;