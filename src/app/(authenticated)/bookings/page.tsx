'use client'

import { Typography, List, Card, Button, Space } from 'antd'
import { HistoryOutlined, ReloadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BookingHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: rentals,
    isLoading,
    refetch,
  } = Api.rental.findMany.useQuery({
    where: { userId: user?.id },
    include: { product: true },
    orderBy: { startDate: 'desc' },
  })

  const handleRebook = (productId: string) => {
    router.push(`/rentals/${productId}/book`)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <HistoryOutlined /> Booking History
        </Title>
        <Text>View your past rental bookings and easily rebook vehicles.</Text>

        <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
          Refresh
        </Button>

        <List
          loading={isLoading}
          dataSource={rentals}
          renderItem={rental => (
            <List.Item>
              <Card
                title={rental.product?.name}
                extra={
                  <Button onClick={() => handleRebook(rental.product?.id)}>
                    Rebook
                  </Button>
                }
                style={{ width: '100%' }}
              >
                <p>
                  Start Date: {dayjs(rental.startDate).format('MMMM D, YYYY')}
                </p>
                <p>End Date: {dayjs(rental.endDate).format('MMMM D, YYYY')}</p>
                <p>Status: {rental.status}</p>
                <p>Total Cost: ${rental.totalCost.toString()}</p>
              </Card>
            </List.Item>
          )}
        />
      </Space>
    </PageLayout>
  )
}
