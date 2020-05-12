import React,{Component} from 'react';
import {useLocation} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Row,Col} from 'antd';

import ChatComp from  '../../components/customer_inventory/ChatComp'
import ProductDetailsCustomer from '../../components/customer_inventory/ProductDetailsCustomer'
import '../../css/index.css';
import { Upload, Modal,Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import SimilarProducts from '../../components/customer_inventory/SimilarProducts'
import {Layout} from 'antd';
import Check from '../../pages/check'
import * as firebase from 'firebase';
import { useEffect } from 'react';
import Icon from '@ant-design/icons'
import mask from '../../images/facemask.jpg'
import { Carousel } from "antd";
//const { Meta } = Card;
const {Content} = Layout;
 
const ProductDescriptionCustomer = props=>{
   const location = useLocation();
    useEffect(()=>{
     console.log("desp:",location.state.vendorid);
    },location.state.vendorid)
    const{
        image
    }=location.state

    return (
<Layout style= {{ minHeight: '100vh'}}>
        <SiderMenuAdmin/>
            <Content>
                <Row>
                <Col style = {{paddingTop:"2rem",paddingLeft:"2rem"}} span={12}>
                <div style = {{paddingBottom : "2rem"}} className  = "font-header">PRODUCT IMAGES</div> 
                <div class="container">
                
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
   
    <ol class="carousel-indicators">
    {
             image.map((index)=>(
                 index==0 ? (
                    <li data-target="#myCarousel" data-slide-to={index} class="active"></li>
                 ):(
                    <li data-target="#myCarousel" data-slide-to={index}></li>
                 )
     
     
     
             ),)
        }
    </ol>

   
    <div class="carousel-inner">
        {
             image.map((img,index)=>(
                    index==0 ? (
                        <div class="item active">
                        <img src={img} alt="Los Angeles" style={{width:"100%"}}/>
                      </div>
                    ):(
                        <div class="item">
        <img src={img} alt="Los Angeles" style={{width:"100%"}}/>
      </div>
                    )
      

    
             ),)
    }
    </div>

    
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>

</Col>
                     {/* <Carousel autoplay>
                         {
                             image.map((img)=>(
                                //  <div>
                                    <img alt="example" className = "carousel" src={img} />
                                //  </div>
                                 
                                //  <img  />
                             // <div>
                             //     <h3></h3>
                             //     </div>
                             ))
                         }
                    
                     
                 </Carousel> */}
                                            
                                             <Col span = {2}></Col>
                                             <Col span={10} style = {{paddingTop:"2rem",paddingRight:"1rem"}}>
                                             <ProductDetailsCustomer
                                                Name = {location.state.product}
                                                Category = {location.state.category}
                                                ShortDes = {location.state.shortdescription}
                                                ProductDetails = {location.state.productdetails}
                                                DesignDetails = {location.state.designdetails}
                                                Count = {location.state.count}
                                                id = {location.state.id}
                                                Company = {location.state.company}
                                                City = {location.state.city}
                                                Image = {location.state.image}
                                                vendorid={location.state.vendorid}
                                                 />
                                             </Col>

                </Row>
               
              

               
               
                <Row>
                    <Row style={{width:"100%",marginTop:"10%",paddingLeft:"2rem"}}>
                    <div className  = "font-header">PRODUCTS YOU MIGHT LIKE</div>
                    </Row>
        <Row style={{width:"100%"}}>          
<SimilarProducts 
   Category = {location.state.category}
/>
</Row> 
                </Row>
                <ChatComp vendorid={location.state.vendorid}/>
            </Content>
        </Layout>
    );
}
export default ProductDescriptionCustomer