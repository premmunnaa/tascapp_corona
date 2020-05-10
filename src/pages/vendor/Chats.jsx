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
const { Meta } = Card;

const Chats = ()=>{
  const history = useHistory()
    let data = [];
    let status = "Read";
    let color = "green";  
var msgcount = [];

const[message,UpdateMessage] = useState([]);

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
  const db = firebase.firestore();
    let value = [];
    let msg =[];
    let obj={};
data.forEach((change)=>{

   value.push(change.doc.id);
   
})

console.log("Values ..!,",value)

let promis = new Promise((succeed,fail)=>{
  
  value.map((i,index)=> { count[i] = (count[i]||0) + 1;
    console.log("Major :",i + " : ",count[i]);
    obj["id"]=i;
    obj["count"]=count[i];
    var  collRef=  db.collection("User").doc(i);
    collRef.get().then((data)=>{
      obj["name"]=data.data().firstname;
      console.log("Inside Promise : ",obj["name"])
    })
  });
  msg.push(obj);
  console.log("Then Promise : ",msg.name)
  succeed(msg);
})
promis.then((data)=>{
  console.log("prem",data);
 
  
  UpdateMessage(data) 
}) 





  
 console.log("Data inside GetData  : ",data,typeof(data))
 console.log("Data[1] : ",data[0])
 
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
  // if(Chatbutton==0)
  // {
  // UpdateButton(temp);
  // }
  temp.click();
 
}
const Counting = (item)=>{
  console.log("Inside Counting ",item,typeof(item)) 
  console.log("Inside Counting ",item.name)
  // console.log("Counting name ",)
   return item.name
}
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
          title={Counting(item)}
          description={ item.count<=1 ? (<font color = "green">Read</font>):(<font color = "red">New</font>) }
          
        />
     
      </List.Item>
    )}
  />
  </Col>
  </Row>
  <VendorChat vendor = {Vendor}/>
</div>
);
}
export default Chats;