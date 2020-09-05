import React from 'react';
import SingnIn from './pages/SingnIn';
import SingnUp from './pages/SingnUp';
import GlobalStyle from './styles/global';
import { AuthProvider } from './context/modules/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SingnIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
