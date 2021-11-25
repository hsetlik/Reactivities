import {Item, Button, Segment, Icon, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendee from './ActivityListItemAttendee';

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
                {activity.isCancelled && (
                    <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}} />
                )}
                <Item.Group >
                    <Item>
                        <Item.Image size='tiny' circular src={activity.host?.image || '/assets/user.png'}/>
                        <Item.Content>
                            <Item.Header as={ Link } to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>Hosted by<Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                            { activity.isHost && (
                                <Item.Description>
                                    <Label color='orange'>
                                        You are the host
                                    </Label>
                                </Item.Description>
                            )}
                            { activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label color='green'>
                                        You are going
                                    </Label>
                                </Item.Description>
                            )}
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
               <ActivityListItemAttendee attendees={activity.attendees!} />
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