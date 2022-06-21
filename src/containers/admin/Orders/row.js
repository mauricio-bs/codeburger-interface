import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

import api from '../../../services/api'
import status from './orderStatus'
import { ProductsImg, ReactSeletStyle } from './styles'

export default function Row({ row }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function setNewStatus(id, status) {
    setLoading(true)
    try {
      await api.put(`orders/${id}`, { status })
    } catch (err) {
      toast.error(
        'Ocorreu um erro ao atualizar o status do pedido, tente novamente'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>
          <ReactSeletStyle
            options={status}
            menuPortalTarget={document.body}
            placeholder="status"
            defaultValue={
              status.find(option => option.value(row.status)) || null
            }
            onChange={newStatus => {
              setNewStatus(row.orderId, newStatus.value)
            }}
            isLoading={loading}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map(productRow => (
                    <TableRow key={productRow.id}>
                      <TableCell component="th" scope="row">
                        {productRow.quantity}
                      </TableCell>
                      <TableCell>{productRow.name}</TableCell>
                      <TableCell>{productRow.category}</TableCell>
                      <TableCell>
                        <ProductsImg
                          src={productRow.url}
                          alt="imagem-do-produto"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
}
