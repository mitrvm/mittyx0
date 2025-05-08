import { useState, useCallback, useEffect, useMemo } from 'react';
import { useGroceries } from '~entities/groceries';
import { AddEditGroceryModal } from '~features/groceries';
import { GroceryListHeader } from './grocery-list-header';
import { GroceryListContent } from './grocery-list-content';
import { GroceryListActions } from './grocery-list-actions';
import toast from 'react-hot-toast';
import { GroceryCardContent } from './grocery-card-content';

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

  // Get initial view mode from localStorage or default to 'list'
  const getInitialViewMode = (): 'list' | 'card' => {
    const savedMode = localStorage.getItem('groceryViewMode');
    return savedMode === 'list' || savedMode === 'card' ? savedMode : 'list';
  };

  const [removingItems, setRemovingItems] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'card'>(getInitialViewMode);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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

  const handleCardNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentCardIndex((prev) =>
        prev < filteredGroceries.length - 1 ? prev + 1 : prev,
      );
    } else {
      setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const handleViewModeChange = (newMode: 'list' | 'card') => {
    setViewMode(newMode);
    localStorage.setItem('groceryViewMode', newMode);
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
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {viewMode === 'list' ? (
        <GroceryListContent
          isLoading={isLoading}
          items={filteredGroceries}
          selectedItems={selectedItems}
          removingItems={removingItems}
          onToggle={toggleItemSelection}
          onDelete={fetchGroceries}
          onEditClick={handleEditClick}
        />
      ) : (
        <GroceryCardContent
          isLoading={isLoading}
          items={filteredGroceries}
          currentIndex={currentCardIndex}
          selectedItems={selectedItems}
          removingItems={removingItems}
          onToggle={toggleItemSelection}
          onDelete={fetchGroceries}
          onEditClick={handleEditClick}
          onNavigate={handleCardNavigation}
        />
      )}

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
