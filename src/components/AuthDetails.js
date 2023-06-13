import React, { useEffect, useState} from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {
    const [ authUser, setAuthUser ] = useState(null);

    useEffect (() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

    const userSignOut = () => {
        signOut(auth).then (() => {
            console.log('sign out success')
        }).catch (error => console.log(error))
    }
    return (
        <div>{ authUser ? <>Signed In <button onClick={userSignOut}>Sign Out</button></> : <>Signed Out</>}</div>
    )
}

export default AuthDetails