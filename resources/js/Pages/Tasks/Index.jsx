import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

function statusClass(status) {
    if (status === 'completed') return 'bg-green-100 text-green-800';
    if (status === 'in_progress') return 'bg-blue-100 text-blue-800';
    return 'bg-amber-100 text-amber-800';
}

function formatStatus(status) {
    return status.replace('_', ' ');
}

export default function Index({ auth, tasks, stats }) {
    const flash = usePage().props.flash;

    const onDelete = (taskId) => {
        if (!window.confirm('Delete this task?')) return;
        router.delete(route('tasks.destroy', taskId));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>
                    <Link
                        href={route('tasks.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                    >
                        New Task
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white shadow-sm rounded-lg p-5">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg p-5">
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg p-5">
                            <p className="text-sm text-gray-500">In Progress</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.in_progress}</p>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg p-5">
                            <p className="text-sm text-gray-500">Completed</p>
                            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {tasks.length === 0 ? (
                                <p className="text-gray-500">No tasks yet. Create your first task.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b text-left">
                                                <th className="py-3 pe-3">Title</th>
                                                <th className="py-3 px-3">Category</th>
                                                <th className="py-3 px-3">Status</th>
                                                <th className="py-3 px-3">Due Date</th>
                                                <th className="py-3 ps-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((task) => (
                                                <tr key={task.id} className="border-b">
                                                    <td className="py-3 pe-3">{task.title}</td>
                                                    <td className="py-3 px-3">
                                                        {task.category ? (
                                                            <span
                                                                className="text-white text-xs px-2 py-1 rounded"
                                                                style={{ backgroundColor: task.category.color }}
                                                            >
                                                                {task.category.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400">-</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        <span className={`text-xs px-2 py-1 rounded capitalize ${statusClass(task.status)}`}>
                                                            {formatStatus(task.status)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="py-3 ps-3 text-right space-x-3">
                                                        <Link className="text-indigo-600 hover:underline" href={route('tasks.edit', task.id)}>
                                                            Edit
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="text-red-600 hover:underline"
                                                            onClick={() => onDelete(task.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
