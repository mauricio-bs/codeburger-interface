import { Cancel, CheckBox } from '@mui/icons-material'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import paths from '../../../constants/paths'
import api from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrency'
import { Container, EditIcon, Img } from './styles'

export default function ListProducts() {
  const [products, setProducts] = useState()

  const { push } = useHistory()

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const { data } = await api.get('products')

    setProducts(data)
  }

  function isOffer(offerStatus) {
    if (offerStatus) {
      return <CheckBox style={{ color: '#228B22' }} />
    }
    return <Cancel style={{ color: '#CC1717' }} />
  }

  function editProduct(product) {
    push(paths.EditProduct, { product })
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" />
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell align="center">Produto em Oferta</TableCell>
            <TableCell></TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products.map(product => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                <TableCell>
                  <Img src={product.url} alt="imagem produto" />
                </TableCell>
                <TableCell>
                  <EditIcon onClick={() => editProduct(product)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </TableContainer>
    </Container>
  )
}
