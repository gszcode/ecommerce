import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/pcategory/pcategorySlice'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'

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
    title: 'Action',
    dataIndex: 'action'
  }
]

const Categorylist = () => {
  const dispatch = useDispatch()
  const pCatState = useSelector((state) => state.pCategory.pCategories)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const data = []
  for (let i = 0; i < pCatState.length; i++) {
    data.push({
      key: i + 1,
      name: pCatState[i].title,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      )
    })
  }

  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Categorylist
