import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { CurrentUserContext } from 'contexts';
const { Header: AntHeader } = Layout;

const Header = () => {
    const [currentUserState] = useContext(CurrentUserContext);
    return (
        <AntHeader>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/'>Контакты</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/login'>Вход</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/register'>Регистрация</Link></Menu.Item>
                {currentUserState.currentUser && <Menu.Item key="4">{currentUserState.currentUser.name}</Menu.Item>}
            </Menu>
        </AntHeader>
    )
}

export default Header;