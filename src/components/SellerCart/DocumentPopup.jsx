import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import {Button,Row,Col} from 'antd';
import { Link, useHistory } from "react-router-dom";
import * as firebase from 'firebase';
const DocumentPopup = (props) => {
  
      //DB variable
      const [isModalVisible,updateModalVisibility] = useState(false);
      const[toggle_variable,updateToggle] = useState(undefined);
      const history = useHistory();

      useEffect(()=>{
        const db = firebase.firestore();
        var UserId;
       
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User logged in already or has just logged in.
            UserId = user.uid;
           
          let Promises = new Promise((succed,fail)=>{
            let userRef = db.collection("User").doc(UserId).get();
            console.log("userref : ",userRef)
            succed(userRef)
          })
           
         Promises.then((doc)=>{
         let toggle = doc.data().documents;
         console.log("My toggle : ",toggle)
         updateToggle(toggle);
         })
          } 
        });
        
      })
      const OpenDocs = ()=>{  
        history.push("/UploadDocs")
      }
      const whichPage=()=>{
        history.push('/Add_Products')
      }

    const openModal = () => {
      console.log("before",isModalVisible);
 updateModalVisibility(true);
 console.log("after",isModalVisible);
    }
    const closeModal = () => {
      updateModalVisibility(false);
    }
    let popup_toggle;
    console.log("ToggleVariable : ",toggle_variable)
    if(toggle_variable){
      
      popup_toggle =  <div>
         <Row>
         <Col span ={4}></Col>
           <Col span = {8}><Button type="primary" htmlType="submit" onClick={whichPage} >
          Add Products
        </Button></Col>
        <Col span ={1}></Col>
        <Col span={6} style={{paddingLeft:10}}>
        <Button type="primary" htmlType="submit" onClick={OpenDocs} >
        Update Documents
       </Button></Col></Row>
          
          </div>
    }
    else{
      
      popup_toggle = <div> 
        <Row>
           <Col span={8}></Col>
           
           <Col span = {8}><Button type="primary" htmlType="submit" onClick={openModal} >
      Add Products
    </Button></Col>
    <Col span={6}>
    <Button type="primary" htmlType="submit" onClick={OpenDocs} >
    Add Documents
   </Button></Col></Row>
   <Popup
            open={isModalVisible}
            closeOnDocumentClick
            onClose={closeModal}
          >
            <div className="modal">
              <Row>
              Please Upload the Necessary documents 
              </Row>
            
             <Row>
              <Col span={2}></Col>
              <Col> Neccessary Docs :  For Eg </Col>
              
             </Row>
             <Row>
             <Col span={4}></Col>
               <Col span={8}>
                 1. w9 form
                
               </Col>
             </Row>

             <Row>
             <Col span={4}></Col>
               <Col span={8}>
                 2. ss4 form  
                
               </Col>
             </Row>


            </div>
            <div>
              <Row>
                <Col span={8}></Col>
                <Col span={12}></Col>
                <Col span={4}>
                <Button type="primary" htmlType="submit" onClick={closeModal} >
         Okay
        </Button>
                </Col>
              </Row>
          
            </div>
          </Popup>
   </div> 
      
    }
    return (
      <div>
      {popup_toggle}
      </div>
    );
      
  }
export default DocumentPopup  