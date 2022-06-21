import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import api from '../../../services/api'
import Row from './row'
import { Container } from './styles'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    const { data } = await api.get('orders')

    setOrders(data)
  }

  function createData(order) {
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products
    }
  }

  useEffect(() => {
    const newRows = orders.map(ord => createData(ord))
    setRows(newRows)
  }, [orders])

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data do pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
