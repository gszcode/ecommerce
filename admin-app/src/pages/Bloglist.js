import React, { useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../features/blog/blogSlice'
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
    title: 'Category',
    dataIndex: 'category'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Bloglist = () => {
  const dispatch = useDispatch()
  const blogState = useSelector((state) => state.blog.blogs)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const data = []
  for (let i = 0; i < blogState.length; i++) {
    data.push({
      key: i + 1,
      name: blogState[i].title,
      category: blogState[i].category,
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
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Bloglist
