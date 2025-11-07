import {Routes, Route} from 'react-router-dom';
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

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/board" element={<Board />} />
          <Route path="/pictogram" element={<Pictogram />} />
          <Route path="/pictogram/:id" element={<PictogramDetail />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
