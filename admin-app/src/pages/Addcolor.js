import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { colorSchema } from '../utils/validations'
import { createColor, resetState } from '../features/color/colorSlice'
import { useStore } from '../hooks/useStore'

const Addcolor = () => {
  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading, createdColor } = useStore().newColor

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('Color created Successfully!')
      return
    }
    if (isError) {
      toast.error('Something went Wrong!')
    }
  }, [isSuccess, isError, isLoading, createdColor])

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: colorSchema,
    onSubmit: (values) => {
      dispatch(createColor(values))
      formik.resetForm()

      setTimeout(() => {
        dispatch(resetState())
      }, 3000)
    }
  })

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Color</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            name="title"
            onCh={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addcolor
