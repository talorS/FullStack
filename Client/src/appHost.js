import { Component } from 'react';
import authSrv from './AuthService/userAuth';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginComp from './Login/LoginPage';
import NewUserComp from './Login/NewUserPage';
import DashboardComp from './Main/DashboardHost';
import LogoutComp from './Login/LogoutPage';
import Typography from '@material-ui/core/Typography';

class HostComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          Movies - Subscriptions WebSite
        </Typography>
        <Switch>
          <Route exact path='/' component={LoginComp} />
          <Route path='/LogoutPage' component={LogoutComp} />
          <Route path='/NewUserPage' component={NewUserComp} />
          <Route path='/MainPage' render={(props) => (
            !authSrv.USER_AUTH.get().token? (
              <Redirect to="/" />
            ) : (
              <DashboardComp {...props}/>
            )
          )} />
        </Switch>
      </div>
    )
  }
}

export default HostComp;
