'use client'
import { useUserContext } from '@/core/context'
import { PageLayout } from '@/designSystem'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

export default function DynamicPricingSettingsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  return <PageLayout layout="narrow">Content Here</PageLayout>
}
