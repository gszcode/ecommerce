import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../features/brand/brandSlice'
import { getCategories } from '../features/pcategory/pcategorySlice'
import { getColors } from '../features/color/colorSlice'
import Multiselect from 'react-widgets/Multiselect'
import 'react-widgets/styles.css'

const Addproduct = () => {
  const dispatch = useDispatch()
  const brandState = useSelector((state) => state.brand.brands)
  const pCategoryState = useSelector((state) => state.pCategory.pCategories)
  const colorState = useSelector((state) => state.color.colors)
  const colors = []

  colorState.forEach((color) => {
    colors.push({
      id: color._id,
      color: color.title
    })
  })

  useEffect(() => {
    dispatch(getBrands())
    dispatch(getCategories())
    dispatch(getColors())
  }, [dispatch])

  let userSchema = Yup.object({
    title: Yup.string().required('Title is Required'),
    description: Yup.string().required('Description is Required'),
    price: Yup.number().required('Price is Required')
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: ''
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
              onBlur={formik.handleBlur('description')}
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
          <select className="form-control py-3 mb-3">
            <option>Select Brand</option>
            {brandState.map((brand) => (
              <option key={brand.title}>{brand.title}</option>
            ))}
          </select>
          <select className="form-control py-3 mb-3">
            <option>Select Category</option>
            {pCategoryState.map((category) => (
              <option key={category.id}>{category.title}</option>
            ))}
          </select>
          <Multiselect dataKey="id" textField="color" data={colors} />
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
