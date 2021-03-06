import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { Header, Body, Footer, CurrentUserChecker } from 'components';
import { ContactsPage, AuthPage } from 'pages';
import { CurrentUserProvider } from 'contexts';

function App() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <Header />
            <Body>
              <Route path='/' exact component={ContactsPage} />
              <Route path='/login' component={AuthPage} />
              <Route path='/register' component={AuthPage} />
            </Body>
          </Router>
          <Footer />
        </CurrentUserChecker>
      </CurrentUserProvider>
    </Layout>
  );
}

export default App;
