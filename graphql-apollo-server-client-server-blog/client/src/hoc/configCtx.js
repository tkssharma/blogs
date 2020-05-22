import React, { createContext, useReducer } from 'react';

const TITLE_DEFAULT = 'Care Program';

const defaultValue = () => ({
  title: TITLE_DEFAULT,
});

const ConfigReducer = (state, action) => {
  switch (action.type) {
    case 'set-title': {
      const newTitle = action.title
        ? `${action.title} | ${TITLE_DEFAULT}`
        : TITLE_DEFAULT;
      return { ...state, title: newTitle };
    }
    default:
      return state;
  }
};

export const ConfigCtx = createContext({});

export default function ConfigCtxProvider({ children }) {
  const [state, dispatch] = useReducer(ConfigReducer, defaultValue());
  return (
    <ConfigCtx.Provider value={{ state, dispatch }}>
      {children}
    </ConfigCtx.Provider>
  );
}
