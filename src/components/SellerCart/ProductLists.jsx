import React from 'react'

import  '../../css/mycss.css'
import 'antd/dist/antd.css';

import { Col, Row ,Button,Form,InputNumber} from "antd";
import { useState } from 'react';
import { useEffect } from 'react';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ViewProducts = props=>{
  const{
    products
  }=props;

  const[ProductArray,UpdateProducts] = useState(products)
  const [EditMode,UpdateMode] = useState(false)
  console.log("ProductArray : ",ProductArray)
 const ChangeMode = () =>{
    UpdateMode(true);
  }
  // const CountUpdate = (spotindex,value)=>{
  //   console.log("UpdateValues : ",spotindex)
  //     products.map((item,index)=>{
  //       if(index === spotindex)
  //       {
  //         item.count = value;
  //       }
  //     })
  //     console.log("Updated array .. ",products)
     
  // }
 
const onFinish = (values)=>{
  console.log("Values : ",values)
 

  UpdateProducts(products)
  UpdateMode(false)
}
 
   console.log("Props are ...",props)

   
    return (
      
    <div >
    
    <Row>
   <Col span={8}>
                  
            </Col>  
            <Col span={4}></Col>
            {
              EditMode ? (
               <Col></Col>
              ):(
                <Col span ={4}><Button type = "submit" className = "ant-btn ant-btn-primary" onClick={ChangeMode}>Edit</Button></Col>
              )
            }
            
           
      </Row>      
    
    {
  EditMode ? (
    <Form {...layout}   name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
    {
    products.map((product,index)=>
      
            <Row style={{paddingTop : 20}}>
                            <Col span={1}>
                        
                                </Col>
                                <Col span={12}>
                            <Form.Item
                      // name={["Count",product.count]}
                      name = {[product.sub_type,"count"]}
                      label={product.sub_type}
                      // rules={[
                      //   {
                      //     type: 'number',
                      //     min: 0,
                      //     max: 50000,
                      //   },
                      // ]}
                      >
                    <Col span={6}>     
                      <InputNumber 
                        defaultValue = {Number(product.count)}
                        
                        />
                      </Col>
                      
                      </Form.Item>
                      </Col>  
                          </Row>
                          
                          
               )
   
      } 
<Row>
         <Col span={8}></Col>
         
          <Form.Item >
            <Button  type = "primary" htmlType="submit" >Submit</Button>
            </Form.Item>
       </Row>
 </Form>

     
    
  ) :  (
    
products.map((product)=>{
  console.log("Inside ...",product.sub_type,product.count)
    let color;
        if(product.count>100)
        {
            
            color = "green";
        }
        else if(product.count>10 && product.count<100)
        {
          
            color = "orange";
        }
        else{
            
          color = "red";
      }
  return (
  <Row style={{paddingTop : 20}}>
  <Col span={1}>

       </Col>
       <Col span={6}>
       
 {product.sub_type} 
     
   
       </Col><Col span = {2}>:</Col> <Col span = {2}><font color = {color}>{product.count}</font></Col>
     
   </Row>
   )


})
  ) //else part of Edit
   
   
  } 
     </div>
  );

};

export default ViewProducts

