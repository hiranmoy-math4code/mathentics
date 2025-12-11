import Link from 'next/link'

export const runtime = 'edge'

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">Could not find the requested resource.</p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Return Home
            </Link>
        </div>
    )
}