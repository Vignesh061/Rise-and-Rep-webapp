import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FiActivity, FiUsers, FiCreditCard, FiTrendingUp, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function Home() {
    const { user } = useAuth();

    const features = [
        { icon: <FiActivity size={28} />, title: 'Workout Tracking', desc: 'Log exercises, sets, reps and weight. Track your progress over time.' },
        { icon: <FiUsers size={28} />, title: 'Trainer Booking', desc: 'Book sessions with certified trainers tailored to your fitness goals.' },
        { icon: <FiCreditCard size={28} />, title: 'Membership Plans', desc: 'Flexible plans from Basic to Premium with exclusive perks.' },
        { icon: <FiTrendingUp size={28} />, title: 'Progress Insights', desc: 'Get stats and recommendations to optimise your workouts.' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="hero-gradient min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
                {/* Blobs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/15 rounded-full blur-3xl animate-pulse-blob" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse-blob" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm text-gray-300">Now open — limited memberships available</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
                        <span className="gradient-text">Rise</span> and <span className="gradient-text">Rep</span>
                        <br />
                        <span className="text-white">Your Way Up</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Your ultimate gym companion — track workouts, manage memberships, book elite trainers, and crush every rep.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {user ? (
                            <Link to="/dashboard" className="px-8 py-4 rounded-2xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 hover:shadow-2xl hover:shadow-red-600/30 transition-all flex items-center gap-2">
                                Go to Dashboard <FiArrowRight />
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="px-8 py-4 rounded-2xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 hover:shadow-2xl hover:shadow-red-600/30 transition-all flex items-center gap-2">
                                    Start Free Trial <FiArrowRight />
                                </Link>
                                <Link to="/login" className="px-8 py-4 rounded-2xl border border-gray-600 text-gray-300 font-semibold hover:bg-white/5 transition-all">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {[['10K+', 'Members'], ['50+', 'Trainers'], ['99%', 'Satisfaction']].map(([num, label]) => (
                            <div key={label}>
                                <p className="text-3xl font-bold gradient-text">{num}</p>
                                <p className="text-sm text-gray-400">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to <span className="gradient-text">Dominate</span></h2>
                        <p className="text-gray-400 max-w-xl mx-auto">Powerful tools to track, train, and transform your fitness journey.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="glass rounded-2xl p-6 card-hover group">
                                <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-sm text-gray-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans preview */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Choose Your <span className="gradient-text">Plan</span></h2>
                    <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Simple, transparent pricing. No hidden fees. Cancel anytime.</p>

                    <div className="grid sm:grid-cols-3 gap-6">
                        {[
                            { name: 'Basic', price: '$29.99', perks: ['Gym access', 'Locker room', 'Basic tracking'] },
                            { name: 'Standard', price: '$49.99', perks: ['Everything in Basic', 'Group classes', 'Sauna access'], popular: true },
                            { name: 'Premium', price: '$79.99', perks: ['Everything in Standard', 'Personal trainer', 'Nutrition plan'] },
                        ].map((plan) => (
                            <div key={plan.name} className={`glass rounded-2xl p-6 card-hover relative ${plan.popular ? 'border-red-600/50 ring-1 ring-red-600/30' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-red-600 text-xs font-bold text-white">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-3xl font-black gradient-text mb-1">{plan.price}</p>
                                <p className="text-xs text-gray-500 mb-4">per month</p>
                                <ul className="space-y-2 mb-6">
                                    {plan.perks.map((p) => (
                                        <li key={p} className="flex items-center gap-2 text-sm text-gray-300">
                                            <FiCheckCircle className="text-red-500 flex-shrink-0" size={14} /> {p}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/register" className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${plan.popular ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25' : 'border border-gray-600 text-gray-300 hover:bg-white/5'}`}>
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gym-border py-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Rise-and-Rep. All rights reserved.</p>
            </footer>
        </div>
    );
}
