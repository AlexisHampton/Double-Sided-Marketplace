import user from "./user.js";
import { database } from "./config.js";
import { collection, getDocs, addDoc, Timestamp, doc, setDoc, onSnapshot, where, limit, orderBy, getDoc, query, DocumentReference } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";


export default class company extends user{

    company;

    constructor(company, email, phoneNumber)
    {
        super(company,email, phoneNumber, 0, "Companies");
        this.company = company;
    }

    //sends user data, user data is first, company data is second
    LoadUser()
    {
        let q = query(
            collection(database, 'Companies'), 
            where("name","==", this.userName)
        );
        let companySnapshot = getDoc(q);
        let snapShot = getDoc(this.task_id);
        
        if(snapShot.exists() && companySnapshot.exists())
            return [snapShot, companySnapshot];
        return null;
    }

    MarkTaskCompleted(task_id)
    {
        let data = {
            tasks_completed: [task_id]

        };
        setDoc(doc( database, this.userID.path), data, {merge: true})
    }

    MarkTaskCreated(task_id)
    {
        let data = {
            tasks_created: [task_id]

        };
        setDoc(doc( database, this.userID.path), data, {merge: true})
    }

    async GetAllCompletedTasks()
    {
        const q = query(
            collection(database, 'Tasks'), 
            where("organization","==", this.company),
            where("submission_link", "!=", null) 
        );

        let tasksForCompanyDocs = await getDocs(q);
        return tasksForCompanyDocs;
    }

    async GetAllInProgressTasks()
    {
        const q = query(
            collection(database, 'Tasks'), 
            where("organization","==", this.company),
            where("submission_link", "==", null) 
        );

        let tasksForCompanyDocs = await getDocs(q);
        return tasksForCompanyDocs;
    }
}