import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';

export default function Dashboard() {
    const translations = usePage().props.translations;

    let authenticatedLayout = <><AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                {translations.dashboard}
            </h2>
        }
    >
        <Head title={translations.dashboard}/>

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <a href={route('set.locale', 'en')}>English
                        </a><br/>

                            <a href={route('set.locale', 'ru')}>Русский</a><br/>
                            <a href={route('set.locale', 'zh')}>中文</a><br/>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout></>
;
return authenticatedLayout}
