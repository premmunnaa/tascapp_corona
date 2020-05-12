import React, { Component } from "react";
import 'antd/dist/antd.css';
import '../css/Login.css';
import {Card} from 'antd';
import {Row, Col} from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyBfy5nYbmlMsQpK_dbwsH1s83cxTdA5EGY",
  authDomain: "corona-6c229.firebaseapp.com",
  databaseURL: "https://corona-6c229.firebaseio.com",
  projectId: "corona-6c229",
  storageBucket: "corona-6c229.appspot.com",
  messagingSenderId: "919465148200",
  appId: "1:919465148200:web:5766c4bb4c232162569a1d",
  measurementId: "G-MYVYKS4VLT"
};

firebase.initializeApp(firebaseConfig);
console.log(firebase);
const db = firebase.firestore();


const LoginForm = () => {

    const history = useHistory();

    const onFinish = values => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(res => {
          if (res.user){
            
            var docRef = db.collection("User").doc(res.user.uid);
            docRef.get().then(function(doc) {
              if (doc.data().type === "Buyer") {
                history.replace("/AdminInventory");
              } else if(doc.data().type === "Seller") {
                history.replace("/SellerCart");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
            
          }
        })
        .catch(e => {
          console.log(e.message);
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
      });
    };  
      // console.log('Received values of form: ', values);
      // history.replace("/SellerCart");  // base page for Vendor 
      // // history.replace('/AdminInventory')  //base page for Customer
   
  
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
      <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
          Or <Link to='/Register'>register now!</Link>
        </Form.Item>
      </Form>
    );
};
  
class Login extends Component {
    render() {
        return (
            <div className="site-card-border-less-wrapper" className="bglogin">
                <Row  className="row-form-login">
                    <Card title="Login" bordered={true} style={{ width: 300, height:360, color: "" }} hoverable={true}>
                        <LoginForm />
                    </Card>
                </Row>       
            </div>
        );
    }
}

export default Login;
