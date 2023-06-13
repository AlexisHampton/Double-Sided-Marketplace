import user from "./user.js";
import { database } from "./config.js";
import { collection, getDocs, addDoc, Timestamp, doc, setDoc, onSnapshot, where, limit, orderBy, getDoc, query, DocumentReference } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";


export default class student extends user{

    school;

    constructor(school, email, phoneNumber)
    {        
        super(school, email, phoneNumber, 1, "Students");
        this.school = school;
        console.log("user" + this.userID);
    }

    async MatchToTasks()
    {
        let allTasks = new Object(); //names of tasks: how many skills matched
        const snapShot = await getDoc(doc(database,this.userID.path));
        let studentSkills = snapShot.data().skills;  

        const querySnapshot = await getDocs(collection(database, "Tasks"));
        querySnapshot.forEach((doc) => {
            let taskSkills = doc.skills;
            let numSkills = super.GetSameSkillCount(taskSkills, studentSkills);
            allTasks[doc.get("name")] = numSkills;
            });
        var bestTasks = [];

        //get top 10 tasks from allTasks
        while(bestTasks.length < 10 && allTasks != null ) {
            let best = 0;
            let bestName = "";
            for(var task in allTasks)
            {
                if(allTasks[task] > best){
                    best = allTasks[task];
                    bestName = task;
                }
            }
            bestTasks.push(bestName);
            delete allTasks[bestName];
        }
        return bestTasks;
    }

    async LoadUser()
    {
        const snapShot = await getDoc(doc(database,this.userID.path));
        return snapShot.data();
    }

    MarkTaskCompleted(task_id)
    {
        let data = {
            tasks_completed: [task_id]

        };
        setDoc(doc( database, this.userID.path), data, {merge: true})
    }

    MarkTaskInProgress(task_id)
    {
        let data = {
            tasks_in_progress: [task_id]

        };
        setDoc(doc(database, this.userID.path), data, {merge: true})
    }

     async GetAllCompletedTasks()
    {
        const q = query(
            collection(database, 'Tasks'), 
            where("student_id","==", this.userID),
            where("submission_link", "!=", null) 
        );

        let tasksForCompanyDocs = await getDocs(q);
        return tasksForCompanyDocs;
    }

    async GetAllInProgressTasks()
    {
        const q = query(
            collection(database, 'Tasks'), 
            where("student_id","==", this.userID),
            where("submission_link", "==", null) 
        );

        let tasksForCompanyDocs = await getDocs(q);
        return tasksForCompanyDocs;
    }

}

