import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Activity } from '../models/activity';

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
       this.loadingInitial = true;
     //do the asynchronous API calls in a try/catch block
     try {
         const activities = await agent.Activities.list();
         runInAction(() => {
          activities.forEach(activity => {
            this.setActivity(activity);
          });
            this.loadingInitial = false;
         });
     } catch (error) {
        console.log(error);
        runInAction(() => this.loadingInitial = false);
     }
   } 

   loadActivity = async (id: string) => {
       let activity = this.activityRegistry.get(id);
       if(activity !== undefined)
       {
            this.selectedActivity = activity;
            return activity;
       } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.selectedActivity = activity;
                this.setActivity(activity);
                this.loadingInitial = false;
                return activity;
            } catch (error) {
                console.log(error);
            }
       }
        
   }

   private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0];
    this.activityRegistry.set(activity.id, activity); 
   }

   setEditMode = (state: boolean) => {
       this.editMode = state;
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
            // if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
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