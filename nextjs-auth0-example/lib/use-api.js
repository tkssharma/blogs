import fetch from 'isomorphic-unfetch';
import React, { useEffect, useState } from 'react';

function initialState(args) {
  return {
    response: null,
    error: null,
    isLoading: true,
    ...args
  };
}

export default (url, options = {}) => {
  const [state, setState] = useState(() => initialState());

  useEffect(() => {  
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          ...options
        });

        setState(initialState({
          response: await res.json(),
          isLoading: false
        }));
      } catch (error) {
        setState(initialState({
          error
        }));
      }
    };
    fetchData();
  }, []);
  return state;
};