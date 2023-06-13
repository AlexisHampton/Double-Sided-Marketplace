
import { database } from "./config.js";
import { collection, getDoc, addDoc, setDoc, Timestamp, onSnapshot, doc, where, limit, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

export default class Task{

    taskName;
    task_id;
    static taskStatus = [
        "undone", 
        "doing", 
        "pending", 
        "completed"]
    //creating a task, deadline is a date, skills is []
    constructor(name, description, company_id, deadline, skills)
    {
        this.AddTask(name, description, company_id, deadline, skills)
    }

    //adds task into db
    async AddTask(name, description, company_id, deadline, skills) {

        this.taskName = name;
        try {
            const docRef = await addDoc(collection(database, "Tasks"), {
              name: name,
              description: description,
              company_id: company_id,
              deadline: Timestamp.fromDate(deadline),
              skills: skills,
              status: 0,
              submission_link: null,
              student_id: null
            });
          
            this.task_id = docRef;
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    LoadTask()
    {
        snapShot = getDoc(this.task_id);
        if(snapShot.exists())
        {
            return snapShot.data();
        }
        return null;
    }

    //status is an int, returns a string
    static GetTaskStatus(status)
    {
        return this.taskStatus[status];
    }

    static GetAllTasksWithoutStudent()
    {
        query = query(
            collection(database, 'Tasks'), 
            where("student_id","==", null),
        )
        noStudentDocs = getDocs(query);
        return noStudentDocs.data();
    }

    static GetAllTasksWithoutSubmission()
    {
        query = query(
            collection(database, 'Tasks'), 
            where("submission_link","==", null),
        )
        noSubmissionLinkDocs = getDocs(query);
        return noSubmissionLinkDocs.data();
    }

    static GetAllTasksForStudent(student_id)
    {
        query = query(
            collection(database, 'Tasks'), 
            where("student_id","==", student_id),
        )
        tasksForStudentDocs = getDocs(query);
        return tasksForStudentDocs.data();
    }

    static GetAllTasksForCompany(company_id)
    {
        query = query(
            collection(database, 'Tasks'), 
            where("company_id","==", company_id),
        )
        tasksForCompanyDocs = getDocs(query);
        return tasksForCompanyDocs.data();
    }

    GetSkills()
    {
        return this.LoadTask().skills;        
    }

    AddLinkToTask(link)
    {
        let data = {
            submission_link: link
        };
        setDoc(doc(database, this.task_id.path), data, {merge: true});
        this.UpdateTaskStatusCode(2);
    }

    AddStudentToTask(student_id)
    {
        let data = {
            student_id: student_id
        };
        setDoc(doc(database, this.task_id.path), data, {merge:true});
        this.UpdateTaskStatusCode(1);
    }

    AddFeedbackToTask(feedback)
    {
        let data = {
            feedback: feedback
        };
        setDoc(doc(database, this.task_id.path), data, {merge:true});
    }
    
    //takes an integer
    UpdateTaskStatusCode(statusCode)
    {
        let data = {
            status: statusCode
        };
        setDoc(doc(database, this.task_id.path), data, {merge:true});
    }

    //takes a boolean
    UpdateIsTaskApproved(approval)
    {
        let data = {
            approved: approval
        };
        setDoc(doc(database, this.task_id.path), data, {merge:true});
        this.UpdateTaskStatusCode(3);
    }



}
