'use client'

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
} from 'antd'
import { DollarOutlined, CalendarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdManagementPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [ads, setAds] = useState([])

  const { data: shops, isLoading: isLoadingShops } = Api.shop.findMany.useQuery(
    {
      where: { userId: user?.id },
    },
  )

  const {
    data: existingAds,
    isLoading: isLoadingAds,
    refetch: refetchAds,
  } = Api.ad.findMany.useQuery({
    where: { shop: { userId: user?.id } },
    include: { shop: true },
  })

  const { mutateAsync: createAd } = Api.ad.create.useMutation()
  const { mutateAsync: updateAd } = Api.ad.update.useMutation()
  const { mutateAsync: deleteAd } = Api.ad.delete.useMutation()

  useEffect(() => {
    if (existingAds) {
      setAds(existingAds)
    }
  }, [existingAds])

  const handleSubmit = async values => {
    try {
      const { shopId, title, description, duration } = values
      const startDate = dayjs().format()
      const endDate = dayjs().add(duration, 'week').format()

      await createAd({
        data: {
          shopId,
          title,
          description,
          startDate,
          endDate,
        },
      })

      enqueueSnackbar('Ad created successfully', { variant: 'success' })
      form.resetFields()
      refetchAds()
    } catch (error) {
      enqueueSnackbar('Failed to create ad', { variant: 'error' })
    }
  }

  const handleDelete = async id => {
    try {
      await deleteAd({ where: { id } })
      enqueueSnackbar('Ad deleted successfully', { variant: 'success' })
      refetchAds()
    } catch (error) {
      enqueueSnackbar('Failed to delete ad', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Shop',
      dataIndex: ['shop', 'name'],
      key: 'shop',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: date => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: date => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Ad Management</Title>
      <Text>
        Create and manage your ad placements to promote your vehicles.
      </Text>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ marginTop: 24 }}
      >
        <Form.Item
          name="shopId"
          label="Select Shop"
          rules={[{ required: true, message: 'Please select a shop' }]}
        >
          <Select loading={isLoadingShops}>
            {shops?.map(shop => (
              <Select.Option key={shop.id} value={shop.id}>
                {shop.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Ad Title"
          rules={[{ required: true, message: 'Please enter the ad title' }]}
        >
          <Input prefix={<DollarOutlined />} placeholder="Enter ad title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Ad Description"
          rules={[
            { required: true, message: 'Please enter the ad description' },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter ad description" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Ad Duration (weeks)"
          rules={[{ required: true, message: 'Please select the ad duration' }]}
        >
          <Select prefix={<CalendarOutlined />}>
            <Select.Option value={1}>1 week</Select.Option>
            <Select.Option value={2}>2 weeks</Select.Option>
            <Select.Option value={4}>4 weeks</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Ad
          </Button>
        </Form.Item>
      </Form>

      <Title level={3} style={{ marginTop: 48 }}>
        Your Current Ads
      </Title>
      <Table
        columns={columns}
        dataSource={ads}
        rowKey="id"
        loading={isLoadingAds}
        pagination={{ pageSize: 10 }}
      />
    </PageLayout>
  )
}
