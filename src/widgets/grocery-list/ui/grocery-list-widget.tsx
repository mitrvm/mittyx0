import { useState, useCallback, useEffect, useMemo } from 'react';
import { useGroceries } from '~entities/groceries';
import { AddEditGroceryModal } from '~features/groceries';
import { GroceryListHeader } from './grocery-list-header';
import { GroceryListContent } from './grocery-list-content';
import { GroceryListActions } from './grocery-list-actions';
import toast from 'react-hot-toast';

interface GroceryListWidgetProps {
  statusFilter?: 'need_buying' | 'bought';
}

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
  const [editingItem, setEditingItem] = useState<any>(null);
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
        )
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)),
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

  return (
    <div style={{ maxWidth: '100%' }}>
      {error && (
        <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>
      )}

      <GroceryListHeader
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategories}
        onTagsChange={setSelectedTags}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <GroceryListContent
        isLoading={isLoading}
        items={filteredGroceries}
        selectedItems={selectedItems}
        removingItems={removingItems}
        onToggle={toggleItemSelection}
        onDelete={fetchGroceries}
        onEditClick={handleEditClick}
      />

      <GroceryListActions
        statusFilter={statusFilter!}
        selectedItems={selectedItems}
        onRemoveChecked={handleRemoveChecked}
        onUpdateStatus={updateItemsStatus}
      />

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
