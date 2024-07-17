import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10  shadow sm:rounded-lg flex justify-center flex-1 bg-gray-900">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-4xl">
                            Log in
                        </h1>
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                        <div className="w-full flex-1 mt-8">

                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block bg-gray-900 text-sm text-gray-200 tracking-wide font-medium  transform translate-y-1/2">
                                    Log in with e-mail
                                </div>
                            </div>

                            <form onSubmit={submit} className="mx-auto max-w-xs">
                                <div>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:bg-white mt-5"
                                        type="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4 text-gray-200">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-200">Remember me</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3 bg-">
                                        Log in
                                        </span>
                                    </button>
                                </div><br></br>
                                    {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="underline text-sm text-gray-200 hover:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Forgot your password?
                                            </Link>
                                    )}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex-1  text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/images/AI.png')" }}>
                    </div>
                </div>
            </div>
        </div>
    );
}
