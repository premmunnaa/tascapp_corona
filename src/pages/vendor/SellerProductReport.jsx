import React,{Component} from 'react'
import {Layout} from 'antd'
import {Row,Col} from 'antd'
import '../../css/mycss.css';
import ProductInventory from '../../components/SellerCart/ProductLists'
import Popup from '../../components/SellerCart/DocumentPopup'
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import SiderMenuVendor from '../../components/SiderMenuVendor';
//import { Content } from 'react-bootstrap/lib/Tab';
import * as firebase from 'firebase';
const {Content} = Layout;

class Cart extends React.Component {
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
        firebase.auth().onAuthStateChanged((user) => {
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
           
          
            } else {
              // User not logged in or has just logged out.
            }
          });
            
    })
    promises.then((Input)=>{
    this.setState({InputData : Input})
    })
    
}

    render(){
        console.log("Elements : ",this.state.InputData)
        return(
            
                <Layout style={{ minHeight: '100vh' }}>
               
                    <SiderMenuVendor/>
                <Content>
                    <div>
                    
                    <Row style = {{paddingTop : 40,paddingLeft : 40}}>
               
        
               <Col span = {8}>
               <font className = "font-heading">My Products</font></Col>
                <Col span={4}></Col>
                <Col span ={12}>  <div className = "popup-format">
                    
                </div></Col>
                </Row>
               
              
                
               
               
                
                <div>
                    {
               
                <ProductInventory
               
                products = {this.state.InputData}
               
                />
                
            
            }
                </div>
               </div>
                </Content>
               
            </Layout>
        )
}
}

export default Cart;