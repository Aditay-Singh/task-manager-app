import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import MemberDashboard from '../pages/MemberDashboard/MemberDashboard';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/admin' element={<AdminDashboard />} />

        <Route path='/member' element={<MemberDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;