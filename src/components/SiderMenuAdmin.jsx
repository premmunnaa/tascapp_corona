import React from 'react';
import 'antd/dist/antd.css';
import '../css/index.css';
import * as firebase from 'firebase';
import { Layout, Col, Row, Space, Menu, Tooltip, Input } from 'antd';
//import { white } from 'material-ui/styles/colors';
import { Badge } from 'antd';
import image from '../images/TASC.jpeg'
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Link, Router,NavLink } from 'react-router-dom';
const { Header} = Layout;
const { Search } = Input;
var count =0;
class SiderMenuAdmin extends React.Component {
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
              
              <span><img style={{width:70,height:45}} className = "card-img-logo" src = {image}></img></span>
              </Space>
            </Col>
            <Col span={17}>
              <Space direction={"horizontal"} size={40}>
              <span> <NavLink  to="/AdminInventory" activeClassName="your-active-class" className="link">Home</NavLink></span>
              
              <NavLink to='/AdminChat' activeClassName="your-active-class" className="link" className="head-example"> 
        <span><Badge count={count}> Chats </Badge></span> </NavLink> 
               
               
              </Space>
            </Col>
            <Col span={3}>
              <Space direction={"horizontal"} size={40}>
                {/* <Tooltip placement="bottom" title={"Inventory"} size="2rem">
                  <AppstoreOutlined />
                </Tooltip> */}
                <Tooltip placement="bottom" title={"Cart"}>
                 <NavLink to = '/AdminCart' activeClassName="your-active-class" className="link"> <ShoppingCartOutlined /></NavLink> 
                </Tooltip>
                <Tooltip placement="bottom" title={"Account"}>
                <NavLink to = '/AdminProfile' activeClassName="your-active-class" className="link"> <UserOutlined /></NavLink>
                </Tooltip>
                <Tooltip placement="bottom" title={"Logout"}>
                <NavLink to = '/' ><a onClick ={Signout}><LogoutOutlined /></a>  </NavLink>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </Header>
    );
  }
}

export default SiderMenuAdmin;