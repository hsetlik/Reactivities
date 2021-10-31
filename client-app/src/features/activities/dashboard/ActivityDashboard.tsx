import {useEffect} from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import {observer} from 'mobx-react-lite'
import LoadingComponent from "../../../app/layout/LoadingComponents";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {activityRegistry, loadActivities} = activityStore;
    useEffect(() => {
        if (activityRegistry.size <= 1 ) loadActivities();
    }, [loadActivities, activityRegistry]);
    if(activityStore.loadingInitial) {
        return <LoadingComponent />
    }
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})