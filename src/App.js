import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RoutesPath } from './constants';
import WelcomeScreen from './screens/WelcomeScreen';
import EnterCode from './screens/EnterCode';

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen />}></Route>
          <Route
            path={`/${RoutesPath.ENTER_CODE}`}
            element={<EnterCode />}
          ></Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
