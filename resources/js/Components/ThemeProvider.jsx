// resources/js/Components/ThemeProvider.jsx
import { useEffect, useState } from 'react';
import {usePage} from "@inertiajs/react";

export default function ThemeProvider() {
    const [isDark, setIsDark] = useState(false);
    const translations = usePage().props.translations;

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            applyTheme(true);
        } else if (saved === 'light') {
            applyTheme(false);
        } else {
            applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    function applyTheme(dark) {
        setIsDark(dark);
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }

    function toggleTheme() {
        applyTheme(!isDark);
    }

    return (
        <button
            onClick={toggleTheme}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition"
        >
            {isDark ? '🌙 ' + translations.dark_mode : '☀️ '+translations.light_mode}
        </button>
    );
}
