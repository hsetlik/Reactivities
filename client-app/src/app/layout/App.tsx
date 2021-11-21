import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from '../../features/errors/NotFound';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import { NavLink } from 'react-router-dom';


function App() {
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <> 
      <ModalContainer />
      <Routes>
        <Route path='/' element = {<HomePage />}/>
      </Routes>
        <>
        <NavBar />
          <Container style={{margin: '7em'}}>
            <Routes>
              <Route path='/activities' element={<ActivityDashboard />} />
              <Route path={'/activities/:id'} element={<ActivityDetails />} />
              <Route path='/errors' element={<TestErrors />} />
              <Route path='/server-error' element={<ServerError />} />
              <Route path='/login' element={<LoginForm />} />
              <Route element={<NotFound />} />
            </Routes>
          </Container>
        </>
    </>
  );
}

export default observer(App);
