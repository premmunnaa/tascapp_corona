import React,{Component,} from 'react';
import  { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';
import * as firebase from 'firebase';
import '../../css/index.css';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import ProductDescription from '../../pages/Product/EditProductDescription';
import '../../css/mycss.css';

var img_url=[];
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  var urls=[];
 const ProductImages=props=>{
const {
  productid
}=props

  const[previewVisible,UpdateVisible]= useState(false);
  const[previewImage,UpdateImage]= useState('');
  const[fileList,UpdatefileList]= useState([]);
 
  let obj={};
  let array=[];
  const objfunc=(url,index)=>{
    obj = {};
   obj["url"]=url;
   obj["uid"]=index;
   array.push(obj);
  }
  useEffect(()=>{

      if(productid!==undefined){
      
        let arr=[];
       
       const db = firebase.firestore();
       firebase.auth().onAuthStateChanged((user) => {
         if (user) {
       var  Ref=  db.collection("User").doc(user.uid).collection("Products").doc(productid);
       Ref.get().then(function(doc){
         arr=doc.data().imgurls;
        arr.map((url,index)=>{
            objfunc(url,index)
            if(index===arr.length-1){
              UpdatefileList(array);
              console.log("prem2",array);    
            }
         })
         
         
        
       })
      
         }
       });
      
      }
       
     
     },[]); 
     
     const handleCancel = () => {
       UpdateVisible(false);
     }
    
      const handlePreview = async file => {
          console.log("File Url : ",file.url + "   File Preview : ",file.preview)
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    UpdateImage(file.url || file.preview);
    UpdateVisible(true);
      };
      
     const handleChange = ({ fileList,file }) => {
       console.log("prem",fileList)
        const{
            Urlpush
        }=props
        UpdatefileList(fileList);
        Urlpush(fileList);
 
    }
       
    const uploadButton = (
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        return (
          <div className="clearfix">
            <Upload
             action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 4 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        );
    }

export default ProductImages
