import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()

  const goTo = (url: string) => {
    router.push(url)
  }

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home',
      position: 'topbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/vendor/dashboard',
      label: 'Shop Management Dashboard',
      position: 'topbar',

      onClick: () => goTo('/vendor/dashboard'),
    },

    {
      key: '/vendor/shops/create',
      label: 'Create Shop',
      position: 'topbar',

      onClick: () => goTo('/vendor/shops/create'),
    },

    {
      key: '/vendor/shops',
      label: 'Shop List',
      position: 'topbar',

      onClick: () => goTo('/vendor/shops'),
    },

    {
      key: '/vendor/analytics',
      label: 'Vendor Analytics',
      position: 'topbar',

      onClick: () => goTo('/vendor/analytics'),
    },

    {
      key: '/vendor/competitions',
      label: 'Vendor Competitions',
      position: 'topbar',

      onClick: () => goTo('/vendor/competitions'),
    },

    {
      key: '/vendor/support',
      label: 'Vendor Support',
      position: 'topbar',

      onClick: () => goTo('/vendor/support'),
    },

    {
      key: '/vendor/referrals',
      label: 'Vendor Referrals',
      position: 'topbar',

      onClick: () => goTo('/vendor/referrals'),
    },

    {
      key: '/vendor/ads',
      label: 'Ad Management',
      position: 'topbar',

      onClick: () => goTo('/vendor/ads'),
    },

    {
      key: '/search',
      label: 'Search Rentals',
      position: 'topbar',

      onClick: () => goTo('/search'),
    },

    {
      key: '/bookings',
      label: 'Booking History',
      position: 'topbar',

      onClick: () => goTo('/bookings'),
    },

    {
      key: '/wishlist',
      label: 'Wishlist',
      position: 'topbar',

      onClick: () => goTo('/wishlist'),
    },

    {
      key: '/loyalty-program',
      label: 'Customer Loyalty Program',
      position: 'topbar',

      onClick: () => goTo('/loyalty-program'),
    },

    {
      key: '/notifications',
      label: 'Notifications',
      position: 'topbar',

      onClick: () => goTo('/notifications'),
    },

    {
      key: '/admin/insights',
      label: 'Platform Insights',
      position: 'topbar',

      onClick: () => goTo('/admin/insights'),
    },

    {
      key: '/admin/locations',
      label: 'Multi-location Management',
      position: 'topbar',

      onClick: () => goTo('/admin/locations'),
    },

    {
      key: '/admin/pricing',
      label: 'Dynamic Pricing Settings',
      position: 'topbar',

      onClick: () => goTo('/admin/pricing'),
    },

    {
      key: '/pricing',
      label: 'Pricing',

      position: 'topbar',

      onClick: () => goTo('/pricing'),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
