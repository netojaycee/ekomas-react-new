import React from 'react'
import { Table } from "antd";

export default function AllBlogs() {

  const columns = [
    {
      title: "s/no",
      dataIndex: "key",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Product No",
      dataIndex: "product",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
  ];

  const data1 = [];
  for (let i = 1; i < 20; i++) {
    data1.push({
      key: i,
      status: "Pending",
      name: `Edward King ${i}`,
      product: 32,
      date: "12-10-2022",
      total: "$12,993"
    });
  }
  return (
    <div className=''>
      <h3 className='font-bold text-xl mb-3'>All Blogs</h3>
    <div className='bg-white shadow-md p-3'>
          <Table columns={columns} dataSource={data1} />
    </div>
  </div>  )
}
