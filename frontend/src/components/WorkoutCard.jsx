import { FiTrash2, FiClock } from 'react-icons/fi';

export default function WorkoutCard({ workout, onDelete }) {
    return (
        <div className="glass rounded-2xl p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-lg font-semibold text-white">{workout.exercise}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <FiClock size={12} />
                        <span>{new Date(workout.date).toLocaleDateString()}</span>
                    </div>
                </div>
                {onDelete && (
                    <button
                        onClick={() => onDelete(workout._id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        title="Delete workout"
                    >
                        <FiTrash2 size={16} />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold gradient-text">{workout.sets}</p>
                    <p className="text-xs text-slate-400 mt-1">Sets</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold gradient-text">{workout.reps}</p>
                    <p className="text-xs text-slate-400 mt-1">Reps</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold gradient-text">{workout.weight}</p>
                    <p className="text-xs text-slate-400 mt-1">kg</p>
                </div>
            </div>

            {workout.notes && (
                <p className="mt-3 text-sm text-slate-400 italic">"{workout.notes}"</p>
            )}
        </div>
    );
}
