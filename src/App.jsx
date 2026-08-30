import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PrayerProvider } from './context/PrayerContext';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import PrayerList from './pages/prayers/PrayerList';
import PrayerDetail from './pages/prayers/PrayerDetail';
import PrayerTracker from './pages/prayers/PrayerTracker';
import PrayerTimes from './pages/prayers/PrayerTimes';
import QiblaCompass from './pages/prayers/QiblaCompass';

import EatingOverview from './pages/eating/EatingOverview';
import FoodsDirectory from './pages/eating/FoodsDirectory';
import EatingEtiquettes from './pages/eating/EatingEtiquettes';
import EatingDuas from './pages/eating/EatingDuas';

import SunnahChecklist from './pages/sunnahs/SunnahChecklist';
import AdhkarCounter from './pages/sunnahs/AdhkarCounter';

import IncomeOverview from './pages/income/IncomeOverview';
import FinanceConcepts from './pages/income/FinanceConcepts';
import ZakatCalculator from './pages/income/ZakatCalculator';

import HadithList from './pages/hadiths/HadithList';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSuggestions from './pages/admin/AdminSuggestions';
import AdminHadiths from './pages/admin/AdminHadiths';
import AdminUsers from './pages/admin/AdminUsers';

// Admin Protected Route
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <PrayerProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public Core Routes */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Prayer Module */}
              <Route path="/prayers" element={<PrayerList />} />
              <Route path="/prayers/:id" element={<PrayerDetail />} />
              <Route path="/prayers/tracker" element={<PrayerTracker />} />
              <Route path="/prayer-times" element={<PrayerTimes />} />
              <Route path="/qibla" element={<QiblaCompass />} />

              {/* Eating Habits Module */}
              <Route path="/eating" element={<EatingOverview />} />
              <Route path="/eating/foods" element={<FoodsDirectory />} />
              <Route path="/eating/etiquettes" element={<EatingEtiquettes />} />
              <Route path="/eating/duas" element={<EatingDuas />} />

              {/* Sunnah & Adhkar Module */}
              <Route path="/sunnahs" element={<SunnahChecklist />} />
              <Route path="/adhkar" element={<AdhkarCounter />} />

              {/* Halal Income & Finance Module */}
              <Route path="/income" element={<IncomeOverview />} />
              <Route path="/income/finance" element={<FinanceConcepts />} />
              <Route path="/income/zakat" element={<ZakatCalculator />} />

              {/* Hadith Collection */}
              <Route path="/hadiths" element={<HadithList />} />

              {/* Auth & Profile */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />

              {/* Admin Portal Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/suggestions"
                element={
                  <AdminRoute>
                    <AdminSuggestions />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/hadiths"
                element={
                  <AdminRoute>
                    <AdminHadiths />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                }
              />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PrayerProvider>
    </AuthProvider>
  );
}

export default App;
