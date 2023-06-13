import { database } from "./config.js";
import { collection, getDocs, addDoc, Timestamp, doc, setDoc, onSnapshot, where, limit, orderBy, getDoc, query, DocumentReference } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

export default class user{

    userID = "";
    userName = "";

    constructor(org, email, phoneNumber, isStudent, db)
    {
        this.AddUserToDatabase(org, email, phoneNumber, isStudent, db);
    }

    async AddUserToDatabase(org, email, phoneNumber, isStudent, db)
    {
        try {
            const newId = await addDoc(collection(database, db), {
                phone_number: phoneNumber,
                email: email,
                is_student: isStudent,
                organization: org 
            });
          
            this.userID = newId;
            console.log("Document written with ID: ", this.userID);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    //update information, skills is an []
    UpdateUser(name, profilePic, location, bio, skills, db)
    {
        console.log("user: " + this.userID.path);
        this.userName = name;
        let data = {
            name: name,
            profile_pic: profilePic,
            location: location,
            bio: bio,
            skills: skills
        };
       
        setDoc(doc( database, this.userID.path), data, {merge: true});
    }


    GetSameSkillCount(firstSkills, secondSkills)
    {
        let sameCount = 0;
        for(let i = 0; i < firstSkills.length; i++){
            for(let j = 0; j < secondSkills.length;j++) {
                 if(firstSkills[i] == secondSkills[j]) 
                     sameCount += 1;
            }
        }

        return sameCount;

    }
}
