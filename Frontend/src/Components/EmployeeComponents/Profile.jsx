import React, { useState, useEffect } from 'react';
import { Shield, Mail, FileText, Bell, LogOut, Menu, X, User, Building, KeyRound, Calendar, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

function Profile() {
    const [currentPath, setCurrentPath] = useState('/empProfile');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const employeeEmail = sessionStorage.getItem("employeeEmail") || "john@company.com";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8082/api/emp/getByEmail/${employeeEmail}`);
            
            if (response.ok) {
                const data = await response.json();
                setEmployee(data);
            } else {
                const errorText = await response.text();
                setError(errorText || 'Failed to fetch employee details');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        try {
            sessionStorage.clear();
        } catch (e) {
            console.log('Session storage cleared');
        }
        window.location.href = '/';
    };

    const handleNavigation = (path) => {
        window.location.href = path;
    };

    const navItems = [
        { name: 'Dashboard', path: '/employeeDB', icon: Shield },
        { name: 'My Emails', path: '/empEmails', icon: Mail },
        { name: 'Activity Logs', path: '/empLogs', icon: FileText },
        { name: 'Alerts', path: '/empAlerts', icon: Bell },
        { name: 'Profile', path: '/empProfile', icon: User },
    ];

    const isActive = (path) => currentPath === path;

    const getInitials = (name) => {
        if (!name) return 'NA';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
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

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-700' : 'text-white'
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

            {/* Main Content */}
            <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                My Profile
                            </h1>
                            <p className="text-gray-600 mt-2">View and manage your account information</p>
                        </div>
                        <button
                            onClick={fetchEmployeeDetails}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all text-emerald-600 font-medium"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-emerald-100">
                            <RefreshCw className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">Loading your profile...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Error Loading Profile</h3>
                                    <p className="text-red-600 mt-1">{error}</p>
                                </div>
                            </div>
                            <button
                                onClick={fetchEmployeeDetails}
                                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Profile Card */}
                    {employee && !loading && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Main Profile Card */}
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
                                {/* Header Section with Gradient */}
                                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8">
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        {/* Avatar */}
                                        <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                                            <span className="text-4xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                {getInitials(employee.name)}
                                            </span>
                                        </div>
                                        
                                        {/* Name and Email */}
                                        <div className="text-center md:text-left flex-1">
                                            <h2 className="text-3xl font-bold text-white mb-2">
                                                {employee.name}
                                            </h2>
                                            <div className="flex items-center gap-2 justify-center md:justify-start text-white/90">
                                                <Mail className="w-5 h-5" />
                                                <span className="text-lg">{employee.email}</span>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                            <CheckCircle className="w-5 h-5 text-white" />
                                            <span className="text-white font-semibold">Active</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <User className="w-6 h-6 text-emerald-600" />
                                        Account Details
                                    </h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-600">Full Name</span>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900 ml-13">
                                                {employee.name}
                                            </p>
                                        </div>

                                        {/* Email Address */}
                                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                                                    <Mail className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-600">Email Address</span>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900 ml-13 break-all">
                                                {employee.email}
                                            </p>
                                        </div>

                                        {/* Department */}
                                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                                                    <Building className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-600">Department</span>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900 ml-13">
                                                {employee.department || 'Not Assigned'}
                                            </p>
                                        </div>

                                        {/* Account ID */}
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                                    <KeyRound className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-600">Employee ID</span>
                                            </div>
                                            <p className="text-xl font-bold text-gray-900 ml-13">
                                                #{employee.id || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-emerald-600" />
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <button
                                        onClick={() => handleNavigation('/empEmails')}
                                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl hover:shadow-lg transition-all border border-emerald-200 hover:border-emerald-300"
                                    >
                                        <Mail className="w-6 h-6 text-emerald-600" />
                                        <span className="font-semibold text-gray-900">My Emails</span>
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/empLogs')}
                                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all border border-teal-200 hover:border-teal-300"
                                    >
                                        <FileText className="w-6 h-6 text-teal-600" />
                                        <span className="font-semibold text-gray-900">Activity Logs</span>
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/empAlerts')}
                                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl hover:shadow-lg transition-all border border-cyan-200 hover:border-cyan-300"
                                    >
                                        <Bell className="w-6 h-6 text-cyan-600" />
                                        <span className="font-semibold text-gray-900">Alerts</span>
                                    </button>
                                    <button
                                        onClick={() => handleNavigation('/employeeDB')}
                                        className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all border border-blue-200 hover:border-blue-300"
                                    >
                                        <Shield className="w-6 h-6 text-blue-600" />
                                        <span className="font-semibold text-gray-900">Dashboard</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}

export default Profile;