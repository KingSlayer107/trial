'use client'

import { Typography, Card, List, Tag, Spin } from 'antd'
import { CustomerServiceOutlined, StarOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function VendorSupportPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: shop, isLoading } = Api.shop.findFirst.useQuery({
    where: { userId: user?.id },
    include: { loyaltys: true },
  })

  const getSubscriptionLevel = () => {
    if (!shop) return 'Basic'
    const loyaltyPoints = shop.loyaltys?.[0]?.points || 0
    if (loyaltyPoints >= 1000) return 'Premium'
    if (loyaltyPoints >= 500) return 'Standard'
    return 'Basic'
  }

  const subscriptionLevel = getSubscriptionLevel()

  const supportInfo = {
    Basic: {
      responseTime: '48 hours',
      channels: ['Email'],
      priority: 'Low',
    },
    Standard: {
      responseTime: '24 hours',
      channels: ['Email', 'Phone'],
      priority: 'Medium',
    },
    Premium: {
      responseTime: '4 hours',
      channels: ['Email', 'Phone', 'Live Chat'],
      priority: 'High',
    },
  }

  const currentSupport = supportInfo[subscriptionLevel]

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <CustomerServiceOutlined /> Vendor Support
      </Title>
      <Paragraph>
        As a vendor, you have access to priority customer support based on your
        subscription level. Here's what you can expect:
      </Paragraph>

      <Card>
        <Title level={3}>Your Support Plan</Title>
        <List
          itemLayout="horizontal"
          dataSource={[
            { label: 'Subscription Level', value: subscriptionLevel },
            { label: 'Response Time', value: currentSupport.responseTime },
            { label: 'Priority', value: currentSupport.priority },
            {
              label: 'Support Channels',
              value: currentSupport.channels.join(', '),
            },
          ]}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={
                  item.label === 'Priority' ? (
                    <Tag
                      color={
                        subscriptionLevel === 'Premium'
                          ? 'gold'
                          : subscriptionLevel === 'Standard'
                            ? 'green'
                            : 'blue'
                      }
                    >
                      {item.value}
                    </Tag>
                  ) : (
                    item.value
                  )
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <Title level={3}>Contact Support</Title>
        <Paragraph>
          To get in touch with our support team, please use the following
          methods based on your subscription level:
        </Paragraph>
        <List
          itemLayout="horizontal"
          dataSource={currentSupport.channels}
          renderItem={channel => (
            <List.Item>
              <List.Item.Meta
                avatar={<StarOutlined />}
                title={channel}
                description={
                  channel === 'Email'
                    ? 'support@example.com'
                    : channel === 'Phone'
                      ? '+1 (555) 123-4567'
                      : 'Available in your dashboard'
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Paragraph style={{ marginTop: '20px' }}>
        <Text strong>Note:</Text> Your support level is determined by your
        subscription. Upgrade your plan to receive faster and more comprehensive
        support.
      </Paragraph>
    </PageLayout>
  )
}
