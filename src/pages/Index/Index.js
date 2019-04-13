/**
 * Comandos para criação automatica dos componentes
 * rnsc (react-snippets) cria um Staless Component
 * rnc (react-snippets) cria um Component
 */
import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from '../Routes/Routes';

const App = () => <Routes />;

export default App;
