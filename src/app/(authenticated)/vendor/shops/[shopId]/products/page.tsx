'use client'

import { Prisma } from '@prisma/client'
import { useState, useEffect } from 'react'
import {
  Typography,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Table,
  Space,
  Modal,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [editingProduct, setEditingProduct] =
    useState<Prisma.ProductGetPayload<{}> | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    data: products,
    isLoading,
    refetch,
  } = Api.product.findMany.useQuery({
    where: { shopId: params.shopId },
  })

  const { mutateAsync: createProduct } = Api.product.create.useMutation()
  const { mutateAsync: updateProduct } = Api.product.update.useMutation()
  const { mutateAsync: deleteProduct } = Api.product.delete.useMutation()

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct)
    } else {
      form.resetFields()
    }
  }, [editingProduct, form])

  const handleSubmit = async (values: Prisma.ProductCreateInput) => {
    try {
      if (editingProduct) {
        await updateProduct({ where: { id: editingProduct.id }, data: values })
        enqueueSnackbar('Product updated successfully', { variant: 'success' })
      } else {
        await createProduct({ data: { ...values, shopId: params.shopId } })
        enqueueSnackbar('Product created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      setEditingProduct(null)
      refetch()
    } catch (error) {
      enqueueSnackbar('Error saving product', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ where: { id } })
      enqueueSnackbar('Product deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting product', { variant: 'error' })
    }
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    { title: 'Stock', dataIndex: 'stockQuantity', key: 'stockQuantity' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Prisma.ProductGetPayload<{}>) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record)
              setIsModalVisible(true)
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Product Management</Title>
      <Text>Add, edit, or delete vehicles in your shop's inventory.</Text>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingProduct(null)
          setIsModalVisible(true)
        }}
        style={{ marginBottom: 16, marginTop: 16 }}
      >
        Add New Vehicle
      </Button>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />

      <Modal
        title={editingProduct ? 'Edit Vehicle' : 'Add New Vehicle'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingProduct(null)
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="car">Car</Select.Option>
              <Select.Option value="motorcycle">Motorcycle</Select.Option>
              <Select.Option value="bicycle">Bicycle</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="stockQuantity"
            label="Stock Quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProduct ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
