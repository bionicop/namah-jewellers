import { COMPANY_INFO } from '@/lib/constants'
import LegalDocument from '@/components/legal/LegalDocument'
import { privacyData } from '@/app/data/legal-content'

export default function PrivacyPage() {
  return <LegalDocument data={privacyData} type="privacy" />
}

export const metadata = {
  title: `Privacy Policy - ${COMPANY_INFO.name}`,
  description: `Learn how ${COMPANY_INFO.name} protects your privacy and handles your personal information. Read our comprehensive privacy policy.`,
}
