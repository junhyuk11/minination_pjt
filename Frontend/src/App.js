import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Admin
import Foundation from './components/Admin/pages/Foundation';
import Office from './components/Admin/pages/Office';
import OfficeFix from './components/Admin/pages/OfficeFix';

// Home
import Landing from './components/Home/pages/Landing';

// StockExchange
import Stock from './components/StockExchange/pages/Stock';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/admin/foundation'" element={<Foundation />} />
                <Route path="/admin/office" element={<Office />} />
                <Route path="/admin/officefix" element={<OfficeFix />} />
                <Route path="/stockexchange/stock" element={<Stock />} />
            </Routes>
        </div>
    );
};

export default App;
