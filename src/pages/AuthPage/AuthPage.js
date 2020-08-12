import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { FormContainer } from './styled';

const AuthPage = ({ match }) => {

    const onRegisterPage = match.path === '/register';

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <FormContainer>
            <Form
                layout='vertical'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

                <Form.Item
                    label="Имя"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>

                {onRegisterPage && (
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                )}

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {onRegisterPage ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </Form.Item>

            </Form>
        </FormContainer>
    );
};

export default AuthPage;
