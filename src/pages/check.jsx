import React,{Component} from 'react';
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';
import {useLocation} from 'react-router-dom';
import mask from '../images/facemask.jpg'
import '../css/index.css'
import '../css/mycss.css'
import Icon from '@ant-design/icons'
import { Carousel,Button } from "antd";
import * as firebase from 'firebase';
const Chat = (props)=>{
  const location = useLocation();
 

  const db = firebase.firestore();
  
var message="hello kumar from customer";
console.log("vendorid:",location.state.vendorid);
var vendorid = location.state.vendorid;
var id = "2Qqyx4syX7fYKP5DFjV2kefc9Dr2";
console.log(id);
if(vendorid.toString()===id){
  console.log("yes");
}
else{
  console.log("no");
}

  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.uid);
      const adminRef = db.collection("User").doc(user.uid); 
      const venRef = db.collection("User").doc(location.state.vendorid); 
      const adminchat = db.collection("User").doc(user.uid).collection('Chat').doc(vendorid);
      const vendorchat = db.collection("User").doc(vendorid).collection('Chat').doc(user.uid);
        adminchat.set({
           time:firebase.firestore.FieldValue.serverTimestamp(),
           message:message
    
         });
         vendorchat.set({
          time:firebase.firestore.FieldValue.serverTimestamp(),
          message:message
   
        });

     
  
    }
  });

  const getdata = ()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
    const vendorchat = db.collection("User").doc(vendorid).collection('Chat').doc(user.uid);
  
    vendorchat.get().then(querySnapshot => {
     
        console.log(querySnapshot.data(),"and ",typeof(querySnapshot.data().time));
    
    });
  }
    });
  }
  
  return(
    <div>
      <Button type="primary" onClick={getdata}>Click here</Button>
    </div>
  );
}
export default Chat;