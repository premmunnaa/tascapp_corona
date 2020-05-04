import React from 'react';
import 'antd/dist/antd.css';
import '../css/index.css';
import { Layout, Col, Row, Space, Menu, Tooltip, Input } from 'antd';
//import { white } from 'material-ui/styles/colors';
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Link, Router } from 'react-router-dom';
const { Header} = Layout;
const { Search } = Input;
class SiderMenuVendor extends React.Component {
  render() {
    return (
        <Header className="site-layout-background" >
          <Row>
            <Col span={4}>
              <Space direction={"horizontal"} size={"large"} style = {{color:"white"}}>
                <span>Corona Essentials</span>
              </Space>
            </Col>
            <Col span={17}>
              <Space direction={"horizontal"} size={40}>
              <Link to='/SellerCart'> <span>Home</span></Link>
               <Link to='/SellerProductReport'> <span>Product Report </span></Link>
               <Link to='/vendorchat'> <span>Chats </span></Link>
               
                
               
              </Space>
            </Col>
            <Col span={3}>
              <Space direction={"horizontal"} size={40}>
                <Tooltip placement="bottom" title={"Inventory"} size="2rem">
                  <AppstoreOutlined />
                </Tooltip>
                <Tooltip placement="bottom" title={"Cart"}>
                <Link to='/SellerCart'>  <ShoppingCartOutlined /></Link>
                </Tooltip>
                <Tooltip placement="bottom" title={"Account"}>
                <Link to='/VendorInfo'> <UserOutlined /></Link>
                </Tooltip>
                <Tooltip placement="bottom" title={"Logout"}>
                <Link to ='/'><LogoutOutlined /></Link>  
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </Header>
    );
  }
}

export default SiderMenuVendor;




