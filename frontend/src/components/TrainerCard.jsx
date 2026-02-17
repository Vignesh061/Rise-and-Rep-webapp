import { FiStar, FiCalendar } from 'react-icons/fi';

export default function TrainerCard({ trainer, onBook }) {
    return (
        <div className="glass rounded-2xl p-6 card-hover">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">{trainer.name.charAt(0)}</span>
            </div>

            <h3 className="text-lg font-semibold text-white">{trainer.name}</h3>
            <p className="text-sm text-red-400 font-medium">{trainer.specialty}</p>

            <div className="flex items-center gap-3 mt-3 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                    <FiStar size={14} className="text-yellow-400" />
                    {trainer.rating}
                </span>
                <span>•</span>
                <span>{trainer.experience} yrs exp</span>
            </div>

            <p className="mt-3 text-sm text-slate-400 line-clamp-2">{trainer.bio}</p>

            <button
                onClick={() => onBook(trainer)}
                className="mt-4 w-full py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 transition-all flex items-center justify-center gap-2"
            >
                <FiCalendar size={14} />
                Book Session
            </button>
        </div>
    );
}
