import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { titleSchema } from '../utils/validations'
import { createBlogCategory } from '../features/bcategory/bcategorySlice'
import { useStore } from '../hooks/useStore'

const Addblogcat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, createdBlogCategory } =
    useStore().newBlogCategory

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success('Blog Category added Successfully!')
    }
    if (isError) {
      toast.error('Something went Wrong!')
    }
  }, [isSuccess, isError, isLoading, createdBlogCategory])

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: titleSchema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values))
      formik.resetForm()

      setTimeout(() => {
        navigate('/admin/list-blog-category')
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
            label="Enter Blog Category"
            name="title"
            onCh={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addblogcat
