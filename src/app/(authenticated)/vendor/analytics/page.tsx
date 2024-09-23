'use client'

import { Typography, Card, Row, Col, Select, DatePicker, Spin } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useState, useEffect } from 'react'
import {
  BarChartOutlined,
  CarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function VendorAnalyticsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [timeRange, setTimeRange] = useState('daily')
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(30, 'day'),
    dayjs(),
  ])
  const [selectedVehicle, setSelectedVehicle] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const { data: shops, isLoading: isLoadingShops } = Api.shop.findMany.useQuery(
    { where: { userId: user?.id } },
  )
  const { data: rentals, isLoading: isLoadingRentals } =
    Api.rental.findMany.useQuery({
      where: {
        product: {
          shop: {
            userId: user?.id,
          },
        },
        startDate: {
          gte: dateRange[0].toISOString(),
          lte: dateRange[1].toISOString(),
        },
      },
      include: {
        product: {
          include: {
            shop: true,
          },
        },
      },
    })

  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    if (rentals) {
      const filteredRentals = rentals.filter(
        rental =>
          (selectedVehicle === 'all' ||
            rental.product.id === selectedVehicle) &&
          (selectedLocation === 'all' ||
            rental.product.shop.address.includes(selectedLocation)),
      )

      const groupedData = filteredRentals.reduce((acc, rental) => {
        const date = dayjs(rental.startDate).format(
          timeRange === 'daily'
            ? 'YYYY-MM-DD'
            : timeRange === 'weekly'
              ? 'YYYY-[W]WW'
              : 'YYYY-MM',
        )
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += rental.totalCost
        return acc
      }, {})

      const formattedData = Object.entries(groupedData).map(
        ([date, sales]) => ({ date, sales }),
      )
      setSalesData(
        formattedData.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))),
      )
    }
  }, [rentals, timeRange, selectedVehicle, selectedLocation, dateRange])

  if (isLoadingShops || isLoadingRentals) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <BarChartOutlined /> Vendor Analytics
      </Title>
      <Text>
        Track your shop's performance and make data-driven decisions with our
        sales analytics tools.
      </Text>

      <Card style={{ marginTop: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              value={timeRange}
              onChange={setTimeRange}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              style={{ width: '100%' }}
              value={dateRange}
              onChange={dates => setDateRange(dates)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              value={selectedVehicle}
              onChange={setSelectedVehicle}
              placeholder={
                <>
                  <CarOutlined /> Select Vehicle
                </>
              }
            >
              <Select.Option value="all">All Vehicles</Select.Option>
              {shops
                ?.flatMap(shop => shop.products)
                ?.map(product => (
                  <Select.Option key={product.id} value={product.id}>
                    {product.name}
                  </Select.Option>
                ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              value={selectedLocation}
              onChange={setSelectedLocation}
              placeholder={
                <>
                  <EnvironmentOutlined /> Select Location
                </>
              }
            >
              <Select.Option value="all">All Locations</Select.Option>
              {shops?.map(shop => (
                <Select.Option key={shop.id} value={shop.address}>
                  {shop.address}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </PageLayout>
  )
}
