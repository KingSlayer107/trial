'use client'

import {
  Typography,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Space,
  Table,
  Popconfirm,
} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SetDiscountsPage() {
  const router = useRouter()
  const params = useParams<{ shopId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()
  const [discounts, setDiscounts] = useState<any[]>([])

  const {
    data: shop,
    isLoading: isShopLoading,
    refetch: refetchShop,
  } = Api.shop.findUnique.useQuery({
    where: { id: params.shopId },
    include: { discounts: true },
  })

  const { mutateAsync: createDiscount } = Api.discount.create.useMutation()
  const { mutateAsync: updateDiscount } = Api.discount.update.useMutation()
  const { mutateAsync: deleteDiscount } = Api.discount.delete.useMutation()

  useEffect(() => {
    if (shop) {
      setDiscounts(shop.discounts || [])
    }
  }, [shop])

  const handleSubmit = async (values: any) => {
    try {
      const discountData = {
        ...values,
        shopId: params.shopId,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
      }
      await createDiscount({ data: discountData })
      enqueueSnackbar('Discount created successfully', { variant: 'success' })
      form.resetFields()
      refetchShop()
    } catch (error) {
      enqueueSnackbar('Failed to create discount', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDiscount({ where: { id } })
      enqueueSnackbar('Discount deleted successfully', { variant: 'success' })
      refetchShop()
    } catch (error) {
      enqueueSnackbar('Failed to delete discount', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Discount %',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      render: (text: number) => `${text}%`,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Popconfirm
          title="Are you sure you want to delete this discount?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
      ),
    },
  ]

  if (isShopLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Set Discounts</Title>
      <Text>
        Create time-limited discounts for your shop or individual vehicles.
      </Text>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ marginTop: 24 }}
      >
        <Form.Item
          name="code"
          label="Discount Code"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="discountPercentage"
          label="Discount Percentage"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value!.replace('%', '')}
          />
        </Form.Item>
        <Form.Item
          name="dateRange"
          label="Discount Period"
          rules={[{ required: true }]}
        >
          <DatePicker.RangePicker showTime />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Add Discount
          </Button>
        </Form.Item>
      </Form>

      <Title level={3} style={{ marginTop: 48 }}>
        Current Discounts
      </Title>
      <Table columns={columns} dataSource={discounts} rowKey="id" />
    </PageLayout>
  )
}
