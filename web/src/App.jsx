import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import Board from './pages/Board';
import Pictogram from './pages/Pictogram';
import PictogramDetail from './pages/PictogramDetail';
import Notification from './pages/Notification';
import MyPage from './pages/MyPage';
import AccountPage from './pages/AccountPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/auth/ProtectedRoute';
import useAuthStore from './stores/authStore';

function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <Routes>
          {/* 공개 페이지 (로그인 불필요) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/board" element={<Board />} />
          <Route path="/pictogram" element={<Pictogram />} />
          <Route path="/pictogram/:id" element={<PictogramDetail />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* 보호된 페이지 (로그인 필요) */}
          <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
