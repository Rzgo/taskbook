import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { AppShell } from './core';

const App = () => {
  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
};

export default App;
