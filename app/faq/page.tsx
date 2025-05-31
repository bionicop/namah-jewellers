import { Card, CardContent } from "@/components/ui/card";
import { Crown, Diamond, Sparkles, HelpCircle } from "lucide-react";

export default function FAQs() {
    const faqs = [
        {
            question: "What is your jewelry return policy?",
            answer: "We offer a comprehensive 30-day return policy for all our jewelry pieces. Items must be in original condition with certificates and packaging.",
            details: [
                "Contact our customer service team within 30 days of purchase",
                "Returns are processed within 5-7 business days",
                "Custom pieces require approval before return",
                "Original certificates and packaging must be included"
            ]
        },
        {
            question: "Are your diamonds certified?",
            answer: "Yes, all our diamonds come with internationally recognized certifications from GIA, IGI, or SGL labs, ensuring authenticity and quality.",
            details: [
                "Each diamond includes a detailed certificate",
                "Certification covers cut, clarity, color, and carat weight",
                "Digital certificates available for verification"
            ]
        },
        {
            question: "Do you offer custom jewelry design?",
            answer: "Absolutely! We specialize in creating bespoke jewelry pieces tailored to your vision and preferences.",
            details: [
                "Free consultation with our master craftsmen",
                "3D design preview before production",
                "4-6 weeks production time for custom pieces",
                "Lifetime warranty on custom creations"
            ]
        },
        {
            question: "What are your warranty terms?",
            answer: "We provide a comprehensive warranty covering manufacturing defects and offer lifetime maintenance services for all our pieces.",
            details: [
                "1-year warranty against manufacturing defects",
                "Lifetime free cleaning and inspection",
                "Stone replacement guarantee for 6 months",
                "Free resizing within the first year"
            ]
        },
        {
            question: "How do you ensure jewelry authenticity?",
            answer: "Every piece comes with a certificate of authenticity, detailed documentation, and our guarantee of genuine materials and craftsmanship.",
            details: [
                "Hallmarked gold and platinum",
                "Certified diamonds and gemstones",
                "Detailed authenticity certificates",
                "Blockchain-verified provenance tracking"
            ]
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major payment methods including credit cards, bank transfers, and offer flexible EMI options for your convenience.",
            details: [
                "All major credit and debit cards",
                "Net banking and UPI payments",
                "0% EMI options available",
                "Bank transfer with special discounts"
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <HelpCircle className="h-16 w-16 text-primary" />
                            <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-primary animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                            Frequently Asked
                        </span>
                        <br />
                        <span className="text-secondary">Questions</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Find answers to common questions about our
                        <span className="text-primary font-semibold"> luxury jewelry collection</span>,
                        services, and policies. Can't find what you're looking for?
                        <span className="text-primary font-semibold"> Contact our experts</span>.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid gap-8 md:gap-12">
                    {faqs.map((faq, index) => (
                        <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                                            <Diamond className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                                            {faq.question}
                                        </h3>
                                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                            {faq.answer}
                                        </p>

                                        {faq.details && (
                                            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border-l-4 border-primary">
                                                <ul className="space-y-3">
                                                    {faq.details.map((detail, detailIndex) => (
                                                        <li key={detailIndex} className="flex items-start gap-3 text-gray-700">
                                                            <Crown className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                                            <span>{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-primary to-primary rounded-2xl p-8 text-white">
                        <div className="flex justify-center mb-4">
                            <Sparkles className="h-12 w-12" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-lg mb-6 opacity-90">
                            Our jewelry experts are here to help you find the perfect piece or answer any questions you may have.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-100 hover:border-primary/20"
                            >
                                Contact Our Experts
                            </a>
                            <a
                                href="tel:+91-1234567890"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                            >
                                Call Us Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
