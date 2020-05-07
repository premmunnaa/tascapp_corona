import React, { Component } from 'react';
import { Chat, addResponseMessage,dropMessages, addLinkSnippet, addUserMessage,deleteMessages,setBadgeCount } from 'react-chat-popup';
import { Link, useHistory,useLocation } from "react-router-dom"; 
import { BrowserRouter as Router, Route } from "react-router-dom";
//import dp from './../images/surya_cris.jpg'
//import kefi from './../images/company.jpg'
import { Avatar, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import * as firebase from 'firebase';
import  { useEffect, useState } from 'react';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
import { Drawer, List, Divider, Col, Row } from 'antd';
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import {Layout} from 'antd';
// import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import Cart from '../../components/SellerCart/Cart'
import { Spin } from 'antd';
import { Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MainList from '../../components/customer_inventory/ListsVendor'
import {Button } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 50,paddingLeft:"20rem",paddingTop:"10rem" }} spin />
const { Meta } = Card;
const {Content} = Layout;


// const toggle_variable = 1; // from DB

  
const VendorInfo =props =>{

    const{
vendorid
    }=props

    const[Loader,UpdateLoader] = useState(false)
    const[DataInp,UpdateDbdata] = useState([]);
    const[Inp,Update] = useState(0);
console.log("DataInp : ",DataInp)
var FireData=[];
useEffect(()=>{
const db = firebase.firestore();
      console.log("Inside",vendorid);
      var docRef = db.collection("User").doc(vendorid);
      docRef.get().then(function(doc) {
        FireData = doc.data();
       
       console.log("Firedata: ",FireData)
  UpdateDbdata(FireData);
  UpdateLoader(true);

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
      
    
 
},[Inp])
console.log("outside",DataInp);
    
        return  <Layout style={{ minHeight: '100vh' }}>
                
        <SiderMenuAdmin/>
        <Content>
        <Row style = {{paddingTop : 20,paddingLeft : 10}}>
        <Col span={4}>
                        <font className = "font-heading">About Us</font> 
                </Col>  
               
        
                    <Col span={10}></Col>
                    <Col span={6}></Col>
                  
                    </Row>
        
           

                        <Row>
                            <Col span ={8} style ={{paddingLeft:20,paddingTop:"1rem"}}>
                        
                            <MainList 
                            name = {DataInp.company} 
                            emailid = {DataInp.email}
                            number = {DataInp.phone}
                            place = {DataInp.city}
                            address = {DataInp.address}
                            website = {DataInp.website}
                            />
                            
                            
                            </Col>
                            <Col span={6}></Col> 
                            <Col span = {10} style = {{paddingRight:10}}>
                            
                            <div className = "container-fluid.row" >
                    <Card
                    hoverable
                    className = "vendorDisplayCard"
                    
                    cover={Loader ?(<img alt="example" src={DataInp.profileImg} className="card-img-top"/>):(<Spin indicator={antIcon} />)}
                    >
                    <Meta

                    title={DataInp.company}
                    description={DataInp.shortdescription}

                    /><br></br><br></br>
                    <Card style ={{lineHeight:2}} type="inner" title="Description">
                    <Row style = {{paddingTop:"1rem"}}>
                        <p >
                  {DataInp.description}</p> </Row>
                    </Card>

                    </Card>
                    </div>

                    </Col>
                    </Row>

                    {/* <Row style = {{paddingTop : 20,paddingLeft : 10}}>
                    <Col span= {8} style ={{paddingLeft : 10}}>
                    <div className = "font-heading">List Of Produts</div></Col></Row>
                    <Row style = {{paddingTop : 20,paddingLeft : 5}}>
                        <Col span ={24} style={{paddingLeft:10}}>
                    <Row style = {{paddingTop:"1rem"}}>
                        {
                    CartData.map((data)=>
                    data.products.map((item,index)=>
                            
                    <Col span={6} style={{paddingLeft:10,paddingTop:"2rem"}}>
                                        
                    <Cart
                        imgsrc = {data.image} 
                        category = {data.title}
                        Name = {item.subtype} 
                        count = {item.count}
                        city ={data.city}
                        company = {data.company}
                        
                        />

                    </Col>
                    )
                    )
                    }            
                    </Row>      
                    </Col>
                    </Row> */}
                                <Row style = {{height:50}}>

                                </Row>
        </Content>
    </Layout>
    

}




const ChatAdmin=props=>  {
  let datacheck=0;
  let len=0;
    const location = useLocation();
 
 console.log("vendorchat",location.state.vendorid); 
 let vendorid=location.state.vendorid;
  useEffect(()=>{
    var unsub;
    const db = firebase.firestore();
        var UserId;
        const unsubscribe= firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  // User logged in already or has just logged in.
                  UserId = user.uid;
                  console.log(UserId);
                  const collRef=  db.collection("User").doc(UserId).collection("Chat");
                   unsub=   collRef.onSnapshot(querySnapshot => {
                  let changes = querySnapshot.docChanges();
                  changes.forEach((change)=>{
                     console.log("change",change.doc);
                    if(change.doc.id===vendorid){
                      let msgs = change.doc.data().messages;
                      getdata(msgs);
                      len=msgs.length;
                    }      
                  })
                })
               
                } else {
                  unsubscribe();
                  unsub();
                  console.log("logout");
                }
              
              });
            
      
  },)

  const getdata = (data) => {
    let index = data.length;
    if(datacheck===0){
      dropMessages();
      console.log("yes",data);
      datacheck++;
      data.forEach((msg)=>{
          if(msg.type==="vendor"){
            addResponseMessage(msg.text);
          }
          else if(msg.type==="customer"){
            addUserMessage(msg.text);
          }
       
      })
    }else if(index!==len){
        if(data[index-1].type==="vendor"){
            addResponseMessage(data[index-1].text);
            }
    }
    
  }

const handleNewUserMessage = (newMessage) => {
  const db = firebase.firestore();
  console.log(`New message incoming..! ${newMessage}`);
  const unsubscribe= firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.uid);
      //sending to vendor document
    var adminchat = db.collection("User").doc(vendorid).collection('Chat').doc(user.uid);
     var vendorchat = db.collection("User").doc(user.uid).collection('Chat').doc(vendorid);
        adminchat.set({
          messages:firebase.firestore.FieldValue.arrayUnion({
            // time:firebase.firestore.FieldValue.serverTimestamp(),
            text:newMessage,
            type:"customer"
          })
          
    
         }, {merge: true});
         vendorchat.set({
          messages:firebase.firestore.FieldValue.arrayUnion({
            // time:firebase.firestore.FieldValue.serverTimestamp(),
            text:newMessage,
            type:"customer"
          })
        }, {merge: true});
    }
    else{
      unsubscribe();
      console.log("logout");
    }
  });
}

  return (
      <div>
          <VendorInfo vendorid={vendorid}/>
    <div className="App">
      <Chat
    //   fullScreenMode={true}
        handleNewUserMessage={handleNewUserMessage}
      //  profileAvatar={kefi}
        title="Lets Chat"
        subtitle="And my cool subtitle"
         badge ={setBadgeCount}
      />
    </div>
    </div>
  );
}

 
export default ChatAdmin;