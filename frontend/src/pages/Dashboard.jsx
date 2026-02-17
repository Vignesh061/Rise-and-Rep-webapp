import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../api/axiosInstance';
import Sidebar from '../components/Sidebar';
import { FiActivity, FiUsers, FiCreditCard, FiCalendar, FiTrendingUp } from 'react-icons/fi';

export default function Dashboard() {
    const { user, isAdmin } = useAuth();
    const [stats, setStats] = useState(null);
    const [adminData, setAdminData] = useState({ users: [], memberships: [], bookings: [] });

    useEffect(() => {
        // Fetch workout stats for all users
        axiosInstance.get('/workouts/stats').then(r => setStats(r.data)).catch(() => { });

        if (isAdmin()) {
            Promise.all([
                axiosInstance.get('/auth/users'),
                axiosInstance.get('/memberships/all'),
                axiosInstance.get('/trainers/bookings/all'),
            ]).then(([u, m, b]) => {
                setAdminData({ users: u.data, memberships: m.data, bookings: b.data });
            }).catch(() => { });
        }
    }, []);

    const memberCards = [
        { icon: <FiActivity />, label: 'Total Workouts', value: stats?.total_workouts ?? '—', color: 'from-red-600 to-red-800' },
        { icon: <FiTrendingUp />, label: 'Max Weight (kg)', value: stats?.max_weight ?? '—', color: 'from-green-500 to-emerald-600' },
        { icon: <FiCalendar />, label: 'Exercises', value: stats?.exercises?.length ?? '—', color: 'from-red-500 to-orange-600' },
        { icon: <FiCreditCard />, label: 'Total Sets', value: stats?.total_sets ?? '—', color: 'from-orange-500 to-red-500' },
    ];

    const adminCards = [
        { icon: <FiUsers />, label: 'Total Members', value: adminData.users.length, color: 'from-red-600 to-red-800' },
        { icon: <FiCreditCard />, label: 'Memberships', value: adminData.memberships.length, color: 'from-green-500 to-emerald-600' },
        { icon: <FiCalendar />, label: 'Bookings', value: adminData.bookings.length, color: 'from-red-500 to-orange-600' },
    ];

    return (
        <div className="flex pt-16 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-10 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome back, <span className="gradient-text">{user?.name}</span>
                    </h1>
                    <p className="text-slate-400 mt-1">
                        {isAdmin() ? 'Admin Dashboard — manage your gym' : "Here's an overview of your fitness journey"}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {(isAdmin() ? adminCards : memberCards).map((c, i) => (
                        <div key={i} className="glass rounded-2xl p-5 card-hover">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-3`}>
                                {c.icon}
                            </div>
                            <p className="text-2xl font-bold text-white">{c.value}</p>
                            <p className="text-sm text-slate-400">{c.label}</p>
                        </div>
                    ))}
                </div>

                {/* Admin tables */}
                {isAdmin() && (
                    <>
                        {/* Users Table */}
                        <div className="glass rounded-2xl p-6 mb-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiUsers /> All Members</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-slate-500 border-b border-gym-border">
                                            <th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Email</th><th className="pb-3">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adminData.users.map((u) => (
                                            <tr key={u._id} className="border-b border-gym-border/50 hover:bg-white/5 transition-colors">
                                                <td className="py-3 pr-4 text-white">{u.name}</td>
                                                <td className="py-3 pr-4 text-slate-400">{u.email}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${u.role === 'admin' ? 'bg-red-600/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {adminData.users.length === 0 && <tr><td colSpan={3} className="py-6 text-center text-slate-500">No members yet</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bookings Table */}
                        <div className="glass rounded-2xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><FiCalendar /> All Bookings</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-slate-500 border-b border-gym-border">
                                            <th className="pb-3 pr-4">Trainer</th><th className="pb-3 pr-4">Date</th><th className="pb-3 pr-4">Time</th><th className="pb-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {adminData.bookings.map((b) => (
                                            <tr key={b._id} className="border-b border-gym-border/50 hover:bg-white/5 transition-colors">
                                                <td className="py-3 pr-4 text-white">{b.trainer_name}</td>
                                                <td className="py-3 pr-4 text-slate-400">{b.date}</td>
                                                <td className="py-3 pr-4 text-slate-400">{b.time_slot}</td>
                                                <td className="py-3"><span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-500/20 text-green-400">{b.status}</span></td>
                                            </tr>
                                        ))}
                                        {adminData.bookings.length === 0 && <tr><td colSpan={4} className="py-6 text-center text-slate-500">No bookings yet</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Member recent exercises */}
                {!isAdmin() && stats && stats.exercises.length > 0 && (
                    <div className="glass rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Your Exercises</h2>
                        <div className="flex flex-wrap gap-2">
                            {stats.exercises.map((ex) => (
                                <span key={ex} className="px-3 py-1.5 rounded-xl bg-white/5 border border-gym-border text-sm text-slate-300">{ex}</span>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
