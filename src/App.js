import React from 'react';
import { ipcRenderer } from 'electron';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RoutesPath } from './constants';
import WelcomeScreen from './screens/WelcomeScreen';
import ShowImages from './screens/ShowImages/ShowImages';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen />}></Route>
          <Route path='/showImages' element={<ShowImages />}></Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
