import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Product',
    dataIndex: 'product'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  }
]
const data1 = [
  {
    key: '1',
    name: 'John Brown',
    product: 32,
    status: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'John Brown',
    product: 32,
    status: 'New York No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'John Brown',
    product: 32,
    status: 'New York No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'John Brown',
    product: 32,
    status: 'New York No. 1 Lake Park'
  }
]

const Enquires = () => {
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Enquires
