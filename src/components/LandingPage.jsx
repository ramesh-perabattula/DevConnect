import { Link } from "react-router-dom";

const LandingPage = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>



            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="space-y-8 animate-fade-in-up">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                            <span className="block text-white mb-2">The Professional Network</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                                Built for Developers
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Connect with talented developers, collaborate on innovative projects, and accelerate your career in tech.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
                            >
                                Get Started Free
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "10K+", label: "Active Developers" },
                            { number: "500+", label: "Companies" },
                            { number: "50K+", label: "Connections Made" },
                            { number: "1K+", label: "Projects Launched" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Powerful features designed to help developers connect, collaborate, and grow together.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Smart Matching",
                                desc: "Our AI-powered algorithm connects you with developers who share your skills, interests, and goals.",
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                gradient: "from-blue-500 to-cyan-500",
                            },
                            {
                                title: "Real-Time Chat",
                                desc: "Communicate instantly with your connections through our seamless messaging platform.",
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                ),
                                gradient: "from-purple-500 to-pink-500",
                            },
                            {
                                title: "Project Showcase",
                                desc: "Share your work, get feedback, and discover exciting projects from the community.",
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                ),
                                gradient: "from-orange-500 to-red-500",
                            },
                            {
                                title: "Skill-Based Search",
                                desc: "Find developers with specific tech stacks and expertise to complement your team.",
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                ),
                                gradient: "from-green-500 to-emerald-500",
                            },
                            {
                                title: "Career Growth",
                                desc: "Access mentorship opportunities, code reviews, and career advancement resources.",
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                ),
                                gradient: "from-indigo-500 to-blue-500",
                            },
                            {
                                title: "Privacy First",
                                desc: "Your data is secure with enterprise-grade encryption and privacy controls.",
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                                gradient: "from-pink-500 to-rose-500",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Get Started in Minutes
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Join thousands of developers building their network and advancing their careers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Create Your Profile",
                                desc: "Sign up and showcase your skills, projects, and experience.",
                            },
                            {
                                step: "02",
                                title: "Connect & Network",
                                desc: "Find and connect with developers who match your interests.",
                            },
                            {
                                step: "03",
                                title: "Collaborate & Grow",
                                desc: "Work on projects, share knowledge, and advance your career.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-2xl font-bold mb-6">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-3xl p-12">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Level Up Your Career?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join DevConnect today and start building meaningful connections with developers worldwide.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
                        >
                            Join Now - It's Free
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default LandingPage;
