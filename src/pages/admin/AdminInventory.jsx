import React,{Component} from 'react';
import  { useEffect, useState } from 'react';
import {Layout} from 'antd';
import SiderMenuAdmin from '../../components/SiderMenuAdmin';
import CardComp from '../../components/customer_inventory/CardComp'
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
import Cascader from '../../components/customer_inventory/Cascader'
import ProductCategories from '../../components/customer_inventory/Categories'
import { Input,AutoComplete } from 'antd';
import * as firebase from 'firebase';
import { Spin } from 'antd';
import { Empty } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const { Search } = Input;
const {Content} = Layout;
const db = firebase.firestore();
const antIcon = <LoadingOutlined style={{ fontSize: 50,paddingLeft:"20rem",paddingTop:"10rem" }} spin />;

const Cards = props => {

    const[DBData,UpdateDBData] = useState([])
const[Loader,UpdateLoader] = useState(false)  // Screen loading
const[filterCards,UpdateFilter] = useState([]); // Search bar filter
const [filterProduct,updateFilterProduct] = useState([]);  // category filter
//const[options,Updateoptions] = useState([]);
  // overall DB data
var searchFilter = [];
var displayVendors = [];
let StateVariable = [];
   console.log("Search Filter first : ",searchFilter)
        
    let options = [];
 


console.log("DB data : ",DBData)
DBData.map((product)=>{
options.push({value:product.sub_type});
})



Array.prototype.push.apply(displayVendors, DBData)

console.log("Display Vendors : ",displayVendors)

useEffect(()=>{
        
          // User logged in already or has just logged in
       
            var collRef = db.collection("User").where("type","==","Seller");
           
            collRef.get().then((querySnapshot) => {
                    console.log("The query snapshot is ",querySnapshot.docs)
                    let FullData = [];
                    Promise.all(querySnapshot.docs.map((document) => {
                       return document.ref.collection("Products").get()
                    })).then(productSnapshot => {
                        productSnapshot.map(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                var jsonData = doc.data();
                                
                                FullData.push(jsonData);
                                console.log("Each Card Data : ",jsonData);
                            });
                        })
                        console.log("Before succeeding",FullData,typeof(FullData),FullData[0],Object.keys(FullData),
                        Object.values(FullData));
                  console.log("Full Data : ",FullData,typeof(FullData),FullData[0]);
                
                FullData.map((seller)=>{
                    console.log("Seller : ",seller)
                   })
                  
                UpdateLoader(true);
                console.log("Before sending ..",typeof(FullData),FullData[0])
                UpdateDBData(FullData);
                    })
                    
            });   //collref
                  
},[])

console.log("Final Data : ",DBData);

const CategoryFilter = (value) => {
        console.log("Category Array : ",value)
     
        updateFilterProduct(value)
       
    }
    
    
  const onSelect = value => {
    console.log("onSelect", value);

    let result = [];
    result = value.trim().split(/[ ,]+/);
    console.log("Result Array  : ",result)
    UpdateFilter(result);
  };

  const onChange = value =>{
   
        if(value == undefined){
            UpdateFilter([])
        }
        else{
            console.log("Search Value : ", value);
            let result = [];
            result = value.trim().split(/[ ,]+/);   
            console.log("Result Array  : ",result)
            UpdateFilter(result)
        }
  }
    const SearchText = (value)=>{
        
     
        console.log("Search Value : ", value);
        let result = [];
       
        
       
        result = value.trim().split(/[ ,]+/);
        
        console.log("Result Array  : ",result)
        UpdateFilter(result)
        
        }

        console.log("The Category Filter is  ",filterProduct);
        console.log("The Search Filter is : ",filterCards)


   
 
    if(filterProduct.length !== 0)
    {
        displayVendors = [];
        let localFilter = [];
        filterProduct.map((category)=>{

        console.log("Inside loop FilterProduct : ",filterProduct)
        DBData.map((vendor)=>{
           
                if(vendor.title.toLowerCase() === category.toString().toLowerCase())
                {
                    console.log("match ",vendor.title)
                    localFilter.push(vendor)
                }
                
            })
        
         })
         console.log("Category filters : ",localFilter)
         Array.prototype.push.apply(displayVendors, localFilter)
    }
   
  
        
   

     if(filterCards.length!==0 && filterCards[0] != "")
     {
        
            Array.prototype.push.apply(StateVariable,displayVendors)
            displayVendors = [];
    

            console.log("The state variable is ",StateVariable);
            console.log("hiii")
            console.log("Search Parameter : ",filterCards)
            filterCards.map((name)=>{
            (StateVariable.forEach((vendor,index)=>{
               console.log("vendor search parameter..",vendor.sub_type)
               if(vendor.company.toString().toLowerCase().includes(name.toString().toLowerCase()) || vendor.title.toString().toLowerCase().includes(name.toString().toLowerCase()) || vendor.sub_type.toString().toLowerCase().includes(name.toString().toLowerCase()))
                    {
                        console.log("Filtering item ",vendor);
                        displayVendors.push(vendor);
                        return;
                       
                    }
                })
            )
        })
         displayVendors = displayVendors.filter((item,index) =>displayVendors.indexOf(item)===index)
      
        console.log("Display inside Search : ",displayVendors)
      
    }


        console.log("Display Vendors Oustide : ",displayVendors)
        console.log("Search Filter last length : ",searchFilter.length)

            return(
                <div>
                
                <div className="site-card-wrapper">
                <Row>
                    
                <Col span={4} style={{paddingLeft:10,paddingTop:20}}><font className = "font-subheader">CATEGORIES</font></Col>
                    <Col span={10} style={{paddingTop:10,paddingLeft:20}}>
                    <AutoComplete
                            options={options}
                            style={{
                                width: 400
                            }}
                            allowClear
                            onChange = {onChange}
                            onSelect={onSelect}
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().startsWith(inputValue.toUpperCase())
                            }
                            >
                    <Search
                             className = "SearchBar"
                          placeholder="Search for Companies or SubProducts"
                            onSearch={value => SearchText(value)}
                           
                            />
                            </AutoComplete>
                   
                   </Col>  
                   
                    <Col span={2}></Col>
                   
              
                </Row>
                <Row>
                 
                    
                </Row>
                <Row style={{paddingLeft:"1rem"}}>
                    <Col span={3}>
                        <ProductCategories
                         CategoryFilter = {CategoryFilter}
                        />
                    </Col>
                    <Col span={21} >
                        <Row style = {{paddingRight:"0.5rem"}}>
                    {
                        Loader ? ( 
                            displayVendors.length==0 ? (
                                <Empty/>
                            ) : (
                                displayVendors.map((item) => 
                    
                           
                                
                                <Col span={6} style={{paddingLeft:10,paddingTop:"2rem"}}>
                           
                           <CardComp   
                               Name = {item.sub_type} 
                               count = {item.count}
                               city ={item.city}
                               company = {item.company}
                               id = {item.id}
                               image = {item.imgurls}
                               productdetails = {item.productdetails}
                               shortdescription = {item.shortdescription}
                               category = {item.title}
                               designdetails = {item.designdetails}
                               vendorid={item.vendorid}
                               />
    
                       </Col>
                        )  // end of map
                            )
                           
                            ) : (
                                <Spin indicator={antIcon} />
                    )
                         
                }
                    </Row>
                    </Col>
                </Row>
                </div>
                </div>
                
    );
};


class AdminInventory extends React.Component {
    

    render() {
      
      
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SiderMenuAdmin />
                <Content>
                   <Cards/>
                </Content>
            </Layout>
        );
    }
}


export default AdminInventory;
