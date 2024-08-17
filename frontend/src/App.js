import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Polls from './pages/Polls';
import Surveys from './pages/Surveys';
import Results from './pages/Results';
import Admin from './pages/Admin';
import Home from './pages/Home/Home';
import BaseLayout from './layouts/BaseLayout';
import RegisterPage from './pages/Auth/Register';

const App = () => {

  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/results/poll/:id" render={({ match }) => (
            <Results type="poll" id={match.params.id} />
          )} />
          <Route path="/results/survey/:id" render={({ match }) => (
            <Results type="survey" id={match.params.id} />
          )} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BaseLayout>
    </Router>
  );
};

export default App;
