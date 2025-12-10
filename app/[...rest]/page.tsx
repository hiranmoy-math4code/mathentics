import Link from 'next/link';

// ✅ এটি এখন একটি সাধারণ পেজ, তাই Edge Runtime এ চলতে কোনো সমস্যা হবে না
export const runtime = 'edge';

export default function CatchAllNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">404</h2>
            <p className="text-lg text-gray-600 mb-8">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Go back home
            </Link>
        </div>
    );
}