import * as Yup from 'yup'

export const productSchema = Yup.object({
  title: Yup.string().required('Title is Required'),
  description: Yup.string().required('Description is Required'),
  price: Yup.number().required('Price is Required'),
  brand: Yup.string().required('Brand is Required'),
  category: Yup.string().required('Category is Required'),
  tags: Yup.string().required('Tags is Required'),
  color: Yup.array()
    .min(1, 'Pick at least one Color')
    .required('Colors are Required'),
  quantity: Yup.number().required('Quantity is Required')
})

export const blogSchema = Yup.object({
  title: Yup.string().required('Title is Required'),
  description: Yup.string().required('Description is Required'),
  category: Yup.string().required('Category is Required')
})

export const titleSchema = Yup.object({
  title: Yup.string().required('Title Name is Required')
})

export const colorSchema = Yup.object({
  title: Yup.string().required('Color is Required')
})
