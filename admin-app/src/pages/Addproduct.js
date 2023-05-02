import React, { useState, useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { useFormik } from 'formik'
import { productSchema } from '../utils/validations'
import { useDispatch } from 'react-redux'
import { getBrands } from '../features/brand/brandSlice'
import { getCategories } from '../features/pcategory/pcategorySlice'
import { getColors } from '../features/color/colorSlice'
import { Select } from 'antd'
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice'
import { createProducts, resetState } from '../features/product/productSlice'
import { useStore } from '../hooks/useStore'
import { toast } from 'react-toastify'

const Addproduct = () => {
  const dispatch = useDispatch()
  const [color, setColor] = useState([])
  const { brandState, pCategoryState, colorState, imgState, newProduct } =
    useStore()

  const { isSuccess, isError, isLoading, createdProduct } = newProduct
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Added Successfully!')
    }
    if (isError) {
      toast.error('Something went Wrong!')
    }
  }, [isSuccess, isError, isLoading, createdProduct])

  const colors = []
  colorState.forEach((color) => {
    colors.push({
      value: color.title,
      label: color._id
    })
  })

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
      price: '',
      brand: '',
      category: '',
      tags: '',
      color: '',
      quantity: '',
      images: ''
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values))
      formik.resetForm()
      setColor(null)

      setTimeout(() => {
        dispatch(resetState())
      }, 3000)
    }
  })

  useEffect(() => {
    formik.values.color = color ? color : ' '
    formik.values.images = imgs
  }, [formik.values, color, imgs])

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getCategories())
    dispatch(getColors())
  }, [dispatch])

  const handleColors = (e) => {
    setColor(e)
  }

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
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange('price')}
            onBlur={formik.handleBlur('price')}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            value={formik.values.brand}
            className="form-control py-3 mt-3"
          >
            <option>Select Brand</option>
            {brandState.map((brand) => (
              <option key={brand.title}>{brand.title}</option>
            ))}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            className="form-control py-3 mt-3"
          >
            <option>Select Category</option>
            {pCategoryState.map((category) => (
              <option key={category.id}>{category.title}</option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleBlur('tags')}
            value={formik.values.tags}
            className="form-control py-3 mt-3"
          >
            <option disabled>Select tags</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            options={colors}
            allowClear
            className="w-100 mt-3"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onCh={formik.handleChange('quantity')}
            onBlur={formik.handleBlur('quantity')}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
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

export default Addproduct
