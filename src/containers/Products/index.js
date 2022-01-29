import React, { useEffect, useState } from 'react'

import ProductsLogo from '../../assets/products-logo.svg'
import { CardProduct } from '../../components'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import {
  Container,
  ProducstImg,
  CategoryButton,
  CategoriesMenu,
  ProductsContainer
} from './styles'

export function Product() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = products.filter(
        product => product.category === activeCategory
      )

      setFilteredProducts(newFilteredProducts)
    }
  }, [activeCategory, products])

  async function loadCategories() {
    const { data } = await api.get('categories')

    const newCategories = [{ id: 0, name: 'Todas' }, ...data]

    setCategories(newCategories)
  }

  async function loadProducts() {
    const { data: allProducts } = await api.get('products')

    const newProducts = allProducts.map(product => {
      return { ...product, formatedPrice: formatCurrency(product.price) }
    })

    setProducts(newProducts)
  }

  return (
    <Container>
      <ProducstImg src={ProductsLogo} alt="logo da home" />
      <CategoriesMenu>
        {categories &&
          categories.map(category => (
            <CategoryButton
              onClick={() => setActiveCategory(category.id)}
              key={category.id}
              isActiveCategory={activeCategory === category.id}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoriesMenu>
      <ProductsContainer>
        {filteredProducts &&
          products.map(product => (
            <CardProduct key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Container>
  )
}
