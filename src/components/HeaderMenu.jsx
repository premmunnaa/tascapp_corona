import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import { white } from 'material-ui/styles/colors';

const { Header} = Layout;

class HeaderMenu extends React.Component {
  render() {
    return (
        <Header className="site-layout-background" style={{ color: white }}>Corona Essentials</Header>
    );
  }
}

export default HeaderMenu;

//Use inside this layout 
// <Layout style={{ minHeight: '100vh' }}>
// <Layout className="site-layout"></Layout>
// </Layout>