import React, { SyntheticEvent, useState } from "react";
import {Button, Item, List, Segment, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';


export default function ActivityList() {

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
               {
                   activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => activityStore.setSelectedActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={ (e) => handleActivityDelete(e, activity)}
                                    floated='right'
                                    color='red'
                                    content='Delete'
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                   ))
                }
           </Item.Group>
       </Segment>
    )
}