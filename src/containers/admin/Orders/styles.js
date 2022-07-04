import ReactSelect from 'react-select'
import styled from 'styled-components'

export const Container = styled.div`
  background: #efefef;
  min-height: 100vh;
  padding: 6%;
`

export const ProductsImg = styled.img`
  width: 60px;
  border-radius: 5px;
`
export const ReactSelectStyle = styled(ReactSelect)`
  width: 5vw;

  .css-1s2u09g-control {
    cursor: pointer;
  }
`

export const Menu = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  margin: 20px 0;
`

export const LinkMenu = styled.a`
  color: #323d5d;
  cursor: pointer;
`
