import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Link, useHistory } from "react-router-dom";
import { List, Avatar,Card,Button } from 'antd';
import { Chat } from 'react-chat-popup';
import  { useEffect, useState } from 'react';
import * as firebase from 'firebase';
const { Meta } = Card;

const Chats = ()=>{
  const history = useHistory()
    let data = [];
    
var check = 0;
const[message,UpdateMessage] = useState([]);
const[MainChanges,UpdateChanges] = useState([])
console.log("Main Changes :",MainChanges)
useEffect(()=>{
    
  const db = firebase.firestore();
      var UserId;
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // User logged in already or has just logged in.
                UserId = user.uid;
                console.log(UserId);
                     
                var  collRef=  db.collection("User").doc(UserId).collection("Chat");
              collRef.onSnapshot(querySnapshot => {
                  console.log("Chagesssssss")
                let changes = querySnapshot.docChanges();
               if(changes)
                {
                UpdateChanges(changes)
                }
                console.log("Changes is this ",changes)
               
                   console.log("change",changes);
              Array.prototype.push.apply(data,changes)
                  console.log("Data type " , data,typeof(data)); 
                 
                
               
                getdata(data)
              })
             
              console.log("inside",data);
              
              } else {
                // User not logged in or has just logged out.
              }
            });
          
          
},[])

const getdata=(data)=>{
    let value = [];
data.forEach((change)=>{
   value.push(change.doc.id);
   
})

var count = {};
value.map((i)=> { count[i] = (count[i]||0) + 1;});
console.log("Count : ",count);

console.log("Before filter : ",value)
value = value.filter((data,index)=>value.indexOf(data)==index)
console.log("After filter : ",value)
UpdateMessage(value) 

  
 console.log("Data inside GetData  : ",data,typeof(data))
 console.log("Data[1] : ",data[0])
 
}
console.log("getDat contents: ",message);
const chatfunc=(id)=>{
  console.log("My id is :",id)
  history.push({
    pathname: '/ChatVendor',
    state: {vendorid:id}
});
}

return(

  <List
    itemLayout="horizontal"
    dataSource={message}
    renderItem={item => (
      <List.Item>
        <Button onClick={() =>chatfunc(item)} >
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={item}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        </Button>
      </List.Item>
    )}
  />

);
}
export default Chats;