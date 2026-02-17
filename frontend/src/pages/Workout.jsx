import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import Sidebar from '../components/Sidebar';
import WorkoutCard from '../components/WorkoutCard';
import { FiPlus, FiX } from 'react-icons/fi';

export default function Workout() {
    const [workouts, setWorkouts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ exercise: '', sets: '', reps: '', weight: '', notes: '' });
    const [loading, setLoading] = useState(false);

    const fetchWorkouts = async () => {
        try {
            const { data } = await axiosInstance.get('/workouts');
            setWorkouts(data);
        } catch { }
    };

    useEffect(() => { fetchWorkouts(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/workouts', form);
            setForm({ exercise: '', sets: '', reps: '', weight: '', notes: '' });
            setShowForm(false);
            fetchWorkouts();
        } catch { }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/workouts/${id}`);
            fetchWorkouts();
        } catch { }
    };

    return (
        <div className="flex pt-16 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-10 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Workouts</h1>
                        <p className="text-slate-400 mt-1">Track and manage your exercises</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 transition-all"
                    >
                        {showForm ? <FiX /> : <FiPlus />}
                        {showForm ? 'Cancel' : 'Add Workout'}
                    </button>
                </div>

                {/* Add Form */}
                {showForm && (
                    <div className="glass rounded-2xl p-6 mb-8">
                        <h2 className="text-lg font-semibold text-white mb-4">New Workout</h2>
                        <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-slate-400 mb-1 block">Exercise</label>
                                <input type="text" value={form.exercise} onChange={(e) => setForm({ ...form, exercise: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gym-border text-white text-sm" placeholder="e.g. Bench Press" required />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 mb-1 block">Sets</label>
                                <input type="number" value={form.sets} onChange={(e) => setForm({ ...form, sets: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gym-border text-white text-sm" placeholder="4" required min="1" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 mb-1 block">Reps</label>
                                <input type="number" value={form.reps} onChange={(e) => setForm({ ...form, reps: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gym-border text-white text-sm" placeholder="10" required min="1" />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400 mb-1 block">Weight (kg)</label>
                                <input type="number" step="0.5" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gym-border text-white text-sm" placeholder="60" required min="0" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-sm text-slate-400 mb-1 block">Notes (optional)</label>
                                <input type="text" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gym-border text-white text-sm" placeholder="Felt great today!" />
                            </div>
                            <div className="sm:col-span-2">
                                <button type="submit" disabled={loading}
                                    className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 transition-all disabled:opacity-50">
                                    {loading ? 'Adding…' : 'Add Workout'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Workout Grid */}
                {workouts.length === 0 ? (
                    <div className="glass rounded-2xl p-12 text-center">
                        <p className="text-slate-400 text-lg">No workouts yet. Add your first workout to get started!</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {workouts.map((w) => (
                            <WorkoutCard key={w._id} workout={w} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
