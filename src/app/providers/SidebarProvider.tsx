import { useState, ReactNode, useMemo } from 'react';
import { SidebarContext } from '~entities/contexts/sidebar-context';

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  const value = useMemo(() => ({ isCollapsed, setIsCollapsed }), [isCollapsed]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
