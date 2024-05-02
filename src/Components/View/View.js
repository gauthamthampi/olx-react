import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './View.css';

function View() {
 const { productId } = useParams();
 const { firebase } = useContext(FirebaseContext);
 const [selectedProduct, setSelectedProduct] = useState(null);
 const [sellerDetails, setSellerDetails] = useState(null); // State to hold seller details

 useEffect(() => {
    const getProductDetails = async () => {
      const db = getFirestore(firebase);
      const productRef = doc(db, 'products', productId);
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        setSelectedProduct({ ...productDoc.data(), id: productDoc.id });
        // Fetch seller details using the userId from the product document
        const userRef = doc(db, 'users', productDoc.data().userId);
        const userDoc = await getDoc(userRef);
        console.log(userDoc.data()+"doc");
        if (userDoc.exists()) {
          setSellerDetails(userDoc.data()); // Set seller details
          
        }
      } else {
        setSelectedProduct(null);
      }
    };
    console.log("seller");
    if (productId) {
      getProductDetails(); 
    }
 }, [firebase, productId]);

 if (!selectedProduct) {
    return <div>Loading...</div>;
 }

 return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={selectedProduct.url} alt={selectedProduct.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {selectedProduct.price}</p>
          <span>{selectedProduct.name}</span>
          <p>{selectedProduct.category}</p>
          <span>{selectedProduct.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {/* Display seller details */}
          {!sellerDetails && (
            <>
              <p>Name: Dragon</p>
              <p>Email : test@gmail.com</p>
            </>
          )}
        </div>
      </div>
    </div>
 );
}

export default View;
