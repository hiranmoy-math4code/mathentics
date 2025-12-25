import { AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getDaysUntilExpiry } from '@/lib/responseCleanup';

interface ResponseExpiryWarningProps {
    submittedAt: string | Date;
}

export function ResponseExpiryWarning({ submittedAt }: ResponseExpiryWarningProps) {
    const daysRemaining = getDaysUntilExpiry(submittedAt);

    // Expired - no answers available
    if (daysRemaining === 0) {
        return (
            <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Response Review Period Expired</AlertTitle>
                <AlertDescription>
                    Your selected answers have been automatically deleted after 30 days.
                    You can still view your results and question analysis.
                </AlertDescription>
            </Alert>
        );
    }

    // Urgent - less than 7 days remaining
    if (daysRemaining <= 7) {
        return (
            <Alert className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <AlertTitle className="text-orange-900 dark:text-orange-400">
                    ⚠️ Review Your Answers Soon
                </AlertTitle>
                <AlertDescription className="text-orange-800 dark:text-orange-300">
                    You have <strong>{daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}</strong> remaining to review your selected answers.
                    After that, only results and analysis will be available.
                </AlertDescription>
            </Alert>
        );
    }

    // Active - more than 7 days remaining
    return (
        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
            <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-900 dark:text-blue-400">
                Review Period Active
            </AlertTitle>
            <AlertDescription className="text-blue-800 dark:text-blue-300">
                You can review your answers for the next <strong>{daysRemaining} days</strong>.
                After 30 days, selected answers will be automatically removed.
            </AlertDescription>
        </Alert>
    );
}
