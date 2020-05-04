import React, { Component } from 'react';
import { Chat, addResponseMessage, renderCustomComponent,addLinkSnippet,dropMessages, addUserMessage,deleteMessages,setBadgeCount } from 'react-chat-popup';
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



const pStyle = {
    fontSize: 20,
    lineHeight: '24px',
    display: 'block',
    marginBottom: 25,
    fontWeight:500,
  };
  
  const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{
        fontSize: 14,
        lineHeight: '22px',
        marginBottom: 15,
      }}
    >
      <p
        className="site-description-item-profile-p"
        style={{
          marginRight: 8,
       
          display: 'inline-block',
        }}
      >
        {title}:
      </p>
      {content}
    </div>
  );
  
  const UserProfile = props=>{
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       InputData: [],
  //     };
  //   }
  const{
        vendorid
  }=props
  console.log("Userprofid",vendorid);
  const[DataInp,UpdateDbdata] = useState([]);
  const[Inp,Update] = useState(0);
//   let DataInp = [];
  console.log("DataInp : ",DataInp)
  var FireData=[];
  useEffect(()=>{
  const db = firebase.firestore();
        var docRef = db.collection("User").doc(vendorid);
        docRef.get().then(function(doc) {
          FireData = doc.data();
        // DataInp=FireData;
            console.log("Firedata: ",FireData);
         console.log("DataInp: ",DataInp);
         
   UpdateDbdata(FireData);
  
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
        
    
 
  },[Inp])
  console.log("DataInp: ",DataInp);
      return (
        
            
         <Col span = {24} style = {{paddingTop:"2rem",paddingLeft:"4rem"}}>
          
            <p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
              User Profile
            </p>
            <p className="site-description-item-profile-p" style={pStyle}>
              Personal
            </p>
         
            <Row style = {{paddingTop:"1rem"}}>
              <Col span={8}>
                <DescriptionItem title="Full Name" content={DataInp.firstname} />
              </Col>
              <Col span={8}>
                <DescriptionItem title="Account" content={DataInp.email} />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DescriptionItem title="City" content={DataInp.city} />
              </Col>
              <Col span={8}>
                <DescriptionItem title="Country" content={DataInp.country} />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DescriptionItem title="Website" content={DataInp.website} />
              </Col>
            </Row>
           
           
            <p className="site-description-item-profile-p" style={pStyle}>
              Contacts
            </p>
            <Row>
              <Col span={8}>
                <DescriptionItem title="Email" content={DataInp.email} />
              </Col>
              <Col span={8}>
                <DescriptionItem title="Phone Number" content={DataInp.phone} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Address"
                 content = {DataInp.address}
                />
              </Col>
            </Row>
          </Col>
        
      );
    }
  


   
 
const VendorChat=props=>  {
  
  let datacheck=0;
  let len=0;
    const location = useLocation();
   
 console.log("vendorchat",location.state.vendorid); 
 let vendorid=location.state.vendorid;
  useEffect(()=>{
    const db = firebase.firestore();
        var UserId;
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  // User logged in already or has just logged in.
                  UserId = user.uid;
                  console.log(UserId);
              var collRef=  db.collection("User").doc(UserId).collection("Chat").doc(vendorid);
                collRef.onSnapshot(querySnapshot => {
                  let changes = querySnapshot.data();
                     console.log("change",changes);
                      getdata(changes.messages);
                      len=changes.messages.length;
                })
                } else {
                  // User not logged in or has just logged out.
                }
              });
            
      
  })

  const getdata = (data) => {
    
    let index = data.length;
    if(datacheck===0){
      dropMessages();
      console.log("yes happening");
      datacheck++;
      console.log("yes",data)
      data.forEach((msg)=>{
          if(msg.type==="customer"){
            addResponseMessage(msg.text);
          }
          else if(msg.type==="vendor"){
            addUserMessage(msg.text);
          }
       
      })
    }else if(index!==len){
        if(data[index-1].type==="customer"){
            addResponseMessage(data[index-1].text);
            }
    }
    
  }

const handleNewUserMessage = (newMessage) => {
  const db = firebase.firestore();
  console.log(`New message incoming..! ${newMessage}`);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.uid);
      //sending to vendor document
    var adminchat = db.collection("User").doc(vendorid).collection('Chat').doc(user.uid);
     var vendorchat = db.collection("User").doc(user.uid).collection('Chat').doc(vendorid);
        adminchat.set({
          messages:firebase.firestore.FieldValue.arrayUnion({
            // time:firebase.firestore.FieldValue.serverTimestamp(),
            text:newMessage,
            type:"vendor"
          })
          
    
         }, {merge: true});
         vendorchat.set({
          messages:firebase.firestore.FieldValue.arrayUnion({
            // time:firebase.firestore.FieldValue.serverTimestamp(),
            text:newMessage,
            type:"vendor"
          })
        }, {merge: true});
    }
  });
}

  return (
      <div>
          <UserProfile vendorid={vendorid}/>
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

 
export default VendorChat;