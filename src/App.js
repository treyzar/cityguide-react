import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Sign from './components/pages/signin/signin.jsx';
import Contacts from './components/pages/contacts/contacts.jsx';
import Attractions from './components/pages/attractions/attractions.jsx';
import Registration from './components/pages/registration/registration.jsx';
import Main from './components/pages/main/main.jsx';
import Info from './components/pages/info/info.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="main" replace />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/attraction/:id" element={<Info />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;