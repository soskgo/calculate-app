import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StepOnePage from './components/StepOnePage';
import StepTwoPage from './components/StepTwoPage';
import StepThreePage from './components/StepThreePage';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<StepOnePage />} />
        <Route path='/StepTwo' element={<StepTwoPage />} />
        <Route path='/StepThree' element={<StepThreePage />} />
      </Routes>
    </Router>
  );
};

export default App;
