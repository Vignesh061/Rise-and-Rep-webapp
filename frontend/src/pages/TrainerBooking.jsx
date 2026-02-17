import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import Sidebar from '../components/Sidebar';
import TrainerCard from '../components/TrainerCard';
import { FiX, FiCalendar, FiClock } from 'react-icons/fi';

export default function TrainerBooking() {
    const [trainers, setTrainers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [form, setForm] = useState({ date: '', time_slot: '' });
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const [t, b] = await Promise.all([
                axiosInstance.get('/trainers'),
                axiosInstance.get('/trainers/bookings'),
            ]);
            setTrainers(t.data);
            setBookings(b.data);
        } catch { }
    };

    useEffect(() => { fetchData(); }, []);

    const handleBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/trainers/book', {
                trainer_id: selectedTrainer._id,
                date: form.date,
                time_slot: form.time_slot,
            });
            setSelectedTrainer(null);
            setForm({ date: '', time_slot: '' });
            fetchData();
        } catch { }
        setLoading(false);
    };

    const timeSlots = ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

    return (
        <div className="flex pt-16 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-10 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Book a Trainer</h1>
                    <p className="text-slate-400 mt-1">Browse our expert trainers and book a session</p>
                </div>

                {/* Booking Modal */}
                {selectedTrainer && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                        <div className="glass rounded-3xl p-8 max-w-md w-full relative">
                            <button onClick={() => setSelectedTrainer(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                                <FiX size={20} />
                            </button>
                            <h2 className="text-xl font-bold text-white mb-1">Book {selectedTrainer.name}</h2>
                            <p className="text-sm text-red-400 mb-6">{selectedTrainer.specialty}</p>

                            <form onSubmit={handleBook} className="space-y-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-1"><FiCalendar size={14} /> Date</label>
                                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gym-border text-white text-sm" required />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block flex items-center gap-1"><FiClock size={14} /> Time Slot</label>
                                    <select value={form.time_slot} onChange={(e) => setForm({ ...form, time_slot: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gym-border text-white text-sm" required>
                                        <option value="">Select a time</option>
                                        {timeSlots.map((t) => (<option key={t} value={t}>{t}</option>))}
                                    </select>
                                </div>
                                <button type="submit" disabled={loading}
                                    className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 transition-all disabled:opacity-50">
                                    {loading ? 'Booking…' : 'Confirm Booking'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Trainers Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {trainers.map((t) => (
                        <TrainerCard key={t._id} trainer={t} onBook={setSelectedTrainer} />
                    ))}
                    {trainers.length === 0 && (
                        <div className="sm:col-span-3 glass rounded-2xl p-12 text-center">
                            <p className="text-slate-400 text-lg">Loading trainers…</p>
                        </div>
                    )}
                </div>

                {/* My Bookings */}
                {bookings.length > 0 && (
                    <div className="glass rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">My Bookings</h2>
                        <div className="space-y-3">
                            {bookings.map((b) => (
                                <div key={b._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-gym-border">
                                    <div>
                                        <p className="text-white font-medium">{b.trainer_name}</p>
                                        <p className="text-sm text-slate-400">{b.date} • {b.time_slot}</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-green-500/20 text-green-400">
                                        {b.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
