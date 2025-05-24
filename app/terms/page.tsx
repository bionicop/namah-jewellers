import { COMPANY_INFO } from '@/lib/constants'
import LegalDocument from '@/components/legal/LegalDocument'
import { termsData } from '@/app/data/legal-content'

export default function TermsPage() {
  return <LegalDocument data={termsData} type="terms" />
}

export const metadata = {
  title: `Terms and Conditions - ${COMPANY_INFO.name}`,
  description: `Read the terms and conditions for ${COMPANY_INFO.name}. Learn about our policies, user responsibilities, and service terms.`,
}
