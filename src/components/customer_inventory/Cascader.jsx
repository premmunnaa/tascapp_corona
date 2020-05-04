import { Cascader } from 'antd';
import React from 'react';

import 'antd/dist/antd.css';
import '../../css/mycss.css'

//const products = {};


const options = [
  {
    value: 'masks',
    label: ' Masks',
    children: [
      {
        value: 'surgicalmask',
        label: 'Surgical Masks',
        
      },
      {
        value: 'n95masks',
        label: 'N95 Masks',
        
      },
    ],
  },
  {
    value: 'gloves',
    label: 'Gloves',
   
  },
  {
    value: 'suits',
    label: 'Suits',
    children: [
      {
        value: 'doctorsuits',
        label: 'Doctor Suits',
        
      },
      {
        value: 'gowns',
        label: 'Gowns',
        
      },
    ],
   
  },
  {
    value : 'ventilators',
    label : 'Ventilators'
  }
];

const onChange = function(value) {
  console.log(value);
}

// Just show the latest item.
const displayRender = function(label) {
  return label[label.length - 1];
}

const CascaderObj = props=>{

    const {
        onProductSelection
    } = props;

  return(
    <Cascader
    options={options}
    expandTrigger="hover"
    displayRender={displayRender}
    onChange={(value) => onProductSelection(value)}
    style = {{width : 350}}
    placeholder="Search for Catagory"
  />
  )
}

export default CascaderObj