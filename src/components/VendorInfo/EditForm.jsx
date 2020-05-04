import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import * as firebase from 'firebase';

import '../../css/index.css';
import { Form, Input, Button, Checkbox,AutoComplete,Row,Col} from 'antd';
const AutoCompleteOption = AutoComplete.Option;
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

const EditProfile = () => {

  const history = useHistory()  
  const onFinish = values => {
    console.log('Success:', values);
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const userRef = db.collection("User").doc(user.uid);
        userRef.get().then(function(doc) {
          userRef.update({
           company:values.name_of_organisation,
           email:values.emailid,
           address:values.address,
           shortdescription:values.short_description,
           phone:values.contact_number,
           description:values.description,
           website:values.website
           }).then(function() {
             console.log("Document successfully written!");
             history.push('/VendorInfo');
            console.log("Form values : ",values);
          
         })
         .catch(function(error) {
             console.error("Error writing document: ", error);
         });
       
        });
       
      } else {
      console.log("No user is signed in");
      }
    });


  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };
  
  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
     

      <Form.Item
        label="Name Of Organisation"
        name="name_of_organisation"
        
      >
        <Input placeholder="Enter your Name Of Organisation"/>
      </Form.Item>

      <Form.Item
        label="EmailID"
        name="emailid"
       
      >
        <Input placeholder="Enter your EmailID" />
      </Form.Item>

      
      <Form.Item
        label="Contact Number"
        name="contact_number"
       
      >
        <Input placeholder="Enter your Contact Number" />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
       
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="Website"  >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
       
      >
        <Input placeholder="Enter your Address"  />
      </Form.Item>

      <Form.Item
        label="Short Description"
        name="short_description"
       
      >
        <Input  placeholder="Enter your Short Description"/>
      </Form.Item>

      <Form.Item name="description"  label="Description">
        <Input.TextArea placeholder="Enter your description"/>
      </Form.Item>
      
      <Form.Item {...tailLayout} style = {{paddingLeft:"2rem",paddingTop:"2rem"}}>
      <Button style={{width:200,height:50}}   type="primary" htmlType="submit">
                                Submit
                              </Button>
      </Form.Item>
     
  </Form>
  );
}
export default EditProfile