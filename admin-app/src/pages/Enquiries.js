import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd'
import { useEffect } from 'react'
import { getEnquiries } from '../features/enquiry/enquirySlice'
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
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

const Enquires = () => {
  const enqState = useSelector((state) => state.enquiry.enquiries)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEnquiries())
  }, [dispatch])

  const data = []
  for (let i = 0; i < enqState.length; i++) {
    data.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      status: (
        <>
          <select className="form-control form-select">
            <option>Set Option</option>
          </select>
        </>
      ),
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
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Enquires
