'use client'

import { Typography, Spin, Descriptions, Rate, Button, Space } from 'antd'
import {
  CarOutlined,
  DollarOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function RentalDetailsPage() {
  const router = useRouter()
  const params = useParams<{ rentalId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: rental, isLoading } = Api.rental.findUnique.useQuery({
    where: { id: params.rentalId },
    include: { product: { include: { shop: true } }, user: true },
  })

  const handleBookNow = () => {
    if (user) {
      router.push(`/rentals/${params.rentalId}/book`)
    } else {
      enqueueSnackbar('Please log in to book a rental', { variant: 'info' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!rental) {
    return (
      <PageLayout layout="narrow">
        <Text>Rental not found</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Vehicle Details</Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item
            label={
              <>
                <CarOutlined /> Vehicle Name
              </>
            }
          >
            {rental.product.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <InfoCircleOutlined /> Description
              </>
            }
          >
            {rental.product.description}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <DollarOutlined /> Price per Day
              </>
            }
          >
            ${rental.product.price.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <CalendarOutlined /> Availability
              </>
            }
          >
            From {dayjs(rental.startDate).format('MMMM D, YYYY')} to{' '}
            {dayjs(rental.endDate).format('MMMM D, YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{rental.status}</Descriptions.Item>
          <Descriptions.Item label="Total Cost">
            ${rental.totalCost.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Shop">
            {rental.product.shop?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Rating">
            <Rate disabled defaultValue={4} />{' '}
            {/* Assuming a default rating of 4 */}
          </Descriptions.Item>
        </Descriptions>

        <Space>
          <Button type="primary" size="large" onClick={handleBookNow}>
            Book Now
          </Button>
          <Button size="large" onClick={() => router.push('/search')}>
            Back to Search
          </Button>
        </Space>
      </Space>
    </PageLayout>
  )
}
