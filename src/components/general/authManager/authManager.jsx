import React, { useEffect, useState } from 'react';

const AuthManager = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const signedIn = sessionStorage.getItem('sign') === 'true';
    setIsSignedIn(signedIn);
  }, []);

  if (isSignedIn) {
    return null;
  }

  return <>{children}</>;
};

export default AuthManager;
