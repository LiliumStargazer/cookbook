import { useState } from 'react';
import { 
  Home, 
  Search, 
  BookOpen, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import useAuth from '../../auth/utils/store';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Cerca Ricette', icon: Search },
    { id: 'saved', label: 'Le Mie Ricette', icon: BookOpen },
    { id: 'profile', label: 'Profilo', icon: User },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header Sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">🍳 Cookbook</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={20} className="mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center mb-4 px-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.username || 'Utente'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'email@example.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar Mobile */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Content Area */}
        <main className="p-6">
          {activeTab === 'home' && <HomeContent />}
          {activeTab === 'search' && <SearchContent />}
          {activeTab === 'saved' && <SavedRecipesContent />}
          {activeTab === 'profile' && <ProfileContent />}
        </main>
      </div>

      {/* Overlay per mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Componenti per ogni sezione
function HomeContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Ricette Salvate</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Ricette Preferite</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Categoria Preferita</h3>
          <p className="text-lg text-gray-600">🍕 Pizza</p>
        </div>
      </div>
    </div>
  );
}

function SearchContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cerca Ricette</h2>
      <p className="text-gray-600">Contenuto della pagina di ricerca ricette...</p>
    </div>
  );
}

function SavedRecipesContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Le Mie Ricette</h2>
      <p className="text-gray-600">Contenuto delle ricette salvate...</p>
    </div>
  );
}

function ProfileContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profilo Utente</h2>
      <p className="text-gray-600">Contenuto del profilo utente...</p>
    </div>
  );
}
