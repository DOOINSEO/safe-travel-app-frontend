import { Routes, Route } from 'react-router-dom';
import TempHomePage from './pages/TempHomePage';
import BoardPage from './pages/BoardPage';
import MyPage from './pages/MyPage';
import PictogramPage from './pages/PictogramPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<TempHomePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/pictogram" element={<PictogramPage />} />
        </Routes>
    );
}

export default App;