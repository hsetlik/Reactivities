
import React from "react";
import { Button, Card, Image, Icon} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";



export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, cancelSelectedActivity, openForm} = activityStore;
    if(!activity) return <LoadingComponent />;
    return (
<Card>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
    <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
            <span className='date'>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
            {activity.description}
        </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths='2'>
            <Button basic color='blue' content='Edit' onClick={() => openForm(activity.id)} />
            <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity} />
        </Button.Group> 
    </Card.Content>
</Card>

    )
}