import { Search, GitBranch, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ health }) {
  const isHealthy = health?.status === 'healthy';
  const isOffline = health?.status === 'offline' || health === null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-blue-700 font-bold text-lg hover:text-blue-600 transition-colors">
            <Search className="w-5 h-5" />
            <span>TruthLens AI</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-400" />
            {health === null ? (
              <span className="text-xs text-gray-400">Checking...</span>
            ) : isOffline ? (
              <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Offline
              </span>
            ) : isHealthy ? (
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Healthy
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium text-yellow-600">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                Degraded
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
