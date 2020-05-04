import React from 'react';
import './css/App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminInventory from './pages/admin/AdminInventory';
import VendorChat from  './pages/vendor/VendorChat';
import SellerProductReport from './pages/vendor/SellerProductReport'
import VendorInfo from './pages/vendor/VendorInfo';
import UploadDocuments from './pages/vendor/UploadDocuments'
import VendorProfile from './pages/vendor/VendorProfile'
import ProductDescription from './pages/Product/EditProductDescription'
import ProductEdit from './pages/Product/ProductEdit'
import ProductDescriptionCustomer from './pages/admin/ProductDescriptionCustomer'
import AdminCart from './pages/admin/AdminCart'
import AdminChat from './pages/admin/AdminChat'
import ChatAdmin from './pages/admin/ChatAdmin'
import SellerCart from './pages/vendor/SellerCart'
import Chats from './pages/vendor/Chats'
import AdminProfile from './pages/admin/AdminProfile'
import Check from './pages/check'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
    <Route path='/AdminChat' exact={true}>
        <AdminChat />
      </Route>
      <Route path='/ChatAdmin' exact={true}>
        <ChatAdmin />
      </Route>
      <Route path='/ChatVendor' exact={true}>
        <VendorChat />
      </Route>
      <Route path='/check' exact={true}>
        <Check />
      </Route>
      <Route path='/vendorchat' exact={true}>
        <Chats />
      </Route>
      <Route path='/VendorInfo' exact={true}>
        <VendorInfo />
      </Route>

      <Route path='/SellerCart' exact={true}>  
      
      <SellerCart /> 
    </Route>
      <Route path='/UploadDocs' exact={true}>
        <UploadDocuments />
      </Route>
      <Route path='/AdminProfile' exact={true}>
      <AdminProfile />
    </Route>
      <Route path='/SellerProductReport' exact={true}>
      <SellerProductReport />
    </Route>
      <Route path='/AdminInventory' exact={true}>    
        <AdminInventory />
      </Route>
      <Route path='/Register' exact={true}>
        <Register />
      </Route>
      <Route path='/VendorProfile' exact={true}>
      <VendorProfile />
    </Route>
    <Route path='/Add_products' exact={true}>
    <ProductDescription />
  </Route>
  <Route path='/Product_edit' exact={true}>
  <ProductEdit />
  </Route>
  <Route path='/Product_description' exact={true}>
  <ProductDescriptionCustomer />
</Route>
<Route path='/AdminCart' exact={true}>
<AdminCart />
</Route>
      <Route path='/' exact={true}>
        <Login />
      </Route>
    </Router>
  );
}

export default App;
