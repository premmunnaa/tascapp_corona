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


 
const VendorChat=props=>  {
  const{
vendorid
  }=props
console.log("vendoechat",vendorid);

  let datacheck=0;
  let len=0;
   
  useEffect(()=>{
    var unsub;
    if(vendorid!==undefined){
      const db = firebase.firestore();
      var UserId;
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // User logged in already or has just logged in.
                UserId = user.uid;
                console.log(UserId);
            const collRef=  db.collection("User").doc(UserId).collection("Chat").doc(vendorid);
             unsub  =  collRef.onSnapshot(querySnapshot => {
                let changes = querySnapshot.data();
                   console.log("prem change",querySnapshot);
                   if(querySnapshot.exists){
                    getdata(changes.messages);
                  }else{
                    dropMessages();
                  }
              })
              } else {
                unsubscribe();
                unsub();
                console.log("logout");
              }
              
            });
          
    }
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
            console.log("customer msg",msg.text);
          }
          else if(msg.type==="vendor"){
            addUserMessage(msg.text);
          }
       
      })
    }else {
      console.log("type",data[index-1].type)
        if(data[index-1].type==="customer"){
          console.log("respose from customer",data[index-1].text);
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
     adminchat.get()
      .then((docSnapshot) => {
          if(docSnapshot.exists){
            db.runTransaction(transaction => {
              return transaction.get(adminchat).then(snapshot => {
                var largerArray = snapshot.get('messages');
                largerArray.push({text:newMessage,type:"vendor"});
                transaction.update(adminchat, 'messages', largerArray);
              });
            });
          }
          else{
          adminchat.set({
            messages:[{
              text:newMessage,
              type:"vendor"
          }]
        })
           
          }
      });

      vendorchat.get()
      .then((docSnapshot) => {
          if(docSnapshot.exists){
            db.runTransaction(transaction => {
              return transaction.get(vendorchat).then(snapshot => {
                var largerArray = snapshot.get('messages');
                largerArray.push({text:newMessage,type:"vendor"});
                transaction.update(vendorchat, 'messages', largerArray);
              });
            });
          }
          else{
            vendorchat.set({
              messages:[{
                text:newMessage,
                type:"vendor"
            }]
          })
          }
        });
    }
    else{
      console.log("logout");
      unsubscribe();
    }
  });
}

  return (
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
  );
}

 
export default VendorChat;