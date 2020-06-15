import React, { Component } from 'react';
import { Chat, addResponseMessage,dropMessages, addLinkSnippet, addUserMessage,deleteMessages,setBadgeCount } from 'react-chat-popup';
import { Link, useHistory,useLocation } from "react-router-dom"; 
import { BrowserRouter as Router, Route } from "react-router-dom";
//import dp from './../images/surya_cris.jpg'
//import kefi from './../images/company.jpg'
import { Avatar, Input,Empty} from 'antd';
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

const ChatAdmin=props=>  {
const{
vendor,
visibility
}=props
  let datacheck=0;
  let len=0;
 console.log("premid:",vendor)

  useEffect(()=>{

    if(visibility===true)
    {
      var testElements = document.getElementsByClassName('App');
      var testDivs = Array.prototype.filter.call(testElements, function(testElement){
        return testElement.nodeName === 'DIV';
      });
      console.log("Test Elements ..: ",testElements)
      console.log("Test Element chilnodes : ",testElements.childNodes)
      console.log("The test divs are ",testDivs,testDivs[0],testDivs[0].childNodes[0],testDivs[0].childNodes[0].childNodes);
      let temp = testDivs[0].childNodes[0].childNodes[0];
  
      temp.click();
 
    }

if( vendor!==undefined && vendor.id!==undefined  ){
  let unsub;
  const db = firebase.firestore();
      var UserId;
      const  unsubscribe=   firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // User logged in already or has just logged in.
                UserId = user.uid;
                console.log(UserId);
            const collRef=  db.collection("User").doc(UserId).collection("Chat").doc(vendor.id);
             unsub= collRef.onSnapshot(querySnapshot => {
                let changes = querySnapshot.data();
                console.log("check",querySnapshot);
                if(querySnapshot.exists){
                  getdata(changes.messages,collRef);
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

  const getdata = (data,collRef) => {
    collRef.update({
      seen : true
    })
    let index = data.length;
    if(datacheck===0){
      dropMessages();
      datacheck++;
      data.forEach((msg)=>{
        if(msg.type==="vendor"){
          addResponseMessage(msg.text);
          console.log("vendor msg",msg.text);
        }
        else if(msg.type==="customer"){
          addUserMessage(msg.text);
        }
      })
    }else{
      if(data[index-1].type==="vendor"){
        console.log("vendor message",data[index-1].text);
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
      console.log("new log",vendor.id,user.uid);
      var adminchat = db.collection("User").doc(vendor.id).collection('Chat').doc(user.uid);
      var vendorchat = db.collection("User").doc(user.uid).collection('Chat').doc(vendor.id);
      adminchat.get()
      .then((docSnapshot) => {
          if(docSnapshot.exists){
            db.runTransaction(transaction => {
              return transaction.get(adminchat).then(snapshot => {
                var largerArray = snapshot.get('messages');
                largerArray.push({text:newMessage,type:"customer"});
                transaction.update(adminchat, 'messages', largerArray);
                transaction.update(adminchat, "seen", false);
              });
            });
          }
          else{
          adminchat.set({
            messages:[{
              text:newMessage,
              type:"customer",
              
          }],
          seen : false,
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
                transaction.update(vendorchat, "seen", false);
              });
            });
          }
          else{
            vendorchat.set({
              messages:[{
                text:newMessage,
                type:"customer",
                
            }],
            seen : false
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
    vendor === undefined ? (<Row style = {{paddingTop:"10rem"}}><Empty/></Row>) : (
    visibility ? ( <div className="App" >
    <Chat
  //   fullScreenMode={true}
       handleNewUserMessage={handleNewUserMessage}
    //  profileAvatar={kefi}
       title={vendor.name}
       subtitle="And my cool subtitle"
       
    />
  </div>):
  (<div>
  
  </div>)
    )
  );
}

 
export default ChatAdmin;