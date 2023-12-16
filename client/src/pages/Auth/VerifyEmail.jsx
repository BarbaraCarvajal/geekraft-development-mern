import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { Alert, CircularProgress } from "@mui/material";

const VerifyEmail = () => {
  // Utilizando el hook useAuth
  const auth = useAuth(); 
  const { user, setAuth, updateUser } = auth; 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get('emailToken'); 

  console.log(user);
  console.log("emailToken", emailToken);

  useEffect(() => {
    (async () => {
      if (user?.isVerified) {
        setTimeout(() => {
          return navigate("/login");
        }, 3000);
      } else {
        if (emailToken) {
          setIsLoading(true);
          const response = await axios.get(`/api/v1/auth/verify-email/${emailToken}`);
          setIsLoading(false);
          console.log("res", response);

          if (response.error) {
            return setError(response);
          }
          updateUser(response);
        }
      }
    })();
  }, [emailToken, user])


  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {user?.isVerified ? (
            <Alert severity='success'>
              <p>¡Tu correo electrónico ya está verificado!</p>
            </Alert>
          ) : (
            <div>
              {error.error ? (
                <Alert severity='error'>{error.message}</Alert>
              ) : null}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default VerifyEmail;
