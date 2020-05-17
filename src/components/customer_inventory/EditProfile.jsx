import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../css/index.css';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as firebase from 'firebase';

var flag = true;
function onChange(date, dateString) {
    console.log(date, dateString);
  }

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      InputData: [],
    };
  }
  
componentDidMount(){
const db = firebase.firestore();
//    Input = this.state.InputData.slice;
var UserId;

let promises =new Promise((Suceed,fail)=>{
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          UserId = user.uid;
          console.log(UserId);
          var docRef = db.collection("User").doc(UserId);
          docRef.get().then(function(doc) {
            Suceed(doc.data());
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
          
        } else {
          // User not logged in or has just logged out.
        }
      });
        
})
promises.then((Input)=>{
this.setState({InputData : Input})
})

}





  state = { visible: false };

  SubmitValues = (values)=>{
    
    console.log("Values : ",values,values.name)
    Object.values(values).map(item =>{
      if(item!==undefined)
      {
        console.log("yess");
        
      }
    })

console.log("Finsih : ",this.state.InputData.firstname);
  var a = this.state.InputData.firstname
  var b = this.state.InputData.email
  var c = this.state.InputData.address
  var d = this.state.InputData.city
  var e = this.state.InputData.phone
  var f = this.state.InputData.country
  var g = this.state.InputData.website
    this.onClose();
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const userRef = db.collection("User").doc(user.uid);
        userRef.get().then(function(doc) {
          userRef.update({
           firstname:values.name===undefined ? (a):(values.name),
           email:values.email===undefined ? (b):(values.email),
           address:values.address===undefined ? (c):(values.address),
           city:values.city===undefined ? (d):(values.city),
           phone:values.phone===undefined ? (e):(values.phone),
           country:values.country===undefined ? (f):(values.country),
           website:values.website===undefined ? (g):(values.website)
           
           }).then(function() {
             console.log("Document successfully written!");
           
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



  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

 onPanelChange(value, mode) {
    console.log(value, mode);
  }
  
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Edit Profile
        </Button>
        <Drawer
          title="Edit"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={this.onClose}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button form = "UserProfile"  type="primary" htmlType = "submit" onclick={this.onClose} >
                Submit
              </Button>
            </div>
          }
        >
          <Form
          id = "UserProfile"
     layout="vertical"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={this.SubmitValues}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  // rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="EmailID"
                  // rules={[{ required: true, message: 'Please enter Emailid' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>

              <Form.Item
                  name="address"
                  label="Address"
                  // rules={[{ required: true, message: 'Please enter address' }]}
                >
                  <Input placeholder="Please enter address" />
                </Form.Item>
               
              </Col>

              <Col span={12}>
              <Form.Item
                  name="city"
                  label="City"
                  // rules={[{ required: true, message: 'Please Choose city' }]}
                >
                   <Input placeholder="Please enter city" />
                </Form.Item>
              </Col>
            
            </Row>
            <Row gutter={16}>
              <Col span={12}>

              <Form.Item
                  name="website"
                  label="Website"
                  // rules={[{ required: true, message: 'Please enter Website' }]}
                >
                  <Input placeholder="Please enter Website" />
                </Form.Item>
               
              </Col>

              <Col span={12}>
              <Form.Item
                  name="Country"
                  label="Country"
                  // rules={[{ required: true, message: 'Please Choose Country' }]}
                >
                   <Input placeholder="Please enter Country" />
                </Form.Item>
              </Col>
            
            </Row>
            <Row gutter={16}>
              <Col span={12}>

              <Form.Item
                  name="phone"
                  label="phone"
                  // rules={[{ required: true, message: 'Please enter phone' }]}
                >
                  <Input placeholder="Please enter phone" />
                </Form.Item>
               
              </Col>
            
            </Row>
            
           
        
           
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default EditProfile;