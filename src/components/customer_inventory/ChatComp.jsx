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
let len;
const [lastlength,updateindex]=useState(0);
 console.log("chatcomp",vendorid)
  useEffect(()=>{
    if(vendorid!==undefined){
      let unsub;
      const db = firebase.firestore();
          var UserId;
          const  unsubscribe=   firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                    // User logged in already or has just logged in.
                    UserId = user.uid;
                    // console.log(UserId);
                var collRef=  db.collection("User").doc(UserId).collection("Chat");
                 unsub= collRef.doc(vendorid).onSnapshot(querySnapshot => {
                    let changes = querySnapshot.data();
                    // console.log("check",querySnapshot);
                    if(querySnapshot.exists){
                      getdata(changes.messages);
                    }else{
                      dropMessages();
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
    console.log("index",index);
    console.log("new length",len);
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
        if(data[index-1].type==="vendor" && index!==lastlength){
          addResponseMessage(data[index-1].text);
      }
      //setBadgeCount(5);
    }
    updateindex(index);
  }

const handleNewUserMessage = (newMessage) => {
  const db = firebase.firestore();
  // console.log(`New message incoming..! ${newMessage}`);
 const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.uid);
      //sending to vendor document
      // console.log("new log",vendorid,user.uid);
      var adminchat = db.collection("User").doc(vendorid).collection('Chat').doc(user.uid);
      var vendorchat = db.collection("User").doc(user.uid).collection('Chat').doc(vendorid);
      adminchat.get()
      .then((docSnapshot) => {
          if(docSnapshot.exists){
            db.runTransaction(transaction => {
              return transaction.get(adminchat).then(snapshot => {
                var largerArray = snapshot.get('messages');
                largerArray.push({text:newMessage,type:"customer"});
                transaction.update(adminchat, 'messages', largerArray);
              });
            });
          }
          else{
          adminchat.set({
            messages:[{
              text:newMessage,
              type:"customer"
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
                largerArray.push({text:newMessage,type:"customer"});
                transaction.update(vendorchat, 'messages', largerArray);
              });
            });
          }
          else{
            vendorchat.set({
              messages:[{
                text:newMessage,
                type:"customer"
            }]
          })
          }
        });
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