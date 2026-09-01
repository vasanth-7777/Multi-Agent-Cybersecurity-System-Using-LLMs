import React, { useState, useEffect } from 'react';
import { 
    Shield, Users, FileText, BarChart3, LogOut, Menu, X, Activity, 
    TrendingUp, Zap, Bell, Lock, Eye, Mail, Network, Clock, Server,
    RefreshCw, Filter, XCircle, Globe, CheckCircle, AlertTriangle,
    Database, ArrowRight, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AllLogs() {
    const [currentPath] = useState('/mngLogs');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('logs');
    
    const [logs, setLogs] = useState([]);
    const [networkEvents, setNetworkEvents] = useState([]);
    const [emails, setEmails] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLogType, setSelectedLogType] = useState('all');

    const navigate = useNavigate();

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
        { name: 'Home', path: '/managerDB', icon: Shield },
        { name: 'Employees', path: '/empDict', icon: Users },
        { name: 'Analysts', path: '/analystDict', icon: Users },
        { name: 'Logs', path: '/mngLogs', icon: FileText },
        { name: 'Analytics', path: '/mngAnalytics', icon: BarChart3 },
    ];

    const isActive = (path) => currentPath === path;

    const getRelativeTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getLogTypeBadge = (logType) => {
        const types = {
            'FAILED LOGIN': { bg: 'bg-rose-500', icon: XCircle },
            'SUCCESSFUL LOGIN': { bg: 'bg-emerald-500', icon: CheckCircle },
            'FILE ACCESS': { bg: 'bg-blue-500', icon: Eye },
            'SUSPICIOUS ACTIVITY': { bg: 'bg-amber-500', icon: AlertTriangle },
        };
        return types[logType?.toUpperCase()] || { bg: 'bg-gray-500', icon: Activity };
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.logMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             log.logType?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedLogType === 'all' || log.logType === selectedLogType;
        return matchesSearch && matchesType;
    });

    const filteredNetworkEvents = networkEvents.filter(event =>
        event.sourceIp?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.destinationIp?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.protocol?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredEmails = emails.filter(email =>
        email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.sender?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.body?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const logTypes = ['all', ...new Set(logs.map(log => log.logType))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white shadow-md' 
                    : 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
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

            <div className="pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    System Logs Directory
                                </h1>
                                <p className="text-gray-600">Comprehensive monitoring across all security channels</p>
                            </div>
                            <button
                                onClick={fetchAllData}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-medium"
                            >
                                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Sync
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <Database className="w-10 h-10 opacity-80" />
                                    <span className="text-3xl font-bold">{logs.length}</span>
                                </div>
                                <h3 className="text-lg font-semibold">Activity Logs</h3>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <Network className="w-10 h-10 opacity-80" />
                                    <span className="text-3xl font-bold">{networkEvents.length}</span>
                                </div>
                                <h3 className="text-lg font-semibold">Network Events</h3>
                            </div>
                            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <Mail className="w-10 h-10 opacity-80" />
                                    <span className="text-3xl font-bold">{emails.length}</span>
                                </div>
                                <h3 className="text-lg font-semibold">Email Scans</h3>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Activity className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-violet-500" />
                                    <input
                                        type="text"
                                        placeholder="Search logs, events, or emails..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                {activeTab === 'logs' && (
                                    <select
                                        value={selectedLogType}
                                        onChange={(e) => setSelectedLogType(e.target.value)}
                                        className="px-4 py-3 border-2 border-violet-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                    >
                                        {logTypes.map(type => (
                                            <option key={type} value={type}>
                                                {type === 'all' ? 'All Types' : type}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="flex border-b-2 border-gray-100">
                                <button
                                    onClick={() => setActiveTab('logs')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                                        activeTab === 'logs'
                                            ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Database className="w-5 h-5" />
                                    Activity Logs
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                        activeTab === 'logs' ? 'bg-white/20' : 'bg-violet-100 text-violet-700'
                                    }`}>
                                        {filteredLogs.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('network')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                                        activeTab === 'network'
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Network className="w-5 h-5" />
                                    Network Events
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                        activeTab === 'network' ? 'bg-white/20' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {filteredNetworkEvents.length}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('emails')}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                                        activeTab === 'emails'
                                            ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Mail className="w-5 h-5" />
                                    Email Scans
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                        activeTab === 'emails' ? 'bg-white/20' : 'bg-pink-100 text-pink-700'
                                    }`}>
                                        {filteredEmails.length}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'logs' && (
                            filteredLogs.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                                    <Database className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-xl">No activity logs found</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredLogs.map((log) => {
                                        const badge = getLogTypeBadge(log.logType);
                                        const Icon = badge.icon;
                                        
                                        return (
                                            <div key={log.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
                                                <div className="p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className={`${badge.bg} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                            <Icon className="w-7 h-7 text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className={`${badge.bg} text-white px-4 py-1.5 rounded-full text-sm font-bold`}>
                                                                    {log.logType}
                                                                </span>
                                                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                                    <Calendar className="w-4 h-4" />
                                                                    {getRelativeTime(log.timestamp)}
                                                                </div>
                                                            </div>
                                                            <p className="text-gray-800 text-lg font-medium mb-3">
                                                                {log.logMessage}
                                                            </p>
                                                            {log.analysisExplanation && (
                                                                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border-l-4 border-violet-500">
                                                                    <div className="flex items-start gap-2">
                                                                        <Shield className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                                                                        <div>
                                                                            <p className="text-violet-900 font-semibold text-sm mb-1">AI Analysis</p>
                                                                            <p className="text-violet-700 text-sm">{log.analysisExplanation}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                        )}

                        {activeTab === 'network' && (
                            filteredNetworkEvents.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                                    <Network className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-xl">No network events found</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredNetworkEvents.map((event) => (
                                        <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                                            <div className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <Network className="w-7 h-7 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                                                                    {event.protocol}
                                                                </span>
                                                                <span className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-sm font-bold">
                                                                    Port {event.port}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                                <Calendar className="w-4 h-4" />
                                                                {getRelativeTime(event.timestamp)}
                                                            </div>
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Globe className="w-5 h-5 text-blue-600" />
                                                                    <span className="text-xs font-semibold text-blue-600 uppercase">Source IP</span>
                                                                </div>
                                                                <p className="text-gray-900 font-mono text-lg font-bold">{event.sourceIp}</p>
                                                            </div>
                                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Server className="w-5 h-5 text-indigo-600" />
                                                                    <span className="text-xs font-semibold text-indigo-600 uppercase">Destination IP</span>
                                                                </div>
                                                                <p className="text-gray-900 font-mono text-lg font-bold">{event.destinationIp}</p>
                                                            </div>
                                                        </div>
                                                        {event.llmExplanation && event.llmExplanation !== "Analysis not performed yet." && event.llmExplanation !== "Analysis not performed yet" && (
                                                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-blue-500">
                                                                <div className="flex items-start gap-2">
                                                                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                                    <div>
                                                                        <p className="text-blue-900 font-semibold text-sm mb-1">AI Analysis</p>
                                                                        <p className="text-blue-700 text-sm">{event.llmExplanation}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {activeTab === 'emails' && (
                            filteredEmails.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                                    <Mail className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-xl">No email scans found</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredEmails.map((email) => (
                                        <div key={email.id} className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all ${
                                            email.phishing ? 'ring-2 ring-red-500' : ''
                                        }`}>
                                            <div className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className={`${
                                                        email.phishing 
                                                            ? 'bg-gradient-to-br from-red-500 to-rose-600' 
                                                            : 'bg-gradient-to-br from-green-500 to-emerald-600'
                                                    } w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                        {email.phishing ? (
                                                            <AlertTriangle className="w-7 h-7 text-white" />
                                                        ) : (
                                                            <CheckCircle className="w-7 h-7 text-white" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-2">
                                                                {email.phishing && (
                                                                    <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
                                                                        <AlertTriangle className="w-4 h-4" />
                                                                        Phishing
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                                <Calendar className="w-4 h-4" />
                                                                {getRelativeTime(email.receivedAt)}
                                                            </div>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{email.subject}</h3>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span className="text-sm text-gray-600">From:</span>
                                                            <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                                                                {email.sender}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                                            {email.body.substring(0, 200)}...
                                                        </p>
                                                        {email.llmExplanation && (
                                                            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border-l-4 border-red-500">
                                                                <div className="flex items-start gap-2">
                                                                    <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                                                    <div>
                                                                        <p className="text-red-900 font-semibold text-sm mb-1">AI Analysis</p>
                                                                        <p className="text-red-700 text-sm">{email.llmExplanation}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllLogs;