import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />

            <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-6xl">
                        Educational Equity Tracker
                            {/*<span className="sm:block"> Detect Anomalies in Student Marks </span>*/}
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            This system helps identify anomalies in student marks and detect potential favouritism
                            scenarios among teachers.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                href={auth.user ? route('dashboard') : route('login')}
                                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring active:bg-blue-500 sm:w-auto mt-4"
                                style={{ minHeight: '3.5rem' }} // Ensure both buttons have the same minimum height
                            >
                                {auth.user ? 'Dashboard' : 'Log in'}
                            </a>

                            {!auth.user && (
                                <a
                                    href={route('register')}
                                    className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto mt-4"
                                    style={{ minHeight: '3.5rem' }} // Ensure both buttons have the same minimum height
                                >
                                    Register
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
