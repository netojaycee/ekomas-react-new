import React, { useContext } from "react";
import { Table, Typography } from "antd";
import AuthContext from "../../components/Context/AuthContext";

export default function Customers() {
  const { users } = useContext(AuthContext);

  const columns = [
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (text) => <img src={text} alt="" className="w-8 h-8" />,
    // },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography variant="small">{text}</Typography>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Typography variant="small">{text}</Typography>,
    },
  ];

  return (
    <div className="">
      <h3 className="font-bold text-xl mb-3">Customers</h3>
      <div className="bg-white shadow-md p-3 overflow-auto">
        <Table columns={columns} dataSource={users} />
      </div>
    </div>
  );
}
