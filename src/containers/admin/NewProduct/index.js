import { yupResolver } from '@hookform/resolvers/yup'
import { CloudUpload } from '@mui/icons-material'
import { React, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { ErrorMessage } from '../../../components'
import api from '../../../services/api'
import { Container, Input, Label, StyledButton, LabelUpload } from './styles'

export default function NewProduct() {
  const [fileName, setFilename] = useState(null)
  const [categories, setCategories] = useState([])

  const { push } = useHistory()

  const schema = yup.object().shape({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.string().required('Digite o preço do produto'),
    category: yup.object().required('Escolha uma categoria'),
    file: yup
      .mixed()
      .test('required', 'Carregue um arquivo', value => value?.length > 0)
      .test(
        'filesize',
        'Arquivo possui mais de 2mb',
        value => value[0]?.size <= 2048
      )
      .test(
        'type',
        'Carregue apenas arquivos JPEG/PNG',
        value =>
          value[0]?.type === 'image/jpeg' || value[0]?.type === 'image/png'
      )
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver
  })
  async function onSubmit(data) {
    const producFormData = new FormData()

    producFormData.append('name', data.name)
    producFormData.append('price', data.price)
    producFormData.append('category_id', data.category.id)
    producFormData.append('file', data.file[0])

    await toast.promise(api.post('products', producFormData), {
      pending: 'Criando novo produto...',
      success: 'Produto criado com scuesso',
      error: 'Falha ao criar o produto'
    })

    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
  }

  async function loadCategories() {
    const { data } = await api.get('categories')

    setCategories(data)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

        <div>
          <LabelUpload>
            {fileName || (
              <>
                <CloudUpload />
                Carregue a imagem do produto
              </>
            )}
            <Input
              type="file"
              accept="image/png, image/jpeg"
              {...register('file')}
              onChange={value => setFilename(value.target?.files[0]?.name)}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  getOptionValue={cat => cat.id}
                  placeholder="Categorias..."
                />
              )
            }}
          />
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>

        <StyledButton>Adicionar produto</StyledButton>
      </form>
    </Container>
  )
}
