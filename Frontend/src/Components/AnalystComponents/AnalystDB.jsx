import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, BarChart3, LogOut, Menu, X, Activity, Eye, FileText, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AnalystDashboard() {
  const [currentPath, setCurrentPath] = useState('/analystDB');
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
    { name: 'Dashboard', path: '/analystDB', icon: Shield },
    { name: 'Investigate', path: '/analystInvestigate', icon: Search },
    { name: 'Reports', path: '/analystReports', icon: FileText },
    { name: 'Analytics', path: '/analystAnalytics', icon: BarChart3 },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isScrolled ? 'bg-gradient-to-br from-indigo-600 to-blue-600' : 'bg-white/20'
              }`}>
                <img src='Logo.png' className="w-8 h-8 text-white" style={{borderRadius:"15px"}} />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  AI Threat Monitoring
                </span>
                <span className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}>
                  Security Analyst Portal
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
                        ? 'bg-indigo-100 text-indigo-700'
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
                      ? 'bg-indigo-100 text-indigo-700'
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
        className="relative pt-16 min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(79, 70, 229, 0.9), rgba(37, 99, 235, 0.9), rgba(14, 165, 233, 0.9)), url(src/Components/Images/Img4.png)',
        }}
      >
        {/* Tech grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <Activity className="w-4 h-4 text-white animate-pulse" />
              <span className="text-white text-sm font-medium">Real-Time Threat Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Security Operations
              <span className="block mt-2 bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Command Center
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Analyze threats, investigate alerts, and respond to security incidents with AI-powered insights and correlation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => handleNavigation('/analystAlerts')}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl hover:scale-105"
              >
                View Active Alerts
              </button>
              <button
                onClick={() => handleNavigation('/analystInvestigate')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30 hover:scale-105"
              >
                Start Investigation
              </button>
            </div>

            {/* Real-time Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: '12', label: 'Active Alerts', icon: AlertTriangle },
                { value: '93.6%', label: 'Detection Rate', icon: TrendingUp },
                { value: '87%', label: 'Correlation', icon: Zap },
                { value: '24/7', label: 'Monitoring', icon: Eye }
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

      {/* Core Functions */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Core Responsibilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Essential functions for effective security operations and incident response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: 'Alert Triage',
                description: 'Review and prioritize security alerts from all three AI agents. Determine severity and assign response actions.',
                gradient: 'from-red-400 to-orange-500',
                step: '01'
              },
              {
                icon: Search,
                title: 'Threat Investigation',
                description: 'Deep-dive into suspicious activities with AI-powered explanations and chain-of-thought reasoning.',
                gradient: 'from-indigo-400 to-blue-500',
                step: '02'
              },
              {
                icon: CheckCircle,
                title: 'Incident Response',
                description: 'Take action on confirmed threats, escalate incidents, and coordinate remediation efforts.',
                gradient: 'from-blue-400 to-cyan-500',
                step: '03'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
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

      {/* Alert Dashboard */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Threat Detection Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor alerts from all three specialized AI agents with contextual correlation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Activity,
                title: 'Email Verification Alerts',
                description: 'Phishing attempts, malicious attachments, and suspicious sender patterns detected by the Email Agent',
                features: ['Spear-phishing detection', 'Link analysis results', 'Attachment safety scores'],
                color: 'indigo',
                count: '4'
              },
              {
                icon: Eye,
                title: 'Log Analysis Alerts',
                description: 'Anomalous system behavior, failed login attempts, and privilege escalation from the Log Agent',
                features: ['Brute force attempts', 'Unusual access patterns', 'Injection attack signatures'],
                color: 'blue',
                count: '5'
              },
              {
                icon: Zap,
                title: 'IP Scanning Alerts',
                description: 'Suspicious network traffic, malicious IP connections, and DDoS patterns from the IP Agent',
                features: ['Port scanning activity', 'Blacklisted IPs', 'Traffic anomalies'],
                color: 'sky',
                count: '3'
              },
              {
                icon: AlertTriangle,
                title: 'Correlated Threats',
                description: 'Multi-vector attacks identified by the Contextual Recommendation System through cross-analysis',
                features: ['Time-based patterns', 'Coordinated attacks', 'APT indicators'],
                color: 'cyan',
                count: '2'
              }
            ].map((alert, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${alert.color}-400 to-${alert.color}-600 flex items-center justify-center`}>
                    <alert.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`px-4 py-2 rounded-full bg-${alert.color}-100 text-${alert.color}-700 font-bold`}>
                    {alert.count} Active
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{alert.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{alert.description}</p>
                <ul className="space-y-2">
                  {alert.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${alert.color}-500 flex-shrink-0`} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Analysis</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Every alert comes with LLM-generated explanations, threat context, and recommended actions. The system provides chain-of-thought reasoning to help you understand why threats were detected.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { title: 'Explainable AI', desc: 'Clear reasoning for every detection', icon: FileText },
                { title: 'Context Correlation', desc: 'Multi-agent pattern recognition', icon: Activity },
                { title: 'Smart Recommendations', desc: 'AI-suggested response actions', icon: CheckCircle }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <feature.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">System Performance</h3>
              <div className="space-y-6">
                {[
                  { label: 'Threat Detection Accuracy', value: 93.6, color: 'indigo' },
                  { label: 'Agent Correlation Rate', value: 87, color: 'blue' },
                  { label: 'False Positive Reduction', value: 41.3, color: 'sky' }
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
                Benchmarked on CIC-IDS 2017, SpamAssassin, and custom datasets
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Analyst Tools</h3>
              <div className="space-y-4">
                {[
                  'Review correlated alerts from all agents',
                  'Access AI-generated threat explanations',
                  'Investigate with chain-of-thought analysis',
                  'Mark and escalate critical threats',
                  'Generate detailed incident reports',
                  'Track response metrics and KPIs'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
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

      {/* Quick Actions */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-xl text-gray-600">Jump to your most-used analyst tools</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'View Alerts', path: '/analystAlerts', icon: AlertTriangle, color: 'red' },
              { label: 'Investigate', path: '/analystInvestigate', icon: Search, color: 'indigo' },
              { label: 'Reports', path: '/analystReports', icon: FileText, color: 'blue' },
              { label: 'Analytics', path: '/analystAnalytics', icon: BarChart3, color: 'sky' }
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(action.path)}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:scale-105"
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

export default AnalystDashboard;