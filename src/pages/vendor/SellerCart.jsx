import React from 'react'

import  '../../css/mycss.css'
import 'antd/dist/antd.css';
import Cart from '../../components/SellerCart/Cart'
import { Col, Row, Empty } from "antd";
import SiderMenuVendor from '../../components/SiderMenuVendor'
import Popup from '../../components/SellerCart/DocumentPopup'
import * as firebase from 'firebase';

var Input = [];
class ProductCart extends React.Component {
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
    var dataarr=[];
    let promises =new Promise((Suceed,fail)=>{
     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User logged in already or has just logged in.
              UserId = user.uid;
              console.log(UserId);
            var collRef=  db.collection("User").doc(UserId).collection("Products");
            collRef.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    dataarr.push(doc.data());
                  //  console.log(doc.id, " => ", doc.data());
                });
            }).then(function() {
                Suceed(dataarr);
            })
            console.log(dataarr); 
           
            //  var docRef = db.collection("User").doc(UserId);
            //   docRef.get().then(function(doc) {
            //     Suceed(doc.data().Products);
            // }).catch(function(error) {
            //     console.log("Error getting document:", error);
            // });
              
            } else {
              unsubscribe();
              // User not logged in or has just logged out.
            }
          });
            
    })
    promises.then((Input)=>{
    this.setState({InputData : Input})
    })
    
}

    render(){
      
    return(
       
        <div>
            <SiderMenuVendor/>
            <Row>
                <Col span = {16}></Col>
            <Col span ={8}>  <div className = "popup-format">
                    <Popup/>
                </div></Col>
            </Row>
        <Row style = {{paddingLeft:"1rem"}}>
        {
          this.state.InputData.length === 0 ? (<Col style = {{paddingLeft:"20rem",paddingTop:"5rem"}}><Empty/></Col>):(
         this.state.InputData.map((item)=>
        
                 
         <Col span={6} style={{paddingLeft:10,paddingTop:"2rem"}}>
                            
         <Cart
             imgsrc = {item.imgurls} 
             category = {item.title}
             Name = {item.sub_type} 
             count = {item.count}
             city ={item.city}
             company = {item.company}
             id={item.id}
             proddetails={item.productdetails}
             desdetails={item.designdetails}
             shortdes = {item.shortdescription}
             shipping = {item.shipping_details}
             />

     </Col>
          )
        )
      }
        </Row>
        </div>
    )

    }
}
export default ProductCart