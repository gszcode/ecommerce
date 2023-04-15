import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'

const Addproduct = () => {
  const [desc, setDesc] = useState()
  const handleDesc = (e) => {
    setDesc(e)
  }

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form>
          <CustomInput type="text" label="Enter Product Title" />
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={(event) => handleDesc(event.target)}
            />
          </div>
          <CustomInput type="number" label="Enter Product Price" />
          <select className="form-control py-3 mb-3">
            <option>Select Brand</option>
          </select>
          <select className="form-control py-3 mb-3">
            <option>Select Category</option>
          </select>
          <select className="form-control py-3 mb-3">
            <option>Select Color</option>
          </select>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addproduct
