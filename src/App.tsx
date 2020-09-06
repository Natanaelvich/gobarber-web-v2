import React from 'react';
import SingnIn from './pages/SingnIn';
import SingnUp from './pages/SingnUp';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SingnIn />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
