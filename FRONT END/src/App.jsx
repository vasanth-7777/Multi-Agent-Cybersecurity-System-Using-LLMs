import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/HomeComponents/HomePage';
import LoginForm from './Components/HomeComponents/LoginForm';
import ManagerDashboard from './Components/ManagerComponents/ManagerDashboard';
import EmployeeDB from './Components/EmployeeComponents/EmployeeDB';
import AnalystDB from './Components/AnalystComponents/AnalystDB';
import AttackerDB from './Components/AttackerComponents/AttackerDB';
import RegisterEmployee from './Components/ManagerComponents/RegisterEmployee';
import RegisterAnalyst from './Components/ManagerComponents/RegisterAnalyst';
import AllLogs from './Components/ManagerComponents/AllLogs';
import ManagerAnalytics from './Components/ManagerComponents/ManagerAnalytics';
import MyEmails from './Components/EmployeeComponents/MyEmails';
import EmpLogs from './Components/EmployeeComponents/EmpLogs';
import EmployeeAlerts from './Components/EmployeeComponents/Alerts';
import Profile from './Components/EmployeeComponents/Profile';
import Network from './Components/AttackerComponents/Network';
import Pishing from './Components/AttackerComponents/Phishing';
import LogManipulations from './Components/AttackerComponents/Exploits';
import AnalystInvestigate from './Components/AnalystComponents/Investigate';
import AnalystReports from './Components/AnalystComponents/AnalystReports';
import AnalystAnalytics from './Components/AnalystComponents/AnalystAnalytics';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/managerDB" element={<ManagerDashboard />} />
        <Route path="/employeeDB" element={<EmployeeDB />} />
        <Route path="/analystDB" element={<AnalystDB />} />
        <Route path="/attackerDb" element={<AttackerDB />} />
        <Route path="/empDict" element={<RegisterEmployee />} />
        <Route path="/analystDict" element={<RegisterAnalyst />} />
        <Route path="/mngLogs" element={<AllLogs />} />
        <Route path='/mngAnalytics' element={<ManagerAnalytics />} />
        <Route path="/empEmails" element={<MyEmails />} />
        <Route path='/empLogs' element={<EmpLogs />} />
        <Route path='/empAlerts' element={<EmployeeAlerts />} />
        <Route path='/empProfile' element={<Profile />} />
        <Route path='/attackNetwork' element={<Network />} />
        <Route path='/attackExploits' element={<LogManipulations />} />
        <Route path='/attackPhishing' element={<Pishing />} />
        
        <Route path='/analystInvestigate' element={<AnalystInvestigate />} />
        <Route path='/analystReports' element={<AnalystReports />} />
        <Route path='/analystAnalytics' element={<AnalystAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;
