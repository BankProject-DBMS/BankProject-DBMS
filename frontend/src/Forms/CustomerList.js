import React from "react";

import { getCustomers } from "../api/customers";
import { Table } from "antd";

export default function CustomerList() {



    const dataSource = getCustomers();
    console.log(dataSource);
    /*
    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'DoB',
            dataIndex: 'dateofbirth',
            key: 'dateofbirth',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        },
    ];*/

    return (<div>

        <h1>Customer List</h1>

        {/* <Table dataSource={dataSource} columns={columns} /> */}

    </div>);
}