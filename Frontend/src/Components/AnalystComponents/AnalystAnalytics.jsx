import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, BarChart3, LogOut, Menu, X, FileText, Mail, Database, Network, TrendingUp, Activity, Clock } from 'lucide-react';
import { Bar, Pie, Line } from 'react-chartjs-2';
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

function AnalystAnalytics() {
    const [currentPath, setCurrentPath] = useState('/analystAnalytics');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [analytics, setAnalytics] = useState(null);
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
        await Promise.all([fetchAnalytics(), fetchAnalyticsByEmployee(), fetchTopRisk()]);
        setLoading(false);
    };

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('http://localhost:8082/api/analytics/overview');
            const data = await res.json();
            setAnalytics(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAnalyticsByEmployee = async () => {
        try {
            const res = await fetch('http://localhost:8082/api/analytics/by-employee');
            const data = await res.json();
            setByEmployee(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTopRisk = async () => {
        try {
            const res = await fetch('http://localhost:8082/api/analytics/top-risk?topN=5');
            const data = await res.json();
            setTopRisk(data);
        } catch (error) {
            console.error(error);
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
        { name: 'Dashboard', path: '/analystDB', icon: Shield },
        { name: 'Investigate', path: '/analystInvestigate', icon: Search },
        { name: 'Reports', path: '/analystReports', icon: FileText },
        { name: 'Analytics', path: '/analystAnalytics', icon: BarChart3 },
    ];

    const isActive = (path) => currentPath === path;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50">
            {/* Navbar - EXACT SAME AS ORIGINAL */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white shadow-lg'
                : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isScrolled ? 'bg-gradient-to-br from-indigo-600 to-blue-600' : 'bg-white/20'}`}>
                                <img src='Logo.png' className="w-8 h-8 text-white" style={{ borderRadius: "15px" }} />
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

                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
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
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-2 ${isScrolled
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
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium ${isActive(item.path)
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

            {/* Content */}
            <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                        <Activity className="w-9 h-9 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold text-white mb-2">Security Analytics Center</h1>
                                        <p className="text-white/90 text-lg">Advanced threat intelligence and monitoring</p>
                                    </div>
                                </div>
                                <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                                    <Clock className="w-5 h-5 text-white" />
                                    <div className="text-white font-medium">{new Date().toLocaleTimeString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-96">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                                <p className="text-gray-600 font-medium">Analyzing Security Data...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Key Metrics Grid */}
                            {analytics && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    {/* Emails Metric */}
                                    <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-red-500 hover:shadow-2xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Mail className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 font-semibold mb-1">THREAT LEVEL</div>
                                                <div className="text-3xl font-bold text-red-600">{analytics.emails.averageThreatScore}<span className="text-lg text-gray-400">/10</span></div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Email Security</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Total Emails</span>
                                                <span className="text-gray-900 font-bold text-lg">{analytics.emails.totalEmails}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600 font-medium">Phishing Detected</span>
                                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">{analytics.emails.phishingEmails}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logs Metric */}
                                    <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Database className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 font-semibold mb-1">ANOMALY LEVEL</div>
                                                <div className="text-3xl font-bold text-orange-600">{analytics.logs.averageAnomalyScore}<span className="text-lg text-gray-400">/10</span></div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Activity Logs</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Total Logs</span>
                                                <span className="text-gray-900 font-bold text-lg">{analytics.logs.totalLogs}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600 font-medium">Suspicious Activity</span>
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">{analytics.logs.suspiciousLogs}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Network Metric */}
                                    <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-500 hover:shadow-2xl transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Network className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 font-semibold mb-1">THREAT LEVEL</div>
                                                <div className="text-3xl font-bold text-blue-600">{analytics.networkEvents.averageThreatScore}<span className="text-lg text-gray-400">/10</span></div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Network Events</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-medium">Total Events</span>
                                                <span className="text-gray-900 font-bold text-lg">{analytics.networkEvents.totalEvents}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-600 font-medium">Malicious Events</span>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{analytics.networkEvents.maliciousEvents}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Charts Section */}
                            {analytics && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                                    {/* Email Pie Chart */}
                                    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-red-100">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <Mail className="w-6 h-6 text-red-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Email Distribution</h3>
                                        </div>
                                        <Pie
                                            data={{
                                                labels: ['Phishing', 'Safe'],
                                                datasets: [{
                                                    data: [analytics.emails.phishingEmails, analytics.emails.totalEmails - analytics.emails.phishingEmails],
                                                    backgroundColor: ['#EF4444', '#10B981'],
                                                    borderWidth: 3,
                                                    borderColor: '#ffffff',
                                                }]
                                            }}
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom',
                                                        labels: {
                                                            padding: 15,
                                                            font: { size: 13, weight: 'bold' },
                                                            usePointStyle: true,
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Logs Pie Chart */}
                                    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-orange-100">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Database className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Logs Distribution</h3>
                                        </div>
                                        <Pie
                                            data={{
                                                labels: ['Suspicious', 'Normal'],
                                                datasets: [{
                                                    data: [analytics.logs.suspiciousLogs, analytics.logs.totalLogs - analytics.logs.suspiciousLogs],
                                                    backgroundColor: ['#F59E0B', '#3B82F6'],
                                                    borderWidth: 3,
                                                    borderColor: '#ffffff',
                                                }]
                                            }}
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom',
                                                        labels: {
                                                            padding: 15,
                                                            font: { size: 13, weight: 'bold' },
                                                            usePointStyle: true,
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Network Pie Chart */}
                                    <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-100">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Network className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Network Distribution</h3>
                                        </div>
                                        <Pie
                                            data={{
                                                labels: ['Malicious', 'Safe'],
                                                datasets: [{
                                                    data: [analytics.networkEvents.maliciousEvents, analytics.networkEvents.totalEvents - analytics.networkEvents.maliciousEvents],
                                                    backgroundColor: ['#B91C1C', '#6366F1'],
                                                    borderWidth: 3,
                                                    borderColor: '#ffffff',
                                                }]
                                            }}
                                            options={{
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom',
                                                        labels: {
                                                            padding: 15,
                                                            font: { size: 13, weight: 'bold' },
                                                            usePointStyle: true,
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Top Risk Bar Chart */}
                            {topRisk.length > 0 && (
                                <div className="mb-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                            <TrendingUp className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">High-Risk Employees</h2>
                                            <p className="text-gray-400 text-sm">Priority investigation targets</p>
                                        </div>
                                    </div>
                                    <div style={{ height: '320px' }}>
                                        <Bar
                                            data={{
                                                labels: topRisk.map(item => Object.keys(item)[0]),
                                                datasets: [
                                                    {
                                                        label: 'Risk Score',
                                                        data: topRisk.map(item => Object.values(item)[0]),
                                                        backgroundColor: topRisk.map((_, idx) => {
                                                            const colors = ['#DC2626', '#EA580C', '#F59E0B', '#FBBF24', '#FCD34D'];
                                                            return colors[idx] || '#EF4444';
                                                        }),
                                                        borderRadius: 10,
                                                        borderSkipped: false,
                                                    }
                                                ]
                                            }}
                                            options={{
                                                plugins: {
                                                    legend: { display: false },
                                                    tooltip: {
                                                        backgroundColor: 'rgba(0,0,0,0.9)',
                                                        padding: 15,
                                                        titleFont: { size: 15, weight: 'bold' },
                                                        bodyFont: { size: 14 },
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
                                                        grid: { color: 'rgba(255,255,255,0.1)' },
                                                        ticks: {
                                                            color: '#ffffff',
                                                            font: { size: 13, weight: 'bold' },
                                                            stepSize: 2
                                                        }
                                                    },
                                                    x: {
                                                        grid: { display: false },
                                                        ticks: {
                                                            color: '#ffffff',
                                                            font: { size: 13, weight: 'bold' },
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
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                <AlertTriangle className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-white">Employee Threat Analysis</h2>
                                                <p className="text-white/80 text-sm mt-1">Comprehensive security metrics per employee</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                                                        Employee
                                                    </th>
                                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                                                        Email Threats
                                                    </th>
                                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                                                        Suspicious Logs
                                                    </th>
                                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                                                        Network Threats
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {Object.entries(byEmployee).map(([email, data], idx) => (
                                                    <tr key={email} className={`hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                        <td className="px-8 py-5 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                                    {email.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-bold text-gray-900">{email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 whitespace-nowrap">
                                                            {data.emails ? (
                                                                <div className="space-y-2">
                                                                    <div className="text-sm font-semibold text-gray-900">Total: {data.emails.totalEmails}</div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="px-3 py-1 text-xs font-bold text-red-800 bg-red-100 rounded-lg shadow-sm">
                                                                            {data.emails.phishingEmails} phishing
                                                                        </span>
                                                                        <span className="px-3 py-1 text-xs font-bold text-gray-700 bg-gray-200 rounded-lg shadow-sm">
                                                                            Score: {data.emails.averageThreatScore}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-400 italic">No data</span>
                                                            )}
                                                        </td>
                                                        <td className="px-8 py-5 whitespace-nowrap">
                                                            {data.logs ? (
                                                                <div className="space-y-2">
                                                                    <div className="text-sm font-semibold text-gray-900">Total: {data.logs.totalLogs}</div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="px-3 py-1 text-xs font-bold text-orange-800 bg-orange-100 rounded-lg shadow-sm">
                                                                            {data.logs.suspiciousLogs} suspicious
                                                                        </span>
                                                                        <span className="px-3 py-1 text-xs font-bold text-gray-700 bg-gray-200 rounded-lg shadow-sm">
                                                                            Score: {data.logs.averageAnomalyScore}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-400 italic">No data</span>
                                                            )}
                                                        </td>
                                                        <td className="px-8 py-5 whitespace-nowrap">
                                                            {data.networkEvents ? (
                                                                <div className="space-y-2">
                                                                    <div className="text-sm font-semibold text-gray-900">Total: {data.networkEvents.totalEvents}</div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="px-3 py-1 text-xs font-bold text-blue-800 bg-blue-100 rounded-lg shadow-sm">
                                                                            {data.networkEvents.maliciousEvents} malicious
                                                                        </span>
                                                                        <span className="px-3 py-1 text-xs font-bold text-gray-700 bg-gray-200 rounded-lg shadow-sm">
                                                                            Score: {data.networkEvents.averageThreatScore}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-400 italic">No data</span>
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

export default AnalystAnalytics;