'use client'

import { useState, useEffect } from 'react'
import { Input, Select, Button, Card, Typography, Row, Col, Space } from 'antd'
import {
  SearchOutlined,
  CarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SearchRentalsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [availability, setAvailability] = useState('')

  const {
    data: products,
    isLoading,
    refetch,
  } = Api.product.findMany.useQuery({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { shop: { address: { contains: searchTerm, mode: 'insensitive' } } },
      ],
      type: vehicleType ? { equals: vehicleType } : undefined,
      stockQuantity: availability === 'available' ? { gt: 0 } : undefined,
    },
    include: { shop: true },
  })

  const handleSearch = () => {
    refetch()
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Search Rentals</Title>
        <Text>Find vehicles based on location, type, or availability.</Text>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Input
            placeholder="Search by location or vehicle name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Select vehicle type"
            value={vehicleType}
            onChange={setVehicleType}
          >
            <Option value="">All Types</Option>
            <Option value="car">Car</Option>
            <Option value="motorcycle">Motorcycle</Option>
            <Option value="bicycle">Bicycle</Option>
          </Select>
          <Select
            style={{ width: '100%' }}
            placeholder="Select availability"
            value={availability}
            onChange={setAvailability}
          >
            <Option value="">All</Option>
            <Option value="available">Available</Option>
          </Select>
          <Button
            type="primary"
            onClick={handleSearch}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </Space>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Row gutter={[16, 16]}>
            {products?.map(product => (
              <Col xs={24} sm={12} md={8} key={product.id}>
                <Card
                  hoverable
                  cover={
                    product.imageUrl && (
                      <img alt={product.name} src={product.imageUrl} />
                    )
                  }
                  onClick={() => router.push(`/rentals/${product.id}`)}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <>
                        <Text>
                          <CarOutlined /> {product.type}
                        </Text>
                        <br />
                        <Text>
                          <EnvironmentOutlined /> {product.shop?.address}
                        </Text>
                        <br />
                        <Text>Price: ${product.price.toString()} / day</Text>
                        <br />
                        <Text>
                          Available: {product.stockQuantity.toString()}
                        </Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
