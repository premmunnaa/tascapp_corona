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
  let PersonChatCount = 0;
    let data = [];
    let status = "Read";
    let color = "green";  
var msgcount = [];

const[message,UpdateMessage] = useState([]);
const[PersonCount,UpdatePersonCount] = useState(0)
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
  let falsecount = {};
  const db = firebase.firestore();
    let value = [];
    let msg =[];
    let obj={};
data.forEach((change)=>{
 

  
   value.push(change.doc.id);
   count[change.doc.id] = (count[change.doc.id]||0) + 1;
   console.log("prem",change.doc.id + " : ",count[change.doc.id]);

   let array =[];
   Array.prototype.push.apply(array,change.doc.data().messages);
   console.log("False ",array)
   let x=0;
   array.map((item,index)=>{
     
     if (item.read===false && item.type==="customer")
     {
      x++;
     }
     falsecount[change.doc.id] = x;
   })
   console.log(change.doc.id ," False Count : ",falsecount[change.doc.id])
})

value = value.filter((item,index) =>value.indexOf(item)===index)
console.log("Values ..!,",value);
let Names = {};

const dynamics = (value,item)=>{
  console.log("Names dynamics key : ",value,item)
  obj = {};
  obj["id"] = item
  obj["count"] = falsecount[item]
  obj["name"] = value
  if(falsecount[item]>0)
  {
    PersonChatCount++;
  }
  msg.push(obj)
}

  value.map((item,index)=>{
    var  collRef=  db.collection("User").doc(item);
      collRef.get().then((data)=>{
      Names[item]=data.data().firstname;
      console.log("names[item]",Names[item])
      console.log("Names : ",Object.keys(Names)," : ",Object.values(Names));
      dynamics(Names[item],item)
      console.log("Names path: ",index)

      if(index===value.length-1)
      {
        console.log("Names helo")
        console.log("New Data : ",msg);
        UpdateMessage(msg);
        UpdatePersonCount(PersonChatCount)
      }
  })
  
})
}

console.log("getDat contents: ",message);

const ChatPopup= (item)=>{
  console.log("Inside Chat popup : ",item)
  var testElements = document.getElementsByClassName('App');
  var testDivs = Array.prototype.filter.call(testElements, function(testElement){
    return testElement.nodeName === 'DIV';
  });
  console.log("Test Elements ..: ",testElements)
  console.log("Test Element chilnodes : ",testElements.childNodes)
  console.log("The test divs are ",testDivs,testDivs[0],testDivs[0].childNodes[0],testDivs[0].childNodes[0].childNodes);
  let temp = testDivs[0].childNodes[0].childNodes[0];
  
  temp.click();
  PersonChatCount--;
  UpdatePersonCount(PersonChatCount)
 
}

console.log("Message : ",message);
console.log("Message Vendor : ",Vendor)

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
        
        ChatPopup(item);
      }}
      
      >
     <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={item.name}
          description={ item.count>0 ? (<font color = "red">New</font>):(<font color = "green">Read</font>) }
          
        />
     
      </List.Item>
    )}
  />
  </Col>
  </Row>
  <VendorChat vendor = {Vendor}
   badgecount = {PersonCount}
  />
</div>
);
}
export default Chats;