import { DashboardLayoutSidebar } from '~pages/dashboard/ui';
import styled from 'styled-components';
import { useSidebar } from '~entities/contexts/sidebar-context';

const MainContent = styled.div<{ $isCollapsed: boolean }>`
  padding: 24px;
  min-height: 100vh;
  background-color: inherit;
  transition: margin-left 0.3s;
  margin-left: 60px;
  width: calc(100% - 60px);

  @media (min-width: 768px) {
    margin-left: ${({ $isCollapsed }) => ($isCollapsed ? '60px' : '200px')};
    width: calc(
      100% - ${({ $isCollapsed }) => ($isCollapsed ? '60px' : '200px')}
    );
  }
`;

export function StatsPage() {
  const { isCollapsed } = useSidebar();

  return (
    <DashboardLayoutSidebar>
      <MainContent $isCollapsed={isCollapsed}>
        <div>
          <h1>Stats</h1>
        </div>
      </MainContent>
    </DashboardLayoutSidebar>
  );
}
