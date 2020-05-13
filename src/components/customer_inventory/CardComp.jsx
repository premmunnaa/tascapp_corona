import React, { useEffect, useState } from 'react';
//import useHistory from 'react-router-dom'
import { Link, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import "../../css/mycss.css"
import { Col,Row } from 'antd';

import { Card,Avatar,Button } from 'antd';
import { calculateDistance } from '../../scripts/distance_calculation';
import mask from '../../images/company.jpg'
import { Empty } from 'antd';
import{
  EnvironmentOutlined,
  } from '@ant-design/icons';

const { Meta } = Card;



const CardComp = props =>{

  const history = useHistory()
 
    const {
      count,
      image,
      company,
      Name,
      city,
      id,
      category,
      productdetails,
      designdetails,
      shortdescription,
      vendorid
    } = props;
   
    const prod_description = ()=>{
      // console.log("pass params ",productdetails);
      history.push({
        pathname: '/Product_description',
        state: { vendorid:vendorid,id:id,product:Name,category:category,shortdescription:shortdescription,productdetails:productdetails,designdetails:designdetails,count:count,company:company,city:city,image:image}
    });
     //history.push('/Product_description_edit')
    }
   

    // console.log("Props are :",props)
    // console.log("My props : ",props.designdetails)
 

    return(
      
        
        
       

        <Card
        
        onClick = {prod_description}
        size = "small"
        hoverable
        className = "vendorDisplayCard"
        cover={ image[0]===undefined ? (<Empty  />):(<img  src={image[0]} className="img-border" />)}
      >
         <Meta
     // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className="card-img-top"/>}
      title={Name}
      description={category +" by "+company}
     
    /><br></br>
      <Row><Col span = {2}><EnvironmentOutlined /> </Col><Col span = {10}><font className = "cardbody" size="small">{city}</font> </Col><Col span={2}></Col> <Col span={6} className = "instock"><font color ="green">Instock</font></Col>
      </Row> 
   
     
      </Card>
      
     
      
    )
    
};

export default CardComp;

