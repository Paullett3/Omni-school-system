import { LayoutDashboard, Users, BookOpen, CheckSquare, MessageSquare, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Students', icon: Users, path: '/students' },
  { name: 'Attendance', icon: CheckSquare, path: '/attendance' },
  { name: 'Exams', icon: BookOpen, path: '/exams' },
  { name: 'Messages', icon: MessageSquare, path: '/messages' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-slate-900 text-white p-4 hidden md:block">
      <h1 className="text-2xl font-bold text-schoolSecondary mb-8 text-center">OMNI SCHOOL</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-schoolPrimary text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}