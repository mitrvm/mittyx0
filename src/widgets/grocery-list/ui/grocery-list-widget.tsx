import { List, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useCallback } from 'react';
import { GroceryListItem } from '~features/groceries';
import { AddGroceryModal } from '~features/groceries';

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  bought: boolean;
  tags: Array<{ name: string }>;
}

const mockGroceries: GroceryItem[] = [
  {
    id: 1,
    name: 'Молоко',
    category: 'Молочные продукты',
    bought: false,
    tags: [{ name: 'Вкусно' }, { name: 'Ежедневное' }],
  },
  {
    id: 2,
    name: 'Яйца',
    category: 'Молочные продукты',
    bought: false,
    tags: [{ name: 'Завтрак' }],
  },
  {
    id: 3,
    name: 'Яблоки',
    category: 'Фрукты',
    bought: false,
    tags: [],
  },
  {
    id: 4,
    name: 'Хрустик экстра острый!!',
    category: 'Снеки',
    bought: false,
    tags: [],
  },
];

export function GroceryListWidget() {
  const [groceries, setGroceries] = useState(mockGroceries);
  const [removingItems, setRemovingItems] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setGroceries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item,
      ),
    );
  };

  const handleRemoveChecked = useCallback(() => {
    const itemsToRemove = groceries
      .filter((item) => item.bought)
      .map((item) => item.id);
    setRemovingItems(itemsToRemove);

    setTimeout(() => {
      setGroceries((prev) => prev.filter((item) => !item.bought));
      setRemovingItems([]);
    }, 300);
  }, [groceries]);

  const hasCheckedItems = groceries.some((item) => item.bought);

  const handleAddItem = (data: {
    name: string;
    category: string;
    tags: string[];
  }) => {
    const newItem: GroceryItem = {
      id: Math.max(...groceries.map((item) => item.id)) + 1,
      name: data.name,
      category: data.category,
      bought: false,
      tags: data.tags.map((name) => ({ name })),
    };

    setGroceries((prev) => [...prev, newItem]);
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#67a654' }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Добавить продукт
        </Button>
      </div>

      <List style={{ width: '100%' }}>
        {groceries.map((item) => (
          <GroceryListItem
            key={item.id}
            item={item}
            onToggle={handleCheckboxChange}
            isRemoving={removingItems.includes(item.id)}
          />
        ))}
      </List>

      <Button
        type="primary"
        danger
        icon={<DeleteOutlined />}
        onClick={handleRemoveChecked}
        disabled={!hasCheckedItems}
        style={{ marginTop: '16px' }}
      >
        Удалить выбранные
      </Button>

      <AddGroceryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}
