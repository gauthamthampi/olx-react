import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext, ProductContext } from '../../store/FirebaseContext';
import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Posts() {
 const firebase = useContext(FirebaseContext);
 const [products, setProducts] = useState([]);
 const db = getFirestore(firebase);
//  const { selectedProduct , setSelectedProduct } = useContext(ProductContext);
 const history = useHistory()
 

 useEffect(() => {
    const fetchData = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProducts(productsList);
    };
    fetchData();
 }, [db]); 

 function clickedCard(product) {
  
  // setSelectedProduct(product);
  history.push(`/view/${product.id}`)
}
 
 return (
    <div className="postParentDiv">
      <div className="cards">
        {products.map(product => (
          <div onClick={()=>clickedCard(product)} key={product.id} className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src={product.url} alt={product.name} /> 
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p> 
              <span className="kilometer">{product.name}</span>
              <p className="name">{product.category}</p>
            </div>
            <div className="date">
              <span>Posted on : {product.createdAt}</span> 
            </div>
          </div>
        ))}
      </div>


      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
      {/* Your existing JSX */}
    </div>
 );
}

export default Posts;
