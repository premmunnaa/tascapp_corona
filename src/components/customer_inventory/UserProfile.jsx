import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../css/index.css';
import firebase from 'firebase';
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';

const pStyle = {
  fontSize: 20,
  lineHeight: '24px',
  display: 'block',
  marginBottom: 25,
  fontWeight:500,
};

const DescriptionItem = ({ title, content }) => (
  <div
    className="site-description-item-profile-wrapper"
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 15,
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 8,
     
        display: 'inline-block',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

const UserProfile = (props)=>{

const[DataInp,UpdateDbdata] = useState([]);
const[Nope,UpdateNope] = useState(0)
console.log("DataInp : ",DataInp)
var FireData=[];

const callFirebase = ()=>{
  const db = firebase.firestore();
  //    Input = this.state.InputData.slice;
  var UserId;
  
  // let Promises  = new Promise((succeed,fail)=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        UserId = user.uid;
        console.log(UserId);
        var docRef = db.collection("User").doc(UserId);
        try{
          docRef.onSnapshot(querySnapshot=> {
            FireData = querySnapshot.data()
           
           console.log("Firedata: ",FireData)
           UpdateDbdata(FireData);
    
        })
        }
       catch(error)  {
          console.log("Error getting document:", error);
      }
        
      } else {
        // User not logged in or has just logged out.
      }
    });
}

useEffect(()=>{
   callFirebase();
},[])
    return (
      
          
       <Col span = {24} style = {{paddingTop:"2rem",paddingLeft:"4rem"}}>
        
          <p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
            User Profile
          </p>
          <p className="site-description-item-profile-p" style={pStyle}>
            Personal
          </p>
       
          <Row style = {{paddingTop:"1rem"}}>
            <Col span={8}>
              <DescriptionItem title="Full Name" content={DataInp.firstname} />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Account" content={DataInp.email} />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <DescriptionItem title="City" content={DataInp.city} />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Country" content={DataInp.country} />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <DescriptionItem title="Website" content={DataInp.website} />
            </Col>
          </Row>
         
         
          <p className="site-description-item-profile-p" style={pStyle}>
            Contacts
          </p>
          <Row>
            <Col span={8}>
              <DescriptionItem title="Email" content={DataInp.email} />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Phone Number" content={DataInp.phone} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Address"
               content = {DataInp.address}
              />
            </Col>
          </Row>
        </Col>
      
    );
  }

export default UserProfile