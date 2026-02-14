import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    const cards = [
        { label: 'Total Tasks', value: stats?.totalTasks ?? 0, className: 'text-gray-900' },
        { label: 'Pending', value: stats?.pendingTasks ?? 0, className: 'text-amber-600' },
        { label: 'In Progress', value: stats?.inProgressTasks ?? 0, className: 'text-blue-600' },
        { label: 'Completed', value: stats?.completedTasks ?? 0, className: 'text-green-600' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cards.map((card) => (
                            <div key={card.label} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <p className={`text-3xl font-bold ${card.className}`}>{card.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex gap-3">
                        <Link
                            href={route('tasks.index')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                        >
                            Manage Tasks
                        </Link>
                        <Link
                            href={route('categories.index')}
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-900"
                        >
                            Manage Categories
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
