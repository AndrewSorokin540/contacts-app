import React from 'react';
import { Typography } from 'antd';
import { TextCenter } from 'styled';

const { Paragraph } = Typography;

const ErrorMessage = ({ text }) => (
    <TextCenter>
        <Paragraph type="danger">
            {text}
        </Paragraph>
    </TextCenter>
)

export default ErrorMessage;