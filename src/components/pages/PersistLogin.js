import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useRefreshToken from 'components/hooks/useRefreshToken';
import useAuth from 'components/context/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth.auth ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{ !auth.auth  ? <p>Loading</p> : <Outlet />}</>;
};

export default PersistLogin;