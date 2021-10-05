import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from '../features/auth/login/Login'
import ForgotPage from '../features/auth/forgot/Forgot'
import ErrorPage from '../features/404/404';
import HomeDashboard from '../features/dashboard/home/HomeDashboard';
import DashboardLayout from '../utilities/DashboardLayout';

function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/forgot-password" component={ForgotPage} />
          <DashboardLayout exact path="/dashboard" component={HomeDashboard} />
          <Route exact path="*" component={ErrorPage} />   
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute;
