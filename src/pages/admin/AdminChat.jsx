import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
// import './index.css';
import { Link, useHistory } from "react-router-dom";
import { List, Avatar,Card,Button,Row,Col } from 'antd';
import { Chat } from 'react-chat-popup';
import  { useEffect, useState } from 'react';
import ChatAdmin from '../admin/ChatAdmin';
import * as firebase from 'firebase';
const { Meta } = Card;

const AdminChats = ()=>{
  const history = useHistory()
    let data = [];
    
var check = 0;
const[message,UpdateMessage] = useState([]);
const[Vendorid,UpdateVendor] = useState(undefined);
const[MainChanges,UpdateChanges] = useState([])
const[count,UpdateCount] = useState({})

console.log("Main Changes :",MainChanges)
useEffect(()=>{
  let unsub;
    const db = firebase.firestore();
      var UserId;
      const  unsubscribe = firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // User logged in already or has just logged in.
                UserId = user.uid;
                console.log(UserId);
                     
                const  collRef=  db.collection("User").doc(UserId).collection("Chat");
                unsub = collRef.onSnapshot(querySnapshot => {
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
                unsubscribe();
                unsub();
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
UpdateCount(count)
console.log("Before filter : ",value)
value = value.filter((data,index)=>value.indexOf(data)===index)
console.log("After filter : ",value)
UpdateMessage(value) 

  
 console.log("Data inside GetData  : ",data,typeof(data))
 console.log("Data[1] : ",data[0])
 
}
console.log("getDat contents: ",message);
const ChatPopup= ()=>{
  console.log("Admin chat",Vendorid);
  console.log("helo Dudde")
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

return(
 
  <div>
    <SiderMenuAdmin/>
  <div className  = "font-header" style={{paddingLeft:10}}>Let's Chat</div>
  <Row style = {{paddingTop:10,paddingRight:15}}>
    <Col span={24} style={{paddingRight:15,paddingLeft:10}}>
    <List
      itemLayout="horizontal"
      dataSource={message}
      renderItem={item => (
        <List.Item
        actions={[<font color="red">{count[item]}</font>]}
        onClick = {() => {
          // console.log("List on click")
          UpdateVendor(item);
          ChatPopup();
          // history.push({
          //       pathname: '/ChatVendor',
          //       state: {vendorid:item}
          // })
        }}
        
        >
         
       
        
          {/* <Button onClick={() =>chatfunc(item)} > */}
     
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={item}
            description={" hi bruh..!"}
            
          />
          {/* </Button> */}
        </List.Item>
      )}
    />
    </Col>
    </Row>
    <ChatAdmin
    vendorid = {Vendorid}
    />
  </div>
  );
}
export default AdminChats;