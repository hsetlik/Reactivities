import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from '../../features/errors/NotFound';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';

function App() {
  const {activityStore} = useStore(); //individual stores are destructured
  const location = useLocation();
  return (
    <> 
      <Route exact path={'/'} component={HomePage} />
      <Route
      path='/(.+)'
      render={() => (
        <>
        <NavBar />
          <Container style={{margin: '7em'}}>
            <Switch>
              <Route exact path={'/activities'} component={ActivityDashboard} />
              <Route path={'/activities/:id'} component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
              <Route path='/server-error' component={ServerError} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </>
      )} 
      />
    </>
  );
}

export default observer(App);
