import React, { useState, useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../features/brand/brandSlice'
import { getCategories } from '../features/pcategory/pcategorySlice'
import { getColors } from '../features/color/colorSlice'
import Multiselect from 'react-widgets/Multiselect'
import Dropzone from 'react-dropzone'
import 'react-widgets/styles.css'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice'
import { createProducts } from '../features/product/productSlice'

const Addproduct = () => {
  const dispatch = useDispatch()
  const [color, setColor] = useState([])
  const [images, setImages] = useState([])

  const brandState = useSelector((state) => state.brand.brands)
  const pCategoryState = useSelector((state) => state.pCategory.pCategories)
  const colorState = useSelector((state) => state.color.colors)
  const imgState = useSelector((state) => state.upload.images)

  const colors = []
  colorState.forEach((color) => {
    colors.push({
      id: color._id,
      color: color.title
    })
  })

  const imgs = []
  imgState.forEach((img) => {
    imgs.push({
      public_id: img.public_id,
      url: img.url
    })
  })

  let userSchema = Yup.object({
    title: Yup.string().required('Title is Required'),
    description: Yup.string().required('Description is Required'),
    price: Yup.number().required('Price is Required'),
    brand: Yup.string().required('Brand is Required'),
    category: Yup.string().required('Category is Required'),
    color: Yup.array().required('Colors are Required'),
    quantity: Yup.number().required('Quantity is Required')
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      color: '',
      quantity: '',
      images: ''
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values))
    }
  })

  useEffect(() => {
    formik.values.color = color
    formik.values.images = imgs
  }, [formik.values, color, imgs])

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getCategories())
    dispatch(getColors())
  }, [dispatch])

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
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
            className="form-control py-3 mb-3"
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
            className="form-control py-3 mb-3"
          >
            <option>Select Category</option>
            {pCategoryState.map((category) => (
              <option key={category.id}>{category.title}</option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <Multiselect
            name="color"
            dataKey="id"
            textField="color"
            data={colors}
            onChange={(e) => setColor(e)}
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
          <div className="bg-white border-1 p-5 text-center">
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
          <div className="showimages d-flex flex-wrap gap-3">
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
