import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect } from 'react';
export default function UsersIndex({ users,onlineUsers }) {
    const translations = usePage().props.translations;
    useEffect(() => {
        console.log('✅ onlineUsers changed:', onlineUsers);
    }, [onlineUsers]);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {translations.logs}
                </h2>
            }
        >
            {({ onlineUsers }) => (
                <>
                    <Head title={translations.users} />

                    <div className="py-12">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white dark:bg-gray-900 shadow-sm sm:rounded-lg">
                                <div className="p-4">
                                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{translations.users}</h1>

                                    <table className="w-full border border-gray-300 dark:border-gray-600">
                                        <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700">
                                            <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left">{translations.name}</th>
                                            <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left">{translations.email}</th>
                                            <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left">Role</th>
                                            <th className="p-2 border-b border-gray-300 dark:border-gray-600 text-left">{translations.status}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.data.map(user => (
                                            <tr
                                                key={user.id}
                                                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                                            >
                                                <td className="p-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.name}</td>
                                                <td className="p-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.email}</td>
                                                <td className="p-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{user.role ?? '-------'}</td>
                                                <td className="p-2 border-b border-gray-300 dark:border-gray-600">
                                                    <span className={
                                                        onlineUsers.some(u => u.id === user.id)
                                                            ? 'text-green-600 dark:text-green-400 font-semibold'
                                                            : 'text-gray-700 dark:text-gray-400'
                                                    }>
                                                        {onlineUsers.some(u => u.id === user.id) ? 'Online' : 'Offline'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                    <div className="mt-4 flex gap-2">
                                        {users.links.map(link => (
                                            <Link
                                                key={link.label}
                                                href={link.url || '#'}
                                                dangerouslySetInnerHTML={{__html: link.label}}
                                                className={`px-3 py-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
