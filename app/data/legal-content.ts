import { COMPANY_INFO } from '@/lib/constants'
import { LegalDocument } from './types'

export const termsData: LegalDocument = {
  title: 'Terms and Conditions',
  lastUpdated: '2025-01-24',
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: [
        `Welcome to ${COMPANY_INFO.name}. These Terms and Conditions ("Terms") govern your use of our website and services.`,
        'By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these terms, then you may not access our services.'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      content: 'As a user of our services, you agree to the following responsibilities:',
      subsections: [
        {
          id: 'account-security',
          title: 'Account Security',
          content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'
        },
        {
          id: 'accurate-information',
          title: 'Accurate Information',
          content: 'You must provide accurate, current, and complete information during registration and keep your information updated. Providing false or misleading information may result in account suspension.'
        },
        {
          id: 'compliance',
          title: 'Legal Compliance',
          content: 'You must comply with all applicable local, state, national, and international laws and regulations while using our services.'
        }
      ]
    },
    {
      id: 'content-intellectual-property',
      title: 'Content and Intellectual Property',
      content: 'All content on our website is protected by intellectual property laws:',
      subsections: [
        {
          id: 'ownership',
          title: 'Content Ownership',
          content: `All jewelry images, descriptions, designs, and website content are owned by ${COMPANY_INFO.name} or our licensors. This includes product photography, technical specifications, and marketing materials.`
        },
        {
          id: 'usage-rights',
          title: 'Permitted Use',
          content: 'You may view and print content for personal, non-commercial use only. You may not reproduce, distribute, modify, or create derivative works without our express written permission.'
        },
        {
          id: 'trademark',
          title: 'Trademarks',
          content: `${COMPANY_INFO.name} and our logo are trademarks. You may not use our trademarks without prior written consent.`
        }
      ]
    },
    {
      id: 'user-conduct',
      title: 'User Conduct',
      content: 'When using our services, you agree not to engage in the following prohibited activities:',
      subsections: [
        {
          id: 'prohibited-activities',
          title: 'Prohibited Activities',
          content: [
            'Harassing, abusing, or threatening other users or our staff',
            'Spamming or sending unsolicited communications',
            'Attempting to gain unauthorized access to our systems',
            'Using our services for any illegal or unauthorized purpose',
            'Interfering with or disrupting our website or servers',
            'Posting false, misleading, or defamatory content'
          ]
        },
        {
          id: 'consequences',
          title: 'Consequences of Violations',
          content: 'Violation of these conduct rules may result in warning, suspension, or permanent termination of your access to our services. We reserve the right to take appropriate legal action for serious violations.'
        }
      ]
    },
    {
      id: 'jewelry-services',
      title: 'Jewelry Products and Services',
      content: 'Specific terms related to our jewelry products and services:',
      subsections: [
        {
          id: 'product-information',
          title: 'Product Information',
          content: 'We strive to provide accurate product descriptions, but colors, sizes, and specifications may vary slightly from images due to photography and individual device displays.'
        },
        {
          id: 'custom-orders',
          title: 'Custom Design Services',
          content: 'Custom jewelry orders require advance payment and have extended delivery times. Custom pieces are non-refundable unless there are manufacturing defects.'
        },
        {
          id: 'certifications',
          title: 'Certifications and Authentication',
          content: 'All diamonds and precious stones come with appropriate certifications. We guarantee the authenticity of all materials used in our jewelry.'
        }
      ]
    },
    {
      id: 'privacy-data',
      title: 'Privacy and Data Protection',
      content: 'Your privacy is important to us:',
      subsections: [
        {
          id: 'data-collection',
          title: 'Information Collection',
          content: 'We collect personal information such as name, email, phone number, and address when you contact us or make inquiries about our products.'
        },
        {
          id: 'data-use',
          title: 'How We Use Your Information',
          content: 'Your information is used to provide services, communicate with you about orders, send updates about our collections, and improve our services.'
        },
        {
          id: 'data-protection',
          title: 'Data Security',
          content: 'We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.'
        }
      ]
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      content: 'In case of disputes:',
      subsections: [
        {
          id: 'governing-law',
          title: 'Governing Law',
          content: 'These Terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in New Delhi, India.'
        },
        {
          id: 'dispute-process',
          title: 'Resolution Process',
          content: 'We encourage resolving disputes through direct communication first. If needed, disputes may be resolved through mediation or arbitration before pursuing legal action.'
        },
        {
          id: 'limitation-liability',
          title: 'Limitation of Liability',
          content: `${COMPANY_INFO.name} shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.`
        }
      ]
    },
    {
      id: 'changes-terms',
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these Terms:',
      subsections: [
        {
          id: 'modifications',
          title: 'Updates and Modifications',
          content: 'We may update these Terms from time to time to reflect changes in our practices or for legal reasons. Changes will be effective immediately upon posting.'
        },
        {
          id: 'notification',
          title: 'Notification of Changes',
          content: 'We will notify users of significant changes through our website, email, or other appropriate means. Continued use of our services after changes constitutes acceptance of new Terms.'
        }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: [
        'If you have any questions about these Terms and Conditions, please contact us:',
        `Email: ${COMPANY_INFO.contact.email}`,
        `Phone: ${COMPANY_INFO.contact.phone}`,
        `Address: ${COMPANY_INFO.contact.address}`,
        'We will respond to your inquiries within 48 hours during business days.'
      ]
    }
  ]
}

export const privacyData: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: '2025-01-24',
  sections: [
    {
      id: 'Introduction',
      title: 'Introduction',
      content: [
        `Welcome to ${COMPANY_INFO.name}. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.`,
        'We are committed to protecting your privacy and ensuring the security of your personal information. This policy applies to all users of our website and services.'
      ]
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: 'We collect several types of information from and about users of our services:',
      subsections: [
        {
          id: 'personal-information',
          title: 'Personal Information',
          content: [
            'Name and contact information (email address, phone number)',
            'Billing and shipping addresses for orders',
            'Payment information (processed securely through third-party processors)',
            'Communication preferences and inquiry details',
            'Custom design requirements and preferences'
          ]
        },
        {
          id: 'usage-data',
          title: 'Usage Data',
          content: [
            'IP address and device information',
            'Browser type and version',
            'Pages visited and time spent on our website',
            'Referral sources and search terms used',
            'Interaction with our website features and content'
          ]
        },
        {
          id: 'cookies-tracking',
          title: 'Cookies and Tracking Technologies',
          content: 'We use cookies and similar technologies to enhance your browsing experience, analyze website usage, and provide personalized content. You can control cookie settings through your browser preferences.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: 'We use the collected information for various purposes:',
      subsections: [
        {
          id: 'service-provision',
          title: 'Service Provision',
          content: [
            'Processing and fulfilling jewelry orders and custom designs',
            'Providing customer support and responding to inquiries',
            'Communicating about order status and delivery updates',
            'Managing appointments and consultations'
          ]
        },
        {
          id: 'communication',
          title: 'Communication',
          content: [
            'Sending important updates about our services',
            'Sharing information about new collections and promotions',
            'Responding to your questions and feedback',
            'Providing newsletters and marketing content (with your consent)'
          ]
        },
        {
          id: 'improvement',
          title: 'Service Improvement',
          content: [
            'Analyzing website usage to improve user experience',
            'Developing new products and services',
            'Conducting market research and customer satisfaction surveys',
            'Ensuring website security and preventing fraud'
          ]
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      content: 'We may share your information in the following circumstances:',
      subsections: [
        {
          id: 'third-party-services',
          title: 'Third-Party Service Providers',
          content: [
            'Payment processors for secure transaction handling',
            'Shipping companies for order delivery',
            'Email service providers for communications',
            'Analytics services to understand website usage',
            'Customer support platforms'
          ]
        },
        {
          id: 'legal-requirements',
          title: 'Legal Requirements',
          content: 'We may disclose your information if required by law, court order, or government request, or to protect our rights, property, or safety, or that of others.'
        },
        {
          id: 'business-transfers',
          title: 'Business Transfers',
          content: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity as part of the business transaction.'
        }
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection and Security',
      content: 'We implement comprehensive security measures to protect your information:',
      subsections: [
        {
          id: 'security-measures',
          title: 'Security Measures',
          content: [
            'Encryption of sensitive data during transmission and storage',
            'Secure servers with regular security updates',
            'Access controls limiting who can view your information',
            'Regular security audits and vulnerability assessments',
            'Employee training on data protection practices'
          ]
        },
        {
          id: 'data-retention',
          title: 'Data Retention',
          content: 'We retain your personal information only as long as necessary for the purposes outlined in this policy or as required by law. Customer data is typically retained for 7 years for business and legal compliance purposes.'
        },
        {
          id: 'data-breach',
          title: 'Data Breach Response',
          content: 'In the unlikely event of a data breach, we will notify affected users and relevant authorities within 72 hours as required by applicable laws.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      content: 'You have several rights regarding your personal information:',
      subsections: [
        {
          id: 'access-correction',
          title: 'Access and Correction',
          content: 'You can request access to your personal data and ask us to correct any inaccurate or incomplete information. Contact us using the information provided below.'
        },
        {
          id: 'deletion',
          title: 'Data Deletion',
          content: 'You can request deletion of your personal information, subject to certain legal and business requirements. Some information may need to be retained for legal compliance.'
        },
        {
          id: 'opt-out',
          title: 'Marketing Opt-Out',
          content: 'You can unsubscribe from marketing communications at any time by clicking the unsubscribe link in emails or contacting us directly.'
        },
        {
          id: 'data-portability',
          title: 'Data Portability',
          content: 'You can request a copy of your personal data in a structured, commonly used format for transfer to another service provider.'
        }
      ]
    },
    {
      id: 'cookies-detail',
      title: 'Cookies and Tracking Technologies',
      content: 'Detailed information about our use of cookies and tracking technologies:',
      subsections: [
        {
          id: 'cookie-types',
          title: 'Types of Cookies We Use',
          content: [
            'Essential cookies: Required for website functionality',
            'Analytics cookies: Help us understand how visitors use our site',
            'Marketing cookies: Used to deliver relevant advertisements',
            'Preference cookies: Remember your settings and preferences'
          ]
        },
        {
          id: 'cookie-consent',
          title: 'Managing Cookie Preferences',
          content: 'You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality. We provide a cookie consent banner for your convenience.'
        }
      ]
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      content: 'Our services are not directed to children under 18:',
      subsections: [
        {
          id: 'age-restrictions',
          title: 'Age Requirements',
          content: 'Our website and services are intended for users aged 18 and above. We do not knowingly collect personal information from children under 18.'
        },
        {
          id: 'parental-notice',
          title: 'Parental Notice',
          content: 'If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly. Parents can contact us if they believe their child has provided personal information.'
        }
      ]
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      content: 'Information about international data handling:',
      subsections: [
        {
          id: 'data-location',
          title: 'Data Storage Location',
          content: 'Your personal information is primarily stored and processed in India. We may transfer data to other countries for processing by our service providers.'
        },
        {
          id: 'transfer-safeguards',
          title: 'Transfer Safeguards',
          content: 'When transferring data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with applicable privacy laws.'
        }
      ]
    },
    {
      id: 'policy-changes',
      title: 'Changes to This Privacy Policy',
      content: 'We may update this Privacy Policy from time to time:',
      subsections: [
        {
          id: 'updates',
          title: 'Policy Updates',
          content: 'We will notify you of any material changes to this Privacy Policy by posting the updated version on our website and updating the "Last Updated" date.'
        },
        {
          id: 'notification-methods',
          title: 'Notification Methods',
          content: 'For significant changes, we may also notify you via email or through a prominent notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy.'
        }
      ]
    }
  ]
}
