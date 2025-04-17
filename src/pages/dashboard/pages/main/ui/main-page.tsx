import { DashboardLayoutSidebar } from '~pages/dashboard/ui';
import { GroceryListWidget } from '~widgets';
import styled from 'styled-components';

const MainContent = styled.div`
  padding: 24px;
  margin-left: 60px;
  min-height: 100vh;
  background-color: inherit;
  transition: margin-left 0.3s;
  width: calc(100% - 60px);

  @media (min-width: 768px) {
    margin-left: 200px;
    width: calc(100% - 200px);
  }
`;

export function MainPage() {
  return (
    <DashboardLayoutSidebar>
      <MainContent>
        <GroceryListWidget />
      </MainContent>
    </DashboardLayoutSidebar>
  );
}
