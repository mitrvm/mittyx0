import { List, Spin } from 'antd';
import { GroceryListItem } from '~features/groceries';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

interface GroceryListContentProps {
  isLoading: boolean;
  items: any[];
  selectedItems: number[];
  removingItems: number[];
  onToggle: (id: number) => void;
  onDelete: () => Promise<void>;
  onEditClick: (item: any) => void;
}

export function GroceryListContent({
  isLoading,
  items,
  selectedItems,
  removingItems,
  onToggle,
  onDelete,
  onEditClick,
}: GroceryListContentProps) {
  return (
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <LoadingOverlay>
          <Spin size="large" />
        </LoadingOverlay>
      )}
      <List style={{ width: '100%' }}>
        {items.map((item) => (
          <GroceryListItem
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onToggle={onToggle}
            isRemoving={removingItems.includes(item.id)}
            onDelete={onDelete}
            onEditClick={onEditClick}
          />
        ))}
      </List>
    </div>
  );
}
