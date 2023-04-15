import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'

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
    title: 'Amount',
    dataIndex: 'amount'
  },
  {
    title: 'Date',
    dataIndex: 'date'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Orders = () => {
  const orderState = useSelector((state) => state.auth.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const data = []
  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: orderState[i].products.map((item) => (
        <ul>
          <li>{item.product.title}</li>
        </ul>
      )),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleDateString(),
      action: (
        <>
          <Link to="/" className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      )
    })
  }

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
