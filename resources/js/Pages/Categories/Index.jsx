import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';

export default function Index({ auth, categories }) {
    const flash = usePage().props.flash;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        color: '#6366f1',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => reset(),
        });
    };

    const onDelete = (id) => {
        if (!window.confirm('Delete this category?')) return;
        router.delete(route('categories.destroy', id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Create Category</h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div>
                                <InputLabel htmlFor="color" value="Color" />
                                <input
                                    id="color"
                                    type="color"
                                    className="mt-1 h-10 w-full rounded-md border-gray-300"
                                    value={data.color}
                                    onChange={(e) => setData('color', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.color} />
                            </div>
                            <div>
                                <PrimaryButton disabled={processing}>Add Category</PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Existing Categories</h3>
                        {categories.length === 0 ? (
                            <p className="text-gray-500">No categories available.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="py-3">Name</th>
                                            <th className="py-3">Color</th>
                                            <th className="py-3">Tasks</th>
                                            <th className="py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr key={category.id} className="border-b">
                                                <td className="py-3">{category.name}</td>
                                                <td className="py-3">
                                                    <span
                                                        className="inline-flex items-center px-2 py-1 rounded text-white"
                                                        style={{ backgroundColor: category.color }}
                                                    >
                                                        {category.color}
                                                    </span>
                                                </td>
                                                <td className="py-3">{category.tasks_count}</td>
                                                <td className="py-3 text-right">
                                                    <button
                                                        type="button"
                                                        className="text-red-600 hover:underline"
                                                        onClick={() => onDelete(category.id)}
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
        </AuthenticatedLayout>
    );
}
