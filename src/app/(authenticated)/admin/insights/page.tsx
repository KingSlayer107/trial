'use client'

import { Typography, Card, Row, Col, Statistic, Spin } from 'antd'
import {
  ShopOutlined,
  UserOutlined,
  DollarOutlined,
  LineChartOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PlatformInsightsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: shops, isLoading: isLoadingShops } = Api.shop.findMany.useQuery(
    {},
  )
  const { data: users, isLoading: isLoadingUsers } = Api.user.findMany.useQuery({
    include: { checkRole: true }
  })
  const { data: rentals, isLoading: isLoadingRentals } =
    Api.rental.findMany.useQuery({})
  const { data: products, isLoading: isLoadingProducts } =
    Api.product.findMany.useQuery({
      include: { reviews: true, rentals: true }
    })

  if (!user?.checkRole('admin')) {
    enqueueSnackbar('You do not have permission to view this page.', {
      variant: 'error',
    })
    router.push('/home')
    return null
  }

  const calculateTotalSales = () => {
    return rentals?.reduce((total, rental) => total + rental.totalCost, 0) || 0
  }

  const calculateAverageRating = () => {
    const reviews = products?.flatMap(product => product.reviews || [])
    const totalRating =
      reviews?.reduce((sum, review) => sum + (review.rating || 0), 0) || 0
    return reviews && reviews.length > 0 ? totalRating / reviews.length : 0
  }

  const getMostPopularProduct = () => {
    if (!products) return null
    return products.reduce(
      (popular, product) =>
        (product.rentals?.length || 0) > (popular.rentals?.length || 0)
          ? product
          : popular,
      products[0],
    )
  }

  const isLoading =
    isLoadingShops || isLoadingUsers || isLoadingRentals || isLoadingProducts

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Platform Insights</Title>
      <Paragraph>
        View overall sales trends, customer preferences, and vendor performance.
      </Paragraph>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Shops"
                value={shops?.length || 0}
                prefix={<ShopOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={users?.length || 0}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Sales"
                value={calculateTotalSales()}
                precision={2}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Average Rating"
                value={calculateAverageRating()}
                precision={1}
                prefix={<LineChartOutlined />}
                suffix="/ 5"
              />
            </Card>
          </Col>
        </Row>
      )}

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Most Popular Product">
            {getMostPopularProduct() && (
              <>
                <p>
                  <strong>Name:</strong> {getMostPopularProduct()?.name}
                </p>
                <p>
                  <strong>Description:</strong>{' '}
                  {getMostPopularProduct()?.description}
                </p>
                <p>
                  <strong>Price:</strong> $
                  {getMostPopularProduct()?.price.toString()}
                </p>
                <p>
                  <strong>Total Rentals:</strong>{' '}
                  {getMostPopularProduct()?.rentals?.length || 0}
                </p>
              </>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Recent Rentals">
            {rentals?.slice(0, 5).map(rental => (
              <p key={rental.id}>
                {dayjs(rental.startDate).format('YYYY-MM-DD')} - $
                {rental.totalCost.toString()}
              </p>
            ))}
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
