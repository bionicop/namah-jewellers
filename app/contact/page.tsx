'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { COMPANY_INFO, INQUIRY_TYPES } from '@/lib/constants'
import { ContactFormData, FormResponse } from '@/app/data/types'

const SOCIAL_LINKS = [
  { href: COMPANY_INFO.contact.whatsapp, bg: 'bg-green-500', title: 'WhatsApp', subtitle: COMPANY_INFO.contact.phone, extra: 'Quick responses', icon: "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" },
  { href: COMPANY_INFO.social.instagram, bg: 'bg-gradient-to-r from-purple-500 to-pink-500', title: 'Instagram', subtitle: '@namahjewellers', extra: 'Latest collections', icon: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" },
  { href: COMPANY_INFO.social.facebook, bg: 'bg-blue-600', title: 'Facebook', subtitle: COMPANY_INFO.name, extra: 'Community updates', icon: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" }
]

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', inquiryType: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<FormResponse | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponse(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      if (!formData.name || !formData.email || !formData.message || !formData.inquiryType) {
        throw new Error('Please fill in all required fields')
      }
      setResponse({ success: true, message: `Thank you, ${formData.name}! Your ${INQUIRY_TYPES.find(t => t.id === formData.inquiryType)?.label.toLowerCase()} has been received.` })
      setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' })
    } catch (error) {
      setResponse({ success: false, message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50/30 via-white to-amber-50/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Have a question about our jewelry or need assistance? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-8 border-amber-200/50 bg-gradient-to-br from-white to-amber-50/30 shadow-xl">
              <h2 className="text-3xl font-semibold text-amber-600 mb-6">📞 Connect With Us</h2>
              <div className="space-y-4">
                {SOCIAL_LINKS.map(({ href, bg, title, subtitle, extra, icon }, i) => (
                  <Link key={i} href={href} target="_blank" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all group">
                    <div className={`${bg} p-2 rounded-full text-white group-hover:scale-110 transition-transform`}>
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d={icon}/></svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{title}</p>
                      <p className="text-sm text-gray-600">{subtitle}</p>
                      <p className="text-xs text-green-600">{extra}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-amber-200/50 bg-gradient-to-br from-white to-amber-50/30 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-full">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-amber-700">Business Hours</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-700">{COMPANY_INFO.businessHours.weekdays}</span>
                  </div>
                  <span className="text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">{COMPANY_INFO.businessHours.hours}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">{COMPANY_INFO.businessHours.closed}</span>
                  </div>
                  <span className="text-red-700 font-semibold bg-red-100 px-3 py-1 rounded-full text-sm">Closed</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="p-8 border-amber-200/50 bg-gradient-to-br from-white to-amber-50/20 shadow-xl">
              <h2 className="text-3xl font-semibold text-amber-600 mb-6">✉️ Send us a message</h2>

              {response && (
                <div className={`p-4 rounded-lg mb-6 border flex items-center gap-2 ${response.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  <span className="text-lg">{response.success ? '✅' : '❌'}</span>
                  <p className="font-medium">{response.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div><Label htmlFor="name">Full Name *</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} required className="border-amber-200 focus:border-amber-500 h-12" placeholder="Your full name" /></div>
                  <div><Label htmlFor="email">Email Address *</Label><Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="border-amber-200 focus:border-amber-500 h-12" placeholder="your.email@example.com" /></div>
                </div>

                <div><Label htmlFor="phone">Phone Number (Optional)</Label><Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="border-amber-200 focus:border-amber-500 h-12" placeholder="+91 XXXXX XXXXX" /></div>

                <div>
                  <Label>What can we help you with? *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {INQUIRY_TYPES.map((type) => (
                      <button key={type.id} type="button" onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.id }))} className={`p-3 rounded-lg border-2 transition-all hover:scale-105 text-left ${formData.inquiryType === type.id ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-gray-200 hover:border-amber-300'}`}>
                        <div className="text-xl mb-1">{type.icon}</div>
                        <div className="text-xs font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div><Label htmlFor="message">Your Message *</Label><Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} required className="border-amber-200 focus:border-amber-500" placeholder="Tell us more about your inquiry..." /></div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 font-semibold h-12 shadow-lg hover:shadow-xl">
                  {isSubmitting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Sending...</> : <>Send Message 📤</>}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
