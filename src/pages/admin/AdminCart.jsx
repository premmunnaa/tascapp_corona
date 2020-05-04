import React from 'react'
import {useLocation} from 'react-router-dom';
import 'antd/dist/antd.css';

import { Col,Row,Card} from 'antd';
import CustomerCart from '../../components/customer_inventory/CustomerCart'
import SiderMenuAdmin from '../../components/SiderMenuAdmin'
import CardComp from '../../components/customer_inventory/CardComp'
import Cascader from '../../components/customer_inventory/Cascader'
import {Layout} from 'antd';
import { Input } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import * as firebase from 'firebase';
import "../../css/mycss.css"
const { Search } = Input;
const {Content} = Layout;
const db = firebase.firestore();
const AdminCart =props =>{
 const[CartData,UpdateData] = useState([]);
 let FinalCartData = [];
 Array.prototype.push.apply(FinalCartData,CartData)
 FinalCartData = FinalCartData.filter((card,index)=> FinalCartData.indexOf(card)==index) //remove duplicates
 console.log("FinalCartData : ",FinalCartData)
 console.log("CartData : ",CartData)
  useEffect(()=>{
        var dataarr=[];
    // User logged in already or has just logged in
  //   let Promises = new Promise((succeed,fail)=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
       var  UserId = user.uid;
        console.log(UserId);
      var collRef=  db.collection("User").doc(UserId).collection("AdminCart");
      collRef.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              dataarr.push(doc.data());
            
          });
      }).then(function() {
     
          UpdateData(dataarr);
      })
      console.log(dataarr); 
    
      } else {
        // User not logged in or has just logged out.
      }
    });
            
},[])


    return(
<Layout style={{ minHeight: '100vh' }}>
                <SiderMenuAdmin />
                <Content>
                <div style = {{paddingLeft:"1rem",paddingTop:"1rem"}} className  = "font-header">WISHLIST</div>
                <Row style = {{paddingLeft:"2rem",paddingTop:"2rem"}}>{

                FinalCartData.map((item)=>
                <Col span = {6} style = {{paddingLeft:10,paddingTop:10}}>
              <CardComp 
                               
                                Name = {item.Name} 
                                count = {item.count}
                                city ={item.city}
                                company = {item.company}
                                id = {item.id}
                                image = {item.image}
                                productdetails = {item.productdetails}
                                shortdescription = {item.shortdescription}
                                category = {item.category}
                                designdetails = {item.designdetails}
                                />
               </Col>
              )

                }
      </Row>
     <Row style = {{height:"40%"}}>
           
        </Row>
 </Content>
            </Layout>

        
           )
}
export default AdminCart