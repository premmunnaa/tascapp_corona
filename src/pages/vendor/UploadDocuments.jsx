import React,{Component} from 'react';

import 'antd/dist/antd.css';
import '../../css/index.css';
import { Upload, message ,Row,Col} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {Layout,Button} from 'antd';
import { Link, useHistory } from "react-router-dom";
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import SiderMenuVendor from '../../components/SiderMenuVendor';
import * as firebase from 'firebase';
const {Content} = Layout;
const { Dragger } = Upload;
var files =[];
const UploadDocuments = ()=>{
  const history = useHistory()

  const mainpage = ()=>{

    if(files.length!==0)
    {
    console.log(files[0].originFileObj);
   
    const db = firebase.firestore();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const storageRef = firebase.storage().ref();


      files.forEach(file => {
        var userRef = storageRef.child(user.uid+"/"+file.name);
        userRef.put(file.originFileObj).then(function(snapshot) {
        
           userRef.getDownloadURL().then((url)=>{
            var docRef = db.collection("User").doc(user.uid);
            docRef.get().then(function(doc) {
              docRef.update({
             documents:true,
             documents_data: firebase.firestore.FieldValue.arrayUnion(url)
               }).then(function() {
                 console.log("Document successfully written!");
                 message.success(`${file.name} file uploaded successfully.`);
                 history.push('/Add_products');
             })
             .catch(function(error) {
                 console.error("Error writing document: ", error);
             });
           
            });
      
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
           })
        });
      
      }

      else{
        unsubscribe();
      }
    
    })
    }
    else
    {
      message.error(`No file Uploaded...`);
      console.log("nope")
    }
  }
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
      files=info.fileList;
    }
    if (status === 'done') {
     // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

return(
  <div>
  <Row style = {{height:"30%",paddingTop:"1rem"}}>
 
  

  
  
  <Dragger {...props} style = {{paddingTop:"1rem"}}>
   
   
   <Col span = {24} style = {{paddingLeft:"1rem",paddingTop:"1rem"}}>
    <p className="ant-upload-drag-icon" style = {{paddingLeft:"1rem",paddingTop:"1rem"}}>
      <InboxOutlined />
    
   
    
    
    
  
    <p className="ant-upload-text" style = {{lineHeight:2,width:1200,paddingLeft:"1rem",paddingTop:"1rem"}}>Click or drag file to this area to upload
   

   
   
    <p className="ant-upload-hint">
      Add Documents which provides proof for your organization. Strictly prohibit from uploading personal data or other
      band files
    </p>
    </p>
   
   
    </p>
    </Col>
  </Dragger>
  
  
  </Row>
  <Row style = {{height:"30%"}}>

  </Row>
  <Row>
   <Col span = {8}></Col>
   <Col span = {4} style = {{paddingTop:"5rem"}}>
   <Button type="primary" htmlType = "submit" style={{float:"Right"}} onClick = {mainpage}>
     Submit
   </Button></Col></Row>
   </div>
);
  
}


export default UploadDocuments;
