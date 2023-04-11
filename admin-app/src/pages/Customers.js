import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/customers/customerSlice'

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile'
  }
]

const Customers = () => {
  const dispatch = useDispatch()
  const customerstate = useSelector((state) => state.customer.customers)
  const data = []

  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== 'admin') {
      data.push({
        key: i + 1,
        name: `${customerstate[i].firstname} ${customerstate[i].lastname}`,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile
      })
    }
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Customers
