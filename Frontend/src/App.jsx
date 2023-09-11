import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Admin
import Foundation from './components/Admin/pages/Foundation.jsx';
import Office from './components/Admin/pages/Office.jsx';
import OfficeFix from './components/Admin/pages/OfficeFix.jsx';

// Bank
import BankPage from './components/Bank/pages/BankPage.jsx';

// Home
import Dashboard from './components/Home/pages/Dashboard.jsx';
import Landing from './components/Home/pages/Landing.jsx';

// Market
import StudentMarket from './components/Market/pages/StudentMarket.jsx';
import TeacherMarket from './components/Market/pages/TeacherMarket.jsx';

// Member
import Login from './components/Member/pages/Login.jsx';
import Nationality from './components/Member/pages/Nationality.jsx';
import Signup from './components/Member/pages/Signup.jsx';

// Production
import JobPosting from './components/Production/pages/JobPosting.jsx';

// StockExchange
import Stock from './components/StockExchange/pages/Stock.jsx';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/admin/foundation" element={<Foundation />} />
                <Route path="/admin/office" element={<Office />} />
                <Route path="/admin/officefix" element={<OfficeFix />} />
                <Route path="/bank/bankpage" element={<BankPage />} />
                <Route path="/home/dashboard" element={<Dashboard />} />
                <Route
                    path="/market/studentmarket"
                    element={<StudentMarket />}
                />
                <Route
                    path="/market/teachermarket"
                    element={<TeacherMarket />}
                />
                <Route path="/member/login" element={<Login />} />
                <Route path="/member/nationality" element={<Nationality />} />
                <Route path="/member/signup" element={<Signup />} />
                <Route path="/production/jobposting" element={<JobPosting />} />
                <Route path="/stockexchange/stock" element={<Stock />} />
            </Routes>
        </div>
    );
};

export default App;
