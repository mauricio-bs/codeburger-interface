import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Button } from '../Button'
import { Container } from './styles'

export function CartResume() {
  const [finalPrice, setFinalPrice] = useState(0)
  const [deliveryTax] = useState(5)

  const { cartProducts } = useCart()

  useEffect(() => {
    const cartTotalValue = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity
    }, 0)

    setFinalPrice(cartTotalValue)
  }, [cartProducts])

  const submitOrder = async () => {
    const order = cartProducts.map(product => ({
      id: product.id,
      quantity: product.quantity
    }))

    if (!order.length) {
      return toast.warning('Adicione ao menos 1 produto para realizar o pedido')
    }

    await toast.promise(api.post('orders', { products: order }), {
      pending: 'Realizando o seu pedido',
      success: 'Pedido realizado',
      error: 'Falha ao tentar realizar o seu pedido, tente novamente'
    })
  }

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatCurrency(finalPrice)}</p>
          <p className="delivery-tax">Taxa de entrega</p>
          <p className="delivery-tax-price">{formatCurrency(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatCurrency(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <Button
        style={{ width: '100%', marginTop: '30px' }}
        onClick={submitOrder}
      >
        Finalizar Pedido
      </Button>
    </div>
  )
}
