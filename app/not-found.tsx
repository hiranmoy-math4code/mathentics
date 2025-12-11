import Link from 'next/link'

// Force static rendering for not-found page
export const dynamic = 'force-static';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-gray-900">
            <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
            <p className="mb-6 text-gray-600">Could not find the requested resource.</p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Return Home
            </Link>
        </div>
    )
}
