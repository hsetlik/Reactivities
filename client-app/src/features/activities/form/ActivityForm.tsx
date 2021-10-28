import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer} from 'mobx-react-lite'



export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;
    const emptyActivity: Activity = {
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: ""
    };
    const initialState = selectedActivity ?? emptyActivity;
    const[activity, setActivity] = useState(initialState);
    
    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
        console.log("Submitting form changes...");
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        //destructure to find out what's being changed
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} >
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' type='date' value={activity.date} name='date'  onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={closeForm}/>
            </Form>
        </Segment>
        );
})