import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import RandomTest from './pages/user/RandomTest';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import ProtectedRouteTeacher from './components/ProtectedRouteTeacher';
import Kreteriya from './pages/teacher/Kreteriya';
import Category from './pages/teacher/Category';
import CreateQuestions from './pages/teacher/CreateQuestions';
import toast, { Toaster } from 'react-hot-toast';
import UserProfile from './pages/user/UserProfile';
import MyRating from './pages/user/MyRating';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<ProtectedRouteUser />}>
            <Route path='test/:categoryId' element={<RandomTest />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='rating' element={<MyRating />} />
          </Route>
          <Route path='/teacher' element={<ProtectedRouteTeacher />}>
            <Route path='dashboard' element={<Kreteriya />} />
            <Route path='category' element={<Category />} />
            <Route path='questions' element={<CreateQuestions />} />
          </Route>
          <Route path='/admin' element={<ProtectedRouteAdmin />}> 
            <Route path='dashboard' element={<AdminDashboard />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </>

  );
}

export default App;
