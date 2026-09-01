import React, { useEffect, useState } from 'react';
import { Shield, Mail, FileText, Network, Users, Target, Zap, CheckCircle, AlertTriangle, Lock, Eye, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // AOS-like scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.aos').forEach(el => observer.observe(el));

    // Scroll handler for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'features', 'about'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 aos" data-aos="fade-right">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img src='Logo.png' className="w-10 h-10 text-white" style={{borderRadius:"15px"}} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                AI Threat Monitoring
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8 aos" data-aos="fade-left">
              {['Home', 'Services', 'Features', 'About'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-teal-600'
                      : 'text-orange-700 hover:text-teal-500'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></span>
                  )}
                </button>
              ))}
              <button 
                onClick={() => {scrollToSection('login');navigate('/login')}}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://img.freepik.com/free-photo/ai-powered-cybersecurity-biometric-authentication_23-2151998481.jpg?semt=ais_hybrid&w=740&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-emerald-900/85 to-cyan-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-32 z-10">
          <div className="max-w-3xl">
            <div className="aos" data-aos="zoom-in">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold mb-6 border border-white/30">
                🛡️ Next-Gen Cybersecurity Platform
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 aos leading-tight" data-aos="fade-up" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Intelligent Threat
              <span className="block bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent mt-2">
                Detection System
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-teal-100 mb-8 aos leading-relaxed" data-aos="fade-up" data-aos-delay="100" style={{ fontFamily: "'Lato', sans-serif", textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Harness the power of Large Language Models and multi-agent architecture to detect, analyze, and correlate sophisticated cyber threats across email, logs, and network layers in real-time.
            </p>
            
            <div className="flex flex-wrap gap-4 aos" data-aos="fade-up" data-aos-delay="200">
              <button className="px-8 py-4 bg-white text-teal-600 rounded-full font-bold text-lg hover:bg-teal-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border-2 border-white/30">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 aos" data-aos="fade-up" data-aos-delay="300">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-black text-white mb-2">93.6%</div>
                <div className="text-teal-200 text-sm font-semibold">Detection Accuracy</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-black text-white mb-2">87%</div>
                <div className="text-teal-200 text-sm font-semibold">Correlation Rate</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-black text-white mb-2">41.3%</div>
                <div className="text-teal-200 text-sm font-semibold">False Positive Reduction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Services Section - Diagonal Cards */}
      <section id="services" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-100/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 aos" data-aos="fade-up">
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">Our Services</span>
            <h2 className="text-5xl font-black text-gray-800 mt-4 mb-6" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Multi-Layer Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized agents working in harmony to protect your digital infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Email Verification */}
            <div className="aos relative group" data-aos="flip-left">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-emerald-300 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-4">Email Verification Agent</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Advanced LLM-powered semantic analysis scans emails for sophisticated phishing attempts, spear-phishing campaigns, and malicious content with contextual understanding.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Phishing Detection</span>
                  <span className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Semantic Analysis</span>
                </div>
              </div>
            </div>

            {/* Log Analysis */}
            <div className="aos relative group" data-aos="flip-right">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-sky-300 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-4">Log Analysis Agent</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Continuously monitors system and application logs to detect anomalies, suspicious activities, and potential security breaches using intelligent pattern recognition.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">Anomaly Detection</span>
                  <span className="px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">Real-time Monitoring</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Network Scanning */}
            <div className="aos relative group" data-aos="flip-left" data-aos-delay="100">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-lime-300 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-lime-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Network className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-4">Network/IP Scanning Agent</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Monitors network traffic and IP activities to identify intrusion attempts, suspicious connections, and potential distributed attack patterns in real-time.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Intrusion Detection</span>
                  <span className="px-4 py-1 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold">Traffic Analysis</span>
                </div>
              </div>
            </div>

            {/* Contextual Recommendation */}
            <div className="aos relative group" data-aos="flip-right" data-aos-delay="100">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-4">Contextual Recommendation System</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Cross-analyzes outputs from all agents to detect multi-vector attacks, correlate complex threat patterns, and provide actionable intelligence to analysts.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Threat Correlation</span>
                  <span className="px-4 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Circular Flow Design */}
      <section id="features" className="py-24 px-6 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 aos" data-aos="zoom-in">
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase">Core Features</span>
            <h2 className="text-5xl font-black text-gray-800 mt-4 mb-6" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Why Choose Our System
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 aos" data-aos="fade-right">
              <div className="bg-white rounded-3xl p-10 h-full shadow-xl hover:shadow-2xl transition-shadow duration-500 border-2 border-teal-200">
                <Target className="w-16 h-16 text-teal-600 mb-6" />
                <h3 className="text-3xl font-black text-gray-800 mb-4">LLM-Powered Intelligence</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Leverages cutting-edge Large Language Models for semantic understanding, contextual analysis, and explainable threat detection. Our system provides chain-of-thought reasoning that helps analysts understand the 'why' behind every alert, dramatically reducing investigation time and false positives.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="aos" data-aos="fade-left">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl p-10 h-full shadow-xl hover:shadow-2xl transition-all duration-500 text-white transform hover:scale-105">
                <Zap className="w-16 h-16 mb-6" />
                <h3 className="text-3xl font-black mb-4">Real-Time Detection</h3>
                <p className="text-teal-100 text-lg leading-relaxed">
                  Instant threat identification and correlation across all monitored domains with sub-second response times.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="aos" data-aos="fade-right" data-aos-delay="100">
              <div className="bg-gradient-to-br from-cyan-500 to-sky-500 rounded-3xl p-10 h-full shadow-xl hover:shadow-2xl transition-all duration-500 text-white transform hover:scale-105">
                <Eye className="w-16 h-16 mb-6" />
                <h3 className="text-3xl font-black mb-4">Cross-Domain Visibility</h3>
                <p className="text-cyan-100 text-lg leading-relaxed">
                  Unified view of threats spanning email, logs, and network traffic for complete situational awareness.
                </p>
              </div>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 aos" data-aos="fade-left" data-aos-delay="100">
              <div className="bg-white rounded-3xl p-10 h-full shadow-xl hover:shadow-2xl transition-shadow duration-500 border-2 border-emerald-200">
                <Lock className="w-16 h-16 text-emerald-600 mb-6" />
                <h3 className="text-3xl font-black text-gray-800 mb-4">Modular Architecture</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Scalable, microservice-based design allows seamless integration of additional agents and data sources. Built with Java Spring Boot backend and React frontend for enterprise-grade reliability and maintainability. Each agent operates independently while contributing to holistic threat intelligence.
                </p>
              </div>
            </div>

            {/* Feature 5 - Full width */}
            <div className="md:col-span-3 aos" data-aos="zoom-in" data-aos-delay="200">
              <div className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 rounded-3xl p-12 shadow-2xl text-white">
                <div className="flex items-start gap-8">
                  <AlertTriangle className="w-20 h-20 flex-shrink-0" />
                  <div>
                    <h3 className="text-4xl font-black mb-4">Advanced Threat Correlation</h3>
                    <p className="text-xl leading-relaxed text-teal-50">
                      Detects multi-stage attacks, APTs, and coordinated threats that traditional systems miss. Our contextual recommendation system analyzes patterns across time and domains to identify sophisticated attack campaigns including time-based attacks, multi-vector intrusions, and stealth operations that evade conventional detection mechanisms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 aos" data-aos="fade-up">
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">About The Project</span>
            <h2 className="text-5xl font-black text-gray-800 mt-4 mb-6" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Next-Generation Cybersecurity
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aos" data-aos="fade-right">
              <div className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-teal-200">
                <h3 className="text-3xl font-black text-gray-800 mb-6">The Challenge</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Traditional rule-based IDS and signature-based antivirus programs fail to detect sophisticated threats like spear-phishing, APTs, and multi-stage attacks due to lack of contextual understanding and semantic interpretation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Polymorphic and AI-driven attack strategies</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Context-dependent attack patterns</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Cross-domain threat correlation gaps</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="aos" data-aos="fade-left">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl p-10 shadow-2xl text-white">
                <h3 className="text-3xl font-black mb-6">Our Solution</h3>
                <p className="text-teal-100 text-lg leading-relaxed mb-6">
                  AI Threat Monitoring combines specialized agents with LLM intelligence to provide semantic understanding, cross-domain visibility, and adaptive detection capabilities.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <span className="text-teal-50">93.6% threat detection accuracy on benchmark datasets</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <span className="text-teal-50">87% multi-agent correlation accuracy</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <span className="text-teal-50">41.3% reduction in false positives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 aos" data-aos="zoom-in">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-emerald-200">
              <div className="text-center mb-8">
                <Users className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-3xl font-black text-gray-800 mb-4">Role-Based Dashboard</h3>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Intuitive React-based interfaces for Employees, Security Analysts, and Managers - each with tailored views and controls for their specific responsibilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-teal-900 to-cyan-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="aos" data-aos="fade-up">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img src='Logo.png' className="w-8 h-8 text-white" style={{borderRadius:"15px"}}/>
                </div>
                <span className="text-xl font-bold">AI Threat Monitoring</span>
              </div>
              <p className="text-teal-200 text-sm">
                Intelligent multi-agent cybersecurity powered by Large Language Models
              </p>
            </div>

            <div className="aos" data-aos="fade-up" data-aos-delay="100">
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-teal-200 text-sm">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition">Services</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition">Features</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">About</button></li>
              </ul>
            </div>

            <div className="aos" data-aos="fade-up" data-aos-delay="200">
              <h4 className="font-bold text-lg mb-4">Technology</h4>
              <ul className="space-y-2 text-teal-200 text-sm">
                <li>Java Spring Boot</li>
                <li>React JS</li>
                <li>MySQL Database</li>
                <li>LLM Integration</li>
              </ul>
            </div>

            <div className="aos" data-aos="fade-up" data-aos-delay="300">
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <p className="text-teal-200 text-sm mb-4">
                Ready to enhance your cybersecurity posture?
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Get in Touch
              </button>
            </div>
          </div>

          <div className="border-t border-teal-300/20 pt-8 text-center text-teal-200 text-sm">
            <p>&copy; 2024 AI Threat Monitoring System. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Inter:wght@400;500;600;700&display=swap');
        
        .aos {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .aos-animate {
          opacity: 1;
        }
        
        .aos[data-aos="fade-up"].aos-animate {
          transform: translateY(0);
        }
        
        .aos[data-aos="fade-down"] {
          transform: translateY(-50px);
        }
        
        .aos[data-aos="fade-down"].aos-animate {
          transform: translateY(0);
        }
        
        .aos[data-aos="fade-right"] {
          transform: translateX(-50px);
        }
        
        .aos[data-aos="fade-right"].aos-animate {
          transform: translateX(0);
        }
        
        .aos[data-aos="fade-left"] {
          transform: translateX(50px);
        }
        
        .aos[data-aos="fade-left"].aos-animate {
          transform: translateX(0);
        }
        
        .aos[data-aos="zoom-in"] {
          transform: scale(0.8);
        }
        
        .aos[data-aos="zoom-in"].aos-animate {
          transform: scale(1);
        }
        
        .aos[data-aos="flip-left"] {
          transform: perspective(1000px) rotateY(-30deg);
        }
        
        .aos[data-aos="flip-left"].aos-animate {
          transform: perspective(1000px) rotateY(0);
        }
        
        .aos[data-aos="flip-right"] {
          transform: perspective(1000px) rotateY(30deg);
        }
        
        .aos[data-aos="flip-right"].aos-animate {
          transform: perspective(1000px) rotateY(0);
        }
        
        [data-aos-delay="100"] {
          transition-delay: 0.1s;
        }
        
        [data-aos-delay="200"] {
          transition-delay: 0.2s;
        }
        
        [data-aos-delay="300"] {
          transition-delay: 0.3s;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;