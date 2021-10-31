import {Item, Button, Segment, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props) {
    //const [target, setTarget] = useState('');
    //const {activityStore} = useStore();
    /*
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, activity: Activity){
        setTarget(e.currentTarget.name);
        deleteActivity(activity.id);
    }
    */
    return (
        <Segment.Group>
            <Segment>
                <Item.Group >
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={ Link } to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>Hosted by ___</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm' )}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                as={Link} 
                to={`/activities/${activity.id}`}
                color='teal'
                floated='right'
                content='View'
                />
             </Segment>
        </Segment.Group>
    );
}