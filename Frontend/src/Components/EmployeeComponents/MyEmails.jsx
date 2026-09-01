import React, { useState, useEffect } from "react";
import {
    Shield, Mail, FileText, Bell, LogOut, Menu, X, User,
    Inbox, AlertTriangle, Clock, ArrowLeft, Paperclip, Star,
    Archive, Trash2, MoreVertical, Reply, Forward, Search,
    RefreshCw, ChevronLeft, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyEmails() {
    const [currentPath] = useState("/empEmails");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [emailFilter, setEmailFilter] = useState("all");
    const [starredEmails, setStarredEmails] = useState(new Set());

    const employeeEmail = sessionStorage.getItem("employeeEmail");
    const navigate = useNavigate();

    // Fetch emails
    const fetchEmails = () => {
        if (!employeeEmail) return;
        
        setIsRefreshing(true);
        fetch(`http://localhost:8082/api/attackPhishing/employee/${employeeEmail}/emails`)
            .then((res) => res.json())
            .then((data) => {
                setEmails(data);
                setIsRefreshing(false);
            })
            .catch((err) => {
                console.error("Error fetching emails:", err);
                setIsRefreshing(false);
            });
    };

    useEffect(() => {
        fetchEmails();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchEmails, 30000);
        return () => clearInterval(interval);
    }, [employeeEmail]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const toggleStar = (emailId, e) => {
        e.stopPropagation();
        setStarredEmails(prev => {
            const newSet = new Set(prev);
            if (newSet.has(emailId)) {
                newSet.delete(emailId);
            } else {
                newSet.add(emailId);
            }
            return newSet;
        });
    };

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
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const navItems = [
        { name: "Dashboard", path: "/employeeDB", icon: Shield },
        { name: "My Emails", path: "/empEmails", icon: Mail },
        { name: "Activity Logs", path: "/empLogs", icon: FileText },
        { name: "Alerts", path: "/empAlerts", icon: Bell },
        { name: "Profile", path: "/empProfile", icon: User },
    ];

    const isActive = (path) => currentPath === path;

    // Filter emails
    const filteredEmails = emails.filter(email => {
        const matchesSearch = email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            email.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            email.sender?.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (emailFilter === "starred") return matchesSearch && starredEmails.has(email.id);
        if (emailFilter === "suspicious") return matchesSearch && email.phishing;
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* NAVBAR */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-lg"
                        : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    isScrolled
                                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                                        : "bg-white/20"
                                }`}
                            >
                                <Mail className={`w-6 h-6 ${isScrolled ? "text-white" : "text-white"}`} />
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className={`text-lg font-bold ${
                                        isScrolled ? "text-gray-900" : "text-white"
                                    }`}
                                >
                                    AI Threat Monitoring
                                </span>
                                <span
                                    className={`text-xs ${
                                        isScrolled ? "text-gray-500" : "text-white/80"
                                    }`}
                                >
                                    AI-Protected Inbox
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
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-white/20 text-white"
                                            : isScrolled
                                                ? "text-gray-600 hover:bg-gray-100"
                                                : "text-white/90 hover:bg-white/10"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </button>
                            ))}
                            <button
                                onClick={handleLogout}
                                className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                                    isScrolled
                                        ? "text-red-600 hover:bg-red-50"
                                        : "text-white/90 hover:bg-white/10"
                                }`}
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>

                        <button
                            className={`md:hidden p-2 rounded-lg ${
                                isScrolled ? "text-gray-700" : "text-white"
                            }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                                        isActive(item.path)
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* EMAIL INTERFACE */}
            <div className="pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {selectedEmail ? (
                        /* EMAIL DETAIL VIEW */
                        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                                <button
                                    onClick={() => setSelectedEmail(null)}
                                    className="flex items-center gap-2 text-blue-700 mb-4 hover:text-blue-900 font-medium transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" /> Back to Inbox
                                </button>

                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                            {selectedEmail.subject}
                                        </h1>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
                                                    {selectedEmail.sender?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{selectedEmail.sender}</p>
                                                    <p className="text-xs text-gray-500">to me</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">{formatTimestamp(selectedEmail.receivedAt)}</span>
                                        <button
                                            onClick={(e) => toggleStar(selectedEmail.id, e)}
                                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                        >
                                            <Star
                                                className={`w-5 h-5 ${
                                                    starredEmails.has(selectedEmail.id)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Threat Warning */}
                            {selectedEmail.phishing && (
                                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b-4 border-red-500 p-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                                                <AlertTriangle className="w-7 h-7 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-red-900 mb-2">
                                                ⚠️ Phishing Threat Detected
                                            </h3>
                                            <p className="text-red-800 text-sm leading-relaxed">
                                                Our AI security system has identified this email as potentially malicious. 
                                                Please do not click any links or download attachments. Report this to IT security immediately.
                                            </p>
                                            <div className="mt-3 flex gap-3">
                                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                                    Threat Score: {selectedEmail.threatScore || "High"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Email Body */}
                            <div className="p-8">
                                <div className="prose max-w-none">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                                        {selectedEmail.body}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="border-t border-gray-200 p-6 bg-gray-50 flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    <Reply className="w-4 h-4" />
                                    Reply
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                                    <Forward className="w-4 h-4" />
                                    Forward
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                                    <Archive className="w-4 h-4" />
                                    Archive
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium ml-auto">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* INBOX LIST VIEW */
                        <div className="space-y-6">
                            {/* Header Section */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                            <Inbox className="w-8 h-8 text-blue-600" />
                                            Inbox
                                        </h1>
                                        <p className="text-gray-500 mt-1">
                                            {filteredEmails.length} {filteredEmails.length === 1 ? 'message' : 'messages'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={fetchEmails}
                                        disabled={isRefreshing}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
                                        placeholder="Search emails..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Filter Tabs */}
                                <div className="flex gap-2 border-b border-gray-200">
                                    {[
                                        { id: "all", label: "All Mail", icon: Inbox },
                                        { id: "starred", label: "Starred", icon: Star },
                                        { id: "suspicious", label: "Suspicious", icon: AlertTriangle }
                                    ].map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => setEmailFilter(filter.id)}
                                            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all ${
                                                emailFilter === filter.id
                                                    ? "text-blue-600 border-b-2 border-blue-600"
                                                    : "text-gray-600 hover:text-gray-900"
                                            }`}
                                        >
                                            <filter.icon className="w-4 h-4" />
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Email List */}
                            <div className="space-y-2">
                                {filteredEmails.length === 0 ? (
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                                        <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">
                                            {searchQuery ? "No emails match your search" : "Your inbox is empty"}
                                        </p>
                                    </div>
                                ) : (
                                    filteredEmails.map((email) => (
                                        <div
                                            key={email.id}
                                            className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer group"
                                            onClick={() => setSelectedEmail(email)}
                                        >
                                            <div className="p-5">
                                                <div className="flex items-start gap-4">
                                                    {/* Avatar */}
                                                    <div className="flex-shrink-0">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                                            {email.sender?.charAt(0).toUpperCase()}
                                                        </div>
                                                    </div>

                                                    {/* Email Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-3 mb-2">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h3 className="font-semibold text-gray-900 text-base truncate">
                                                                        {email.sender}
                                                                    </h3>
                                                                    {email.phishing && (
                                                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
                                                                            <AlertTriangle className="w-3 h-3" />
                                                                            Suspicious
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="font-medium text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                                                                    {email.subject}
                                                                </p>
                                                                <p className="text-gray-500 text-sm truncate">
                                                                    {email.body?.substring(0, 100)}...
                                                                </p>
                                                            </div>

                                                            {/* Right Side Actions */}
                                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                                                    {formatTimestamp(email.receivedAt)}
                                                                </span>
                                                                <button
                                                                    onClick={(e) => toggleStar(email.id, e)}
                                                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                                >
                                                                    <Star
                                                                        className={`w-5 h-5 ${
                                                                            starredEmails.has(email.id)
                                                                                ? "fill-yellow-400 text-yellow-400"
                                                                                : "text-gray-300 hover:text-yellow-400"
                                                                        }`}
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyEmails;