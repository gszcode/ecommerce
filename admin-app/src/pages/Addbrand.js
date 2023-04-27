import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { titleSchema } from '../utils/validations'
import { createBrand } from '../features/brand/brandSlice'
import { useStore } from '../hooks/useStore'

const Addbrand = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, createdBrand } = useStore().newBrand

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand created Successfully!')
    }
    if (isError) {
      toast.error('Something went Wrong!!')
    }
  }, [isSuccess, isError, isLoading, createdBrand])

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: titleSchema,
    onSubmit: (values) => {
      dispatch(createBrand(values))
      formik.resetForm()

      setTimeout(() => {
        navigate('/admin/list-brand')
      }, 3000)
    }
  })

  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onCh={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addbrand
