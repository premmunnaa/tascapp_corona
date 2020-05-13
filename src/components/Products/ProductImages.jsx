import React,{Component} from 'react';
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
class ProductImages extends Component{
constructor(props){
  super();
this.id=props.productid;
this.state = {
  previewVisible: false,
  previewImage: '',
  fileList: [],
};
}
      
     componentDidMount(){

      if(this.id!==undefined){
        let obj={};
        let arr=[];
        let array=[];
       const db = firebase.firestore();
       firebase.auth().onAuthStateChanged((user) => {
         if (user) {
       var  Ref=  db.collection("User").doc(user.uid).collection("Products").doc(this.id);
       Ref.get().then(function(doc){
         arr=doc.data().imgurls;
         arr.map((url,index)=>{
           obj["url"]=url;
           obj["uid"]=index;
           array.push(obj);
         })
       })
       // this.setState({fileList:array})
         }
       });
       console.log("prem2",this.state.fileList);
       // this.setvar(array);
      }
       
     
     } 
      // setvar=(array)=>{
      //   console.log("prem1",array);
      //   this.setState ({
      //     fileList: [...this.state.fileList,...array]
      //   })
      // console.log("prem2",this.state.fileList);
      // };
      handleCancel = () => this.setState({ previewVisible: false });
    
      handlePreview = async file => {
          console.log("File Url : ",file.url + "   File Preview : ",file.preview)
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
      
      handleChange = ({ fileList,file }) => {
       console.log("prem",fileList)
        const{
            Urlpush
        }=this.props
        this.setState({ fileList });  

        Urlpush(fileList);
 
    }
    
    render()
    
    {
      
        const { previewVisible, previewImage, fileList } = this.state;
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
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 4 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        );
    }
}
export default ProductImages
