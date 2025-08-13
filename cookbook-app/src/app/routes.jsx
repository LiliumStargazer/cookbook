// src/app/routes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './require-auth.jsx';
import RequireGuest from './require-guest.jsx';
import SignInPage from '../features/auth/pages/sign-in-page.jsx';
import UnauthorizedPage from '../shared/pages/unauthorized-page.jsx';
import SignUpPage from '../features/auth/pages/sign-up-page.jsx';
import Dashboard from '../features/dashboard/pages/dashboard.tsx.jsx';
import ProfilePage from '@/features/profile/pages/profile.jsx';
import SearchPage from '@/features/search/pages/search-page.jsx';
import RecipeDetailPage from '@/features/recipe/pages/recipe-detail-page.jsx';
import CookbookPage from '@/features/cookbook/pages/cookbook-page.jsx';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pagine per utenti NON loggati */}
        <Route
          path='/signin'
          element={
            <RequireGuest>
              <SignInPage />
            </RequireGuest>
          }
        />
        <Route
          path='/signup'
          element={
            <RequireGuest>
              <SignUpPage />
            </RequireGuest>
          }
        />
        {/* Pagina Unauthorized */}
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        {/* Rotte protette per utenti loggati */}
        <Route
          path='/'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path='/search'
          element={
            <RequireAuth>
              <SearchPage />
            </RequireAuth>
          }
        />
        <Route
          path='/meal/:idRecipe'
          element={
            <RequireAuth>
              <RecipeDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path='/cookbook/'
          element={
            <RequireAuth>
              <CookbookPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
