import React from 'react';

import 'antd/dist/antd.css';
import '../../css/index.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import '../../css/mycss.css'
import * as firebase from 'firebase';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class ProfileImage extends React.Component {
 
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      
    ],
  };

  handleCancel = () =>{ 
    console.log("deleted");
    this.setState({ previewVisible: false });}

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList,file }) =>{ 
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const storageRef = firebase.storage().ref();
        var userRef = storageRef.child(user.uid+"/"+file.name);
        userRef.put(file.originFileObj).then(function(snapshot) {
        
           userRef.getDownloadURL().then((url)=>{
            var docRef = db.collection("User").doc(user.uid);
            docRef.get().then(function(doc) {
              docRef.update({
              profileImg:url
               }).then(function() {
                 console.log("Document successfully written!");
              
             })
             .catch(function(error) {
                 console.error("Error writing document: ", error);
             });
           
            });
      
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
           })
      }
    })
   

  console.log(file.originFileObj);  
    this.setState({ fileList })
  
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style = {{lineHeight:2.0}} className="ant-upload-text">Upload New Profile Image</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default ProfileImage