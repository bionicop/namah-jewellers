import { Card } from '@/components/ui/card'
import { COMPANY_INFO } from '@/lib/constants'
import { LegalDocument as LegalDocumentType, LegalSection } from '@/app/data/types'

interface LegalDocumentProps {
  data: LegalDocumentType
  type: 'terms' | 'privacy'
}

function renderContent(content: string | string[]): React.ReactNode {
  if (Array.isArray(content)) {
    return (
      <div className="space-y-3">
        {content.map((item, index) => (
          <p key={index} className="text-gray-700 leading-relaxed">
            {item}
          </p>
        ))}
      </div>
    )
  }
  return <p className="text-gray-700 leading-relaxed">{content}</p>
}

function renderSection(section: LegalSection): React.ReactNode {
  return (
    <div key={section.id} className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary border-b border-primary/20 pb-2">
        {section.title}
      </h2>

      {section.content && (
        <div className="pl-2">
          {renderContent(section.content)}
        </div>
      )}

      {section.subsections && (
        <div className="space-y-6 ml-6">
          {section.subsections.map((subsection) => (
            <div key={subsection.id} className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                {subsection.title}
              </h3>
              <div className="text-gray-700 ml-5">
                {renderContent(subsection.content)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function LegalDocument({ data, type }: LegalDocumentProps) {
  const formattedDate = new Date(data.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const description = type === 'terms'
    ? `Read the terms and conditions for ${COMPANY_INFO.name}. Learn about our policies, user responsibilities, and service terms.`
    : `Learn how ${COMPANY_INFO.name} protects your privacy and handles your personal information. Read our comprehensive privacy policy.`

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            {data.title}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Last updated: {formattedDate}
          </p>
        </header>

        {/* Content */}
        <main>
          <Card className="p-6 md:p-8 lg:p-12 border-primary/20 bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="space-y-10">
              {data.sections.map(renderSection)}
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-primary/20">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">
                  This {data.title} is effective as of {formattedDate}
                </p>
                <p className="text-sm text-gray-500">
                  © 2025 {COMPANY_INFO.name}. All rights reserved.
                </p>
              </div>
            </footer>
          </Card>
        </main>
      </div>
    </section>
  )
}

export { type LegalDocumentProps }
