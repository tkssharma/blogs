import React from 'react';

import useApi from '../lib/use-api';
import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

export default function Home() {
  const { user, loading } = useFetchUser();
  const { response, error, isLoading } = useApi('/api/billing-info');

  return (
    <Layout user={user} loading={loading}>
      <h1>Billing Info</h1>

      {isLoading && (
        <p>
          Loading billing info...
        </p>
      )}

      {!isLoading && (
        <>
          <pre>{JSON.stringify(response || error, null, 2)}</pre>
        </>
      )}
    </Layout>
  )
};
