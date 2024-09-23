'use client'

import { Typography, Card, Input, Button, Space, List } from 'antd'
import {
  CopyOutlined,
  UserAddOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function VendorReferralsPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [referralCode, setReferralCode] = useState('')
  const [referrals, setReferrals] = useState<any[]>([])

  const { data: userData, isLoading: isUserLoading } =
    Api.user.findUnique.useQuery({
      where: { id: user?.id },
      include: { shops: true },
    })

  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  useEffect(() => {
    if (userData) {
      setReferralCode(userData.tokenInvitation || '')
      // In a real scenario, we would fetch the referrals data from the API
      // For this example, we'll use mock data
      setReferrals([
        { id: '1', name: 'John Doe', date: '2023-05-01', status: 'Joined' },
        { id: '2', name: 'Jane Smith', date: '2023-05-15', status: 'Pending' },
      ])
    }
  }, [userData])

  const generateReferralCode = async () => {
    const newCode = Math.random().toString(36).substring(2, 10).toUpperCase()
    try {
      await updateUser({
        where: { id: user?.id },
        data: { tokenInvitation: newCode },
      })
      setReferralCode(newCode)
      enqueueSnackbar('Referral code generated successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to generate referral code', { variant: 'error' })
    }
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    enqueueSnackbar('Referral code copied to clipboard', { variant: 'success' })
  }

  if (isUserLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Vendor Referrals</Title>
      <Paragraph>
        Refer other vendors to our platform and earn referral bonuses. Share
        your unique referral code to start earning!
      </Paragraph>

      <Card title="Your Referral Code" style={{ marginBottom: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 32px)' }}
              value={referralCode}
              readOnly
              placeholder="Generate your referral code"
            />
            <Button icon={<CopyOutlined />} onClick={copyReferralCode} />
          </Input.Group>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={generateReferralCode}
          >
            Generate New Code
          </Button>
        </Space>
      </Card>

      <Card title="Your Referrals">
        <List
          dataSource={referrals}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Text
                  key="status"
                  type={item.status === 'Joined' ? 'success' : 'warning'}
                >
                  {item.status}
                </Text>,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`Referred on: ${item.date}`}
              />
            </List.Item>
          )}
        />
      </Card>

      <Card title="Referral Bonuses" style={{ marginTop: '24px' }}>
        <Space direction="vertical">
          <Text>
            <DollarOutlined /> Earn 10% commission on the first month's
            subscription of each referred vendor.
          </Text>
          <Text>
            <DollarOutlined /> Additional $50 bonus for every 5 successful
            referrals.
          </Text>
        </Space>
      </Card>
    </PageLayout>
  )
}
