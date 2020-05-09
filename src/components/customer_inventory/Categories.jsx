import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../css/index.css';
import { List} from 'antd';
import { Checkbox, Row, Col } from 'antd';
import '../../css/mycss.css'
const ProductCategories = props=>{

function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    props.CategoryFilter(checkedValues);
  }
  

const data = [
  {
    title: 'Masks',
  },
  {
    title: 'Suits',
  },
  {
    title: 'Ventilators',
  },
  {
    title: 'Injections',
  },
];

return(

<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
 
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
    <Row>
      <List.Item>
       
        <span>
        <Checkbox style = {{fontSize:12, fontWeight: 500}}  value={item.title}>{item.title}
     
       </Checkbox></span>
      </List.Item></Row>
    )}
  />
</Checkbox.Group>
  )
}
export default ProductCategories