'use client'

import { Prisma } from '@prisma/client'
import { Typography, Table, Space, Button, Modal, Form, Input } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MultilocationManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingShop, setEditingShop] =
    useState<Prisma.ShopGetPayload<{}> | null>(null)
  const [form] = Form.useForm()

  const {
    data: shops,
    isLoading,
    refetch,
  } = Api.shop.findMany.useQuery({
    where: { userId: user?.id },
    include: { products: true },
  })

  const { mutateAsync: createShop } = Api.shop.create.useMutation()
  const { mutateAsync: updateShop } = Api.shop.update.useMutation()
  const { mutateAsync: deleteShop } = Api.shop.delete.useMutation()

  const handleCreateOrUpdate = async (values: any) => {
    try {
      if (editingShop) {
        await updateShop({ where: { id: editingShop.id }, data: values })
        enqueueSnackbar('Shop updated successfully', { variant: 'success' })
      } else {
        await createShop({ data: { ...values, userId: user?.id } })
        enqueueSnackbar('Shop created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Error saving shop', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteShop({ where: { id } })
      enqueueSnackbar('Shop deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting shop', { variant: 'error' })
    }
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Phone', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Email', dataIndex: 'emailAddress', key: 'emailAddress' },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: any[]) => products?.length.toString() || '0',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Prisma.ShopGetPayload<{}>) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingShop(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Vehicle Listings</Title>
      <Text>
        Manage your vehicle listings for multiple locations from a single
        dashboard.
      </Text>

      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: 24 }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingShop(null)
            form.resetFields()
            setIsModalVisible(true)
          }}
        >
          Add New Location
        </Button>

        <Table
          columns={columns}
          dataSource={shops}
          loading={isLoading}
          rowKey="id"
        />

        <Modal
          title={editingShop ? 'Edit Location' : 'Add New Location'}
          visible={isModalVisible}
          onOk={form.submit}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="emailAddress"
              label="Email Address"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="logoUrl"
              label="Logo URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="longitude"
              label="Longitude"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="latitude"
              label="Latitude"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </PageLayout>
  )
}
