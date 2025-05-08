import { Button, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchName, SelectCategory, SelectTags } from '~features/groceries';
import styled from 'styled-components';

const StyledHeader = styled.div`
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 1215px) {
    margin-top: 10px;
  }
  @media (max-width: 590px) {
    .ant-btn-icon + span:not(.anticon) {
      display: none;
    }
  }
`;

interface GroceryListHeaderProps {
  searchQuery: string;
  onSearch: (value: string) => void;
  onCategoryChange: (values: number[]) => void;
  onTagsChange: (values: number[]) => void;
  onAddClick: () => void;
}

export function GroceryListHeader({
  searchQuery,
  onSearch,
  onCategoryChange,
  onTagsChange,
  onAddClick,
}: GroceryListHeaderProps) {
  return (
    <StyledHeader
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
      }}
    >
      <Flex
        style={{
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <SearchName onSearch={onSearch} value={searchQuery} />
        <SelectCategory onChange={onCategoryChange} />
        <SelectTags onChange={onTagsChange} />
      </Flex>
      <Flex style={{ gap: '12px' }}>
        <IconButton
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#67a654' }}
          onClick={onAddClick}
        >
          Добавить продукт
        </IconButton>
      </Flex>
    </StyledHeader>
  );
}
