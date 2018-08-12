import React from 'react';
import { Layout } from 'antd';
import MainForm from './components/MainForm';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ color: '#fff', textAlign: 'center' }}>Hide my URL :)</Header>
      <Layout>
        <Sider style={{ backgroundColor: '#fff' }}>
        </Sider>
        <Content>
          <MainForm />
        </Content>
        <Sider style={{ backgroundColor: '#fff' }}>
        </Sider>
      </Layout>
      <Footer style={{ backgroundColor: '#fff', textAlign: 'center' }}>
        Copyright (c) Dimasta. All rights reserved
      </Footer>
    </Layout>
  );
};

export default App;


