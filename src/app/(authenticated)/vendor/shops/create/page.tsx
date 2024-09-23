'use client'

import { Form, Input, Button, Typography, Space } from 'antd'
import {
  ShopOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
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

export default function CreateShopPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [logoUrl, setLogoUrl] = useState('')
  const { mutateAsync: upload } = useUploadPublic()
  const { mutateAsync: createShop } = Api.shop.create.useMutation()
  const { data: secrets } = Api.configuration.getPublic.useQuery({})

  const [geocodingClient, setGeocodingClient] = useState<GeocodeService>()
  const [map, setMap] = useState<Map>()

  useState(() => {
    if (!secrets?.['PUBLIC_MAPBOX_ACCESS_TOKEN']) return

    mapboxgl.accessToken = secrets['PUBLIC_MAPBOX_ACCESS_TOKEN']
    const geocodingClient = MapboxGeocoder(mapboxgl)
    setGeocodingClient(geocodingClient)

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/umussetu/clsbdduiu003301rb3x9cbe3e',
      center: [0, 0],
      zoom: 2,
    })
    setMap(map)

    return () => map.remove()
  }, [secrets])

  const handleSubmit = async (values: any) => {
    try {
      if (!user?.id) {
        enqueueSnackbar('User not authenticated', { variant: 'error' })
        return
      }

      const response = await geocodingClient
        ?.forwardGeocode({
          query: values.address,
          limit: 1,
        })
        .send()

      if (!response?.body.features[0]) {
        enqueueSnackbar('Invalid address', { variant: 'error' })
        return
      }

      const [longitude, latitude] = response.body.features[0].center

      const shopData = {
        ...values,
        userId: user.id,
        logoUrl,
        longitude: longitude.toString(),
        latitude: latitude.toString(),
      }

      await createShop({ data: shopData })
      enqueueSnackbar('Shop created successfully', { variant: 'success' })
      router.push('/vendor/shops')
    } catch (error) {
      enqueueSnackbar('Failed to create shop', { variant: 'error' })
    }
  }

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const { url } = await upload({ file })
        setLogoUrl(url)
        enqueueSnackbar('Logo uploaded successfully', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('Failed to upload logo', { variant: 'error' })
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Create a New Shop</Title>
        <Text>
          Enter the details for your new shop to start listing your vehicles.
        </Text>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Shop Name"
            rules={[{ required: true, message: 'Please enter shop name' }]}
          >
            <Input prefix={<ShopOutlined />} placeholder="Enter shop name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter shop description" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input
              prefix={<EnvironmentOutlined />}
              placeholder="Enter shop address"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Enter phone number"
            />
          </Form.Item>

          <Form.Item
            name="emailAddress"
            label="Email Address"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter email address"
            />
          </Form.Item>

          <Form.Item label="Logo">
            <input type="file" onChange={handleLogoUpload} accept="image/*" />
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Shop Logo"
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            )}
          </Form.Item>

          <div
            id="map"
            style={{ width: '100%', height: '300px', marginBottom: '20px' }}
          ></div>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<ShopOutlined />}>
              Create Shop
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  )
}
