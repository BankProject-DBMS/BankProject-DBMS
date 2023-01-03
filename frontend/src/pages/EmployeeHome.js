import React from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from 'antd';
import CustomerHandling from './EmployeePortalPages/CustomerHandling';
import AccountHandling from './EmployeePortalPages/AccountHandling';
import LoanHandling from './EmployeePortalPages/LoanHandling';

const { Header, Content, Footer } = Layout;

function getItem(label, key, component, icon, children) {
    return {
        key,
        icon,
        children,
        label,
        component,
    };
}

const items = [
    getItem("Customer Management", "0", <CustomerHandling />),
    getItem("Account Management", "1", <AccountHandling />),
    getItem("Loan Management", "2", <LoanHandling />)
];

export default function EmployeeHome() {

    const [Links, setLinks] = React.useState(<h1>ARUCI</h1>);


    function handleClick(event) {

        console.log(items[event.key].label);
        setLinks(items[event.key].component)
    }

    return (
        <div>
            <Layout className="layout">
                <Header >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={items}
                        onClick={handleClick}
                    />
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">{Links}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>ARUCI ©2022 Created by ARUCI UI</Footer>
            </Layout>

        </div>
    )
}