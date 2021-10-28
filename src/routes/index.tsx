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
import LegalDocument from '../features_app/dashboard/legal_document/LegalDocument';
import CompanyType from '../features_app/dashboard/company_type/CompanyType';
import MasterUserSuperadmin from '../features_app/dashboard/user_superadmin/MasterUserSuperadmin';
import MasterVendorCategory from '../features_app/dashboard/vendor_category/MasterVendorCategory';
import MasterBuyerCategory from '../features_app/dashboard/buyer_category/MasterBuyerCategory';

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
          <DashboardLayout exact path="/dashboard/legal-document" component={LegalDocument} />
          <DashboardLayout exact path="/dashboard/type-company" component={CompanyType} />
          <DashboardLayout exact path="/dashboard/users-superadmin" component={MasterUserSuperadmin} />
          <DashboardLayout exact path="/dashboard/vendor-category" component={MasterVendorCategory} />
          <DashboardLayout exact path="/dashboard/buyer-category" component={MasterBuyerCategory} />
          <DashboardLayout exact path="/dashboard/setting" component={SettingPage} />
          <Route exact path="*" component={ErrorPage} />   
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRoute;
