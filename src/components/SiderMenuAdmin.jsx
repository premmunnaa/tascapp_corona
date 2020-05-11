import React from 'react';
import 'antd/dist/antd.css';
import '../css/index.css';
import * as firebase from 'firebase';
import { Layout, Col, Row, Space, Menu, Tooltip, Input } from 'antd';
//import { white } from 'material-ui/styles/colors';
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Link, Router,NavLink } from 'react-router-dom';
const { Header} = Layout;
const { Search } = Input;
class SiderMenuAdmin extends React.Component {
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
                <span><a href = "https://www.worldometers.info/coronavirus/" activeClassName="your-active-class" className="link">Corona Essentials</a></span>
              </Space>
            </Col>
            <Col span={17}>
              <Space direction={"horizontal"} size={40}>
              <span> <NavLink  to="/AdminInventory" activeClassName="your-active-class" className="link">Home</NavLink></span>
              
              <span> <NavLink  to="/AdminChat" activeClassName="your-active-class" className="link">Chats</NavLink></span>
              
               
               
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