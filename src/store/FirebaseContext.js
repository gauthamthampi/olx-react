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

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [selectedProduct, setSelectedProduct] = useState();

//   return (
//     <ProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

export const useAuth = () => useContext(AuthContext);


