import { action, makeObservable, makeAutoObservable, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry: Map<string, Activity> = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading = false;
    loadingInitial = true;
    constructor() {
        makeAutoObservable(this);
    }
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }
    //note: using an arrow function automatically binds the function to the class instance
   loadActivities = async () => {
     //do the asynchronous API calls in a try/catch block
     try {
         const activities = await agent.Activities.list();
         runInAction(() => {
          activities.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            this.activityRegistry.set(activity.id, activity);
          });
            this.loadingInitial = false;
         });
     } catch (error) {
        console.log(error);
        runInAction(() => this.loadingInitial = false);
     }
   } 

   setSelectedActivity = (id: string) => {
       this.selectedActivity = this.activityRegistry.get(id);
   }
   
   cancelSelectedActivity = () => {
       this.selectedActivity = undefined;
   }

   setEditMode = (state: boolean) => {
       this.editMode = state;
   }

   openForm = (id?: string) => {
       id ? this.setSelectedActivity(id) :
       this.cancelSelectedActivity();
       this.setEditMode(true);
   }

   closeForm = () => {
       this.cancelSelectedActivity();
       this.setEditMode(false);
   }

   updateActivity = async (activity: Activity) => {
       this.loading = true;
       try {
        await agent.Activities.update(activity);
        runInAction(() => {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.loading = false;
            this.editMode = false;
        })
       } catch (error) {
           console.log(error);
           runInAction(() => {
               this.loading = false;
               this.editMode = false;
           });
       }
   }

   createActivity = async (activity: Activity) => {
       this.loading = true;
       activity.id = uuid();
       try {
           await agent.Activities.create(activity);
           runInAction(() => {
               this.activityRegistry.set(activity.id, activity);
               this.selectedActivity = activity;
               this.loading = false;
               this.editMode = false;
           })
       } catch (error) {
           console.log(error);
           runInAction(() => {
               this.loading = false;
               this.editMode = false;
           });
       }
   }

   deleteActivity = async (id: string) => {
       this.loading = true;
       try {
           await agent.Activities.delete(id);
           runInAction(() => {
             this.activityRegistry.delete(id);
             if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
            this.loading = false;
           });
       } catch (error) {
           console.log(error);
           runInAction(() => {
               this.loading = false;
           })
       }
   }
}