import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, usePage} from '@inertiajs/react';


export default function Requests({ mustVerifyEmail, status }) {
    const translations = usePage().props.translations;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {translations.requests}

                </h2>
            }
        >
            <Head title={translations.requests}/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <iframe
                                src="/telescope"
                                className="w-full h-[90vh] border-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
