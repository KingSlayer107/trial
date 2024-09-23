'use client'

import { Prisma } from '@prisma/client'
import { Typography, List, Card, Button, Row, Col } from 'antd'
import {
  HeartOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WishlistPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: wishlists,
    isLoading,
    refetch,
  } = Api.wishlist.findMany.useQuery({
    where: { userId: user?.id },
    include: { product: true },
  })

  const { mutateAsync: deleteWishlist } = Api.wishlist.delete.useMutation()

  const handleRemoveFromWishlist = async (wishlistId: string) => {
    try {
      await deleteWishlist({ where: { id: wishlistId } })
      enqueueSnackbar('Item removed from wishlist', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to remove item from wishlist', {
        variant: 'error',
      })
    }
  }

  const handleBookNow = (productId: string) => {
    router.push(`/rentals/${productId}/book`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Wishlist</Title>
      <Text>
        Easily find and book your favorite vehicles when you're ready.
      </Text>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
          dataSource={wishlists}
          renderItem={(
            wishlist: Prisma.WishlistGetPayload<{ include: { product: true } }>,
          ) => (
            <List.Item key={wishlist.id}>
              <Card
                cover={
                  <img
                    alt={wishlist.product.name}
                    src={
                      wishlist.product.imageUrl ||
                      'https://placeholder.com/300x200'
                    }
                  />
                }
                actions={[
                  <Button
                    key="book"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleBookNow(wishlist.product.id)}
                  >
                    Book Now
                  </Button>,
                  <Button
                    key="remove"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveFromWishlist(wishlist.id)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={wishlist.product.name}
                  description={
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <Text>{wishlist.product.description}</Text>
                      </Col>
                      <Col span={12}>
                        <Text strong>Price:</Text> $
                        {wishlist.product.price.toString()}
                      </Col>
                      <Col span={12}>
                        <Text strong>Type:</Text> {wishlist.product.type}
                      </Col>
                      <Col span={24}>
                        <Text type="secondary">
                          Added on:{' '}
                          {dayjs(wishlist.dateCreated).format('MMMM D, YYYY')}
                        </Text>
                      </Col>
                    </Row>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}

      {wishlists?.length === 0 && (
        <Card>
          <Text>Your wishlist is empty. Start adding vehicles you like!</Text>
        </Card>
      )}
    </PageLayout>
  )
}
