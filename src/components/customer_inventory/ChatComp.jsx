import React, { Component } from 'react';
import { Chat, addResponseMessage, addLinkSnippet,dropMessages, addUserMessage,deleteMessages,setBadgeCount } from 'react-chat-popup';
 
//import dp from './../images/surya_cris.jpg'
//import kefi from './../images/company.jpg'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import * as firebase from 'firebase';
import  { useEffect, useState } from 'react';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
 


const ChatComp=props=>  {
  const {
    vendorid   
  } = props;
  let datacheck=0;

 
  useEffect(()=>{
    if(vendorid!==undefined){
      let unsub;
      const db = firebase.firestore();
          var UserId;
          const  unsubscribe=   firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                    // User logged in already or has just logged in.
                    UserId = user.uid;
                    console.log(UserId);
                var collRef=  db.collection("User").doc(UserId).collection("Chat");
                 unsub= collRef.doc(vendorid).onSnapshot(querySnapshot => {
                    let changes = querySnapshot.data();
                    console.log("check",querySnapshot);
                    if(querySnapshot.exists){
                      getdata(changes.messages);
                    }
                   
                  
                  })
                  } else {
                    // User not logged in or has just logged out.
                    unsubscribe();
                    unsub();
                  }
                });
              
        
    }
   
  },)

  const getdata = (data) => {
    let index = data.length;
    if(datacheck===0){
      dropMessages();
      datacheck++;
      data.forEach((msg)=>{
        if(msg.type==="vendor"){
          addResponseMessage(msg.text);
        }
        else if(msg.type==="customer"){
          addUserMessage(msg.text);
        }
      })
    }else{
      if(data[index-1].type==="vendor"){
      addResponseMessage(data[index-1].text);
      }
      //setBadgeCount(5);
    }
    
  }

const handleNewUserMessage = (newMessage) => {
  const db = firebase.firestore();
  console.log(`New message incoming..! ${newMessage}`);
 const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.uid);
      //sending to vendor document
      console.log("new log",vendorid,user.uid);
      var adminchat = db.collection("User").doc(vendorid).collection('Chat').doc(user.uid);
      var vendorchat = db.collection("User").doc(user.uid).collection('Chat').doc(vendorid);
        adminchat.set({
          messages:firebase.firestore.FieldValue.arrayUnion({
            // time:firebase.firestore.FieldValue.serverTimestamp(),
            text:newMessage,
            type:"customer"

          })
          
    
         }, {merge: true}).then(function(){
          console.log("msg sent");
        }).catch(function(error) {
          console.log("Error getting document:", error);
      });
         vendorchat.set({
          messages:firebase.firestore.FieldValue.arrayUnion({
            // time:firebase.firestore.FieldValue.serverTimestamp(),
            text:newMessage,
            type:"customer"
          })
        },{merge: true});
    }
    else{
      unsubscribe();
    }
  });
}

  return (
    <div className="App">
      <Chat
      // fullScreenMode={true}
        handleNewUserMessage={handleNewUserMessage}
      //  profileAvatar={kefi}
        title="Lets Chat"
        subtitle="And my cool subtitle"
         badge ={setBadgeCount}
         
      />
    </div>
  );
}

 
export default ChatComp;