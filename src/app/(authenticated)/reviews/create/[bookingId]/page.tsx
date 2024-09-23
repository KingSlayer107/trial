'use client'

import { Prisma } from '@prisma/client'
import { Typography, Form, Input, Rate, Button, Space } from 'antd'
import { StarOutlined, ShopOutlined, CarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WriteReviewPage() {
  const router = useRouter()
  const params = useParams<{ bookingId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()

  const { data: rental, isLoading } = Api.rental.findUnique.useQuery({
    where: { id: params.bookingId },
    include: { product: { include: { shop: true } } },
  })

  const { mutateAsync: createReview } = Api.review.create.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      await createReview({
        data: {
          rating: values.rating,
          comment: values.comment,
          userId: user?.id || '',
          productId: rental?.productId || '',
        },
      })

      enqueueSnackbar('Review submitted successfully', { variant: 'success' })
      router.push('/bookings')
    } catch (error) {
      enqueueSnackbar('Failed to submit review', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
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
        <Title level={2}>Write a Review</Title>
        <Text>
          Share your experience about the shop and the vehicle you rented.
        </Text>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="rating"
            label="Overall Rating"
            rules={[{ required: true, message: 'Please rate your experience' }]}
          >
            <Rate character={<StarOutlined />} />
          </Form.Item>

          <Form.Item
            name="shopComment"
            label={
              <>
                <ShopOutlined /> Shop Review
              </>
            }
            rules={[
              {
                required: true,
                message: 'Please provide a review for the shop',
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="How was your experience with the shop?"
            />
          </Form.Item>

          <Form.Item
            name="vehicleComment"
            label={
              <>
                <CarOutlined /> Vehicle Review
              </>
            }
            rules={[
              {
                required: true,
                message: 'Please provide a review for the vehicle',
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="How was the vehicle you rented?"
            />
          </Form.Item>

          <Form.Item name="comment" label="Additional Comments">
            <Input.TextArea
              rows={4}
              placeholder="Any additional comments or suggestions?"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  )
}
