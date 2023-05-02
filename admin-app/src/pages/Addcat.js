import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { titleSchema } from '../utils/validations'
import {
  createCategory,
  resetState
} from '../features/pcategory/pcategorySlice'
import { useStore } from '../hooks/useStore'

const Addcat = () => {
  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, createdCategory } =
    useStore().newCategory

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success('Category created Successfully!')
    }
    if (isError) {
      toast.error('Something went Wrong!')
    }
  }, [isSuccess, isError, isLoading, createdCategory])

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: titleSchema,
    onSubmit: (values) => {
      dispatch(createCategory(values))
      formik.resetForm()

      setTimeout(() => {
        dispatch(resetState())
      }, 3000)
    }
  })

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            name="title"
            onCh={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addcat
