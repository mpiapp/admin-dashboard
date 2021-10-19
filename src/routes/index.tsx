import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../features_app/auth/login/Login'
import ForgotPage from '../features_app/auth/forgot/Forgot'
import ErrorPage from '../features_app/404/ErrorPage';
import HomeDashboard from '../features_app/dashboard/home/HomeDashboard';
import DashboardLayout from '../utilities/DashboardLayout';
import MasterModules from '../features_app/dashboard/modules/MasterModules';
import MasterRoles from '../features_app/dashboard/roles/MasterRoles';
import SettingPage from '../features_app/dashboard/setting/SettingPage';
import MasterCapabilities from '../features_app/dashboard/capabilities/MasterCapabilities';
import MasterFeatures from '../features_app/dashboard/features/MasterFeatures';
import MasterStatus from '../features_app/dashboard/status/MasterStatus';
import ConfigStatus from '../features_app/dashboard/status_config/ConfigStatus';
import PaymentTerms from '../features_app/dashboard/payment_terms/PaymentTerms';

function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPage} />
          <DashboardLayout exact path="/dashboard" component={HomeDashboard} />
          <DashboardLayout exact path="/dashboard/modules" component={MasterModules} />
          <DashboardLayout exact path="/dashboard/roles" component={MasterRoles} />
          <DashboardLayout exact path="/dashboard/capabilities" component={MasterCapabilities} />
          <DashboardLayout exact path="/dashboard/features" component={MasterFeatures} />
          <DashboardLayout exact path="/dashboard/status" component={MasterStatus} />
          <DashboardLayout exact path="/dashboard/status-config" component={ConfigStatus} />
          <DashboardLayout exact path="/dashboard/payment-terms" component={PaymentTerms} />
          <DashboardLayout exact path="/dashboard/setting" component={SettingPage} />
          <Route exact path="*" component={ErrorPage} />   
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute;
