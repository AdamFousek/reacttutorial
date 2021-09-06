import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLogggedIn: false,
  login: (token) => { },
  logout: () => { }
});

const calculateTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expTime = new Date(expirationTime).getTime();

  return expTime - currentTime;
}

const getTokenFromStorage = () => {
  const storedToken = localStorage.getItem('token');
  const expTime = localStorage.getItem('expTime');

  const remainingTime = calculateTime(+expTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    return {
      token: null,
      duration: 0,
    };
  }

  return {
    token: storedToken,
    duration: remainingTime
  };
}

export const AuthContexProvider = (props) => {
  const { token: initToken, duration: remainingTime } = getTokenFromStorage();
  const [token, setToken] = useState(initToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expTime', expirationTime);
    const remainingTime = calculateTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  useEffect(() => {
    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }, [remainingTime, logoutHandler]);

  const contextValue = {
    token: token,
    isLogggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext;
