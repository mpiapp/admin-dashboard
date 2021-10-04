import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../features/auth/login/Login'
import RegisterPage from '../features/auth/register/Register'
import ForgotPage from '../features/auth/forgot/Forgot'
import ErrorPage from '../features/404/404';

function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forgot-password" component={ForgotPage} />
          <Route exact path="*" component={ErrorPage} />   
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute;
