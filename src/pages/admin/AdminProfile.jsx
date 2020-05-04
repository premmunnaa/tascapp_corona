import React from 'react';
import 'antd/dist/antd.css';
import '../../css/index.css';
import {Row,Col} from 'antd';
import UserProfile from '../../components/customer_inventory/UserProfile'
import EditProfile from '../../components/customer_inventory/EditProfile'
import SiderMenuAdmin from '../../components/SiderMenuAdmin'
const Profile = ()=>{
    return(
        <div>
            <SiderMenuAdmin/>
            <Row>
                <Col span = {8}></Col>
                <Col span = {8}></Col>
                <Col span = {8} style={{paddingTop:"1rem"}}> <EditProfile/> </Col>
            </Row>
            <Row>

          
            <UserProfile/>
            </Row>
        </div>
    )
}
export default Profile;