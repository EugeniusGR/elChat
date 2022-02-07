import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { RoutesPath } from './constants';
import WelcomeScreen from './screens/WelcomeScreen';
import EnterCode from './screens/EnterCode';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomeScreen />}></Route>
        <Route
          path={`/${RoutesPath.ENTER_CODE}`}
          element={<EnterCode />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
