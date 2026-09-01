import React, { useState, useEffect } from 'react';
import { 
    Shield, Mail, FileText, Bell, LogOut, Menu, X, User,
    Activity, AlertTriangle, CheckCircle, Clock, Filter,
    Search, RefreshCw, TrendingUp, Eye, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function EmpLogs() {
    const [currentPath] = useState('/empLogs');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const employeeEmail = sessionStorage.getItem("employeeEmail");
    const navigate = useNavigate();

    // Fetch logs from API
    const fetchLogs = () => {
        if (!employeeEmail) return;
        
        setIsRefreshing(true);
        fetch(`http://localhost:8082/api/attackLogs/employee/${employeeEmail}`)
            .then((res) => res.json())
            .then((data) => {
                setLogs(data);
                setFilteredLogs(data);
                setIsRefreshing(false);
            })
            .catch((err) => {
                console.error("Error fetching logs:", err);
                setIsRefreshing(false);
            });
    };

    useEffect(() => {
        fetchLogs();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchLogs, 30000);
        return () => clearInterval(interval);
    }, [employeeEmail]);

    // Filter logs based on search and type
    useEffect(() => {
        let filtered = logs;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(log => 
                log.logMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.logType?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by type
        if (filterType !== 'all') {
            filtered = filtered.filter(log => log.logType === filterType);
        }

        setFilteredLogs(filtered);
    }, [searchQuery, filterType, logs]);

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
        { name: 'Dashboard', path: '/employeeDB', icon: Shield },
        { name: 'My Emails', path: '/empEmails', icon: Mail },
        { name: 'Activity Logs', path: '/empLogs', icon: FileText },
        { name: 'Alerts', path: '/empAlerts', icon: Bell },
        { name: 'Profile', path: '/empProfile', icon: User },
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

    // Get icon and color based on log type
    const getLogTypeStyles = (logType) => {
        switch (logType?.toUpperCase()) {
            case 'FAILED LOGIN':
                return {
                    icon: XCircle,
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700',
                    borderColor: 'border-red-200',
                    iconColor: 'text-red-600'
                };
            case 'SUCCESSFUL LOGIN':
                return {
                    icon: CheckCircle,
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700',
                    borderColor: 'border-green-200',
                    iconColor: 'text-green-600'
                };
            case 'FILE ACCESS':
                return {
                    icon: Eye,
                    bgColor: 'bg-blue-100',
                    textColor: 'text-blue-700',
                    borderColor: 'border-blue-200',
                    iconColor: 'text-blue-600'
                };
            case 'SUSPICIOUS ACTIVITY':
                return {
                    icon: AlertTriangle,
                    bgColor: 'bg-orange-100',
                    textColor: 'text-orange-700',
                    borderColor: 'border-orange-200',
                    iconColor: 'text-orange-600'
                };
            default:
                return {
                    icon: Activity,
                    bgColor: 'bg-gray-100',
                    textColor: 'text-gray-700',
                    borderColor: 'border-gray-200',
                    iconColor: 'text-gray-600'
                };
        }
    };

    // Get unique log types for filter
    const logTypes = ['all', ...new Set(logs.map(log => log.logType))];

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
                                <img src='Logo.png' className="w-8 h-8 text-white" style={{ borderRadius: "15px" }} />
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

            {/* Main Content */}
            <div className="pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-emerald-700 flex items-center gap-3">
                                    <Activity className="w-8 h-8" />
                                    Activity Logs
                                </h1>
                                <p className="text-gray-500 mt-1">
                                    Real-time monitoring of your account activities
                                </p>
                            </div>
                            <button
                                onClick={fetchLogs}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search logs by message or type..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            {logTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                                        filterType === type
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {type === 'all' ? 'All Logs' : type}
                                </button>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-emerald-600 font-medium">Total Logs</p>
                                        <p className="text-2xl font-bold text-emerald-700">{logs.length}</p>
                                    </div>
                                    <Activity className="w-8 h-8 text-emerald-500" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 font-medium">Filtered Results</p>
                                        <p className="text-2xl font-bold text-blue-700">{filteredLogs.length}</p>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-blue-500" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600 font-medium">Log Types</p>
                                        <p className="text-2xl font-bold text-purple-700">{logTypes.length - 1}</p>
                                    </div>
                                    <FileText className="w-8 h-8 text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logs Timeline */}
                    <div className="space-y-3">
                        {filteredLogs.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    {searchQuery || filterType !== 'all' 
                                        ? "No logs match your filters" 
                                        : "No activity logs found"}
                                </p>
                            </div>
                        ) : (
                            filteredLogs.map((log) => {
                                const styles = getLogTypeStyles(log.logType);
                                const Icon = styles.icon;
                                
                                return (
                                    <div
                                        key={log.id}
                                        className={`bg-white rounded-xl shadow-md border-l-4 ${styles.borderColor} hover:shadow-xl transition-all`}
                                    >
                                        <div className="p-5">
                                            <div className="flex items-start gap-4">
                                                {/* Icon */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.bgColor} flex items-center justify-center`}>
                                                    <Icon className={`w-6 h-6 ${styles.iconColor}`} />
                                                </div>

                                                {/* Content */}
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
                                                                        <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                                        <span className="font-medium text-emerald-700">AI Analysis:</span>
                                                                        {log.analysisExplanation}
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
                </div>
            </div>
        </div>
    );
}

export default EmpLogs;