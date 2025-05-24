import { COMPANY_INFO } from '@/lib/constants'
import { LegalDocument } from './types'

export const termsData: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: '2025-05-25',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: [
        'Purpose: Explain the purpose of the Privacy Policy.',
        'Scope: Specify the scope of the policy (e.g., applies to website users and members).'
      ]
    },
    {
      id: 'information-collection',
      title: 'Information Collection',
      content: '',
      subsections: [
        {
          id: 'personal-information',
          title: 'Personal Information',
          content: 'Detail what personal information is collected (e.g., name, email address, contact information).'
        },
        {
          id: 'usage-data',
          title: 'Usage Data',
          content: 'Describe what usage data is collected (e.g., IP addresses, browsing behavior).'
        }
      ]
    },
    {
      id: 'how-information-used',
      title: 'How Information Is Used',
      content: '',
      subsections: [
        {
          id: 'service-provision',
          title: 'Service Provision',
          content: 'Explain how the collected information is used to provide and improve services.'
        },
        {
          id: 'communication',
          title: 'Communication',
          content: 'Describe how information may be used to communicate with users (e.g., for updates, newsletters).'
        },
        {
          id: 'marketing',
          title: 'Marketing',
          content: 'If applicable, explain how information might be used for marketing purposes and how users can opt out.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      content: '',
      subsections: [
        {
          id: 'third-party-services',
          title: 'Third-Party Services',
          content: 'Disclose if and how information is shared with third-party services (e.g., payment processors, analytics providers).'
        },
        {
          id: 'legal-requirements',
          title: 'Legal Requirements',
          content: 'Explain circumstances under which information might be disclosed due to legal requirements.'
        }
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection',
      content: '',
      subsections: [
        {
          id: 'security-measures',
          title: 'Security Measures',
          content: 'Describe the measures taken to protect user data (e.g., encryption, secure servers).'
        },
        {
          id: 'data-retention',
          title: 'Data Retention',
          content: 'Explain how long data is retained and the criteria for determining retention periods.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'User Rights',
      content: '',
      subsections: [
        {
          id: 'access-correction',
          title: 'Access and Correction',
          content: 'Provide information on how users can access and update their personal data.'
        },
        {
          id: 'deletion',
          title: 'Deletion',
          content: 'Explain how users can request deletion of their data.'
        },
        {
          id: 'opt-out',
          title: 'Opt-Out',
          content: 'Describe how users can opt out of certain data collection or marketing communications.'
        }
      ]
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies and Tracking Technologies',
      content: '',
      subsections: [
        {
          id: 'usage',
          title: 'Usage',
          content: 'Explain how cookies and other tracking technologies are used on the website.'
        },
        {
          id: 'consent',
          title: 'Consent',
          content: 'Describe how users can manage their cookie preferences.'
        }
      ]
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      content: '',
      subsections: [
        {
          id: 'age-restrictions',
          title: 'Age Restrictions',
          content: 'Specify if the website is intended for users above a certain age and what measures are in place to protect children\'s privacy.'
        }
      ]
    },
    {
      id: 'policy-changes',
      title: 'Changes to Privacy Policy',
      content: '',
      subsections: [
        {
          id: 'updates',
          title: 'Updates',
          content: 'Describe how and when the Privacy Policy may be updated.'
        },
        {
          id: 'notification',
          title: 'Notification',
          content: 'Explain how users will be informed of changes.'
        }
      ]
    },
    {
      id: 'contact-information',
      title: 'Contact Information',
      content: [
        'Inquiries: Provide contact details for users to ask questions or raise concerns about the Privacy Policy.',
        `Email: ${COMPANY_INFO.contact.email}`,
        `Phone: ${COMPANY_INFO.contact.phone}`,
        `Address: ${COMPANY_INFO.contact.address}`
      ]
    }
  ]
}

export const privacyData: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: '2025-05-25',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: '',
      subsections: [
        {
          id: 'website-overview',
          title: 'Website Overview',
          content: 'Briefly describe the purpose of the website.'
        },
        {
          id: 'acceptance-of-terms',
          title: 'Acceptance of Terms',
          content: 'State that by using the website, users agree to these terms.'
        }
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      content: '',
      subsections: [
        {
          id: 'account-security',
          title: 'Account Security',
          content: 'Users are responsible for keeping their account details secure.'
        },
        {
          id: 'accurate-information',
          title: 'Accurate Information',
          content: 'Users must provide accurate information during registration and updates.'
        },
        {
          id: 'compliance',
          title: 'Compliance',
          content: 'Users must comply with all applicable laws and regulations.'
        }
      ]
    },
    {
      id: 'content-and-intellectual-property',
      title: 'Content and Intellectual Property',
      content: '',
      subsections: [
        {
          id: 'ownership',
          title: 'Ownership',
          content: 'Clarify who owns the content on the website (e.g., jewelry images, descriptions).'
        },
        {
          id: 'usage-rights',
          title: 'Usage Rights',
          content: 'Explain how users can use the content (e.g., personal use only).'
        }
      ]
    },
    {
      id: 'user-conduct',
      title: 'User Conduct',
      content: '',
      subsections: [
        {
          id: 'prohibited-activities',
          title: 'Prohibited Activities',
          content: 'List activities that are not allowed (e.g., harassment, spamming).'
        },
        {
          id: 'consequences',
          title: 'Consequences',
          content: 'Describe the consequences of violating these rules (e.g., suspension or termination of access).'
        }
      ]
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      content: '',
      subsections: [
        {
          id: 'data-collection',
          title: 'Data Collection',
          content: 'Explain what data is collected and why.'
        },
        {
          id: 'data-use',
          title: 'Data Use',
          content: 'Describe how user data is used.'
        },
        {
          id: 'data-protection',
          title: 'Data Protection',
          content: 'Outline measures taken to protect user data.'
        }
      ]
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      content: '',
      subsections: [
        {
          id: 'governing-law',
          title: 'Governing Law',
          content: 'Specify the laws that govern the terms.'
        },
        {
          id: 'dispute-process',
          title: 'Dispute Process',
          content: 'Outline how disputes will be resolved (e.g., arbitration, mediation).'
        }
      ]
    },
    {
      id: 'changes-to-terms',
      title: 'Changes to Terms',
      content: '',
      subsections: [
        {
          id: 'modification',
          title: 'Modification',
          content: 'State how and when terms can be updated.'
        },
        {
          id: 'notification',
          title: 'Notification',
          content: 'Explain how users will be notified of changes.'
        }
      ]
    },
    {
      id: 'contact-information',
      title: 'Contact Information',
      content: '',
      subsections: [
        {
          id: 'support',
          title: 'Support',
          content: 'Provide contact details for user support or inquiries.'
        }
      ]
    }
  ]
}
