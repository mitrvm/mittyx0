import { Button } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';

interface GroceryListActionsProps {
  statusFilter: 'need_buying' | 'bought';
  selectedItems: number[];
  onRemoveChecked: () => void;
  onUpdateStatus: (items: number[], status: 'need_buying' | 'bought') => void;
}

export function GroceryListActions({
  statusFilter,
  selectedItems,
  onRemoveChecked,
  onUpdateStatus,
}: GroceryListActionsProps) {
  if (statusFilter === 'need_buying') {
    return (
      <Button
        disabled={selectedItems.length === 0}
        type="primary"
        danger
        icon={<CarryOutOutlined />}
        onClick={onRemoveChecked}
        style={{ marginTop: '16px' }}
      >
        Куплено
      </Button>
    );
  }

  return (
    <Button
      disabled={selectedItems.length === 0}
      type="primary"
      icon={<CarryOutOutlined />}
      onClick={() => onUpdateStatus(selectedItems, 'need_buying')}
      style={{ marginTop: '16px' }}
    >
      В список покупок
    </Button>
  );
}
