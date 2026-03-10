import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Home, Play, MapPin, Settings, LogOut, User } from 'lucide-react';
import logoImage from '../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png';

const Header = ({ user, onLogout, onNavigate }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Handle navigation with optional custom handler
  const handleNavigation = (path, event) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(path);
    }
    // If no custom handler, Link will handle navigation normally
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/dashboard" 
            className="flex items-center"
            onClick={(e) => handleNavigation('/dashboard', e)}
          >

            <img 
              src={logoImage} 
              alt="TensorCourt" 
              className="h-10 w-auto brightness-0"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dashboard')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={(e) => handleNavigation('/dashboard', e)}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/clubs"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/clubs')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={(e) => handleNavigation('/clubs', e)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Clubs
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-blue-600 hidden sm:inline-flex"
            >
              <Link to="/start-game" onClick={(e) => handleNavigation('/start-game', e)}>
                <Play className="w-4 h-4 mr-2" />
                Start Game
              </Link>
            </Button>

            {/* Logout Button */}


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer" onClick={(e) => handleNavigation('/profile', e)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer" onClick={(e) => handleNavigation('/settings', e)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t bg-gray-50">
        <div className="flex justify-around py-2">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center px-3 py-2 text-xs font-medium ${
              isActive('/dashboard')
                ? 'text-blue-700'
                : 'text-gray-500'
            }`}
            onClick={(e) => handleNavigation('/dashboard', e)}
          >
            <Home className="w-5 h-5 mb-1" />
            Dashboard
          </Link>
          <Link
            to="/start-game"
            className={`flex flex-col items-center px-3 py-2 text-xs font-medium ${
              isActive('/start-game')
                ? 'text-blue-700'
                : 'text-gray-500'
            }`}
            onClick={(e) => handleNavigation('/start-game', e)}
          >
            <Play className="w-5 h-5 mb-1" />
            Start Game
          </Link>
          <Link
            to="/clubs"
            className={`flex flex-col items-center px-3 py-2 text-xs font-medium ${
              isActive('/clubs')
                ? 'text-blue-700'
                : 'text-gray-500'
            }`}
            onClick={(e) => handleNavigation('/clubs', e)}
          >
            <MapPin className="w-5 h-5 mb-1" />
            Clubs
          </Link>
          <button
            onClick={onLogout}
            className="flex flex-col items-center px-3 py-2 text-xs font-medium text-gray-500"
          >
            <LogOut className="w-5 h-5 mb-1" />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;