import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Sign from './pages/signin/signin';
import Main from './pages/main/main';
import Contacts from './pages/contacts/contacts';
import Attractions from './pages/attractions/attractions';
import Registration from './pages/registration/registration';
import LogoLink from './components/general/header/logolink.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="main" replace />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main" element={<LogoLink />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
