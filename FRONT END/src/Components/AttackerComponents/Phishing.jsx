import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Shield, Mail, Terminal, Target, LogOut, Menu, X, Wifi,
    CheckCircle, XCircle, Inbox
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Phishing() {

    // Navbar states
    const [currentPath, setCurrentPath] = useState('/attackPhishing');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // App states
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [inbox, setInbox] = useState([]);

    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [sender, setSender] = useState('');

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // NAVBAR SCROLL EFFECT
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // LOGOUT
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const handleNavigation = (path) => {
        setCurrentPath(path);
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { name: 'Dashboard', path: '/attackerDB', icon: Shield },
        { name: 'Phishing', path: '/attackPhishing', icon: Mail },
        { name: 'LogManipulations', path: '/attackExploits', icon: Terminal },
        { name: 'Network', path: '/attackNetwork', icon: Wifi },
    ];

    const isActive = (path) => currentPath === path;

    // FETCH EMPLOYEES
    useEffect(() => {
        axios.get('http://localhost:8082/api/emp/all')
            .then(res => setEmployees(res.data))
            .catch(err => console.log("Error fetching employees", err));
    }, []);

    const handleSendEmail = async (e) => {
        e.preventDefault();

        if (!selectedEmployeeId || !subject || !body || !sender) {
            setMessage({ type: 'error', text: 'Please fill all fields!' });
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                `http://localhost:8082/api/attackPhishing/send`,
                null,
                {
                    params: {
                        employeeId: selectedEmployeeId,
                        subject,
                        body,
                        sender
                    }
                }
            );

            setMessage({ type: 'success', text: 'Phishing email delivered!' });

            setSubject('');
            setBody('');
            setSender('');

        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to send email' });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900">

            {/* ======================== NAVBAR ============================= */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ?
                    "bg-gray-900/95 backdrop-blur-lg border-b border-red-500/20" :
                    "bg-gradient-to-r from-red-600 via-orange-600 to-amber-600"
            }`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-16">

                        {/* LOGO */}
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                isScrolled ? 'bg-red-600' : 'bg-white/20'
                            }`}>
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white">Security Testing Lab</span>
                                <span className="text-xs text-gray-300">Attacker Simulation</span>
                            </div>
                        </div>

                        {/* DESKTOP NAV */}
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map(item => (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        isActive(item.path)
                                            ? "bg-red-600 text-white"
                                            : "text-white/90 hover:bg-white/10"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </button>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-red-800"
                            >
                                <LogOut className="w-4 h-4" /> Exit
                            </button>
                        </div>

                        {/* MOBILE BUTTON */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white"
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-900 p-4 space-y-2">
                        {navItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-white ${
                                    isActive(item.path) ? 'bg-red-600' : 'hover:bg-gray-800'
                                }`}
                            >
                                <item.icon />
                                {item.name}
                            </button>
                        ))}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-red-400 hover:bg-red-950"
                        >
                            <LogOut /> Exit
                        </button>
                    </div>
                )}
            </nav>

            {/* ===================== MAIN CONTENT ===================== */}
            <div className="max-w-6xl mx-auto pt-24 p-6">

                <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                    <Mail className="text-red-500" /> Launch Phishing Attack
                </h1>

                {/* MESSAGES */}
                {message && (
                    <div className={`p-3 rounded-lg flex items-center gap-2 mb-4 ${
                        message.type === 'success' ? "bg-green-600" : "bg-red-600"
                    } text-white`}>
                        {message.type === "success" ? <CheckCircle /> : <XCircle />}
                        {message.text}
                    </div>
                )}

                {/* ------------------ SEND PHISHING EMAIL ------------------ */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl text-white font-semibold mb-4">Send Fake Email</h2>

                    <form onSubmit={handleSendEmail} className="grid grid-cols-1 gap-4">

                        {/* SELECT EMPLOYEE */}
                        <select
                            value={selectedEmployeeId}
                            onChange={e => setSelectedEmployeeId(e.target.value)}
                            className="p-3 rounded-lg bg-gray-700 text-white"
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option value={emp.id} key={emp.id}>
                                    {emp.name} ({emp.email})
                                </option>
                            ))}
                        </select>

                        <input
                            className="p-3 rounded-lg bg-gray-700 text-white"
                            placeholder="Email Subject"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />

                        <textarea
                            className="p-3 rounded-lg bg-gray-700 text-white"
                            placeholder="Email Body"
                            rows={4}
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />

                        <input
                            className="p-3 rounded-lg bg-gray-700 text-white"
                            placeholder="Sender Email"
                            value={sender}
                            onChange={e => setSender(e.target.value)}
                        />

                        <button
                            className="bg-red-600 hover:bg-red-700 p-3 rounded-lg text-white font-semibold"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Phishing Email"}
                        </button>
                    </form>
                </div>

                {/* ------------------ REAL TIME INBOX ------------------ */}
                {selectedEmployeeId && (
                    <div className="mt-10 bg-gray-800 p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl text-white font-semibold flex items-center gap-2 mb-4">
                            <Inbox className="text-blue-400" /> {employees.find(e => e.id == selectedEmployeeId)?.name}'s Inbox
                        </h2>

                        {inbox.length === 0 ? (
                            <p className="text-gray-400">No emails yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {inbox.map(email => (
                                    <div key={email.id} className="bg-gray-700 p-4 rounded-lg">
                                        <h3 className="text-white font-bold">{email.subject}</h3>
                                        <p className="text-gray-300 mt-1">{email.body}</p>
                                        <p className="text-sm text-gray-400 mt-2">From: {email.sender}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Phishing;
