import React, { useState, useEffect } from 'react';
import { Shield, Mail, Terminal, Target, LogOut, Menu, X, Wifi, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Network() {
    const [currentPath, setCurrentPath] = useState('/attackNetwork');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');

    const [sourceIp, setSourceIp] = useState('');
    const [destinationIp, setDestinationIp] = useState('');
    const [port, setPort] = useState('');
    const [protocol, setProtocol] = useState('');

    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');

    // FETCH EMPLOYEES
    useEffect(() => {
        fetch("http://localhost:8082/api/emp/all")
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = useNavigate();

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
        { name: 'Dashboard', path: '/attackerDB', icon: Shield },
        { name: 'Phishing', path: '/attackPhishing', icon: Mail },
        { name: 'LogManipulations', path: '/attackExploits', icon: Terminal },
        { name: 'Network', path: '/attackNetwork', icon: Wifi },
    ];

    const isActive = (path) => currentPath === path;

    // ------------------------------
    // API CALL FUNCTIONS
    // ------------------------------

    const triggerAttack = async (type) => {
        if (!employeeId || !sourceIp || !destinationIp) {
            setResponseMsg("⚠ Please fill all required fields!");
            return;
        }

        setLoading(true);

        let url = "";
        let body = {
            sourceIp,
            destinationIp,
            port: port ? parseInt(port) : null,
            protocol
        };

        if (type === "single") {
            url = `http://localhost:8082/api/attackNetworkEvent/attack/${employeeId}`;
        }
        if (type === "scan") {
            url = `http://localhost:8082/api/attackNetworkEvent/port-scan/${employeeId}`;
        }
        if (type === "multi") {
            url = `http://localhost:8082/api/attackNetworkEvent/multi-vector/${employeeId}`;
        }

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            console.log(data);

            setResponseMsg("✅ Attack executed successfully!");
        } catch (err) {
            console.error(err);
            setResponseMsg("❌ Error executing attack.");
        }

        setLoading(false);
        setTimeout(() => setResponseMsg(""), 4000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-red-500/20'
                : 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isScrolled ? 'bg-gradient-to-br from-red-600 to-orange-600' : 'bg-white/20'
                                }`}>
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white">
                                    Security Testing Lab
                                </span>
                                <span className="text-xs text-white/80">
                                    Attacker Simulation
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
                                        ? isScrolled ? 'bg-red-600 text-white' : 'bg-white/20 text-white'
                                        : isScrolled ? 'text-gray-300 hover:bg-gray-800' : 'text-white/90 hover:bg-white/10'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </button>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ml-2 text-white hover:bg-red-900"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Exit</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-white"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-900 border-t border-red-500/20 shadow-lg">
                        <div className="px-4 py-3 space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium ${isActive(item.path)
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* MAIN UI */}
            <div className="pt-24 px-6 max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-white mb-6">Network Attack Simulation</h1>

                <div className="bg-gray-800/60 p-6 rounded-xl shadow-xl border border-gray-700">

                    {/* EMPLOYEE DROPDOWN */}
                    <label className="text-white">Select Employee</label>
                    <select
                        className="mt-2 w-full p-3 rounded bg-gray-900 text-white border border-gray-600"
                        onChange={(e) => setEmployeeId(e.target.value)}
                    >
                        <option value="">-- Select Employee --</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name} ({emp.email})
                            </option>
                        ))}
                    </select>

                    {/* INPUT FIELDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <input
                            type="text"
                            placeholder="Source IP"
                            className="p-3 rounded bg-gray-900 text-white border border-gray-700"
                            value={sourceIp}
                            onChange={(e) => setSourceIp(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Destination IP"
                            className="p-3 rounded bg-gray-900 text-white border border-gray-700"
                            value={destinationIp}
                            onChange={(e) => setDestinationIp(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Port (optional)"
                            className="p-3 rounded bg-gray-900 text-white border border-gray-700"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Protocol (TCP/UDP/ICMP)"
                            className="p-3 rounded bg-gray-900 text-white border border-gray-700"
                            value={protocol}
                            onChange={(e) => setProtocol(e.target.value)}
                        />
                    </div>

                    {/* ATTACK BUTTONS */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

                        <button
                            onClick={() => triggerAttack("single")}
                            className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                        >
                            Single Network Attack
                        </button>

                        <button
                            onClick={() => triggerAttack("scan")}
                            className="py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg"
                        >
                            Port Scan Attack
                        </button>

                        <button
                            onClick={() => triggerAttack("multi")}
                            className="py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
                        >
                            Multi‑Vector Attack
                        </button>
                    </div>

                    {/* RESPONSE MESSAGE */}
                    {responseMsg && (
                        <div className="mt-6 p-4 bg-black/40 border border-gray-700 text-white rounded-lg">
                            {loading ? <Loader className="animate-spin" /> : responseMsg}
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Network;
