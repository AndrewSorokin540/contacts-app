import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { Header, Body, Footer } from 'components';
import { ContactsPage, AuthPage } from 'pages';

function App() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Router>
        <Header />
        <Body>
          <Route path='/' exact component={ContactsPage} />
          <Route path='/login' component={AuthPage} />
          <Route path='/register' component={AuthPage} />
        </Body>
      </Router>
      <Footer />
    </Layout>
  );
}

export default App;
