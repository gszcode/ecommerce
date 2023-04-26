import { useSelector } from 'react-redux'

export const useStore = () => {
  const brandState = useSelector((state) => state.brand.brands)
  const pCategoryState = useSelector((state) => state.pCategory.pCategories)
  const colorState = useSelector((state) => state.color.colors)
  const imgState = useSelector((state) => state.upload.images)

  return {
    brandState,
    pCategoryState,
    colorState,
    imgState
  }
}
