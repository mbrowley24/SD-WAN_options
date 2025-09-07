'use client';

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { HomeIcon, UserGroupIcon, ClipboardDocumentListIcon, PhoneIcon } from '@heroicons/react/24/outline';

const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { label: 'Children', path: '/children/new', icon: UserGroupIcon },
    { label: 'Reports', path: '/', icon: ClipboardDocumentListIcon },
    { label: 'Contact', path: '/contact', icon: PhoneIcon },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-2xl font-extrabold tracking-tight">vCISO Portal</div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex space-x-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                        isActive
                                            ? 'bg-white text-indigo-600 shadow-md'
                                            : 'hover:bg-indigo-700 hover:shadow-md'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                                    isActive
                                        ? 'bg-white text-indigo-600 shadow-md'
                                        : 'hover:bg-indigo-700 hover:shadow-md'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
