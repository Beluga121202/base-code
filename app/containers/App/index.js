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
import Home from '../Home/LoadableHome';
import { defaultTheme } from '../../components/themes/defaultTheme';
import Registration from '../Register/LoadableRegister';
import ResetPassword from '../ResetPassword/LoadableResetPassWord';
import Activation from '../Activation';
import ContainerHome from './layout/ContainerHome';
import ContainerAdmin from './layout/ContainerAdmin';
import ProductManagement from '../Admin/ProductManagement/LoadableProductManagement';
import ShoesPage from '../PageShoes/LoadableMenShoes';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Switch>
          <ContainerAdmin
            exact
            path="/admin/product_management"
            component={ProductManagement}
          />
          <ContainerHome exact path="/" component={Home} />
          <ContainerHome exact path="/register" component={Registration} />
          <ContainerHome exact path="/shoes" component={ShoesPage} />
          <ContainerHome
            exact
            path="/reset-password"
            component={ResetPassword}
          />
          <Route exact path="/activate" render={() => <Activation />} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
