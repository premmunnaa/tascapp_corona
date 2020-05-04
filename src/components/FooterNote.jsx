import React from 'react';
import 'antd/dist/antd.css';
import '../css/index.css';
import { Layout } from 'antd';

const {Footer} = Layout;

class FooterNote extends React.Component {
    render() {
    return (
          <Footer style={{ textAlign: 'center' }}>Corona Essentials</Footer>
    );
  }
}

export default FooterNote;