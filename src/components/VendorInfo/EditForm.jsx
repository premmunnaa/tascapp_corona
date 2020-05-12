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
  const[temp,updatetemp] = useState({});
 let object = [];
  useEffect(()=>{
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const userRef = db.collection("User").doc(user.uid);
        console.log("Id ",user.uid)
       userRef.get().then(function(doc) {
            object = doc.data();
            console.log("MyObject : ",object)
            updatetemp(object)
        })
        
      }
    })
  },[])

  console.log("Tha : ",temp)

  const onFinish = values => {
    console.log('Success:', values);
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const userRef = db.collection("User").doc(user.uid);

        userRef.get().then(function(doc) {
          userRef.update({
           company:values.name_of_organisation===undefined ? (temp.company):(values.name_of_organisation),
           email:values.emailid === undefined ? temp.email:values.emailid,
           address:values.address===undefined? temp.address: values.address,
           shortdescription:values.short_description===undefined ? temp.shortdescription:values.short_description,
           phone:values.contact_number ===undefined ? temp.phone:values.contact_number,
           description:values.description===undefined ? temp.description:values.description,
           website:values.website===undefined ? temp.website:values.website
           }).then(function() {
             console.log("Document successfully written!");
              history.push({
              pathname: '/VendorInfo',
              state: { toggle_variable:1,vendorid:user.uid}
              });
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
        <Input placeholder={temp.company}/>
      </Form.Item>

      <Form.Item
        label="EmailID"
        name="emailid"
       
      >
        <Input placeholder={temp.email} />
      </Form.Item>

      
      <Form.Item
        label="Contact Number"
        name="contact_number"
       
      >
        <Input placeholder={temp.phone} />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
       
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder={temp.website}>
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
       
      >
        <Input placeholder={temp.address} />
      </Form.Item>

      <Form.Item
        label="Short Description"
        name="short_description"
       
      >
        <Input  placeholder={temp.shortdescription}/>
      </Form.Item>

      <Form.Item name="description"  label="Description">
        <Input.TextArea placeholder={temp.description}/>
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