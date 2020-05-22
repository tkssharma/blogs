/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ApolloContext } from 'react-apollo';
import { TranslationCtx } from '../HOCs/transaltionCtx';
import RegisterComponent from '../components/register';
import registerQuery from '../graphql/query/register';
import UserInfoHook from '../hooks/userinfo';
import { ConfigCtx } from '../HOCs/configCtx';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setUserInfo] = UserInfoHook();
  const { client } = useContext(ApolloContext);
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);

  function onRegisterResponse({ registerData }) {
    const { success } = registerData;
    if (!success) {
      setError('Something went wrong!');
      setIsLoading(false);
      return;
    }
    setIsSignupCompleted(true);
  }
  function onRegisterError(
    { graphQLErrors, networkError } = { networkError: 'Something went wrong!' },
  ) {
    if (networkError) {
      setError('Something went wrong!');
      setIsLoading(false);
      return;
    }
    const [firstError] = graphQLErrors;
    setError(firstError.message);
    setIsLoading(false);
  }

  function tryRegister({ email, password, username }) {
    setError('');
    setIsLoading(true);
    client
      .query({
        fetchPolicy: 'no-cache',
        query: registerQuery,
        variables: {
          email,
          username,
          password,
        },
      })
      .then(({ data }) => onRegisterResponse(data))
      .catch(onRegisterError);
  }

  if (isSignupCompleted) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="page__container">
      <RegisterComponent
        onSubmit={tryRegister}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
