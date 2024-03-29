import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getColors } from '../features/color/colorSlice'
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
    dataIndex: 'name'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Colorlist = () => {
  const dispatch = useDispatch()
  const colorState = useSelector((state) => state.color.colors)

  useEffect(() => {
    dispatch(getColors())
  }, [dispatch])

  const data = []
  for (let i = 0; i < colorState.length; i++) {
    data.push({
      key: i + 1,
      name: colorState[i].title,
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
      <h3 className="mb-4 title">Color</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Colorlist
