import React, { useState, useEffect } from 'react';
import { Shield, Users, FileText, BarChart3, LogOut, Menu, X, Activity, TrendingUp, Zap, Bell, Lock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ManagerDashboard() {
  const [currentPath, setCurrentPath] = useState('/managerDB');
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
    setCurrentPath('/');
  };

  const handleNavigation = (path) => {
    setCurrentPath(path);
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', path: '/managerDB', icon: Shield },
    { name: 'Employees', path: '/empDict', icon: Users },
    { name: 'Analysts', path: '/analystDict', icon: Users },
    { name: 'Logs', path: '/mngLogs', icon: FileText },
    { name: 'Analytics', path: '/mngAnalytics', icon: BarChart3 },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isScrolled ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-white/20'
              }`}>
                <img src='Logo.png' className="w-8 h-8 text-white" style={{borderRadius:"15px"}} />
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

            {/* Desktop Navigation */}
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

      {/* Hero Section */}
      <div 
        className="relative pt-16 min-h-screen flex items-center"
        style={{
          backgroundImage: 'url(src/Components/Images/Img1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-purple-600/90 to-pink-600/90"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Activity className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Real-Time Security Management</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to Manager
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Control Center
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Multi-agent AI system delivering 93.6% threat detection accuracy with intelligent cross-domain correlation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => handleNavigation('/empDict')}
                className="px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl hover:scale-105"
              >
                Manage Users
              </button>
              <button
                onClick={() => handleNavigation('/mngAnalytics')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30 hover:scale-105"
              >
                View Dashboard
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: '93.6%', label: 'Detection Accuracy', icon: TrendingUp },
                { value: '87%', label: 'Correlation Rate', icon: Zap },
                { value: '41.3%', label: 'FP Reduction', icon: Shield },
                { value: '3', label: 'Active Agents', icon: Activity }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Management Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to secure your organization in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'User Management',
                description: 'Register, manage, and control employee and analyst accounts with ease',
                gradient: 'from-violet-400 to-purple-500'
              },
              {
                icon: Lock,
                title: 'Access Control',
                description: 'Block or suspend accounts instantly when threats are detected',
                gradient: 'from-purple-400 to-pink-500'
              },
              {
                icon: Eye,
                title: 'Live Monitoring',
                description: 'Real-time visibility into all security events and system activities',
                gradient: 'from-pink-400 to-rose-500'
              },
              {
                icon: BarChart3,
                title: 'Analytics',
                description: 'Comprehensive insights into threats, patterns, and performance',
                gradient: 'from-blue-400 to-cyan-500'
              },
              {
                icon: Bell,
                title: 'Smart Alerts',
                description: 'Intelligent notifications for critical security events',
                gradient: 'from-cyan-400 to-teal-500'
              },
              {
                icon: FileText,
                title: 'Audit Logs',
                description: 'Complete trail of all actions and security events for compliance',
                gradient: 'from-teal-400 to-green-500'
              }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Agent System */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Multi-Agent Detection System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three specialized AI agents collaborate to detect and correlate threats across all domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Email Verification',
                description: 'Detects phishing, spear-phishing, and malicious email content using NLP',
                color: 'violet',
                emoji: '📧'
              },
              {
                title: 'Log Analysis',
                description: 'Monitors system logs for anomalies, intrusions, and suspicious behavior',
                color: 'purple',
                emoji: '📊'
              },
              {
                title: 'IP Scanning',
                description: 'Analyzes network traffic and identifies malicious IP connections',
                color: 'pink',
                emoji: '🌐'
              }
            ].map((agent, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-${agent.color}-50 to-${agent.color}-100 rounded-2xl p-8 border border-${agent.color}-200`}>
                <div className="text-5xl mb-4">{agent.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{agent.title}</h3>
                <p className="text-gray-700">{agent.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-10 text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Contextual Recommendation Engine</h3>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              LLM-powered system that cross-analyzes all agent outputs to detect sophisticated multi-vector attacks, time-based patterns, and stealth threats
            </p>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Detection Performance</h3>
              <div className="space-y-6">
                {[
                  { label: 'Overall Accuracy', value: 93.6, color: 'violet' },
                  { label: 'Agent Correlation', value: 87, color: 'purple' },
                  { label: 'False Positive Reduction', value: 41.3, color: 'pink' }
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{metric.label}</span>
                      <span className="font-bold text-gray-900">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 h-3 rounded-full transition-all duration-1000`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Tested on CIC-IDS 2017, SpamAssassin, and custom datasets
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Capabilities</h3>
              <div className="space-y-4">
                {[
                  'Register and manage all user accounts',
                  'Control access and permissions',
                  'Block compromised accounts instantly',
                  'Monitor real-time security events',
                  'Access comprehensive audit logs',
                  'Generate detailed security reports'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;