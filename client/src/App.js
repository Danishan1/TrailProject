import React from 'react';
import './App.css';
import { lazy, useEffect, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './component/SpecialPages/js/Loading';

const LoginForm = lazy(() => import('./component/Login/js/Login'))
const RegristerForm = lazy(() => import('./component/Registration/js/RegisterForm'))
const ChatApp = lazy(() => import('./component/Chat/js/ChatApp'))
const ErrorPage = lazy(() => import('./component/SpecialPages/js/ErrorPage'))




const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/isAuth', { withCredentials: true });

        if (response.data.isAuth) setAuthenticated(true);
        else setAuthenticated(false);

      } catch (err) {
        setAuthenticated(false);
      } finally {
        // setTimeout(() => {
        setLoading(false);
        // }, 2000); // Simulate a 2 second loading time
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loading />;
  }



  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={authenticated ? <Navigate to="/discuss" /> : <Navigate to="/login" />} />
            <Route path="/login" element={authenticated ? <Navigate to="/discuss" /> : <LoginForm />} />
            <Route path="/register/*" element={authenticated ? <Navigate to="/discuss" /> : <RegristerForm />} />
            <Route path="/discuss" element={authenticated ? <ChatApp /> : <Navigate to="/login" />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Suspense>



    </div>
  );
};

export default App;
