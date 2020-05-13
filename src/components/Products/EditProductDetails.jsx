  import React,{Component} from 'react';
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';
import { Form, Input, Button, Checkbox,AutoComplete} from 'antd';
import '../../css/index.css';
import '../../css/mycss.css';


const options = [
  {
    value: 'Masks',
  },
  {
    value: 'Suits',
  },
  {
    value: 'Ventilators',
  },
];
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
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
  

const EditProductDetails = props =>{
  const {
    count,
    subprod,
    category,
    id,
    proddetails,
    desdetails,
    shortdes
} = props

console.log("check:"+category);
 return(
     
  <div>
       <div  className = "font-subheader">Product Category </div>
       <div style = {{paddingTop:15}}></div>
       <Col span = {24}>
       <Form.Item
       name = "product_category"
        // name={["p", "ProductName"]}
        // fieldKey={["p", "ProductName"]}
        // rules={[
        //   {
        //   required : true,
        //   message : "Enter the product name"
        //   }
        // ]}
      >
        
      
         
          <AutoComplete
                        style={{
                          
                          height:30,
                        }}
                        options={options}
                        placeholder="Product Category"
                        defaultValue={category}
                        filterOption={(inputValue, options) =>
                          options.value.toUpperCase().startsWith(inputValue.toUpperCase())
                          
                        }
                      /> 
      </Form.Item>
      </Col>

      <div className = "font-subheader">Product Name </div>
       <div style = {{paddingTop:15}}></div>
       <Col span = {24}>
       <Form.Item
        
        name="name_of_subproduct"
        
      >
          <div>
          <Input defaultValue = {subprod} /> </div>
      </Form.Item>
      </Col>
     
      <div className = "font-subheader">Short Description </div>
      <div style = {{paddingTop:15}}></div>
      <Col span = {24}>
      <Form.Item
        
        name="shortdescription"
        
      >
          <div>
          <Input defaultValue = {shortdes} /> </div>
      </Form.Item>
      </Col>
   
   
    <br></br>
    
    <br></br>
    <div className = "font-subheader">Product Details </div>
    <div style = {{paddingTop:15}}></div>
    <Col span = {24}>
    <Form.Item name="productdetails" >
    
    <div><Input.TextArea className="textarea.ant-input-affix-wrapper"  defaultValue = {proddetails}/></div>  
      </Form.Item></Col>


    
        <div className = "font-subheader">Design Details </div>
        <div style = {{paddingTop:15}}></div>
        <Col span = {24}>
        <Form.Item name="designdetails">
        
        <div> <Input.TextArea className="textarea.ant-input-affix-wrapper" defaultValue = {desdetails}/></div>
      </Form.Item>
      </Col>



      <div className = "font-subheader">Count</div>
       <div style = {{paddingTop:15}}></div>
       <Col span = {24}>
       <Form.Item
        
        name="count"
        
      >
          <div>
          <Input defaultValue ={count}/> </div>
      </Form.Item>
      </Col>
     
      <div className = "font-subheader">Shipping Details </div>
       <div style = {{paddingTop:15}}></div>
       <Col span = {24}>
       <Form.Item
        
        name="shipping_details"
        
      >
          <div>
          <Input.TextArea defaultValue = "Shipping..!" /> </div>
      </Form.Item>
      </Col>
     
      </div>
        
   );
}
export default EditProductDetails;