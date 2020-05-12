import React from 'react'
import { Link, useHistory } from "react-router-dom";
import  '../../css/mycss.css'
import 'antd/dist/antd.css';

import mask from '../../images/facemask.jpg'
import { Col, Row ,Card} from "antd";
import { Empty } from 'antd';
import{
EnvironmentOutlined,
} from '@ant-design/icons';
const { Meta } = Card;


const Cart = props =>{
 
    const history = useHistory()
    const {
        imgsrc,
        count,
        company,
        Name,
        city,
        id,
        category,
        proddetails,
        desdetails,
        toggle,
        shortdes,
        vendorid
    } = props
     console.log("Cart Props ",props)
    const prod_edit = ()=>{
        history.push({
            pathname: '/Product_edit',
            state: { imgurls:imgsrc,id:id,subprod:Name,category:category,shortdes:shortdes,proddetails:proddetails,desdetails:desdetails,count:count }
        });
    }
      const prod_description = ()=>{
            history.push({
                pathname: '/Product_description',
                state: { vendorid:vendorid,id:id,product:Name,category:category,shortdescription:shortdes,productdetails:proddetails,designdetails:desdetails,count:count,company:company,city:city,image:imgsrc}
            });
        }
    //  history.push('Product_edit',{id:id,subprod:Name,category:category,shortdes:shortdes,proddetails:proddetails,desdetails:desdetails,count:count})
    // history.push('/Product_edit');
    
    let status;
    let color;
     if(count>100)
     {
         status = "OutOfstock"
         color = "green";
     }
     else if(count>10 && count<100)
     {
        status = "AlmostSold"
        color = "orange";
     }
     else{
         status = "OutOfstock"
         color = "red";
     }
     console.log("Image : ",imgsrc[0])
    return(
        <div>
           
                
                <Card
                style = {{lineHeight:1.2}}
                onClick = {toggle===0?(prod_description):(prod_edit)}
                size = "small"
                hoverable
                className = "vendorDisplayCard"
                cover={ imgsrc[0]===undefined ? (<Empty  />):(<img  src={imgsrc[0]} className="img-border" />)}
              >
                 <Meta
             
              title={Name}
              description={category+" by "+company}
             
            /><br></br>
              <Row><Col span = {10}>Count : <font size="small" color = {color}>{count}</font> </Col><Col span={6}></Col> <Col span={8} className = "instock"><font color ={color}>{status}</font></Col>
              </Row> 
           
              
              </Card>
              
              
              
        

        </div>
    )
}
export default Cart;