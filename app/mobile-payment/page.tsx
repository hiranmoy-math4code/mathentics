import { Metadata } from 'next';
import MobilePaymentClient from './client';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'Secure Payment Redirect',
    referrer: 'strict-origin-when-cross-origin', // Ensure Referer is sent
    robots: {
        index: false,
        follow: false,
    },
};

export default function MobilePaymentPage() {
    return (
        <>
            <meta name="referrer" content="strict-origin-when-cross-origin" />
            <MobilePaymentClient />
        </>
    );
}
