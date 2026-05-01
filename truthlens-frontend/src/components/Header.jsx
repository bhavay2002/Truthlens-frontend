import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home',         href: '/',            internal: true },
  { label: 'Features',    href: '#features',    anchor: true },
  { label: 'How It Works',href: '#how-it-works',anchor: true },
  { label: 'About',       href: '/about',        internal: true },
  { label: 'Analysis',    href: '#analyze',      anchor: true },
  { label: 'Dashboard',   href: '/results',      internal: true },
];

export default function Header({ health }) {
  const isHealthy = health?.status === 'healthy';
  const { pathname } = useLocation();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-gray-800 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            TruthLens
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
            {NAV_LINKS.map(({ label, href, internal, anchor }) => {
              const isActive = internal && pathname === href;
              if (anchor) {
                return (
                  <a key={label} href={href} className="hover:text-gray-900 transition-colors">
                    {label}
                  </a>
                );
              }
              return (
                <Link
                  key={label}
                  to={href}
                  className={`transition-colors ${isActive ? 'text-gray-900 border-b-2 border-blue-600 pb-0.5' : 'hover:text-gray-900'}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {health !== null && (
              <span className={`hidden sm:flex items-center gap-1 text-xs font-medium ${isHealthy ? 'text-green-600' : 'text-gray-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-gray-300'}`} />
                {isHealthy ? 'Live' : 'Offline'}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
