import React, { Component } from "react";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { BottomNavigation, Text } from 'react-native-paper';
import BottomComponent from './components/bottom';

import thunk from "redux-thunk";
import logger from "redux-logger";

import * as reducers from "./reducers";

import AppContainer from "./config/router";
import TabNavigator from './config/tabstack';


import { LOGOUT_SUCCESS } from "./config/action-types/authenticate";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const middleware = [
  thunk,
  logger
];

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(...middleware))(createStore);
const reducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) { // If the user have successfully signed out and ended his/her session
    state = undefined // Reset all state to remove cached data of the previous session
  }
  return reducer(state, action)
}

const store = createStoreWithMiddleware(rootReducer);

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2d8259',
    accent: 'yellow',
    surface: 'green',
    backdrop: 'green',
    placeholder: 'green',
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppContainer> 
            
          </AppContainer>
          
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
