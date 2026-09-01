import React, { useState, useEffect } from 'react';
import { Shield, Mail, FileText, Bell, LogOut, Menu, X, User, AlertTriangle, CheckCircle, XCircle, TrendingUp, Activity, Clock, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EmployeeAlerts() {
    const [currentPath, setCurrentPath] = useState('/empAlerts');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const employeeEmail = sessionStorage.getItem("employeeEmail");
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8082/api/correlate/getEMployeeAlerts/${employeeEmail}`);
            if (!response.ok) throw new Error('Failed to fetch alerts');
            const data = await response.json();
            setAlerts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    const navigate = useNavigate();
    const handleLogout = () => {
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

    // Calculate statistics
    const calculateStats = () => {
        if (!alerts.length) return { totalAlerts: 0, phishingEmails: 0, suspiciousLogs: 0, maliciousNetwork: 0, avgRiskScore: 0 };

        let phishingCount = 0;
        let suspiciousLogCount = 0;
        let maliciousNetworkCount = 0;
        let totalScore = 0;

        alerts.forEach(alert => {
            totalScore += alert.finalScore;
            
            if (alert.emailsJson) {
                try {
                    const emails = JSON.parse(alert.emailsJson);
                    phishingCount += emails.filter(e => e.phishing).length;
                } catch (e) {}
            }
            
            if (alert.logsJson) {
                try {
                    const logs = JSON.parse(alert.logsJson);
                    suspiciousLogCount += logs.filter(l => l.suspicious).length;
                } catch (e) {}
            }
            
            if (alert.networkEventsJson) {
                try {
                    const networkEvents = JSON.parse(alert.networkEventsJson);
                    maliciousNetworkCount += networkEvents.filter(n => n.malicious).length;
                } catch (e) {}
            }
        });

        return {
            totalAlerts: alerts.length,
            phishingEmails: phishingCount,
            suspiciousLogs: suspiciousLogCount,
            maliciousNetwork: maliciousNetworkCount,
            avgRiskScore: alerts.length > 0 ? (totalScore / alerts.length).toFixed(2) : 0
        };
    };

    const stats = calculateStats();

    const getRiskLevel = (score) => {
        if (score >= 8) return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
        if (score >= 6) return { label: 'High', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' };
        if (score >= 4) return { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
        return { label: 'Low', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
    };

    const formatDate = (dateArray) => {
        if (!dateArray) return 'N/A';
        const [year, month, day, hour, minute] = dateArray;
        return new Date(year, month - 1, day, hour, minute).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isScrolled ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-white/20'
                                }`}>
                                <Shield className="w-6 h-6 text-white" />
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
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(item.path)
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
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-2 ${isScrolled
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
                            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-700' : 'text-white'
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
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium ${isActive(item.path)
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

            <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Security Alerts</h1>
                        <p className="text-gray-600">Monitor and analyze security threats for {employeeEmail}</p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                            <p className="text-red-800 font-medium">Error loading alerts</p>
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                    ) : (
                        <>
                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <BarChart3 className="w-8 h-8 text-blue-600" />
                                        <span className="text-3xl font-bold text-gray-900">{stats.totalAlerts}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">Total Alerts</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <Mail className="w-8 h-8 text-red-600" />
                                        <span className="text-3xl font-bold text-gray-900">{stats.phishingEmails}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">Phishing Emails</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <FileText className="w-8 h-8 text-orange-600" />
                                        <span className="text-3xl font-bold text-gray-900">{stats.suspiciousLogs}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">Suspicious Logs</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity className="w-8 h-8 text-purple-600" />
                                        <span className="text-3xl font-bold text-gray-900">{stats.maliciousNetwork}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">Malicious Network</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <TrendingUp className="w-8 h-8 text-yellow-600" />
                                        <span className="text-3xl font-bold text-gray-900">{stats.avgRiskScore}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">Avg Risk Score</p>
                                </div>
                            </div>

                            {/* Alerts List */}
                            <div className="space-y-6">
                                {alerts.length === 0 ? (
                                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Alerts Found</h3>
                                        <p className="text-gray-600">You have no security alerts at this time. Keep up the good work!</p>
                                    </div>
                                ) : (
                                    alerts.map((alert, index) => {
                                        const riskLevel = getRiskLevel(alert.finalScore);
                                        const emails = alert.emailsJson ? JSON.parse(alert.emailsJson) : [];
                                        const logs = alert.logsJson ? JSON.parse(alert.logsJson) : [];
                                        const networkEvents = alert.networkEventsJson ? JSON.parse(alert.networkEventsJson) : [];

                                        return (
                                            <div key={index} className={`bg-white rounded-xl shadow-lg border-2 ${riskLevel.border} overflow-hidden`}>
                                                {/* Alert Header */}
                                                <div className={`${riskLevel.bg} p-6 border-b ${riskLevel.border}`}>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <AlertTriangle className={`w-6 h-6 ${riskLevel.color}`} />
                                                            <h3 className="text-xl font-bold text-gray-900">Alert #{alert.id}</h3>
                                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${riskLevel.color} ${riskLevel.bg} border ${riskLevel.border}`}>
                                                                {riskLevel.label} Risk
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className={`text-3xl font-bold ${riskLevel.color}`}>{alert.finalScore}</div>
                                                            <div className="text-xs text-gray-600">Risk Score</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Alert Details */}
                                                <div className="p-6">
                                                    <p className="text-gray-700 mb-6 leading-relaxed">{alert.details}</p>

                                                    {/* Phishing Emails */}
                                                    {emails.length > 0 && (
                                                        <div className="mb-6">
                                                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                                <Mail className="w-5 h-5 text-red-600" />
                                                                Phishing Emails ({emails.length})
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {emails.map((email, idx) => (
                                                                    <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                                        <div className="flex items-start justify-between mb-2">
                                                                            <div className="flex-1">
                                                                                <p className="font-semibold text-gray-900">{email.subject}</p>
                                                                                <p className="text-sm text-gray-600">From: {email.sender}</p>
                                                                            </div>
                                                                            <span className="text-red-700 font-bold text-lg">{email.threatScore}/10</span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-700 mt-2">{email.llmExplanation}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Suspicious Logs */}
                                                    {logs.length > 0 && (
                                                        <div className="mb-6">
                                                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                                <FileText className="w-5 h-5 text-orange-600" />
                                                                Suspicious Activity Logs ({logs.length})
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {logs.map((log, idx) => (
                                                                    <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                                                        <div className="flex items-start justify-between mb-2">
                                                                            <div className="flex-1">
                                                                                <p className="font-semibold text-gray-900">{log.logType}</p>
                                                                                <p className="text-sm text-gray-600">{log.logMessage}</p>
                                                                            </div>
                                                                            <span className="text-orange-700 font-bold text-lg">{log.anomalyScore}/10</span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-700 mt-2">{log.analysisExplanation}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Network Events */}
                                                    {networkEvents.length > 0 && (
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                                <Activity className="w-5 h-5 text-purple-600" />
                                                                Network Events ({networkEvents.length})
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {networkEvents.map((event, idx) => (
                                                                    <div key={idx} className={`${event.malicious ? 'bg-purple-50 border-purple-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
                                                                        <div className="flex items-start justify-between mb-2">
                                                                            <div className="flex-1">
                                                                                <p className="font-semibold text-gray-900">{event.sourceIp} → {event.destinationIp}</p>
                                                                                <p className="text-sm text-gray-600">Port: {event.port} | Protocol: {event.protocol}</p>
                                                                            </div>
                                                                            <span className={`${event.malicious ? 'text-purple-700' : 'text-blue-700'} font-bold text-lg`}>{event.threatScore}/10</span>
                                                                        </div>
                                                                        <p className="text-sm text-gray-700 mt-2">{event.llmExplanation}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EmployeeAlerts;