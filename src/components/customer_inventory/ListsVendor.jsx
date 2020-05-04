import React from 'react';

import 'antd/dist/antd.css';
import '../../css/mycss.css'
import { List, Avatar } from 'antd';

const MainList = props =>{
  const{
    name,
    emailid,
    number,
    place,
    website,
    address,
  }=props

  
var data = [
  {
    title: 'Name of the Organization',
    detail : name
  },
  {
    title: 'Email ID',
    detail : emailid
  },
  {
    title: 'Contact Number',
    detail : number
  },
  {
    title: 'Website',
    detail : website
  },
  {
    title: 'Address',
    detail : address
  },
  {
    title: 'Location',
    detail : place
  },
  
  
];


    return(
        <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
             // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="/"><div className = "font-format">{item.title}</div></a>}
              description={<div>{item.detail}</div>}
             
            />
             
          </List.Item>
        )}
      />
    )
   
}
export default MainList;

