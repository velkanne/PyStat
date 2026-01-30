import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface ConsolePanelProps {
  logs: string[];
}

const ConsolePanel: React.FC<ConsolePanelProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#D6E6F2] rounded-lg border border-blue-200 flex flex-col h-full overflow-hidden shadow-sm">
      <div className="bg-blue-100/50 px-4 py-2 border-b border-blue-200 flex items-center space-x-2">
        <Terminal size={14} className="text-blue-800" />
        <span className="text-xs font-bold text-blue-900 tracking-wider">CONSOLA PYTHON</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-white/50 space-y-1"
      >
        {logs.length === 0 ? (
          <div className="text-gray-400 italic">Esperando ejecución...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="break-words">
              <span className="text-blue-500 mr-2">{'>'}</span>
              <span className="text-gray-800">{log}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsolePanel;