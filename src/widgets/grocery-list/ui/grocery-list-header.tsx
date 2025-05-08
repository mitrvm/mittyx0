import { Button, Flex, Switch } from 'antd';
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

const LargerSwitch = styled(Switch)`
  &.ant-switch {
    min-width: 130px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
  }

  .ant-switch-handle {
    width: 26px;
    height: 26px;
    top: 3px;
    border-radius: 50% !important;
    z-index: 2;
    &::before {
      border-radius: 50% !important;
    }
  }

  &.ant-switch-checked .ant-switch-handle {
    inset-inline-start: calc(100% - 26px - 3px) !important;
  }

  &.ant-switch-checked .ant-switch-inner-unchecked {
    display: none !important;
  }

  &:not(.ant-switch-checked) .ant-switch-inner-checked {
    display: none !important;
  }

  .ant-switch-inner {
    margin-right: 20px !important;
    margin-left: 20px !important;
    z-index: 1;
  }

  .ant-switch-inner-checked,
  .ant-switch-inner-unchecked {
    margin-top: 0 !important;
    position: relative !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    display: inline-block !important;
    font-size: 11px !important;
  }

  @media (max-width: 1215px) {
    margin-top: 10px;
  }
`;

interface GroceryListHeaderProps {
  searchQuery: string;
  onSearch: (value: string) => void;
  onCategoryChange: (values: number[]) => void;
  onTagsChange: (values: number[]) => void;
  onAddClick: () => void;
  viewMode: 'list' | 'card';
  onViewModeChange: (mode: 'list' | 'card') => void;
}

export function GroceryListHeader({
  searchQuery,
  onSearch,
  onCategoryChange,
  onTagsChange,
  onAddClick,
  viewMode,
  onViewModeChange,
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
        <Flex align="center" style={{ gap: '8px' }}>
          <LargerSwitch
            checked={viewMode === 'card'}
            checkedChildren="KOLYA MODE (BETA)"
            unCheckedChildren="KOLYA MODE (BETA)"
            onChange={(checked) => onViewModeChange(checked ? 'card' : 'list')}
          />
        </Flex>
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
