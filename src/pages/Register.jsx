import React, { useState, useEffect } from 'react';
import Recaptcha from 'react-recaptcha';
import 'antd/dist/antd.css';
import countryList from 'react-select-country-list'
import * as firebase from 'firebase';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber
} from 'antd';
import {Card,message} from 'antd';
import '../css/Register.css';
import { Layout} from 'antd';
import { white } from 'material-ui/colors';
import {Affix} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';

const db = firebase.firestore();
const { Header} = Layout;

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 28,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 28,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 28,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {

  const Options = countryList().getData()
  let Country = [];
  Options.forEach((country,index)=>{
    
    console.log("Options inside : ",Options[index].label)
   
    Country.push({
      value : Options[index].label
    })
  })

  console.log("Options : ",Options[0].toString(),Options[0].label)
  console.log("Optionsssss: ",Country[0])
  
  const history = useHistory();
  const[captcha,updateCaptcha] = useState(0);
  const [form] = Form.useForm();

 

  const CaptchaLoader = () => {
   console.log("Ready");
    
  }

  const VerifyCaptcha = (response) => {
    console.log("Verify Captcha..!");
    console.log("Response : ",response);
    if(response)
    {
      updateCaptcha(1);
    }
  }

  const onFinish = values => {
    if(values.password.length<6)
    {
      message.error("Password should me minimum of 6 charecters")
    }
    if(captcha)
    {
    firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(res => {
      console.log("The response is ",res);
      if (res.user){
        const userRef = db.collection("User").doc(res.user.uid).set({
          firstname: values.firstname,
          lastname : values.lastname,
          email: values.email,
          phone:values.phone,
          website:values.website,
          type:values.type,
          company:values.companyname,
          city:values.Adress,
          Products:[],
          country:values.country,
          address:values.Adress,
          documents:false
        }).then(function() {
          console.log("Document successfully written!");
          history.replace("/");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
       
    }})
    // .catch(e => {
    //   console.log(e.message);
    // });
    console.log('Received values of form: ', values);
    }
    else
    {
      alert("Please Confirm you are Human !")
    }
  };

  const prefixSelector = (
    <Form.Item label="InputNumber">
          <InputNumber />
    </Form.Item>
  );
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
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="type"
        label="Type"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select type!',
          },
        ]}
      >
        <Select placeholder="Type" style={{width: 100}}>
          <Option value="Seller">Seller</Option>
          <Option value="Buyer">Buyer</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="title"
        label="Title"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select title!',
          },
        ]}
      >
        <Select placeholder="Title" style={{width: 80}}>
          <Option value="Mr">Mr</Option>
          <Option value="Mrs">Mrs</Option>
          <Option value="Ms">Ms</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="firstname"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please enter FirstName!',
          },
        ]}
      >
      <Input style={{ width: 160 }} placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Last Name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please enter lastname!',
          },
        ]}
      >
      <Input style={{ width: 160 }} placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        name="companyname"
        label="Company Name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please enter Company name!',
          },
        ]}
      >
      <Input style={{ width: 160 }} placeholder="Company Name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password  />
      </Form.Item>
      <Form.Item
        name="Adress"
        label="Address"
        rules={[
          {
            required: true,
            message: 'Please enter your Address',
          },
        ]}
      >
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        
        name="country"
        label="Country"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please select country!',
          },
        ]}
      >
        
       <AutoComplete
                        style={{ width: 300 }}
                        
                        options={Country}
                        //value = {countryname}
                        placeholder="Choose Country"
                        //onchange = {handleCountry}
                        filterOption={(inputValue, options) =>
                        options.value.toUpperCase().startsWith(inputValue.toUpperCase())
                           
                       }
                      /> 
     
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[
          {
            required: true,
            message: 'Please input website!',
          },
        ]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item>
        
      
        <Row gutter={8} style = {{paddingBottom:"2rem"}}>
          <Col span = {5}></Col>
          <Col span={12}>

                  <Recaptcha
                    sitekey="6Lfuz_8UAAAAAMaIaGMILKVvNgmPRWqwtBQeMnAo"
                    render="explicit"
                    onloadCallback={CaptchaLoader}
                    verifyCallback={VerifyCaptcha}
                  />

         
          </Col>
        </Row>
      

      {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button> 
      </Form.Item>
    </Form>
  );
};

class HeaderMenu extends React.Component {
    render() {
      return (
          <Header className="site-layout-background" className="headerLogin" style={{ color: white }}>
          <p style={{fontSize: 22, margin: 5}}><font color = "white">T.A.S.C</font></p>
          <LoginInRegister />
          </Header>
      );
    }
  }
  

const LoginInRegister = () => {
  const history = useHistory();
const [form] = Form.useForm();
const [, forceUpdate] = useState(); // To disable submit button at the beginning.

useEffect(() => {
    forceUpdate({});
}, []);

const onFinish = values => {
  
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    return firebase
    .auth()
    .signInWithEmailAndPassword(values.username, values.password)
    .then(res => {
      if (res.user){
        
        var docRef = db.collection("User").doc(res.user.uid);
        docRef.get().then(function(doc) {
          if (doc.data().type === "Buyer") {
            history.replace("/AdminInventory");
          } else if(doc.data().type === "Seller") {
            history.replace("/SellerCart");
          }
      }).catch(function(error) {
       
      });
        
      }
    })
    .catch(e => {
      message.error(e.message);
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
  });
};

return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
    <Form.Item
        name="username"
        rules={[
        {
            required: true,
            message: 'Please input your username!',
        },
        ]}
    >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    </Form.Item>
    <Form.Item
        name="password"
        rules={[
        {
            required: true,
            message: 'Please input your password!',
        },
        ]}
    >
        <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
        />
    </Form.Item>
    <Form.Item shouldUpdate>
        {() => (
        <Button
            type="primary"
            htmlType="submit"
            disabled={
            !form.isFieldsTouched(true) ||
            form.getFieldsError().filter(({ errors }) => errors.length).length
            }
        >
            Log in
        </Button>
        )}
    </Form.Item>
    </Form>
);
};

class Register extends React.Component {
    render() {
        return ( 
            <Layout style={{ minHeight: '150vh' }} className="bg">
                <Layout className="site-layout">
                    <Affix><HeaderMenu /></Affix>
                    
                    <div className="site-card-border-less-wrapper" className="bg">
                        <Row  className="row-form">
                            <Card title="Registration" bordered={true} style={{ width: 500}}>
                                <RegistrationForm />
                            </Card>
                        </Row>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

export default Register;
