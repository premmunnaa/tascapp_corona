import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import firebase from 'firebase';
import ProfileImage from '../../components/VendorInfo/ProfileImage'
import 'antd/dist/antd.css';
import comp_image from '../../images/company.jpg'
import { List, Avatar, Row,Col,Button } from 'antd';
import  '../../css/mycss.css'
import MainList from '../../components/customer_inventory/ListsVendor'
import ProductInventory from '../../components/SellerCart/ProductLists'
import { Card } from 'antd';
import Grid from 'antd/lib/card/Grid';
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import {Layout} from 'antd';
import SiderMenuVendor from '../../components/SiderMenuVendor';
import Cart from '../../components/SellerCart/Cart'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const {Content} = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 50,paddingLeft:"20rem",paddingTop:"10rem" }} spin />
var Name_of_organisation = "Athena Technologies"
var Emailid = "Athena@gmail.com"
var Contact_number = "567890"
var Website = "Athena.com"
var Address = "No 40/1 bunder garden main st"
var Place = "chennai"
var Image = comp_image;

const toggle_variable = 1; // from DB

const CartData = [
    {
       
            title: "Masks",
            company : "Amazon",
            city : "Chennai",
            products: [{
                subtype : "SurgicalMask",
               count : 30,
                
            },
            {
                subtype : "N95mask",
                count : 50
            }
        ]
        
    },
    {
       
        title: "Injections",
        company : "Amazon",
        city : "Chennai",
        products: [{
            subtype : "Antiseptics",
           count : 9,
            
        },
        {
            subtype : "TT Injection",
            count : 50
        }
    ]
    
},

    {
       
        title: "Suits",
        company : "Flipper",
        city : "Chennai",
        products: [
            {
                subtype : "Gowns",
                count : 5
            },
           {
                    subtype :"DoctorSuits",
                    count : 10
           }
        
    ]
    
},

{
  title: "Ventilators",
  company : "Zomato",
  city : "Chennai",
    products: [
        
            {
                subtype : "Gowns",
                count : 5
            },
           

    ]
}


]
  
const VendorInfo = () =>{

    const[Loader,UpdateLoader] = useState(false)
    const[DataInp,UpdateDbdata] = useState([]);
console.log("DataInp : ",DataInp)
var FireData=[];
useEffect(()=>{
const db = firebase.firestore();
//    Input = this.state.InputData.slice;
var UserId;

// let Promises  = new Promise((succeed,fail)=>{
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      UserId = user.uid;
      console.log(UserId);
      var docRef = db.collection("User").doc(UserId);
      docRef.get().then(function(doc) {
        FireData = doc.data();
       
       console.log("Firedata: ",FireData)
  UpdateDbdata(FireData);
  UpdateLoader(true);

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
      
    } else {
      // User not logged in or has just logged out.
    }
  });
},[FireData])

    const history = useHistory()  
    const ProfilePage = ()=>{
   
    history.push('/VendorProfile')
    }
    if(toggle_variable == 1)
    {
        return  <Layout style={{ minHeight: '100vh' }}>
                
        <SiderMenuVendor/>
        <Content>
        <Row style = {{paddingTop : 20,paddingLeft : 10}}>
        <Col span={4}>
                        <font className = "font-heading">About Us</font> 
                </Col>  
               
        
                    <Col span={10}></Col>
                    <Col span={6}></Col>
                    <Col span={4}><Button type="primary" htmlType="submit" onClick = {ProfilePage}>
                      Edit Profile
                   </Button></Col> 
                    </Row>
        
           

                        <Row>
                            <Col span ={8} style ={{paddingLeft:20,paddingTop:"1rem"}}>
                        
                            <MainList 
                            name = {DataInp.company} 
                            emailid = {DataInp.email}
                            number = {DataInp.phone}
                            place = {DataInp.city}
                            address = {DataInp.address}
                            website = {DataInp.website}
                            />
                            
                            
                            </Col>
                            <Col span={6}></Col> 
                            <Col span = {10} style = {{paddingRight:10}}>
                            
                            <div className = "container-fluid.row" >
                    <Card
                    hoverable
                    className = "vendorDisplayCard"
                    
                    cover={Loader ?(<img alt="example" src={DataInp.profileImg} className="card-img-top"/>):(<Spin indicator={antIcon} />)}
                    >
                    <Meta

                    title={DataInp.company}
                    description={DataInp.shortdescription}

                    /><br></br><br></br>
                    <Card style ={{lineHeight:2}} type="inner" title="Description">
                    <Row style = {{paddingTop:"1rem"}}>
                        <p >
                  {DataInp.description}</p> </Row>
                    </Card>

                    </Card>
                    </div>

                    </Col>
                    </Row>

                    {/* <Row style = {{paddingTop : 20,paddingLeft : 10}}>
                    <Col span= {8} style ={{paddingLeft : 10}}>
                    <div className = "font-heading">List Of Produts</div></Col></Row>
                    <Row style = {{paddingTop : 20,paddingLeft : 5}}>
                        <Col span ={24} style={{paddingLeft:10}}>
                    <Row style = {{paddingTop:"1rem"}}>
                        {
                    CartData.map((data)=>
                    data.products.map((item,index)=>
                            
                    <Col span={6} style={{paddingLeft:10,paddingTop:"2rem"}}>
                                        
                    <Cart
                        imgsrc = {data.image} 
                        category = {data.title}
                        Name = {item.subtype} 
                        count = {item.count}
                        city ={data.city}
                        company = {data.company}
                        
                        />

                    </Col>
                    )
                    )
                    }            
                    </Row>      
                    </Col>
                    </Row> */}
                                <Row style = {{height:50}}>

                                </Row>
        </Content>
    </Layout>
    }
    else if(toggle_variable ==0)
    {
        return  <Layout style={{ minHeight: '100vh' }}>
                
        <SiderMenuAdmin/>
        <Content>
        <Row style = {{paddingTop : 20,paddingLeft : 10}}>
        <Col span={4}>
                        <font className = "font-heading">About Us</font> 
                </Col>  
               
        
                    <Col span={10}></Col>
                    <Col span={6}></Col>
                   
                    </Row>
        
           

                        <Row>
                            <Col span ={8} style ={{paddingLeft:20,paddingTop:"1rem"}}>
                        
                            <MainList 
                            name = {Name_of_organisation} 
                            emailid = {Emailid}
                            number = {Contact_number}
                            place = {Place}
                            address = {Address}
                            website = {Website}
                            />
                            
                            
                            </Col>
                            <Col span={6}></Col> 
                            <Col span = {10} style = {{paddingRight:10}}>
                            
                            <div className = "container-fluid.row" >
                    <Card
                    hoverable
                    className = "vendorDisplayCard"
                    // cover = {<Col span={20} style = {{paddingRight:10}}><ProfileImage/></Col>}
                    cover={<img alt="example" src={comp_image} className="card-img-top"/>}
                    >
                    <Meta

                    title={Name_of_organisation}
                    description="Ranked 10th in global market"

                    /><br></br><br></br>
                    <Card style ={{lineHeight:2}} type="inner" title="Description">
                    <Row style = {{paddingTop:"1rem"}}>
                        <p >
                    {DataInp.description}</p> </Row>
                    </Card>

                    </Card>
                    </div>

                    </Col>
                    </Row>

                    <Row style = {{paddingTop : 20,paddingLeft : 10}}>
                    <Col span= {8} style ={{paddingLeft : 10}}>
                    <div className = "font-heading">List Of Produts</div></Col></Row>
                    <Row style = {{paddingTop : 20,paddingLeft : 5}}>
                        <Col span ={24} style={{paddingLeft:10}}>
                    <Row style = {{paddingTop:"1rem"}}>
                        {
                    CartData.map((data)=>
                    data.products.map((item,index)=>
                            
                    <Col span={6} style={{paddingLeft:10,paddingTop:"2rem"}}>
                                        
                    <Cart
                        imgsrc = {data.image} 
                        category = {data.title}
                        Name = {item.subtype} 
                        count = {item.count}
                        city ={data.city}
                        company = {data.company}
                        
                        />

                    </Col>
                    )
                    )
                    }            
                    </Row>      
                    </Col>
                    </Row>
                                <Row style = {{height:50}}>

                                </Row>
                     </Content>
                 </Layout>

    }
}

   
 

export default VendorInfo;