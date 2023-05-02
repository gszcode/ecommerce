import { useSelector } from 'react-redux'

export const useStore = () => {
  const brandState = useSelector((state) => state.brand.brands)
  const pCategoryState = useSelector((state) => state.pCategory.pCategories)
  const bCategoryState = useSelector((state) => state.bCategory.bCategories)
  const colorState = useSelector((state) => state.color.colors)
  const imgState = useSelector((state) => state.upload.images)
  const newProduct = useSelector((state) => state.product)
  const newBrand = useSelector((state) => state.brand)
  const newCategory = useSelector((state) => state.pCategory)
  const newColor = useSelector((state) => state.color)
  const newBlogCategory = useSelector((state) => state.bCategory)
  const blogState = useSelector((state) => state.blog)

  return {
    brandState,
    pCategoryState,
    bCategoryState,
    colorState,
    imgState,
    newProduct,
    newBrand,
    newCategory,
    newColor,
    newBlogCategory,
    blogState
  }
}
