'use client'

import {
  Typography,
  Row,
  Col,
  Card,
  Input,
  Button,
  Rate,
  List,
  Statistic,
} from 'antd'
import {
  CarOutlined,
  BicycleOutlined,
  SearchOutlined,
  HistoryOutlined,
  StarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  GiftOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchQuery, setSearchQuery] = useState('')

  const { data: featuredRentals, isLoading: isLoadingFeatured } =
    Api.product.findMany.useQuery({
      where: { type: { in: ['bike', 'car'] } },
      take: 4,
      orderBy: { rentals: { _count: 'desc' } },
    })

  const { data: promotions, isLoading: isLoadingPromotions } =
    Api.discount.findMany.useQuery({
      take: 3,
      orderBy: { discountPercentage: 'desc' },
    })

  const { data: topLocations, isLoading: isLoadingLocations } =
    Api.shop.findMany.useQuery({
      take: 3,
      orderBy: { products: { _count: 'desc' } },
    })

  const { data: recentBookings, isLoading: isLoadingBookings } =
    Api.rental.findMany.useQuery({
      where: { userId: user?.id },
      take: 3,
      orderBy: { dateCreated: 'desc' },
      include: { product: true },
    })

  const { data: loyaltyPoints } = Api.loyalty.findFirst.useQuery({
    where: { userId: user?.id },
  })

  const handleSearch = () => {
    router.push(`/search?query=${searchQuery}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={1}>Welcome to Our Rental Service</Title>
      <Paragraph>
        Find the perfect bike or car for your next adventure!
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input.Search
            placeholder="Search for rentals by location or vehicle type"
            enterButton={<SearchOutlined />}
            size="large"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />
        </Col>

        <Col span={24}>
          <Title level={2}>Featured Rentals</Title>
          <Row gutter={[16, 16]}>
            {featuredRentals?.map(rental => (
              <Col key={rental.id} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={rental.name}
                      src={rental.imageUrl || 'https://via.placeholder.com/150'}
                    />
                  }
                  onClick={() => router.push(`/rentals/${rental.id}`)}
                >
                  <Card.Meta
                    title={rental.name}
                    description={
                      <>
                        <Text>
                          {rental.type === 'bike' ? (
                            <BicycleOutlined />
                          ) : (
                            <CarOutlined />
                          )}{' '}
                          {rental.type}
                        </Text>
                        <br />
                        <Text strong>${rental.price.toString()} / day</Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col span={24}>
          <Title level={2}>Quick Links</Title>
          <Button
            icon={<SearchOutlined />}
            onClick={() => router.push('/search')}
          >
            Search Rentals
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => router.push('/bookings')}
            style={{ marginLeft: 8 }}
          >
            View Bookings
          </Button>
        </Col>

        <Col span={24}>
          <Title level={2}>Current Promotions</Title>
          <List
            dataSource={promotions}
            renderItem={promo => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Text strong>{promo.description}</Text>
                  <br />
                  <Text type="success">{promo.discountPercentage}% off</Text>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col span={24}>
          <Title level={2}>Top Locations</Title>
          <List
            dataSource={topLocations}
            renderItem={location => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Text strong>
                    <EnvironmentOutlined /> {location.name}
                  </Text>
                  <br />
                  <Text>{location.address}</Text>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        {user && (
          <>
            <Col span={24}>
              <Title level={2}>Recent Bookings</Title>
              <List
                dataSource={recentBookings}
                renderItem={booking => (
                  <List.Item>
                    <Card style={{ width: '100%' }}>
                      <Text strong>{booking.product?.name}</Text>
                      <br />
                      <Text>
                        From: {new Date(booking.startDate).toLocaleDateString()}
                      </Text>
                      <br />
                      <Text>
                        To: {new Date(booking.endDate).toLocaleDateString()}
                      </Text>
                    </Card>
                  </List.Item>
                )}
              />
            </Col>

            <Col span={24}>
              <Card>
                <Statistic
                  title="Your Loyalty Points"
                  value={loyaltyPoints?.points || 0}
                  prefix={<GiftOutlined />}
                />
              </Card>
            </Col>
          </>
        )}
      </Row>
    </PageLayout>
  )
}
