import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ThemeProvider from '@/Components/ThemeProvider';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState,useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const role = usePage().props.auth;
    const translations = usePage().props.translations;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const channel = window.Echo.join('online-users')
            .here(users => {
                setOnlineUsers(users);
            })
            .joining(user => {
                setOnlineUsers(prev => {
                    if (!prev.some(u => u.id === user.id)) {
                        return [...prev, user];
                    }
                    return prev;
                });
            })
            .leaving(user => {
                console.log('User left:', user);
                setOnlineUsers(prev => prev.filter(u => u.id !== user.id));
            });
        const handleUnload = () => {
            navigator.sendBeacon('/user-offline', JSON.stringify({ user_id: user.id }));
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            window.Echo.leave('online-users');
        };
    }, []);
    return (
        <div
            className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <nav className="border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo
                                        className="block h-9 w-auto fill-current text-gray-800 dark:text-white"/>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={role.is_admin ? route('admin.dashboard.index') : route('dashboard')}
                                    active={role.is_admin ? route().current('admin.dashboard.index') : route().current('dashboard')}
                                    className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {translations.dashboard}
                                </NavLink>
                                {role.is_admin && (
                                    <NavLink
                                        href={route('admin.requests.index')}
                                        active={route().current('admin.requests.index')}
                                        className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {translations.requests}
                                    </NavLink>
                                )}
                                {role.is_admin && (
                                    <NavLink
                                        href={route('admin.logs.index')}
                                        active={route().current('admin.logs.index')}
                                        className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {translations.logs}
                                    </NavLink>
                                )}{role.is_admin && (
                                <NavLink
                                    href={route('admin.users.index')}
                                    active={route().current('admin.users.index')}
                                    className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {translations.users}
                                </NavLink>
                            )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white focus:outline-none transition"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            {translations.profile}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            {translations.logout}

                                        </Dropdown.Link>

                                        <div className="mt-2">
                                            <ThemeProvider/>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={role.is_admin ? route('admin.dashboard.index') : route('admin.dashboard.index')}
                            active={role.is_admin ? route().current('admin.dashboard.index') : route().current('admin.dashboard.index')}
                        >
                            {translations.dashboard}
                        </ResponsiveNavLink>
                        {role.is_admin && (<ResponsiveNavLink
                                href={route('admin.requests.index')}
                                active={route().current('admin.requests.index')}
                            >
                                {translations.requests}

                            </ResponsiveNavLink>
                        )} {role.is_admin && (<ResponsiveNavLink
                            href={route('admin.logs.index')}
                            active={route().current('admin.logs.index')}
                        >
                            {translations.logs}

                        </ResponsiveNavLink>
                    )}
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                {translations.profile}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                {translations.logout}

                            </ResponsiveNavLink>

                            <ThemeProvider/>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                {typeof children === 'function' ? children({onlineUsers}) : children}
            </main>
        </div>
    );
}
