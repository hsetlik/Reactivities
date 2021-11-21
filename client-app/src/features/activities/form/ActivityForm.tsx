import { useEffect } from "react";
import { useState } from "react";
import { Button,  Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer} from 'mobx-react-lite';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingComponent from "../../../app/layout/LoadingComponents";
import {v4 as uuid} from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";


export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const navigate = useNavigate();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const[activity, setActivity] = useState<Activity>({
        id: "",
        title: "",
        date: null,
        description: "",
        category: "",
        city: "",
        venue: ""
    });

    const validationSchema = Yup.object({
         title: Yup.string().required('Activity Title is required'),
         description: Yup.string().required(),
         category: Yup.string().required(),
         date: Yup.string().required('Date is required').nullable(),
         city: Yup.string().required(),
         venue: Yup.string().required()
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        if(activity.id.length === 0) 
        {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                navigate(`/activities/${newActivity.id}`);
            })
        } else {
            updateActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            })
        }
        console.log("Submitting form changes...");
    }

    if(loadingInitial) return( <LoadingComponent />);

    return(
        <Segment clearing>
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleFormSubmit(values)}
            >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='offonSubmit={handleSubmit}' >
                    <MyTextInput name='title' placeholder='Title' />
                    <MyTextArea rows={3} placeholder='Description' name='description' />
                    <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                    <MyDateInput
                        placeholderText='Date' 
                        name='date'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy'
                       />
                    <MyTextInput placeholder='City'  name='city' />
                    <MyTextInput placeholder='Venue'  name='venue' />
                    <Button
                        disabled={isSubmitting || !isValid || !dirty} 
                        loading={loading} 
                        floated='right' 
                        positive type='submit' 
                        content='Submit' />
                    <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                </Form>
                )}
            </Formik>
        </Segment>
        );
})