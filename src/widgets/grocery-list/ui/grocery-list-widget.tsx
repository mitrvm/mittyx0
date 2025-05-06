import { List, Button, Flex, Spin } from 'antd';
import { CarryOutOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { GroceryListItem } from '~features/groceries';
import { AddEditGroceryModal } from '~features/groceries';
import { useGroceries } from '~entities/groceries';
import { SearchName, SelectCategory, SelectTags } from '~features/groceries';
import styled from 'styled-components';
import toast from 'react-hot-toast';

interface AddGroceryFormData {
  id?: number;
  name: string;
  category: number;
  tags: number[];
  priority: number | undefined;
}

interface GroceryListWidgetProps {
  statusFilter?: 'need_buying' | 'bought';
}

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

export function GroceryListWidget({ statusFilter }: GroceryListWidgetProps) {
  const {
    groceries,
    selectedItems,
    isLoading,
    error,
    fetchGroceries,
    toggleItemSelection,
    updateItemsStatus,
  } = useGroceries();
  const [removingItems, setRemovingItems] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AddGroceryFormData | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const filteredGroceries = useMemo(
    () =>
      groceries
        .filter((item) => item.status === statusFilter)
        .filter((item) =>
          searchQuery
            ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true,
        )
        .filter((item) =>
          selectedCategories.length > 0
            ? selectedCategories.includes(item.category_id)
            : true,
        )
        .filter((item) =>
          selectedTags.length > 0
            ? selectedTags.some((tagId) =>
                item.tags.some((itemTag: any) => itemTag.id === tagId),
              )
            : true,
        ),
    [groceries, statusFilter, searchQuery, selectedCategories, selectedTags],
  );

  const handleRemoveChecked = useCallback(async () => {
    if (selectedItems.length === 0) return;

    try {
      await updateItemsStatus(selectedItems, 'bought');
      setRemovingItems([]);
    } catch (error) {
      toast.error('Ошибка!! :(');
    }
  }, [selectedItems, updateItemsStatus]);
  useEffect(() => {
    fetchGroceries();
  }, []);

  const handleDeleteOrEdit = async () => {
    await fetchGroceries();
  };

  const handleEditClick = (item: any) => {
    setEditingItem({
      id: item.id,
      name: item.name,
      category: item.category_id,
      tags: item.tags.map((tag: any) => tag.id),
      priority: item.priority || undefined,
    });
    setIsEditModalOpen(true);
  };

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleCategoryChange = useCallback((values: number[]) => {
    setSelectedCategories(values);
  }, []);

  const handleTagsChange = useCallback((values: number[]) => {
    setSelectedTags(values);
  }, []);

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
          <SearchName onSearch={handleSearch} value={searchQuery} />
          <SelectCategory onChange={handleCategoryChange} />
          <SelectTags onChange={handleTagsChange} />
        </Flex>
        <Flex style={{ gap: '12px' }}>
          {/* <IconButton
            type="primary"
            icon={<SelectOutlined />}
            style={{ backgroundColor: '#a68454' }}
            // onClick={() => {
            //   toast.success('УРаааааа');
            // }}
          >
            Добавить продукты (выбрать)
          </IconButton> */}
          <IconButton
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: '#67a654' }}
            onClick={() => setIsAddModalOpen(true)}
          >
            Добавить продукт
            {/* (новый) */}
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
          {filteredGroceries.map((item) => (
            <GroceryListItem
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onToggle={(id) => {
                toggleItemSelection(id);
              }}
              isRemoving={removingItems.includes(item.id)}
              onDelete={handleDeleteOrEdit}
              onEditClick={handleEditClick}
            />
          ))}
        </List>
      </div>
      {statusFilter === 'need_buying' && (
        <Button
          disabled={selectedItems.length === 0}
          type="primary"
          danger
          icon={<CarryOutOutlined />}
          onClick={() => {
            handleRemoveChecked();
          }}
          style={{ marginTop: '16px' }}
        >
          Куплено
        </Button>
      )}
      {statusFilter === 'bought' && (
        <Button
          disabled={selectedItems.length === 0}
          type="primary"
          icon={<CarryOutOutlined />}
          onClick={() => {
            updateItemsStatus(selectedItems, 'need_buying');
          }}
          style={{ marginTop: '16px' }}
        >
          В список покупок
        </Button>
      )}
      <AddEditGroceryModal
        type="add"
        isOpen={isAddModalOpen}
        onClose={async () => {
          setIsAddModalOpen(false);
          await fetchGroceries();
        }}
      />
      <AddEditGroceryModal
        type="edit"
        isOpen={isEditModalOpen}
        initialData={editingItem || undefined}
        onClose={async () => {
          setIsEditModalOpen(false);
          setEditingItem(null);
          await fetchGroceries();
        }}
      />
    </div>
  );
}
