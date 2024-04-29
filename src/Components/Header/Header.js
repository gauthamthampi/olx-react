import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useAuth } from '../../store/FirebaseContext';
import {getAuth, signOut} from 'firebase/auth'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { FirebaseContext } from '../../store/FirebaseContext';
function Header() {
  const firebase = useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const user = useAuth();
  const history = useHistory()

  const handleLogin = () => {
    if(!user){
      history.push("/login")
    }else{
      signOut(auth)
      .then(()=>{
        history.push("/login")
      })
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
        <span>{user? `Welcome ${user.displayName}`: "Login here ->"}</span>
          <hr />
        </div>
        <div className='logout'>
          <span>{user ?
          <button class="button-27" role="button" 
          onClick={handleLogin}>Logout</button> : <button class="button-27" role="button" 
          onClick={handleLogin}>Login</button>}</span>
        </div>
       
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
