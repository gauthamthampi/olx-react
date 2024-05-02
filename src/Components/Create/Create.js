import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useAuth } from '../../store/FirebaseContext';
import { getAuth } from 'firebase/auth';
import {getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage'
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const [name,setName] = useState("")
  const [category,setCategory] = useState("")
  const [price,setPrice] = useState("")
  const [image,setImage] = useState(null)
  const firebase = useContext(FirebaseContext)
  const user = useAuth()
  const auth = getAuth(firebase)
  const db = getFirestore(firebase)
  const storage = getStorage(firebase)
  const date = new Date()
  const history = useHistory()
  const handleSubmit = async() => {
    if(!image){
      alert("Please select an image");
      return;
    }

    const storageRef = ref(storage,`image/${image.name}`)
    await uploadBytes(storageRef,image).then(()=>{
      console.log("Uploaded a file");
    });
    
    getDownloadURL(storageRef).then(async(url) => {
      console.log("UPLOADED IMG URL : "+url);
      const data = await addDoc(collection(db,"products"), {
        name:name,
        category:category,
        price:price,
        url:url,
        userId:user.uid,
        createdAt:date.toDateString()
    })
      history.push("/")
    })

  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         <h3 style={{margin:"40px"}}>Sell your products</h3>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
              type="number" 
              id="fname"
              value={price}
              onChange={(e)=>{
              setPrice(e.target.value)
              }} 
              name="Price" />
            <br />
       
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input type="file"
                   onChange={(e)=>{
                    setImage(e.target.files[0])}} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
