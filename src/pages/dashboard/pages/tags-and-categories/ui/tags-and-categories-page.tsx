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

  const mockTags = [
    { id: 1, name: 'Sample', color: '#ff4d4f' },
    { id: 2, name: 'Sample tag', color: '#52c41a' },
    { id: 3, name: 'Sample', color: '#67A654' },
  ];

  const mockCategories = [
    { id: 1, name: 'Sample', color: '#faad14' },
    { id: 2, name: 'Sample', color: '#722ed1' },
  ];

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
            data={categories?.length ? categories : mockCategories}
            onEdit={handleRefresh}
          />
          <TagsCategoriesTable
            type="Tags"
            data={tags?.length ? tags : mockTags}
            onEdit={handleRefresh}
          />
        </Flex>
      </MainContent>
    </DashboardLayoutSidebar>
  );
}
