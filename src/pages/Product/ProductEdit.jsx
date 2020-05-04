import React,{Component,useEffect} from 'react';
import { Link, useHistory,useLocation } from "react-router-dom";
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';
import EditProductDetails from '../../components/Products/EditProductDetails'
import '../../css/index.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import {Form,Layout,Button} from 'antd';
import SiderMenuVendor from '../../components/SiderMenuVendor';
import Images from '../../components/Products/ProductImages';
//const { Meta } = Card;
import * as firebase from 'firebase';
import { useState } from 'react';
const {Content} = Layout;

const storageRef = firebase.storage().ref();
const db = firebase.firestore();
var urls=[];
var prodcategory='';
const ProductEdit = props => {
 
  const history = useHistory();
  const location = useLocation();
  
 
  
 
 
    const onFinish = values => {
      //values.filter((data)=>data===undefined);
      // console.log("Data : ",urls);
      //   console.log('Success:', values); 
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log(location.state.id);
            const userRef = db.collection("User").doc(user.uid).collection("Products").doc(location.state.id);
            userRef.update({
            count:values.count!==undefined ? values.count :location.state.count,
            title: values.product_category!==undefined ? values.product_category : location.state.category,
            imgurls:urls !==undefined ? urls :location.state.imgurls,
            designdetails:values.designdetails !==undefined ? values.designdetails:location.state.desdetails,
            sub_type: values.name_of_subproduct !==undefined ? values.name_of_subproduct:location.state.subprod,
            productdetails:  values.productdetails !==undefined ? values.productdetails : location.state.proddetails ,
            shortdescription: values.shortdescription  !==undefined ? values.shortdescription :location.state.shortdes,
            }).then(function() {
              console.log("here .then");
             history.push('/SellerCart');
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
  
    const Urlpush = (url)=>{
      urls=url;
      console.log("url :",urls);
    }
    return (

        <Layout style= {{ minHeight: '100vh'}}>
        <SiderMenuVendor/>
            <Content>
                <div>
                  <Row style = {{paddingLeft:"2rem",paddingTop:"2rem"}}>
                <Col span = {24} >
                    <Images
                    Urlpush = {Urlpush}
                    />
                    </Col>
                    </Row>
            <Row style = {{paddingTop:"2rem",paddingLeft:"2rem"}}>
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
                   
                   
                    <Col span={18} style = {{paddingRight:"1rem"}}>
                    <EditProductDetails
                   id={location.state.id}
                   prodcategory={location.state.category}
                   subprod={location.state.subprod}
                   shortdes={location.state.shortdes}
                   proddetails={location.state.proddetails}
                   desdetails={location.state.desdetails}
                   count={location.state.count}
                   category={location.state.category}
                    
                    />
                    </Col>
                </Row>
                <Row>

                </Row>
                <Row>
        <Col span = {8}></Col>
      <Form.Item {...tailLayout}  style={{paddingTop:"4rem"}}>
        <Button style={{width:200,height:50}}   type="primary" htmlType="submit">
          Submit
        </Button>
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
export default ProductEdit