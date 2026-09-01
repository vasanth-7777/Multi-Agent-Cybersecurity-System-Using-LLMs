import React, { useState, useEffect } from 'react';
import { Shield, Users, FileText, BarChart3, LogOut, Menu, X, TrendingUp, AlertCircle, Activity, Mail, Database, Network } from 'lucide-react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);

function ManagerAnalytics() {
  const [currentPath, setCurrentPath] = useState('/mngAnalytics');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [overview, setOverview] = useState(null);
  const [byEmployee, setByEmployee] = useState(null);
  const [topRisk, setTopRisk] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchOverview(), fetchByEmployee(), fetchTopRisk()]);
    setLoading(false);
  };

  const fetchOverview = async () => {
    try {
      const res = await fetch('http://localhost:8082/api/analytics/overview');
      const data = await res.json();
      setOverview(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchByEmployee = async () => {
    try {
      const res = await fetch('http://localhost:8082/api/analytics/by-employee');
      const data = await res.json();
      setByEmployee(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopRisk = async () => {
    try {
      const res = await fetch('http://localhost:8082/api/analytics/top-risk?topN=5');
      const data = await res.json();
      setTopRisk(data);
    } catch (err) {
      console.error(err);
    }
  };

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
    console.log('Navigating to:', path);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Navbar - EXACT SAME AS ORIGINAL */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500'
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
                      ? isScrolled ? 'bg-violet-100 text-violet-700' : 'bg-white/20 text-white'
                      : isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-2 ${
                  isScrolled ? 'text-red-600 hover:bg-red-50' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-700' : 'text-white'}`}
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
                    isActive(item.path) ? 'bg-violet-100 text-violet-700' : 'text-gray-700 hover:bg-gray-50'
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

      {/* Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Real-Time Analytics Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor security threats and employee activities in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">Live Data - Last Updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-violet-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading Analytics Data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Overview Stats Cards */}
              {overview && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Emails Card */}
                  <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Mail className="w-10 h-10" />
                        <span className="text-3xl font-bold">{overview.emails.totalEmails}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Total Emails</h3>
                      <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium">{overview.emails.phishingEmails} Phishing Detected</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="opacity-90">Avg Threat Score:</span>
                        <span className="font-bold text-lg">{overview.emails.averageThreatScore}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Logs Card */}
                  <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Database className="w-10 h-10" />
                        <span className="text-3xl font-bold">{overview.logs.totalLogs}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Activity Logs</h3>
                      <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium">{overview.logs.suspiciousLogs} Suspicious Activities</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="opacity-90">Avg Anomaly Score:</span>
                        <span className="font-bold text-lg">{overview.logs.averageAnomalyScore}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Network Events Card */}
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Network className="w-10 h-10" />
                        <span className="text-3xl font-bold">{overview.networkEvents.totalEvents}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Network Events</h3>
                      <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium">{overview.networkEvents.maliciousEvents} Malicious Events</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="opacity-90">Avg Threat Score:</span>
                        <span className="font-bold text-lg">{overview.networkEvents.averageThreatScore}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Charts Section */}
              {overview && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Emails Distribution */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-red-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Email Threats</h2>
                    </div>
                    <Doughnut
                      data={{
                        labels: ['Phishing Emails', 'Safe Emails'],
                        datasets: [{
                          data: [
                            overview.emails.phishingEmails,
                            overview.emails.totalEmails - overview.emails.phishingEmails
                          ],
                          backgroundColor: ['#EF4444', '#10B981'],
                          borderWidth: 0,
                        }]
                      }}
                      options={{
                        plugins: {
                          legend: { position: 'bottom', labels: { padding: 15, font: { size: 12, weight: 'bold' } } }
                        },
                        cutout: '70%',
                      }}
                    />
                    <div className="mt-6 text-center">
                      <div className="text-3xl font-bold text-red-600">{overview.emails.phishingEmails}</div>
                      <div className="text-sm text-gray-600 mt-1">Phishing Attempts Blocked</div>
                    </div>
                  </div>

                  {/* Logs Distribution */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Database className="w-6 h-6 text-orange-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Activity Logs</h2>
                    </div>
                    <Doughnut
                      data={{
                        labels: ['Suspicious Logs', 'Normal Logs'],
                        datasets: [{
                          data: [
                            overview.logs.suspiciousLogs,
                            overview.logs.totalLogs - overview.logs.suspiciousLogs
                          ],
                          backgroundColor: ['#F59E0B', '#3B82F6'],
                          borderWidth: 0,
                        }]
                      }}
                      options={{
                        plugins: {
                          legend: { position: 'bottom', labels: { padding: 15, font: { size: 12, weight: 'bold' } } }
                        },
                        cutout: '70%',
                      }}
                    />
                    <div className="mt-6 text-center">
                      <div className="text-3xl font-bold text-orange-600">{overview.logs.suspiciousLogs}</div>
                      <div className="text-sm text-gray-600 mt-1">Suspicious Activities Detected</div>
                    </div>
                  </div>

                  {/* Network Events Distribution */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Network className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Network Security</h2>
                    </div>
                    <Doughnut
                      data={{
                        labels: ['Malicious Events', 'Safe Events'],
                        datasets: [{
                          data: [
                            overview.networkEvents.maliciousEvents,
                            overview.networkEvents.totalEvents - overview.networkEvents.maliciousEvents
                          ],
                          backgroundColor: ['#B91C1C', '#6366F1'],
                          borderWidth: 0,
                        }]
                      }}
                      options={{
                        plugins: {
                          legend: { position: 'bottom', labels: { padding: 15, font: { size: 12, weight: 'bold' } } }
                        },
                        cutout: '70%',
                      }}
                    />
                    <div className="mt-6 text-center">
                      <div className="text-3xl font-bold text-purple-600">{overview.networkEvents.maliciousEvents}</div>
                      <div className="text-sm text-gray-600 mt-1">Malicious Connections Blocked</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Risky Employees */}
              {topRisk.length > 0 && (
                <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Top High-Risk Employees</h2>
                      <p className="text-gray-600 text-sm mt-1">Employees requiring immediate attention</p>
                    </div>
                  </div>
                  <div style={{ height: '300px' }}>
                    <Bar
                      data={{
                        labels: topRisk.map(item => Object.keys(item)[0]),
                        datasets: [{
                          label: 'Risk Score',
                          data: topRisk.map(item => Object.values(item)[0]),
                          backgroundColor: topRisk.map((_, idx) => {
                            const colors = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA'];
                            return colors[idx] || '#EF4444';
                          }),
                          borderRadius: 8,
                          borderSkipped: false,
                        }]
                      }}
                      options={{
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            padding: 12,
                            titleFont: { size: 14, weight: 'bold' },
                            bodyFont: { size: 13 },
                            displayColors: false,
                            callbacks: {
                              label: function(context) {
                                return 'Risk Score: ' + context.parsed.y.toFixed(1);
                              }
                            }
                          }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 10,
                            grid: { color: 'rgba(0,0,0,0.05)' },
                            ticks: { 
                              font: { size: 12, weight: 'bold' },
                              stepSize: 1
                            }
                          },
                          x: {
                            grid: { display: false },
                            ticks: { 
                              font: { size: 12, weight: 'bold' },
                              maxRotation: 45,
                              minRotation: 0
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Employee Analytics Table */}
              {byEmployee && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Employee Security Analytics</h2>
                        <p className="text-white/80 text-sm mt-1">Detailed breakdown by employee</p>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Employee Email
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-red-600" />
                              Emails
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <Database className="w-4 h-4 text-orange-600" />
                              Activity Logs
                            </div>
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <Network className="w-4 h-4 text-purple-600" />
                              Network Events
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(byEmployee).map(([email, data], idx) => (
                          <tr key={email} className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {email.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {data.emails ? (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">Total: {data.emails.totalEmails}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full">
                                      Phishing: {data.emails.phishingEmails}
                                    </span>
                                    <span className="px-2 py-1 text-xs font-bold text-gray-700 bg-gray-100 rounded-full">
                                      Score: {data.emails.averageThreatScore}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">No data</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {data.logs ? (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">Total: {data.logs.totalLogs}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs font-bold text-orange-700 bg-orange-100 rounded-full">
                                      Suspicious: {data.logs.suspiciousLogs}
                                    </span>
                                    <span className="px-2 py-1 text-xs font-bold text-gray-700 bg-gray-100 rounded-full">
                                      Score: {data.logs.averageAnomalyScore}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">No data</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {data.networkEvents ? (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">Total: {data.networkEvents.totalEvents}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 text-xs font-bold text-purple-700 bg-purple-100 rounded-full">
                                      Malicious: {data.networkEvents.maliciousEvents}
                                    </span>
                                    <span className="px-2 py-1 text-xs font-bold text-gray-700 bg-gray-100 rounded-full">
                                      Score: {data.networkEvents.averageThreatScore}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">No data</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerAnalytics;