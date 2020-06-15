import React,{Component,useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';
import EditProductDetails from '../../components/Products/EditProductDetails'
import '../../css/index.css';
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import {Form,Layout,Button} from 'antd';
import SiderMenuVendor from '../../components/SiderMenuVendor';
import Images from '../../components/Products/ProductImages';
//const { Meta } = Card;
import * as firebase from 'firebase';
const {Content} = Layout;

const storageRef = firebase.storage().ref();
const db = firebase.firestore();

var files=[];
var urls =[];

const ProductDescription = ()=>{
    const history = useHistory()
    const [submit,updateButton] = useState(true)

function dataupload(user,values){
  const userRef = db.collection("User").doc(user.uid); 
  const collRef = db.collection("User").doc(user.uid).collection('Products').doc();
  userRef.get().then(function(doc) {
    collRef.set({
             title: values.product_category,
             id:collRef.id,
             vendorid:user.uid,
             city:doc.data().city,
             company:doc.data().company,
             count: values.count,
             designdetails:values.designdetails ,
             sub_type: values.name_of_subproduct,
             productdetails:  values.productdetails,
             shortdescription: values.shortdescription,
             imgurls:urls,
             shipping_details : values.shipping_details,

     }).then(function() {
       console.log("Document successfully written!");
       history.push('/SellerCart')
   })
   .catch(function(error) {
       console.error("Error writing document: ", error);
   });
 
  });
}

    const onFinish = values => {
  
        console.log('Success:', values);
        console.log('files : ',files)
       
        if(files.length===0)
        {
          console.log("up check")
          message.error("please upload an image");
        }
        if(files.length)
        {
          console.log("down check")
          updateButton(false)
        }
        const rand =  Math.floor(Math.random() * 1000);  
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
          
            const storageRef = firebase.storage().ref();
            var itemsProcessed = 0;
            files.forEach((file)=>{
              var uref = storageRef.child(user.uid+"/"+file.name);
              uref.put(file.originFileObj).then(function(snapshot) {
              
                uref.getDownloadURL().then((url)=>{
                   
               urls.push(url)
               itemsProcessed++;
               if(itemsProcessed === files.length) {
                 console.log("Data upload happened")
                dataupload(user,values);
              }
                }).then(function(error) {
                    console.log("Error getting document:", error);
                });
                 })
            })  
           
     
           
          } else {
          console.log("No user is signed in");
          }
        });
    }
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
      
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
  
const Urlpush = (fileList)=>{
  files=fileList;
  //console.log("url :",files);
}
    return (

        <Layout style= {{ minHeight: '100vh'}}>
        <SiderMenuVendor/>
            <Content>
                <div>
                  <Row style = {{paddingLeft:"2rem",paddingTop:"2rem"}}>
                    <Col span={24}>
                    <Images 
                      Urlpush = {Urlpush}
                    />
                    </Col>
                  </Row>
            <Row style ={{paddingTop:"2rem"}}>
              <Col span = {24}>
                          <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                            >
                            <Row>
                            
                              
                                <Col span={18} style = {{paddingLeft:"3rem"}}>
                                <EditProductDetails/>
                                </Col>
                            </Row>
                            <Row>

                            </Row>
                            <Row>
                              <Col span = {8}></Col>
                              
                            <Form.Item {...tailLayout}  style={{paddingTop:"4rem"}}>
                              {
                                submit ? (
                              <Button style={{width:200,height:50}}   type="primary" htmlType="submit">
                                Submit
                              </Button>):(
                                <Button style={{width:200,height:50}}   type="primary" htmlType="submit" disabled>
                                Submit
                              </Button>
                              )
                              }
                            </Form.Item>

                        
                              </Row> 
                            </Form>
                      </Col>
                    </Row>
                  
         </div>
            </Content>
        </Layout>
    );
}
export default ProductDescription