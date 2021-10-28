import { Fragment, useEffect } from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite'

function App() {
  const {activityStore} = useStore(); //individual stores are destructured
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if(activityStore.loadingInitial) {
    return <LoadingComponent />
  }
  return (
    <Fragment>
    <NavBar />
    <Container style={{margin: '7em'}}>
      <ActivityDashboard />
   </Container>
   </Fragment>
  );
}

export default observer(App);