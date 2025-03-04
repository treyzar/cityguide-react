import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './components/context/UserContext.jsx';
import Sign from './components/pages/signin/signin.jsx';
import Contacts from './components/pages/contacts/contacts.jsx';
import Attractions from './components/pages/attractions/AttractionsList.jsx';
import Registration from './components/pages/registration/registration.jsx';
import Main from './components/pages/main/main.jsx';
import Info from './components/pages/info/info.jsx';
import Logout from './components/general/header/Logout.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="main" replace />} />
            <Route path="/main" element={<Main />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/attraction/:id" element={<Info />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userprofile/:id" element={<UserProfile />} />{' '}
          </Routes>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
