'use client'

import { Typography, List, Badge, Space, Spin } from 'antd'
import { BellOutlined, GiftOutlined, CarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function NotificationsPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: notifications,
    isLoading,
    refetch,
  } = Api.notification.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { dateCreated: 'desc' },
  })

  const { mutateAsync: markAsRead } = Api.notification.update.useMutation()

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead({
        where: { id: notificationId },
        data: { isRead: true },
      })
      refetch()
      enqueueSnackbar('Notification marked as read', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to mark notification as read', {
        variant: 'error',
      })
    }
  }

  const getIcon = (message: string) => {
    if (message.includes('special offer'))
      return <GiftOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
    if (message.includes('upcoming booking'))
      return <CarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
    return <BellOutlined style={{ fontSize: '24px', color: '#faad14' }} />
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Notifications</Title>
      <Text>
        Stay informed about special offers, upcoming bookings, and vehicle
        availability.
      </Text>

      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="mark-read" onClick={() => handleMarkAsRead(item.id)}>
                  Mark as read
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={!item.isRead}>
                    {getIcon(item.message || '')}
                  </Badge>
                }
                title={item.message}
                description={
                  <Space direction="vertical">
                    <Text type="secondary">
                      {dayjs(item.dateCreated).format('MMMM D, YYYY h:mm A')}
                    </Text>
                    <Text>{item.isRead ? 'Read' : 'Unread'}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  )
}
