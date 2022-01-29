import PropTypes from 'prop-types'
import React from 'react'

import { Button } from '../Button'
import { Container, Image, ProductName, ProductPrice } from './styles'

export function CardProduct({ product }) {
  return (
    <Container>
      <Image src={product.url} alt="imagem do produto" />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>{product.formatedPrice}</ProductPrice>
      <Button>Adicionar</Button>
    </Container>
  )
}

CardProduct.propTypes = {
  product: PropTypes.object
}
