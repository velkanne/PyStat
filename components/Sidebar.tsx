import React from 'react';
import { Calculator, BookOpen, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'calculator', icon: Calculator, label: 'Calculadora', description: 'Distribuciones' },
    { id: 'reference', icon: BookOpen, label: 'Referencia', description: 'Fórmulas' },
    { id: 'settings', icon: Settings, label: 'Configuración', description: 'Opciones' },
    { id: 'help', icon: HelpCircle, label: 'Ayuda', description: 'Docs' },
  ];

  return (
    <aside className="w-1/5 h-full bg-[#0F2942] text-white flex flex-col flex-shrink-0">
      {/* Logo Area */}
      <div className="p-6 flex items-center space-x-3 border-b border-blue-800/30">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
           <Calculator size={20} className="text-white" />
        </div>
        <span className="font-bold text-lg tracking-wide">PyStat<span className="font-light opacity-70">Calc</span></span>
      </div>

      {/* Menu List */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-200 ${
              activeView === item.id
                ? 'bg-white/10 text-white shadow-md border-l-4 border-blue-400' 
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={18} />
            <div className="flex flex-col items-start flex-1">
              <span className="font-medium text-sm">{item.label}</span>
              <span className="text-xs text-gray-400">{item.description}</span>
            </div>
          </button>
        ))}
      </nav>
      
      {/* Footer Info */}
      <div className="p-4 text-xs text-gray-500 text-center">
        v2.0.0 Discrete
      </div>
    </aside>
  );
};

export default Sidebar;