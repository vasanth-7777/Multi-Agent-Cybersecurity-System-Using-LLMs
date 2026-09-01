import React, { useState, useEffect } from 'react';
import { Shield, Mail, Terminal, Target, LogOut, Menu, X, Activity, Zap, AlertCircle, Code, Database, Wifi } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AttackerDashboard() {
  const [currentPath, setCurrentPath] = useState('/attackerDB');
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
    { name: 'Dashboard', path: '/attackerDB', icon: Shield },
    { name: 'Phishing', path: '/attackPhishing', icon: Mail },
    { name: 'LogManipulations', path: '/attackExploits', icon: Terminal },
    { name: 'Network', path: '/attackNetwork', icon: Wifi },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-red-500/20' 
          : 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isScrolled ? 'bg-gradient-to-br from-red-600 to-orange-600' : 'bg-white/20'
              }`}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold ${isScrolled ? 'text-white' : 'text-white'}`}>
                  Security Testing Lab
                </span>
                <span className={`text-xs ${isScrolled ? 'text-gray-400' : 'text-white/80'}`}>
                  Attacker Simulation
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
                        ? 'bg-red-600 text-white'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-gray-300 hover:bg-gray-800'
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
                    ? 'text-red-400 hover:bg-red-950'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Exit</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-red-500/20 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950"
              >
                <LogOut className="w-5 h-5" />
                <span>Exit</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div 
        className="relative pt-16 min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(220, 38, 38, 0.85), rgba(234, 88, 12, 0.85), rgba(251, 146, 60, 0.85)), url(src/Components/Images/Img3.png)',
        }}
      >
        {/* Matrix-style overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-900/40 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-red-500/50">
              <Activity className="w-4 h-4 text-red-300 animate-pulse" />
              <span className="text-red-100 text-sm font-medium">Simulation Environment Active</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Attack Simulation
              <span className="block mt-2 bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
                Testing Lab
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Controlled environment for testing security measures through simulated attack scenarios
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => handleNavigation('/attackPhishing')}
                className="px-8 py-4 bg-white text-red-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105"
              >
                Launch Phishing Test
              </button>
              <button
                onClick={() => handleNavigation('/attackNetwork')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30 hover:scale-105"
              >
                TestNetworkAttacks
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: '15', label: 'Active Tests', icon: Zap },
                { value: '87%', label: 'Success Rate', icon: Target },
                { value: '234', label: 'Scenarios Run', icon: Activity },
                { value: 'Live', label: 'Environment', icon: AlertCircle }
              ].map((stat, idx) => (
                <div key={idx} className="bg-red-900/30 backdrop-blur-md rounded-2xl p-6 border border-red-500/30 hover:scale-105 transition-transform">
                  <stat.icon className="w-8 h-8 text-red-300 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-red-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attack Vectors */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Available Attack Vectors
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Test system defenses with various attack simulation techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: 'Phishing Campaigns',
                description: 'Create and deploy simulated phishing emails to test employee awareness and email security filters',
                gradient: 'from-red-500 to-orange-500',
                step: '01'
              },
              {
                icon: Terminal,
                title: 'Log Injection',
                description: 'Simulate suspicious system activities, failed logins, and privilege escalation attempts',
                gradient: 'from-orange-500 to-amber-500',
                step: '02'
              },
              {
                icon: Wifi,
                title: 'Network Attacks',
                description: 'Test IP scanning detection, DDoS patterns, and malicious traffic identification',
                gradient: 'from-amber-500 to-yellow-500',
                step: '03'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group bg-gray-800 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/50 transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {item.step}
                </div>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testing Tools */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Testing Capabilities
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools for security assessment and validation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Mail,
                title: 'Email Attack Simulation',
                description: 'Test email security with sophisticated phishing and social engineering campaigns',
                features: ['Spear-phishing templates', 'Malicious attachment simulation', 'Link verification bypass tests'],
                color: 'red'
              },
              {
                icon: Code,
                title: 'System Exploit Testing',
                description: 'Simulate various system-level attacks and intrusion attempts',
                features: ['SQL injection patterns', 'XSS attack scenarios', 'Privilege escalation tests'],
                color: 'orange'
              },
              {
                icon: Database,
                title: 'Log Manipulation',
                description: 'Create suspicious log entries to test anomaly detection systems',
                features: ['Failed login sequences', 'Unusual access patterns', 'Data exfiltration attempts'],
                color: 'amber'
              },
              {
                icon: Wifi,
                title: 'Network Intrusion',
                description: 'Test network security with simulated traffic anomalies',
                features: ['Port scanning simulation', 'DDoS pattern generation', 'Malicious IP connections'],
                color: 'yellow'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-800 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl border-2 border-red-400/30">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Controlled Testing Environment</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              This is a sandboxed simulation environment designed for security testing. All attack scenarios are monitored and logged. This system helps validate security measures by simulating real-world threats in a safe, controlled setting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { title: 'Monitored Activity', desc: 'All actions are logged and tracked' },
                { title: 'No Real Damage', desc: 'Simulated attacks only' },
                { title: 'Security Validation', desc: 'Test and improve defenses' }
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

      {/* Quick Launch */}
      <div className="py-20 bg-gradient-to-br from-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Quick Launch</h2>
            <p className="text-xl text-gray-400">Start your security testing scenarios</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Phishing', path: '/attackPhishing', icon: Mail, color: 'red' },
              { label: 'LogManipulations', path: '/attackExploits', icon: Terminal, color: 'orange' },
              { label: 'Network', path: '/attackNetwork', icon: Wifi, color: 'amber' },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleNavigation(action.path)}
                className="bg-gray-800 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/50 transition-all group hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-white">{action.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttackerDashboard;