import React from 'react';
import { Layout } from 'antd';
import { Container } from 'styled';

const { Content } = Layout;

const Body = ({ children }) => (
    <Content>
        <Container>
            {children}
        </Container>
    </Content>
)

export default Body;
