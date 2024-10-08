'use client'

import { Typography, Card, List, Progress, Button, Space } from 'antd'
import { TrophyOutlined, GiftOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import type { RouterOutputs } from '@/core/trpc/internal/trpc.client'
import { PageLayout } from '@/designSystem'

export default function VendorCompetitionsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: competitions, isLoading } = Api.competition.findMany.useQuery({
    where: { userId: user?.id },
    include: { rewards: true },
  }) as RouterOutputs['competition']['findMany'];

  const handleRedeemReward = async (rewardId: string) => {
    try {
      const { mutateAsync: redeemReward } = Api.reward.update.useMutation()
      await redeemReward({
        where: { id: rewardId },
        data: { redeemed: true },
      })
      enqueueSnackbar('Reward redeemed successfully!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to redeem reward. Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Sales Competitions</Title>
      <Paragraph>
        Participate in monthly sales competitions to earn rewards and points
        that can be used to reduce your subscription costs.
      </Paragraph>

      {isLoading ? (
        <Text>Loading competitions...</Text>
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={competitions}
          renderItem={(competition) => (
            <List.Item>
              <Card
                title={
                  <Space>
                    <TrophyOutlined style={{ color: '#faad14' }} />
                    {competition?.name || 'Unnamed Competition'}
                  </Space>
                }
                extra={dayjs(competition?.endDate).format('MMM YYYY')}
              >
                <Paragraph>{competition?.description || 'No description available'}</Paragraph>
                <Progress
                  percent={Math.min(
                    ((competition?.currentSales || 0) / (competition?.salesGoal || 1)) * 100,
                    100,
                  )}
                  status={
                    (competition?.currentSales || 0) >= (competition?.salesGoal || 0)
                      ? 'success'
                      : 'active'
                  }
                />
                <Text>
                  Sales: ${(competition?.currentSales || 0).toFixed(2)} / $
                  {(competition?.salesGoal || 0).toFixed(2)}
                </Text>
                <List
                  itemLayout="horizontal"
                  dataSource={competition?.rewards || []}
                  renderItem={(reward) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <GiftOutlined
                            style={{ fontSize: '24px', color: '#52c41a' }}
                          />
                        }
                        title={reward?.name || 'Unnamed Reward'}
                        description={`${reward?.points || 0} points`}
                      />
                      <Button
                        type="primary"
                        disabled={
                          reward?.redeemed ||
                          (competition?.currentSales || 0) < (competition?.salesGoal || 0)
                        }
                        onClick={() => handleRedeemReward(reward?.id || '')}
                      >
                        {reward?.redeemed ? 'Redeemed' : 'Redeem'}
                      </Button>
                    </List.Item>
                  )}
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  )
}
