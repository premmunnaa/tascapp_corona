import React from 'react';
import { Link, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import {Row,Col,Button} from 'antd';
import * as firebase from 'firebase';
import '../../css/index.css';
import '../../css/mycss.css';


const ProductDetailsCustomer = props =>{

    const {
        Count,
        Company,
        Name,
        City,
        id,
        Image,
        Category,
        ProductDetails,
        DesignDetails,
        ShortDes,
        vendorid
       
      } = props;
      const db = firebase.firestore();

    const history = useHistory();

const ToChat =()=>{
  history.push({
    pathname: '/check',
    state: { id:id,vendorid:vendorid}
});
}

    const ToCart = ()=>{
    
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              const userRef = db.collection("User").doc(user.uid); 
              const collRef = db.collection("User").doc(user.uid).collection('AdminCart').doc();
              userRef.get().then(function(doc) {
                collRef.set({
                  Name : Name,
                  count : Count,
                  city :City,
                  company : Company,
                  id :id,
                  image : Image,
                  productdetails :ProductDetails,
                  shortdescription : ShortDes,
                  category :Category,
                  designdetails : DesignDetails
                 }).then(function() {
                   console.log("Document successfully written!");
                   history.push('/AdminCart')
               })
               .catch(function(error) {
                   console.error("Error writing document: ", error);
               });
             
              });
             
            } else {
            console.log("No user is signed in");
            }
          });
        
    }
    return(
        <div>
        <div>

       
    <font className = "font-header" style = {{paddingTop:10}}> {Name}</font> </div>
    <div class="ant-card-meta-description" style = {{paddingLeft:"5rem"}}>{Category} by {Company}</div>
    <div class="ant-card-meta-description" style = {{paddingLeft:"5rem",paddingTop:"1rem"}}>{ShortDes}</div>
    <br></br>
    <Button type = "submit" style = {{width : 300, height : 50}}  className = "ant-btn ant-btn-primary" onClick = {ToCart}>Add to Cart</Button>
 
    <br></br>
    <div style={{paddingTop : "3rem"}} ><font className = "font-subheader" >Product Details </font></div>
    
    <p className ="ant-card-meta-description" style = {{paddingRight:10,paddingTop:10}}>{ProductDetails}</p>
        <div ><font className = "font-subheader" >Design Details </font> </div>
        <p className ="ant-card-meta-description" style = {{paddingRight:10,paddingTop:10
        }}>
            <ul>
          {DesignDetails}
            </ul>
        
        </p>
    </div>
    )
}
export default ProductDetailsCustomer