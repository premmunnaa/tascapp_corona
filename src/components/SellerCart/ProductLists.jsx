import React from 'react'

import  '../../css/mycss.css'
import 'antd/dist/antd.css';
import * as firebase from 'firebase';
import { Col, Row ,Button,Form,InputNumber,Input} from "antd";
import { useState } from 'react';
import { useEffect } from 'react';
const db = firebase.firestore();
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
  console.log("Products : ",props.products)
 
  const ChangeMode = () =>{
    UpdateMode(true);
  }
 useEffect(() => {
    UpdateProducts(products);
}, [products])
const onFinish = (values)=>{

  console.log("prem Values : ",values);

  ProductArray.map((product)=>{
    console.log("prem vendor id",product.vendorid);
    console.log("prem product id",product.id);
    const ref = db.collection('User').doc(product.vendorid).collection('Products').doc(product.id);
    ref.update({
      count:values[product.id].count ===undefined ? product.count : values[product.id].count
    })
  })
  let dataarr=[];
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
     var UserId = user.uid;
      console.log(UserId);
    var collRef=  db.collection("User").doc(UserId).collection("Products");
    collRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            dataarr.push(doc.data());
          //  console.log(doc.id, " => ", doc.data());
        });
    }).then(function() {
      UpdateProducts(dataarr)
      UpdateMode(false)
    })
    console.log(dataarr); 
    } else {
        unsubscribe();
      // User not logged in or has just logged out.
    }
  });
  
  
}
 
   console.log("Props are ...",props)
const Update = ()=>{
  console.log("Cleared")
  UpdateMode(false)
}
   
    return (
      
    <div >
    
    <Row>
   <Col span={8}>
                  
            </Col>  
            <Col span={4}></Col>
            {
              EditMode ? (
              <Col style = {{paddingLeft:10}} span= {4}><Button type = "submit" className = "ant-btn ant-btn-primary" onClick={Update}>Clear</Button></Col>
              ):(
                <Col span ={4}><Button type = "submit" className = "ant-btn ant-btn-primary" onClick={ChangeMode}>Edit</Button></Col>
                
              )
            }
            
           
      </Row>      
    
    {
  EditMode ? (
    <div>
    
    <Form {...layout}   name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
    {
    ProductArray.map((product,index)=>
      
            <Row style={{paddingTop : 20}}>
                            <Col span={1}>
                        
                                </Col>
                                <Col span={12}>
                            <Form.Item
                      // name={["Count",product.count]}
                      name = {[product.id,"count"]}
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
                      <Input 
                        style = {{width:200}}
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
            <Button  type = "primary" htmlType="submit" style = {{width:170,height:50}} >Submit</Button>
            </Form.Item>
          
       </Row>
 </Form>

     
  </div>  
  ) :  (
    
    ProductArray.map((product)=>{
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

