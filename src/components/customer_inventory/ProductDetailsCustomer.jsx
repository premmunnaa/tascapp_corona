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

const Tovendor =()=>{
  history.push({
    pathname: '/VendorInfo',
    state: { toggle_variable:0,vendorid:vendorid}
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

       
    <font className = "font-header"> {Name}</font> </div>
    <div class="ant-card-meta-description" style = {{paddingLeft:"5rem"}}>{Category} by {Company}</div>
    <div class="ant-card-meta-description" style = {{paddingLeft:"5rem",paddingTop:"1rem"}}>{ShortDes}</div>
    <br></br>
  <span><Col span ={4}> <Button type = "submit" style = {{width : 300, height : 50,paddingRight:20}}  className = "ant-btn ant-btn-primary" onClick = {ToCart}>Add to Cart</Button></Col><Col span = {4} style = {{paddingLeft:10}}><Button type = "submit" style = {{width : 300, height : 50}}  className = "ant-btn ant-btn-primary" onClick = {Tovendor}>Vendor Infomation</Button></Col></span> 
    
 
    <br></br>
    <div style={{paddingTop : "3rem"}} ><font className = "font-subheadings" >PRODUCT DETAILS </font></div>
    
    <p className ="ant-card-meta-description" style = {{paddingRight:10,paddingTop:10}}>{ProductDetails}</p>
        <div ><font className = "font-subheadings" >DESIGN DETAILS </font> </div>
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