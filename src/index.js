import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseApp from './firebase/config'
import { FirebaseContext } from './store/FirebaseContext';
import { AuthProvider } from './store/FirebaseContext';


ReactDOM.render(
<FirebaseContext.Provider value={firebaseApp}>
<AuthProvider>
<App />
</AuthProvider>
</FirebaseContext.Provider>
, document.getElementById('root'));
 