import React,{Component} from 'react';
import 'antd/dist/antd.css';
import  { useEffect, useState } from 'react';
import {Row,Col,Card} from 'antd';
import { Link, useHistory } from "react-router-dom";
import mask from '../../images/facemask.jpg'
import location from '../../images/location.png'
import '../../css/mycss.css'
import * as firebase from 'firebase';
import{
    EnvironmentOutlined,
    } from '@ant-design/icons';
import CardComp from './CardComp';
const { Meta } = Card;


const SimilarProducts =props=>{
    const history = useHistory()
    const db = firebase.firestore();
    const {
        Category
       
      } = props;

      const[DBData,UpdateDBData] = useState([])
     // Array.prototype.push.apply(displayVendors, DBData)


  

      useEffect(()=>{
        
        // User logged in already or has just logged in
      //   let Promises = new Promise((succeed,fail)=>{
          var collRef = db.collection("User").where("type","==","Seller");
         
          collRef.get().then((querySnapshot) => {
                  console.log("The query snapshot is ",querySnapshot.docs)
                  let FullData = [];
                  Promise.all(querySnapshot.docs.map((document) => {
                     return document.ref.collection("Products").where("title","==",Category).get()
                  })).then(productSnapshot => {
                      productSnapshot.map(querySnapshot => {
                          querySnapshot.forEach(doc => {
                              var jsonData = doc.data();
                              
                              FullData.push(jsonData);
                             // console.log("Each Card Data : ",jsonData);
                          });
                      })
                      //console.log("Before succeeding",FullData,typeof(FullData),FullData[0],Object.keys(FullData),
                    //  Object.values(FullData));
               // console.log("Full Data : ",FullData,typeof(FullData),FullData[0]);
              
              FullData.map((seller)=>{
                 // console.log("Seller : ",seller)
                 })
                
            //  UpdateLoader(true);
            //  console.log("Before sending ..",typeof(FullData),FullData[0])
              UpdateDBData(FullData);
                  })
                  
                  
                  
                });   //collref
                
              //   succeed(FullData);

      
          // Promises.then((FullData)=>{
              
          // })
        
             
    
     
       
},[])
    return (
       

       
        <div className = "row-form" style={{width:"100%",height:"100%"}}>



                <Row style={{paddingLeft:10,paddingTop:"1rem",paddingBottom:"5rem"}}  >
       
            {
               

               
                DBData.map((item)=>
   <Col span = {6} style={{paddingLeft:"1rem"}}>            
            

    <CardComp
    

    imgsrc = {item.image} 
                               
    Name = {item.sub_type} 
    count = {item.count}
    city ={item.city}
    company = {item.company}
    id = {item.id}
    image = {item.imgurls}
    productdetails = {item.productdetails}
    shortdescription = {item.shortdescription}
    category = {item.title}
    designdetails = {item.designdetails}
    />
    
    </Col> 
 )
               
}
</Row>
  </div>
    )
}
export default SimilarProducts