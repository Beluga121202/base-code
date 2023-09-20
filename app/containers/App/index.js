/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Switch, Route } from 'react-router-dom';

import GlobalStyle from '../../global-styles';
import ErrorPage from '../../components/ErrorPage';
import Login from '../Login';
import { defaultTheme } from '../../components/themes/defaultTheme';
export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
