import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import Board from './pages/Board';
import Pictogram from './pages/Pictogram';
import Notification from './pages/Notification';
import MyPage from './pages/MyPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/board" element={<Board />} />
        <Route path="/pictogram" element={<Pictogram />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myinfo" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
