import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, BarChart3, LogOut, Menu, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AnalystInvestigate() {
    const [currentPath, setCurrentPath] = useState('/analystInvestigate');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showDatePopup, setShowDatePopup] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [report, setReport] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Fetch all employees
        axios.get('http://localhost:8082/api/emp/all')
            .then(res => setEmployees(res.data))
            .catch(err => console.error(err));
    }, []);

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

    const handleAnalyseClick = (employeeEmail) => {
        setSelectedEmployee(employeeEmail);
        setShowDatePopup(true);
        setReport(null);
    };

    const handleGenerateReport = () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }

        axios.get('http://localhost:8082/api/correlate/report', {
            params: {
                employeeEmail: selectedEmployee,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString()
            }
        }).then(res => {
            setReport(res.data);
        }).catch(err => {
            console.error(err);
            alert('Error generating report');
        });
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
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white shadow-lg'
                : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isScrolled ? 'bg-gradient-to-br from-indigo-600 to-blue-600' : 'bg-white/20'
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

            <div className="relative pt-20 px-4 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Investigate Employee Events & Correlations</h1>

                <div className="space-y-4">
                    {employees.map(emp => (
                        <div key={emp.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                            <div>
                                <p className="font-medium">{emp.name}</p>
                                <p className="text-sm text-gray-500">{emp.email}</p>
                            </div>
                            <button
                                onClick={() => handleAnalyseClick(emp.email)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Analyse
                            </button>
                        </div>
                    ))}
                </div>

                {/* Date selection popup */}
                {showDatePopup && (
                    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-bold mb-4">Select Date Range for {selectedEmployee}</h2>
                            <div className="flex flex-col gap-3">
                                <label>Start Date & Time</label>
                                <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} className="border p-2 rounded" />
                                <label>End Date & Time</label>
                                <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} className="border p-2 rounded" />
                                <div className="flex justify-end gap-2 mt-4">
                                    <button onClick={() => setShowDatePopup(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                                    <button onClick={handleGenerateReport} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Generate Report</button>
                                </div>
                            </div>

                            {/* Display report */}
                            {report && (
                                <div className="mt-4 p-3 border rounded bg-gray-50 max-h-60 overflow-y-auto">
                                    <pre className="text-sm">{JSON.stringify(report, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnalystInvestigate;
