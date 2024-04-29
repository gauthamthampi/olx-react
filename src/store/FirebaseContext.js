import {Children, createContext, useContext, useEffect, useState} from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'

export const FirebaseContext = createContext(null);

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const firebase = useContext(FirebaseContext)
    const auth = getAuth(firebase)

    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
        setUser(user);
    });

    return () => {
        unsubscribe();
    }
    },[auth])

    return <AuthContext.Provider value={user}>
        {children}
        </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

