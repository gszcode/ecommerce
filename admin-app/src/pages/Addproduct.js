import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

const Addproduct = () => {
  const dispatch = useDispatch()
  const [desc, setDesc] = useState()
  const handleDesc = (e) => {
    setDesc(e)
  }

  let userSchema = Yup.object({
    title: Yup.string().required('Title is Required'),
    description: Yup.string().required('Description is Required')
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
    }
  })

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              value={formik.values.description}
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
