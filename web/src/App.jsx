import { Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <Routes>
            {/* --- 누구나 접근 가능한 페이지 --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/board" element={<Board />} />
            <Route path="/pictogram" element={<Pictogram />} />
            <Route path="/pictogram/:id" element={<PictogramDetail />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* --- 로그인이 필요한 페이지 (ProtectedRoute로 감싸기) --- */}
            <Route
                path="/notification"
                element={
                    <ProtectedRoute>
                        <Notification />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/mypage"
                element={
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/account"
                element={
                    <ProtectedRoute>
                        <AccountPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;