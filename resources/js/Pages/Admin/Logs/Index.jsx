import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, usePage} from '@inertiajs/react';


export default function Requests({ mustVerifyEmail, status }) {
    const translations = usePage().props.translations;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {translations.logs}

                </h2>
            }
        >
            <Head title={translations.logs}/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <iframe
                                src="/log-viewer"
                                className="w-full h-[90vh] border-none"
                            />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
