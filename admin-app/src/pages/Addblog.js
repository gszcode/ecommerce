import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { blogSchema } from '../utils/validations'
import { useStore } from '../hooks/useStore'
import { createBlog } from '../features/blog/blogSlice'
import { getCategories } from '../features/bcategory/bcategorySlice'

const Addblog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { imgState, bCategoryState,blogState } = useStore()
  const { isSuccess, isError, isLoading, createdBlog } = blogState

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success('Blog Added Successfully!')
    }
    if (isError) {
      toast.error('Something went Wrong!')
    }
  }, [isSuccess, isError, isLoading, createdBlog])

  const imgs = []
  imgState.forEach((img) => {
    imgs.push({
      public_id: img.public_id,
      url: img.url
    })
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      images: ''
    },
    validationSchema: blogSchema,
    onSubmit: (values) => {
      dispatch(createBlog(values))
      formik.resetForm()

      setTimeout(() => {
        navigate('/admin/list-blog')
      }, 3000)
    }
  })

  useEffect(() => {
    formik.values.images = imgs
  }, [formik.values, imgs])

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>

      <div className="">
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
          <div>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              value={formik.values.description}
              className="mt-3"
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <select
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            className="form-control py-3 mt-3"
          >
            <option>Select Category</option>
            {bCategoryState.map((category) => (
              <option key={category.id}>{category.title}</option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3 mt-3">
            {imgState.map((i, j) => (
              <div className="position-relative" key={j}>
                <button
                  type="button"
                  className="btn-close position-absolute"
                  style={{ top: '7px', right: '7px' }}
                  onClick={() => dispatch(deleteImg(i.public_id))}
                ></button>
                <img src={`${i.url}`} alt={`${i.url}`} />
              </div>
            ))}
          </div>
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

export default Addblog
