import { SyntheticEvent, useState } from "react";
import {Button, Item, Segment, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'
import ActivityListItem from "./ActivityListItem";


export default observer(function ActivityList() {

    const [target, setTarget] = useState('');
    const {activityStore} = useStore();
    const {activitiesByDate, deleteActivity, loading} = activityStore;
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, activity: Activity){
        setTarget(e.currentTarget.name);
        deleteActivity(activity.id);
    }
    return (
       <Segment>
           <Item.Group divided>
               {activitiesByDate.map(activity => (
                   <ActivityListItem activity={activity} key={activity.id}/>
                ))}
           </Item.Group>
       </Segment>
    )
});