import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Membership from './pages/Membership';
import TrainerBooking from './pages/TrainerBooking';

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }
    return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <div className="min-h-screen bg-gym-dark">
            <Navbar />
            <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/workouts" element={<PrivateRoute><Workout /></PrivateRoute>} />
                <Route path="/membership" element={<PrivateRoute><Membership /></PrivateRoute>} />
                <Route path="/trainers" element={<PrivateRoute><TrainerBooking /></PrivateRoute>} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}
