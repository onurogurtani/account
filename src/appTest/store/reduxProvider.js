import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { initialState, reducer } from './reducer';
import thunk from 'redux-thunk';

const RenderWithProviders = ({ children, reduxState }) => {
  const store = createStore(reducer, reduxState || initialState, applyMiddleware(thunk));
  return <Provider store={store}>{children}</Provider>;
};

export default RenderWithProviders;
