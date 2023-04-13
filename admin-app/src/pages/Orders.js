import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../features/auth/authSlice'

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

const Orders = () => {
  const orderState = useSelector((state) => state.auth.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  console.log(orderState)

  const data = []
  // for (let i = 0; i < orderState.length; i++) {
  //   data.push({
  //     key: '4',
  //     name: 'John Brown',
  //     product: 32,
  //     status: 'New York No. 1 Lake Park'
  //   })
  // }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Orders
