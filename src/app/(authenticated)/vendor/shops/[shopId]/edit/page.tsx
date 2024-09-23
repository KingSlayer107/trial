'use client'

import { Prisma } from '@prisma/client'
import { useState, useEffect } from 'react'
import { Typography, Form, Input, Button, Space, Spin } from 'antd'
import {
  ShopOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import MapboxGeocoder, {
  GeocodeService,
} from '@mapbox/mapbox-sdk/services/geocoding'
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function EditShopPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const [map, setMap] = useState<Map>()
  const [geocodingClient, setGeocodingClient] = useState<GeocodeService>()

  const shopId = params.shopId as string

  const {
    data: shop,
    isLoading,
    refetch,
  } = Api.shop.findUnique.useQuery({
    where: { id: shopId },
    include: { user: true },
  })

  const { mutateAsync: updateShop } = Api.shop.update.useMutation()
  const { data: secrets } = Api.configuration.getPublic.useQuery()

  useEffect(() => {
    if (shop) {
      form.setFieldsValue(shop)
    }
  }, [shop, form])

  useEffect(() => {
    const accessToken = secrets?.['PUBLIC_MAPBOX_ACCESS_TOKEN']
    if (!accessToken) return

    mapboxgl.accessToken = accessToken
    const geocodingClient = MapboxGeocoder(mapboxgl)
    setGeocodingClient(geocodingClient)

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        parseFloat(shop?.longitude || '0'),
        parseFloat(shop?.latitude || '0'),
      ],
      zoom: 13,
    })

    setMap(map)

    return () => map.remove()
  }, [secrets, shop])

  const onFinish = async (values: Prisma.ShopUpdateInput) => {
    try {
      await updateShop({ where: { id: shopId }, data: values })
      enqueueSnackbar('Shop updated successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update shop', { variant: 'error' })
    }
  }

  const updateMapLocation = (address: string) => {
    if (!geocodingClient || !map) return

    geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send()
      .then(response => {
        const match = response.body
        if (match && match.features.length > 0) {
          const [lng, lat] = match.features[0].center
          map.flyTo({ center: [lng, lat], zoom: 13 })
          form.setFieldsValue({
            longitude: lng.toString(),
            latitude: lat.toString(),
          })
        }
      })
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Edit Shop Details</Title>
      <Text>
        Update your shop's information to keep it current and accurate.
      </Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: '2rem' }}
      >
        <Form.Item
          name="name"
          label="Shop Name"
          rules={[{ required: true, message: 'Please input the shop name!' }]}
        >
          <Input prefix={<ShopOutlined />} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input the phone number!' },
          ]}
        >
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item
          name="emailAddress"
          label="Email Address"
          rules={[
            { required: true, message: 'Please input the email address!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input
            prefix={<EnvironmentOutlined />}
            onBlur={e => updateMapLocation(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="logoUrl"
          label="Logo URL"
          rules={[{ required: true, message: 'Please input the logo URL!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="longitude" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item name="latitude" hidden={true}>
          <Input />
        </Form.Item>

        <div
          id="map-container"
          style={{ width: '100%', height: '300px', marginBottom: '1rem' }}
        />

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Update Shop
            </Button>
            <Button onClick={() => router.push('/vendor/shops')}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
