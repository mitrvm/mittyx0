import { List, Button, Flex, Spin } from 'antd';
import {
  CarryOutOutlined,
  PlusOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import { useState, useCallback, useEffect } from 'react';
import { GroceryListItem } from '~features/groceries';
import { AddGroceryModal } from '~features/groceries';
import { useGroceries } from '~entities/groceries';
import { SearchName, SelectCategory, SelectTags } from '~features';
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

export function GroceryListWidget() {
  const {
    groceries,
    isLoading,
    error,
    fetchGroceries,
    updateGroceryStatus,
    removeCheckedGroceries,
  } = useGroceries();
  const [removingItems, setRemovingItems] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleRemoveChecked = useCallback(() => {
    const itemsToRemove = groceries
      .filter((item) => item.status === 'bought')
      .map((item) => item.id);
    setRemovingItems(itemsToRemove);

    setTimeout(() => {
      removeCheckedGroceries();
      setRemovingItems([]);
    }, 300);
  }, [groceries, removeCheckedGroceries]);

  const hasCheckedItems = groceries.some((item) => item.status === 'bought');

  useEffect(() => {
    fetchGroceries();
  }, []);

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

  const StyledHeader = styled.div`
    justify-content: space-between;
    @media (max-width: 768px) {
      justify-content: flex-end;
    }
  `;

  const handleDelete = async () => {
    await fetchGroceries();
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      {error && (
        <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>
      )}

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
          <SearchName />
          <SelectCategory />
          <SelectTags />
        </Flex>
        <Flex style={{ gap: '12px' }}>
          <IconButton
            type="primary"
            icon={<SelectOutlined />}
            style={{ backgroundColor: '#a68454' }}
            // onClick={() => {
            //   toast.success('УРаааааа');
            // }}
          >
            Добавить продукты (выбрать)
          </IconButton>
          <IconButton
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: '#67a654' }}
            onClick={() => setIsAddModalOpen(true)}
          >
            Добавить продукт (новый)
          </IconButton>
        </Flex>
      </StyledHeader>

      <div style={{ position: 'relative' }}>
        {isLoading && (
          <LoadingOverlay>
            <Spin size="large" />
          </LoadingOverlay>
        )}
        <List style={{ width: '100%' }}>
          {groceries.map((item) => (
            <GroceryListItem
              key={item.id}
              item={item}
              onToggle={updateGroceryStatus}
              isRemoving={removingItems.includes(item.id)}
              onDelete={handleDelete}
            />
          ))}
        </List>
      </div>

      <Button
        type="primary"
        danger
        icon={<CarryOutOutlined />}
        onClick={() => {
          handleRemoveChecked();
        }}
        disabled={!hasCheckedItems}
        style={{ marginTop: '16px' }}
      >
        Куплено
      </Button>

      <AddGroceryModal
        isOpen={isAddModalOpen}
        onClose={async () => {
          setIsAddModalOpen(false);
          await fetchGroceries();
        }}
      />
    </div>
  );
}
