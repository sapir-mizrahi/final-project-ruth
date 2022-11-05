import React from 'react';
import { Provider } from 'react-redux'
import Store from './Redux/store'
import './App.css';
import MainPage from './components/mainPage/mainPage';

function App() {
  return (
    <Provider store={Store}>
      <MainPage></MainPage>
    </Provider>
  );
}

export default App;