import React, { useState, useEffect } from 'react';
import { 
    Shield, AlertTriangle, Search, BarChart3, LogOut, Menu, X, Activity, 
    Eye, FileText, CheckCircle, Zap, TrendingUp, Mail, Network, Clock,
    Server, RefreshCw, Filter, XCircle, Globe, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AnalystReports() {
    const [currentPath] = useState('/analystReports');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('logs');
    
    // Data states
    const [logs, setLogs] = useState([]);
    const [networkEvents, setNetworkEvents] = useState([]);
    const [emails, setEmails] = useState([]);
    
    // Loading states
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    // Filter states
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    // Fetch all data
    const fetchAllData = async () => {
        setIsRefreshing(true);
        try {
            const [logsRes, networkRes, emailsRes] = await Promise.all([
                fetch('http://localhost:8082/api/attackLogs/all'),
                fetch('http://localhost:8082/api/attackNetworkEvent/all'),
                fetch('http://localhost:8082/api/attackPhishing/all')
            ]);
            
            const logsData = await logsRes.json();
            const networkData = await networkRes.json();
            const emailsData = await emailsRes.json();
            
            setLogs(logsData);
            setNetworkEvents(networkData);
            setEmails(emailsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAllData();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchAllData, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
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

    // Format timestamp
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 0) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // Get log type styles
    const getLogTypeStyles = (logType) => {
        switch (logType?.toUpperCase()) {
            case 'FAILED LOGIN':
                return {
                    icon: XCircle,
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700',
                    borderColor: 'border-red-300',
                    iconColor: 'text-red-600'
                };
            case 'SUCCESSFUL LOGIN':
                return {
                    icon: CheckCircle,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700',
                    borderColor: 'border-green-300',
                    iconColor: 'text-green-600'
                };
            case 'FILE ACCESS':
                return {
                    icon: Eye,
                    bgColor: 'bg-blue-100',
                    textColor: 'text-blue-700',
                    borderColor: 'border-blue-300',
                    iconColor: 'text-blue-600'
                };
            case 'SUSPICIOUS ACTIVITY':
                return {
                    icon: AlertTriangle,
                    bgColor: 'bg-orange-100',
                    textColor: 'text-orange-700',
                    borderColor: 'border-orange-300',
                    iconColor: 'text-orange-600'
                };
            default:
                return {
                    icon: Activity,
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-300',
                    iconColor: 'text-gray-600'
                };
        }
    };

    // Filter data based on search
    const filterLogs = logs.filter(log =>
        log.logMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.logType?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterNetworkEvents = networkEvents.filter(event =>
        event.sourceIp?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.destinationIp?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.protocol?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterEmails = emails.filter(email =>
        email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.body?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            {/* Main Content */}
            <div className="pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-3">
                                    <FileText className="w-8 h-8" />
                                    Security Reports
                                </h1>
                                <p className="text-gray-500 mt-1">
                                    Comprehensive view of system logs, network events, and phishing attempts
                                </p>
                            </div>
                            <button
                                onClick={fetchAllData}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh All
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search across all reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex gap-2 border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('logs')}
                                className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all ${
                                    activeTab === 'logs'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <Activity className="w-4 h-4" />
                                Activity Logs
                                <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                                    {filterLogs.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('network')}
                                className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all ${
                                    activeTab === 'network'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <Network className="w-4 h-4" />
                                Network Events
                                <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                    {filterNetworkEvents.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('emails')}
                                className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all ${
                                    activeTab === 'emails'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <Mail className="w-4 h-4" />
                                Emails
                                <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                    {filterEmails.length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'logs' && (
                        <div className="space-y-3">
                            {filterLogs.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                    <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">No activity logs found</p>
                                </div>
                            ) : (
                                filterLogs.map((log) => {
                                    const styles = getLogTypeStyles(log.logType);
                                    const Icon = styles.icon;
                                    
                                    return (
                                        <div
                                            key={log.id}
                                            className={`bg-white rounded-xl shadow-md border-l-4 ${styles.borderColor} hover:shadow-xl transition-all`}
                                        >
                                            <div className="p-5">
                                                <div className="flex items-start gap-4">
                                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.bgColor} flex items-center justify-center`}>
                                                        <Icon className={`w-6 h-6 ${styles.iconColor}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-3 mb-2">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles.bgColor} ${styles.textColor}`}>
                                                                        {log.logType}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                        <Clock className="w-3 h-3" />
                                                                        {formatTimestamp(log.timestamp)}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-800 font-medium text-base mt-2">
                                                                    {log.logMessage}
                                                                </p>
                                                                {log.analysisExplanation && (
                                                                    <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                                                                        <p className="text-sm text-gray-600 flex items-start gap-2">
                                                                            <Shield className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                                            <span><span className="font-medium text-indigo-700">AI Analysis:</span> {log.analysisExplanation}</span>
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}

                    {activeTab === 'network' && (
                        <div className="space-y-3">
                            {filterNetworkEvents.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                    <Network className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">No network events found</p>
                                </div>
                            ) : (
                                filterNetworkEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="bg-white rounded-xl shadow-md border-l-4 border-blue-300 hover:shadow-xl transition-all"
                                    >
                                        <div className="p-5">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <Network className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                                            {event.protocol}
                                                        </span>
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                                            Port {event.port}
                                                        </span>
                                                        <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                                                            <Clock className="w-3 h-3" />
                                                            {formatTimestamp(event.timestamp)}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                                        <div className="bg-gray-50 rounded-lg p-3">
                                                            <p className="text-xs text-gray-500 mb-1">Source IP</p>
                                                            <p className="text-sm font-mono font-semibold text-gray-900 flex items-center gap-2">
                                                                <Globe className="w-4 h-4 text-blue-500" />
                                                                {event.sourceIp}
                                                            </p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded-lg p-3">
                                                            <p className="text-xs text-gray-500 mb-1">Destination IP</p>
                                                            <p className="text-sm font-mono font-semibold text-gray-900 flex items-center gap-2">
                                                                <Server className="w-4 h-4 text-indigo-500" />
                                                                {event.destinationIp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {event.llmExplanation && event.llmExplanation !== "Analysis not performed yet." && event.llmExplanation !== "Analysis not performed yet" && (
                                                        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                                                            <p className="text-sm text-indigo-900 flex items-start gap-2">
                                                                <Shield className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                                                <span><span className="font-medium">AI Analysis:</span> {event.llmExplanation}</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'emails' && (
                        <div className="space-y-3">
                            {filterEmails.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">No phishing emails found</p>
                                </div>
                            ) : (
                                filterEmails.map((email) => (
                                    <div
                                        key={email.id}
                                        className={`bg-white rounded-xl shadow-md border-l-4 ${
                                            email.phishing ? 'border-red-300' : 'border-green-300'
                                        } hover:shadow-xl transition-all`}
                                    >
                                        <div className="p-5">
                                            <div className="flex items-start gap-4">
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${
                                                    email.phishing ? 'bg-red-100' : 'bg-green-100'
                                                } flex items-center justify-center`}>
                                                    {email.phishing ? (
                                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                                    ) : (
                                                        <Mail className="w-6 h-6 text-green-600" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {email.phishing && (
                                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1">
                                                                <AlertTriangle className="w-3 h-3" />
                                                                Phishing Detected
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                                                            <Clock className="w-3 h-3" />
                                                            {formatTimestamp(email.receivedAt)}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                        {email.subject}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        From: <span className="font-medium">{email.sender}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-700 line-clamp-2">
                                                        {email.body}
                                                    </p>
                                                    {email.llmExplanation && email.llmExplanation !== null && (
                                                        <div className="mt-3 bg-red-50 rounded-lg p-3 border border-red-200">
                                                            <p className="text-sm text-red-900 flex items-start gap-2">
                                                                <Shield className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                                                <span><span className="font-medium">AI Analysis:</span> {email.llmExplanation}</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnalystReports;