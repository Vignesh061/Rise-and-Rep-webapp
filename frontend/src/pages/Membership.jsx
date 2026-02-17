import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import Sidebar from '../components/Sidebar';
import { FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';

export default function Membership() {
    const [membership, setMembership] = useState(null);
    const [plans, setPlans] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axiosInstance.get('/memberships').then(r => setMembership(r.data)).catch(() => { });
        axiosInstance.get('/memberships/plans').then(r => setPlans(r.data)).catch(() => { });
    }, []);

    const subscribe = async (plan) => {
        setLoading(true);
        setMessage('');
        try {
            await axiosInstance.post('/memberships', { plan });
            const { data } = await axiosInstance.get('/memberships');
            setMembership(data);
            setMessage(`Successfully subscribed to ${plan} plan!`);
        } catch {
            setMessage('Failed to subscribe. Try again.');
        }
        setLoading(false);
    };

    const isActive = membership && membership.status === 'active';

    return (
        <div className="flex pt-16 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-10 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Membership</h1>
                    <p className="text-slate-400 mt-1">Manage your gym membership plan</p>
                </div>

                {message && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                        {message}
                    </div>
                )}

                {/* Current Membership */}
                {isActive && (
                    <div className="glass rounded-2xl p-6 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FiCheckCircle className="text-green-400" size={24} />
                            <h2 className="text-xl font-semibold text-white">Active Membership</h2>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Plan</p>
                                <p className="text-lg font-bold gradient-text capitalize">{membership.plan}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Started</p>
                                <p className="text-lg font-semibold text-white">{new Date(membership.start_date).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Expires</p>
                                <p className="text-lg font-semibold text-white flex items-center gap-2">
                                    <FiClock className="text-yellow-400" size={16} />
                                    {new Date(membership.expiry_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {!isActive && membership?.message !== 'No active membership' && membership?.status === 'expired' && (
                    <div className="glass rounded-2xl p-6 mb-8 border border-yellow-500/30">
                        <div className="flex items-center gap-3">
                            <FiAlertTriangle className="text-yellow-400" size={24} />
                            <div>
                                <h2 className="text-lg font-semibold text-white">Membership Expired</h2>
                                <p className="text-sm text-slate-400">Your membership has expired. Subscribe to a new plan below.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Plans Grid */}
                <h2 className="text-xl font-bold text-white mb-4">Available Plans</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                    {Object.entries(plans).map(([key, plan]) => (
                        <div key={key} className={`glass rounded-2xl p-6 card-hover relative ${key === 'standard' ? 'border-red-600/50 ring-1 ring-red-600/30' : ''}`}>
                            {key === 'standard' && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-red-600 text-xs font-bold text-white">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white capitalize mb-1">{key}</h3>
                            <p className="text-3xl font-black gradient-text mb-1">${plan.price}</p>
                            <p className="text-xs text-slate-500 mb-4">{plan.duration} days</p>
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                                        <FiCheckCircle className="text-green-400 flex-shrink-0" size={14} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => subscribe(key)}
                                disabled={loading || (isActive && membership.plan === key)}
                                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 ${key === 'standard'
                                    ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25'
                                    : 'border border-slate-600 text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {isActive && membership.plan === key ? 'Current Plan' : 'Subscribe'}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
