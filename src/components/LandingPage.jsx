import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-base-200 text-base-content font-sans">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-sm px-4 sm:px-8">
                <div className="flex-1">
                    <span className="text-xl font-bold tracking-tight text-primary">DevConnect</span>
                </div>
                <div className="flex-none gap-2">
                    <Link to="/login" className="btn btn-ghost hover:bg-base-200">Login</Link>
                    <Link to="/signup" className="btn btn-primary text-white">Join Now</Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="hero min-h-[70vh] bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                            Connect with <span className="text-primary">Real Developers</span>
                        </h1>
                        <p className="py-6 text-xl opacity-80 leading-relaxed mb-8">
                            No buzzwords, no complicated algorithms. Just a simple, human-centric place to find developers, share your work, and grow your network authentically.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/signup" className="btn btn-primary btn-lg text-white px-8">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-outline btn-lg px-8 hover:bg-base-300 hover:text-base-content">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-4 bg-base-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">Simple by Design</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card bg-base-200 shadow-xl border border-base-300">
                            <div className="card-body">
                                <div className="mb-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-xl mb-2">Meaningful Connections</h3>
                                <p className="opacity-80">Find developers based on shared skills and genuine interests, not just metrics.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="card bg-base-200 shadow-xl border border-base-300">
                            <div className="card-body">
                                <div className="mb-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-xl mb-2">Project Showcase</h3>
                                <p className="opacity-80">Share your latest work in a clean, distraction-free environment aimed at feedback.</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="card bg-base-200 shadow-xl border border-base-300">
                            <div className="card-body">
                                <div className="mb-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-xl mb-2">Direct Communication</h3>
                                <p className="opacity-80">Chat directly with peers. No gatekeepers, just developers talking to developers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer footer-center p-10 bg-base-300 text-base-content">
                <div>
                    <p className="text-lg font-semibold">DevConnect</p>
                    <p className="opacity-70">Built for individuals, by individuals.</p>
                    <p className="text-sm opacity-50 mt-2">© {new Date().getFullYear()} DevConnect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
