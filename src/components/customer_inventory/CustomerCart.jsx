import React from 'react';
import { Link, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';

import{
  EnvironmentOutlined,
  } from '@ant-design/icons';
import { Col,Row,Card} from 'antd';
import mask from '../../images/facemask.jpg'
import location from '../../images/location.png'
import "../../css/mycss.css"

const { Meta } = Card;

const CustomerCart = props=>{
  
    const history = useHistory()
    const {
       
      category ,
      company ,
      city,
      productname ,
      image,
    } = props;
   console.log("props are : ",props)
    const prod_description = ()=>{
      history.push('/Product_description')
     //history.push('/Product_description_edit')
    }
   

    console.log("Props are :",props)
    // const [distance,updateDistance] = useState(undefined);
    
    const whichPage = Name=>{
      console.log("clicked ",Name);
       
      history.push('/VendorInfo')
    }
 

   
    return(
      
        
        <div>
       
       
        <Card
        
        onClick = {prod_description}
        size = "small"
        hoverable
        className = "vendorDisplayCard"
        cover={<img  style = {{objectFit:"cover",height:"40vh",width:"100%",borderStyle:"ridge"}} alt="example" src={image[0]}  />}
      >
         <Meta
   
      title={productname}
      
      description={category+" by "+company}
     
    /><br></br>
      <Row><Col span = {2}><EnvironmentOutlined /></Col><Col span = {6}><font className = ".ant-card-meta-description" size="small">{city}</font> </Col><Col span={8}></Col> <Col span={4} className = "instock"><font color ="green">Outstock</font></Col>
      </Row> 
   
      </Card>
     
      </div>
     
      
    )
}
export default CustomerCart