/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from '../app.json';
import React from 'react';
import { render } from 'react-native';

AppRegistry.registerComponent(appName, () => App);
render(<App />, document.getElementById('root'));