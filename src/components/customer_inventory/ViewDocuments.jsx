import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import firebase from 'firebase';
import  '../../css/index.css'
import { List, Avatar } from 'antd';
const ViewDoc=props=>{
const{
vendorid
}=props
const[DataInp,UpdateDbdata] = useState([]);
console.log("prem1",vendorid);
useEffect(()=>{
  if(vendorid!==undefined)
  {
    let dataarr=[];
let data=[];
    const db = firebase.firestore();
     console.log(vendorid);
     var docRef = db.collection("User").doc(vendorid);
     docRef.get().then(querySnapshot => {
         dataarr = querySnapshot.data().documents_data;
         console.log("prem2",dataarr);
         dataarr.map((url,index)=>{
            data.push({
                title:"docs - "+index,
                url:url
            })
            console.log("Data : ",data)
         })
         UpdateDbdata(data);
       }).catch(function(error) {
       console.log("Error getting document:", error);
   });
  }
},[vendorid]);

     console.log("prem3",DataInp); 
      return(
        <List
          itemLayout="horizontal"
          dataSource={DataInp}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.url} target="_blank">{item.title}</a>}
                description = "Click on docs to open Document"
              />
            </List.Item>
          )}
        />
      );
}
export default ViewDoc;