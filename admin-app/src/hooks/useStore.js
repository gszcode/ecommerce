import { useSelector } from 'react-redux'

export const useStore = () => {
  const brandState = useSelector((state) => state.brand.brands)
  const pCategoryState = useSelector((state) => state.pCategory.pCategories)
  const colorState = useSelector((state) => state.color.colors)
  const imgState = useSelector((state) => state.upload.images)
  const newProduct = useSelector((state) => state.product)
  const newBrand = useSelector((state) => state.brand)
  const newCategory = useSelector((state) => state.pCategory)

  return {
    brandState,
    pCategoryState,
    colorState,
    imgState,
    newProduct,
    newBrand,
    newCategory
  }
}
