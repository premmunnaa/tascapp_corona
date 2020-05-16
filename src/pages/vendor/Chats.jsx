import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import SiderMenuVendor from '../../components/SiderMenuVendor'
// import './index.css';
import { Link, useHistory } from "react-router-dom";
import { List, Avatar,Card,Button,Row,Col} from 'antd';
import { Chat } from 'react-chat-popup';
import VendorChat from '../../pages/vendor/VendorChat'
import  { useEffect, useState } from 'react';
import * as firebase from 'firebase';
import { zIndex } from 'material-ui/styles';
const { Meta } = Card;

const Chats = ()=>{
  const history = useHistory()
  
    let data = [];
    let status = "Read";
    let color = "green";  
var msgcount = [];


const[visible_toggle,UpdateVisibility] = useState(false)
const[message,UpdateMessage] = useState([]);
const[PersonCount,UpdatePersonCount] = useState(0)
const[Seen,UpdateSeen] = useState({});
const[MainChanges,UpdateChanges] = useState([])
const[Vendor,UpdateVendor] = useState({name:"say",count:1,id:undefined})

let count = {};
console.log("Main Changes :",MainChanges)
console.log("Message start :",message)

useEffect(()=>{
    
  const db = firebase.firestore();
      var UserId;
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // User logged in already or has just logged in.
                UserId = user.uid;
                console.log(UserId);
                     
                var  collRef=  db.collection("User").doc(UserId).collection("Chat");
                // var  babyRef=  db.collection("User").doc(UserId).collection("Chat").where("seen","==",false);
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


const getdata=(data,babyRef)=>{
  // babyRef.get().then(function (doc){
  //   console.log("Doc : ",doc.docs.length)
  //   UpdatePersonCount(doc.docs.length)
  // })
  let falsecount = {};
  const db = firebase.firestore();
    let value = [];
    let msg =[];
    let obj={};
    let Seen_variable = {};
data.forEach((change)=>{
   value.push(change.doc.id);
   count[change.doc.id] = (count[change.doc.id]||0) + 1;
  //  console.log("prem",change.doc.id + " : ",count[change.doc.id]);
   Seen_variable[change.doc.id] =  change.doc.data().seen;
  //  console.log("Seen variable : ",Seen_variable);
   
})


value = value.filter((item,index) =>value.indexOf(item)===index)
// console.log("Values ..!,",value);
let Names = {};

const dynamics = (value,item)=>{
  console.log("Names dynamics key : ",value,item)
  obj = {};
  obj["id"] = item
  obj["count"] = falsecount[item]
  obj["name"] = value
  obj["seen"] = Seen_variable[item];
  // console.log("Helo",item , ":",Seen_variable[item])
  msg.push(obj)
}

  value.map((item,index)=>{
    var  collRef=  db.collection("User").doc(item);
      collRef.get().then((data)=>{
      Names[item]=data.data().firstname;
      // console.log("names[item]",Names[item])
      // console.log("Names : ",Object.keys(Names)," : ",Object.values(Names));
      dynamics(Names[item],item)
      // console.log("Names path: ",index)

      if(index===value.length-1)
      {
        // console.log("Names helo")
        // console.log("New Data : ",msg);
        UpdateMessage(msg);
        console.log("prem",Seen_variable)
        UpdateSeen(Seen_variable);
      }
  })
  
})
}

// console.log("getDat contents: ",message);


// console.log("Message : ",message);
// console.log("Message Vendor : ",Vendor)
// console.log("Final : ",PersonCount)

return(
<div>
<SiderMenuVendor/>
<div className  = "font-header" style={{paddingLeft:10}}>Let's Chat</div>
<Row style = {{paddingTop:10,paddingRight:15}}>
  <Col span={24} style={{paddingRight:15,paddingLeft:10}}>
  <List
    itemLayout="horizontal"
    dataSource={message}
    renderItem={item => (
      <List.Item
      actions={[<font color="red">{item.count}</font>]}
      onClick = {() => {
        UpdateVendor(item);
        UpdateVisibility(true)
        
      }}
      
      >
     <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={item.name}
          description={ item.seen===false ? (<font color = "red">New</font>):(<font color = "green">Read</font>) }
          
        />
     
      </List.Item>
    )}
  />
  </Col>
  </Row>
  <VendorChat vendor = {Vendor}
   badgecount = {PersonCount}
   visibility = {visible_toggle}
  
  />
</div>
);
}
export default Chats;