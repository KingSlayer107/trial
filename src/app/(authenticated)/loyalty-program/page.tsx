'use client'

import { Typography, Card, Row, Col, Statistic, List, Button } from 'antd'
import { GiftOutlined, ShopOutlined, TrophyOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CustomerLoyaltyProgramPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: loyaltyData,
    isLoading: loyaltyLoading,
    refetch: refetchLoyalty,
  } = Api.loyalty.findMany.useQuery({
    where: { userId: user?.id },
    include: { shop: true },
  })

  const { data: rentals, isLoading: rentalsLoading } =
    Api.rental.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { dateCreated: 'desc' },
      take: 5,
    })

  const totalPoints =
    loyaltyData?.reduce((sum, loyalty) => sum + (loyalty.points || 0), 0) || 0

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Customer Loyalty Program</Title>
      <Paragraph>
        Earn points for every booking you make and use them for discounts on
        future rentals.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Total Loyalty Points"
              value={totalPoints}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Shops Participated"
              value={loyaltyData?.length || 0}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Title level={3}>Your Loyalty Points by Shop</Title>
      <List
        loading={loyaltyLoading}
        dataSource={loyaltyData}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.shop?.name}
              description={`Points: ${item.points?.toString()} | Level: ${item.level}`}
            />
            <Button
              icon={<GiftOutlined />}
              onClick={() => router.push(`/vendor/shops/${item.shopId}`)}
            >
              View Shop
            </Button>
          </List.Item>
        )}
      />

      <Title level={3} style={{ marginTop: '24px' }}>
        Recent Bookings
      </Title>
      <List
        loading={rentalsLoading}
        dataSource={rentals}
        renderItem={rental => (
          <List.Item>
            <List.Item.Meta
              title={`Booking ID: ${rental.id}`}
              description={`Date: ${dayjs(rental.dateCreated).format('MMMM D, YYYY')} | Status: ${rental.status}`}
            />
            <Text
              strong
            >{`Points Earned: ${Math.floor(rental.totalCost)}`}</Text>
          </List.Item>
        )}
      />

      <Paragraph style={{ marginTop: '24px' }}>
        Keep booking to earn more points and unlock exclusive discounts!
      </Paragraph>
    </PageLayout>
  )
}
