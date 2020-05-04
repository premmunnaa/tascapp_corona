import React,{Component} from 'react';
import 'antd/dist/antd.css';
import {Row,Col,Button} from 'antd';

import '../../css/index.css';
import '../../css/mycss.css';


const Details = ()=>{
   
 return(
   <div>
        <div>

       
    <font className = "font-header"> FaceMask</font> </div>
   <div class="ant-card-meta-description" style = {{paddingLeft:"5rem"}}>Cotten Mask by Amazon</div>
    <br></br>
    <Button type = "submit" style = {{width : 300, height : 50}}  className = "ant-btn ant-btn-primary">Add to Cart</Button>
    <br></br>
    <div className = "font-subheader">Product Details </div>
    
    <p>This product is especialy designed for the protection against the bad spread of this unstoppabel Corona virus 
        which protects us against cold dust and other transmissions...! </p>
        <div className = "font-subheader">Design Details </div>
        <p>
        This product is especialy designed for the protection against the bad spread of this unstoppabel Corona virus 
        which protects us against cold dust and other transmissions...! 
        </p>
    </div>
   );
}
export default Details;