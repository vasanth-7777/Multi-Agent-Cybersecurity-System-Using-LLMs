import React, { useState, useEffect } from 'react';
import { Shield, Mail, FileText, Bell, LogOut, Menu, X, Activity, CheckCircle, AlertTriangle, Lock, Eye, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const [currentPath, setCurrentPath] = useState('/employeeDB');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.log('Session storage cleared');
    }
    navigate('/');
  };
  
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Dashboard', path: '/employeeDB', icon: Shield },
    { name: 'My Emails', path: '/empEmails', icon: Mail },
    { name: 'Activity Logs', path: '/empLogs', icon: FileText },
    { name: 'Alerts', path: '/empAlerts', icon: Bell },
    { name: 'Profile', path: '/empProfile', icon: User },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isScrolled ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-white/20'
              }`}>
                <img src='Logo.png' className="w-8 h-8 text-white" style={{borderRadius:"15px"}} />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  AI Threat Monitoring
                </span>
                <span className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}>
                  Employee Portal
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? isScrolled
                        ? 'bg-emerald-100 text-emerald-700'
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

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-emerald-100 text-emerald-700'
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

      {/* Hero Section */}
      <div className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <Activity className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Protected by AI-Powered Security</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Stay Secure,
              <span className="block mt-2 bg-gradient-to-r from-yellow-200 to-emerald-200 bg-clip-text text-transparent">
                Stay Productive
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Your activities are continuously monitored and protected by our advanced multi-agent threat detection system
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => handleNavigation('/empEmails')}
                className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl hover:scale-105"
              >
                Check My Emails
              </button>
              <button
                onClick={() => handleNavigation('/empAlerts')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30 hover:scale-105"
              >
                View Alerts
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: '24/7', label: 'Active Protection', icon: Shield },
                { value: '0', label: 'Threats Detected', icon: AlertTriangle },
                { value: '156', label: 'Emails Scanned', icon: Mail },
                { value: 'Safe', label: 'Current Status', icon: CheckCircle }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform">
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How We Protect You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multi-layer AI security monitoring your every interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: 'Email Protection',
                description: 'Every email you receive is automatically scanned for phishing attempts, malicious links, and suspicious attachments',
                gradient: 'from-emerald-400 to-teal-500',
                step: '01'
              },
              {
                icon: Eye,
                title: 'Activity Monitoring',
                description: 'Your system activities are analyzed in real-time to detect unusual behavior or potential security threats',
                gradient: 'from-teal-400 to-cyan-500',
                step: '02'
              },
              {
                icon: Bell,
                title: 'Instant Alerts',
                description: 'Receive immediate notifications when suspicious activity is detected, allowing quick response to threats',
                gradient: 'from-cyan-400 to-blue-500',
                step: '03'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {item.step}
                </div>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Employee Security Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed about your security status and take control
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Mail,
                title: 'Email Safety Center',
                description: 'View all your emails with clear safety indicators. See which emails were flagged and why.',
                features: ['Phishing detection', 'Link verification', 'Attachment scanning'],
                color: 'emerald'
              },
              {
                icon: FileText,
                title: 'Activity Timeline',
                description: 'Track all your system activities and login attempts with detailed timestamps.',
                features: ['Login history', 'File access logs', 'System actions'],
                color: 'teal'
              },
              {
                icon: Bell,
                title: 'Smart Notifications',
                description: 'Get real-time alerts about security events that require your attention.',
                features: ['Threat alerts', 'Suspicious activity', 'Security tips'],
                color: 'cyan'
              },
              {
                icon: Lock,
                title: 'Account Security',
                description: 'Manage your security settings and view recommendations to improve protection.',
                features: ['Password strength', 'Security score', 'Best practices'],
                color: 'blue'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className={`w-5 h-5 text-${feature.color}-500 flex-shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Vigilant, Stay Safe</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              While our AI monitors your activities 24/7, you play a crucial role in maintaining security. Always verify suspicious emails, use strong passwords, and report anything unusual.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { title: 'Think Before You Click', desc: 'Verify links before clicking' },
                { title: 'Report Suspicious Emails', desc: 'Help us improve detection' },
                { title: 'Keep Software Updated', desc: 'Always use latest versions' }
              ].map((tip, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-white/80 text-sm">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-xl text-gray-600">Access your most-used features instantly</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'My Emails', path: '/empEmails', icon: Mail, color: 'emerald' },
              { label: 'View Logs', path: '/empLogs', icon: FileText, color: 'teal' },
              { label: 'Alerts', path: '/empAlerts', icon: Bell, color: 'cyan' },
              { label: 'Profile', path: '/empProfile', icon: User, color: 'blue' }
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(action.path)}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:scale-105`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${action.color}-400 to-${action.color}-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-gray-900">{action.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;