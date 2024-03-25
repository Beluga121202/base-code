/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Switch, Route, useLocation } from 'react-router-dom';
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
import OrderManagement from '../Admin/OrderManagement/LoadableOrder';
import CustomerManagement from '../Admin/CustomerManagement/LoadableCustomer';
import ProfitManagement from '../Admin/ProfitManagement/LoadableProfitManagement';
import ShoesPage from '../PageShoes/LoadableMenShoes';
import DetailProduct from '../DetailProduct/LoadableDetailProduct';
import Cart from '../Cart/LoadableCart';
import Search from '../Search/LoadableSearch';
import CheckOut from '../CheckOut/LoadableCheckOut';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <ScrollToTop />
        <Switch>
          <ContainerAdmin
            exact
            path="/admin/product_management"
            component={ProductManagement}
            placeholder="Tìm kiếm theo tên sản phẩm"
          />
          <ContainerAdmin
            exact
            path="/admin/order_management"
            component={OrderManagement}
            placeholder="Tìm kiếm theo số điện thoại"
          />
          <ContainerAdmin
            exact
            path="/admin/customer_management"
            component={CustomerManagement}
            placeholder="Tìm kiếm theo số điện thoại"
          />
          <ContainerAdmin
            exact
            path="/admin/profit_management"
            component={ProfitManagement}
            hidden
          />
          <ContainerHome exact path="/" component={Home} />
          <ContainerHome exact path="/register" component={Registration} />
          <Route exact path="/shoes">
            <ContainerHome component={ShoesPage} />
          </Route>
          <Route exact path="/detail_product/:id">
            <ContainerHome component={DetailProduct} />
          </Route>
          <Route exact path="/search/:search">
            <ContainerHome component={Search} />
          </Route>
          <ContainerHome
            exact
            path="/reset-password"
            component={ResetPassword}
          />
          <ContainerHome exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={CheckOut} />
          <Route exact path="/activate" render={() => <Activation />} />
          <Route path="" render={() => <ErrorPage code="404" />} />
        </Switch>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
}
