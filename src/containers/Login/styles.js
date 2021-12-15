import styled from 'styled-components'

import Background from '../../assets/background.svg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background: url$('${Background}');

  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginImage = styled.img`
  height: 70%;
`

export const ContainerItens = styled.div`
  height: 70%;
  padding: 25px 75px;

  background: #373737;
  border-radius: 0 10px 0 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #ffffff;
    text-align: center;

    margin-top: 100px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`

export const Label = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  margin-top: 28px;
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 391.42px;
  height: 38.32px;

  padding-left: 10px;

  background: #ffffff;
  box-shadow: 3px 3px 10px rgba(74, 144, 266, 0.19);
  border-radius: 5px;
  border: ${props => (props.error ? '2px solid #cc1717' : 'none')};
`

export const Button = styled.button`
  width: 182.81px;
  height: 36.13px;
  margin-top: 75px;
  margin-bottom: 25px;

  background: #9758a6;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: #eeeeee;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`

export const SignInLink = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;

  a {
    cursor: pointer;
    text-decoration: underline;
  }
`
export const ErrorMessage = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  color: #cc1717;
  margin-top: 2px;
`
