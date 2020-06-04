import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../css/index.css';
import {Layout,Col,Row} from 'antd';
import SiderMenuVendor from '../../components/SiderMenuVendor';
import EditForm from '../../components/VendorInfo/EditForm';
import ProfileImage from '../../components/VendorInfo/ProfileImage'
const {Content} = Layout;

const VendorProfile = ()=>{
    return(
        <Layout style={{ minHeight: '100vh' }}>
                <SiderMenuVendor/>
                <Content>
                    <Row style = {{paddingTop : 20,paddingLeft:20}}> 
                    <Col span = {8}>
                    <font className = "font-header"> Profile </font> </Col>
                    <Col span={6}></Col>
                    <Col style = {{paddingRight:20}} span= {2} ><ProfileImage/></Col>
                    <Col span={1}></Col>
                    </Row>
                    <Row style = {{paddingTop : 50}}>

                    
                    <Col span= {16}>
                   <EditForm/>
                   </Col>
                  
                   </Row>
                </Content>
    </Layout>
    )
}
export default VendorProfile