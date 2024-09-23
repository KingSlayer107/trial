'use client'

import { Typography, Table, Space, Card, Row, Col } from 'antd'
import {
  ShopOutlined,
  DollarOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ShopListPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: shops,
    isLoading,
    refetch,
  } = Api.shop.findMany.useQuery({
    where: { userId: user?.id },
    include: { products: true, rentals: true, reviews: true },
  })

  const columns = [
    {
      title: 'Shop Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a onClick={() => router.push(`/vendor/shops/${record.id}/edit`)}>
          {text}
        </a>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: any[]) => products?.length.toString(),
    },
    {
      title: 'Total Revenue',
      key: 'revenue',
      render: (text: string, record: any) => {
        const revenue = record.rentals?.reduce(
          (acc: number, rental: any) => acc + rental.totalCost,
          0,
        )
        return `$${revenue.toFixed(2)}`
      },
    },
    {
      title: 'Average Rating',
      key: 'rating',
      render: (text: string, record: any) => {
        const totalRating = record.reviews?.reduce(
          (acc: number, review: any) => acc + (review.rating || 0),
          0,
        )
        const avgRating = totalRating / (record.reviews?.length || 1)
        return avgRating.toFixed(1)
      },
    },
    {
      title: 'Created At',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
  ]

  const calculateTotalRevenue = () => {
    return (
      shops?.reduce((acc, shop) => {
        const shopRevenue =
          shop.rentals?.reduce(
            (shopAcc: number, rental: any) => shopAcc + rental.totalCost,
            0,
          ) || 0
        return acc + shopRevenue
      }, 0) || 0
    )
  }

  const calculateTotalProducts = () => {
    return (
      shops?.reduce((acc, shop) => acc + (shop.products?.length || 0), 0) || 0
    )
  }

  const calculateAverageRating = () => {
    let totalRating = 0
    let totalReviews = 0
    shops?.forEach(shop => {
      shop.reviews?.forEach((review: any) => {
        if (review.rating) {
          totalRating += review.rating
          totalReviews++
        }
      })
    })
    return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 'N/A'
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Shops</Title>
      <Text>Manage and view performance stats for all your shops</Text>

      <Row gutter={16} style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Space direction="vertical">
              <ShopOutlined style={{ fontSize: '24px' }} />
              <Title level={4}>{shops?.length.toString()}</Title>
              <Text>Total Shops</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Space direction="vertical">
              <DollarOutlined style={{ fontSize: '24px' }} />
              <Title level={4}>${calculateTotalRevenue().toFixed(2)}</Title>
              <Text>Total Revenue</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Space direction="vertical">
              <StarOutlined style={{ fontSize: '24px' }} />
              <Title level={4}>{calculateAverageRating()}</Title>
              <Text>Average Rating</Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={shops}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <Text strong>
          Total Products Across All Shops: {calculateTotalProducts().toString()}
        </Text>
      </div>
    </PageLayout>
  )
}
