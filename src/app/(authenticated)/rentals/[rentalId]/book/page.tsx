'use client'

import { useState } from 'react'
import { Typography, Form, DatePicker, Input, Button, Space, Card } from 'antd'
import {
  CarOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BookRentalPage() {
  const router = useRouter()
  const params = useParams<{ rentalId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const { data: product, isLoading } = Api.product.findUnique.useQuery({
    where: { id: params.rentalId },
    include: { shop: true },
  })

  const { mutateAsync: createRental } = Api.rental.create.useMutation()

  const [totalCost, setTotalCost] = useState(0)

  const onFinish = async (values: any) => {
    try {
      const rental = await createRental({
        data: {
          startDate: values.dateRange[0].toISOString(),
          endDate: values.dateRange[1].toISOString(),
          status: 'PENDING',
          totalCost,
          userId: user?.id!,
          productId: params.rentalId,
        },
      })
      enqueueSnackbar('Booking successful!', { variant: 'success' })
      router.push('/bookings')
    } catch (error) {
      enqueueSnackbar('Failed to book rental. Please try again.', {
        variant: 'error',
      })
    }
  }

  const calculateTotalCost = (dates: any) => {
    if (dates && dates[0] && dates[1] && product) {
      const days = dates[1].diff(dates[0], 'day')
      const cost = days * product.price
      setTotalCost(cost)
    } else {
      setTotalCost(0)
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Text>Product not found</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Book a Vehicle</Title>
        <Text>Complete the form below to book your vehicle rental.</Text>

        <Card>
          <Space direction="vertical">
            <Title level={4}>{product.name}</Title>
            <Text>
              <CarOutlined /> Type: {product.type}
            </Text>
            <Text>
              <EnvironmentOutlined /> Location: {product.shop?.address}
            </Text>
            <Text>Price per day: ${product.price.toFixed(2)}</Text>
          </Space>
        </Card>

        <Form
          form={form}
          name="book_rental"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="dateRange"
            label="Rental Period"
            rules={[
              { required: true, message: 'Please select the rental period!' },
            ]}
          >
            <RangePicker
              style={{ width: '100%' }}
              onChange={calculateTotalCost}
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="Pickup Location"
            initialValue={product.shop?.address}
          >
            <Input prefix={<EnvironmentOutlined />} disabled />
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[
              { required: true, message: 'Please enter your payment method!' },
            ]}
          >
            <Input
              prefix={<CreditCardOutlined />}
              placeholder="Enter payment method"
            />
          </Form.Item>

          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Total Cost: ${totalCost.toFixed(2)}</Text>
              <Button type="primary" htmlType="submit" block>
                Confirm Booking
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  )
}
