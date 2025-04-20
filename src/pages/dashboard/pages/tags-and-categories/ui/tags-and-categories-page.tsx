import { DashboardLayoutSidebar } from '~pages/dashboard/ui';
import styled from 'styled-components';
import { useSidebar } from '~entities/contexts/sidebar-context';
import { TagsCategoriesTable } from '~features';
import { Flex } from 'antd';
import { useEffect } from 'react';
import { useTags, useCategories } from '~entities/groupers';

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

export function TagsAndCategoriesPage() {
  const { isCollapsed } = useSidebar();
  const { tags, fetchTags } = useTags();
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);

  const handleRefresh = () => {
    fetchTags();
    fetchCategories();
  };

  return (
    <DashboardLayoutSidebar>
      <MainContent $isCollapsed={isCollapsed}>
        <Flex vertical gap={10}>
          <TagsCategoriesTable
            type="Categories"
            data={categories}
            onEdit={handleRefresh}
          />
          <TagsCategoriesTable type="Tags" data={tags} onEdit={handleRefresh} />
        </Flex>
      </MainContent>
    </DashboardLayoutSidebar>
  );
}
