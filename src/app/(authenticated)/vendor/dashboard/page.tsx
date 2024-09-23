'use client'

import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Table,
  DatePicker,
} from 'antd'
import {
  ShopOutlined,
  DollarOutlined,
  CarOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Prisma } from '@prisma/client'

export default function ShopManagementDashboardPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  )

  const { data: shop, isLoading: isShopLoading } = Api.shop.findFirst.useQuery<Prisma.ShopGetPayload<{
    include: { products: true, rentals: true, discounts: true }
  }>>({
    where: { userId: user?.id },
    include: { products: true, rentals: true, discounts: true },
  })

  const { mutateAsync: createDiscount } = Api.discount.create.useMutation()

  if (isShopLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  if (!shop) {
    return (
      <PageLayout layout="narrow">
        <Title level={3}>You don't have a shop yet</Title>
        <Button
          type="primary"
          onClick={() => router.push('/vendor/shops/create')}
        >
          Create a Shop
        </Button>
      </PageLayout>
    )
  }

  const totalSales =
    shop.rentals?.reduce((sum, rental) => sum + rental.totalCost, 0) || 0
  const totalRentals = shop.rentals?.length || 0
  const totalProducts = shop.products?.length || 0
  const lowStockProducts =
    shop.products?.filter(product => product.stockQuantity < 5).length || 0

  const handleCreateDiscount = async () => {
    if (!dateRange) {
      enqueueSnackbar('Please select a date range for the discount', {
        variant: 'error',
      })
      return
    }

    try {
      await createDiscount({
        data: {
          shopId: shop.id,
          discountPercentage: 10,
          startDate: dateRange[0].toISOString(),
          endDate: dateRange[1].toISOString(),
          description: '10% off all rentals',
        },
      })
      enqueueSnackbar('Discount created successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to create discount', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Stock',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Shop Management Dashboard</Title>
      <Text>
        Welcome to your shop management dashboard. Here you can view analytics,
        track stock, and manage discounts.
      </Text>

      <Row gutter={16} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={totalSales}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Rentals"
              value={totalRentals}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Low Stock Products"
              value={lowStockProducts}
              prefix={<TagOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Title level={3}>Stock Availability</Title>
      <Table dataSource={shop.products} columns={columns} rowKey="id" />

      <Title level={3} style={{ marginTop: 24 }}>
        Set Time-Limited Discount
      </Title>
      <Row gutter={16}>
        <Col span={12}>
          <RangePicker
            style={{ width: '100%' }}
            onChange={dates =>
              setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
            }
          />
        </Col>
        <Col span={12}>
          <Button type="primary" onClick={handleCreateDiscount}>
            Create 10% Discount
          </Button>
        </Col>
      </Row>

      <Title level={3} style={{ marginTop: 24 }}>
        Quick Actions
      </Title>
      <Button
        type="primary"
        style={{ marginRight: 8 }}
        onClick={() => router.push('/vendor/analytics')}
      >
        View Detailed Analytics
      </Button>
      <Button onClick={() => router.push(`/vendor/shops/${shop.id}/products`)}>
        Manage Products
      </Button>
    </PageLayout>
  )
}
