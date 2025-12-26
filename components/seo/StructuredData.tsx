import React from 'react'

interface OrganizationSchemaProps {
    name?: string
    url?: string
    logo?: string
    description?: string
}

export function OrganizationSchema({
    name = 'Mathentics',
    url = 'https://www.mathentics.com',
    logo = 'https://www.mathentics.com/mathentics-logo-new.png',
    description = 'Online learning platform for mathematics and competitive exam preparation'
}: OrganizationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name,
        url,
        logo,
        description,
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN'
        },
        sameAs: [
            // Add social media links here when available
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface CourseSchemaProps {
    name: string
    description: string
    provider?: string
    instructor?: string
    price?: number
    currency?: string
    image?: string
    url?: string
}

export function CourseSchema({
    name,
    description,
    provider = 'Mathentics',
    instructor,
    price,
    currency = 'INR',
    image,
    url
}: CourseSchemaProps) {
    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name,
        description,
        provider: {
            '@type': 'Organization',
            name: provider
        }
    }

    if (instructor) {
        schema.instructor = {
            '@type': 'Person',
            name: instructor
        }
    }

    if (price !== undefined) {
        schema.offers = {
            '@type': 'Offer',
            price: price.toString(),
            priceCurrency: currency
        }
    }

    if (image) {
        schema.image = image
    }

    if (url) {
        schema.url = url
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface BreadcrumbItem {
    name: string
    url: string
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface FAQItem {
    question: string
    answer: string
}

interface FAQSchemaProps {
    faqs: FAQItem[]
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
