import React from 'react';
import {  Link,useHistory } from "react-router-dom";
import * as firebase from 'firebase';
import 'antd/dist/antd.css';
import '../css/index.css';
import '../css/mycss.css';
import image from '../images/TASC.jpeg'
import {BellOutlined} from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import { Layout, Col, Row, Space, Menu, Tooltip, Input } from 'antd';
import { Badge } from 'antd';

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
 

//import { white } from 'material-ui/styles/colors';
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { NavLink, Router } from 'react-router-dom';
const { Header} = Layout;
const { Search } = Input;
var count =0;
class SiderMenuVendor extends React.Component {
componentDidMount(){
  const db = firebase.firestore();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
  var  babyRef=  db.collection("User").doc(user.uid).collection("Chat").where("seen","==",false);
  babyRef.onSnapshot(querySnapshot=>{
     count = querySnapshot.docs.length;
    console.log("Doc : ",count)
  })
    }
});
}

  render() {
   
    function Signout(){
      
      firebase.auth().signOut().then(function() {
        console.log("Hi buddy")
      }, function(error) {
        // An error happened.
      });
    }
   
    return (
        <Header className="site-layout-background" >
          <Row>
            <Col span={4}>
              <Space direction={"horizontal"} size={"large"} style = {{color:"white"}}>
              <span><a href = "https://www.worldometers.info/coronavirus/" target="_blank" activeClassName="your-active-class" className="link"><img style={{width:70,height:45}} className = "card-img-logo" src = {image}></img></a></span>
              </Space>
            </Col>
            <Col span={17}>
              <Space direction={"horizontal"} size={40}>
              <NavLink to='/SellerCart' activeClassName="your-active-class" className="link"> <span>Home</span></NavLink>
               <NavLink to='/SellerProductReport' activeClassName="your-active-class" className="link"> <span>Product Report </span></NavLink>
              
               
        <NavLink to='/vendorchat' activeClassName="your-active-class" className="link" className="head-example"> 
        <span><Badge count={count}> Chats </Badge></span> </NavLink> 
  
               
              </Space>
            </Col>
            <Col span={3}>
              <Space direction={"horizontal"} size={40}>
                {/* <Tooltip placement="bottom" title={"Inventory"} size="2rem">
                  <AppstoreOutlined />
                </Tooltip> */}
                <Tooltip placement="bottom" title={"Cart"}>
                <NavLink to='/SellerCart' activeClassName="your-active-class" className="link">  <ShoppingCartOutlined /></NavLink>
                </Tooltip>
                <Tooltip placement="bottom" title={"Account"}>
                <Link to={{pathname:"/VendorInfo",
                   state:{toggle_variable:1}
              }}> <UserOutlined /></Link>
                </Tooltip>
                <Tooltip placement="bottom" title={"Logout"} >
              <NavLink to = '/' activeClassName="your-active-class" className="link"><a onClick ={Signout}><LogoutOutlined /></a>  </NavLink>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </Header>
    );
  }
}

export default SiderMenuVendor;




