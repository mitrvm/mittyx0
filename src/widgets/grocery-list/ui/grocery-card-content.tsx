import { Button, Card, Spin, Flex } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { GroceryListItem } from '~features/groceries';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

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

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  margin-bottom: 20px;
`;

const NavigationButton = styled(Button)`
  height: 100px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

interface GroceryCardContentProps {
  isLoading: boolean;
  items: any[];
  currentIndex: number;
  selectedItems: number[];
  removingItems: number[];
  onToggle: (id: number) => void;
  onDelete: () => Promise<void>;
  onEditClick: (item: any) => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

export function GroceryCardContent({
  isLoading,
  items,
  currentIndex,
  selectedItems,
  removingItems,
  onToggle,
  onDelete,
  onEditClick,
  onNavigate,
}: GroceryCardContentProps) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onNavigate('next'),
    onSwipedRight: () => onNavigate('prev'),
    trackMouse: true,
  });

  if (items.length === 0) {
    return <div>Список пуст</div>;
  }

  const currentItem = items[currentIndex];

  return (
    <CardWrapper>
      {isLoading && (
        <LoadingOverlay>
          <Spin size="large" />
        </LoadingOverlay>
      )}

      <Flex align="center" justify="space-between">
        <NavigationButton
          icon={<LeftOutlined />}
          onClick={() => onNavigate('prev')}
          disabled={currentIndex === 0}
          style={{ marginRight: '10px' }}
        />

        <div style={{ flex: 1 }} {...handlers}>
          <Card
            title={`Предмет ${currentIndex + 1} из ${items.length}`}
            style={{ width: '100%' }}
          >
            {currentItem && (
              <GroceryListItem
                key={currentItem.id}
                item={currentItem}
                isSelected={selectedItems.includes(currentItem.id)}
                onToggle={onToggle}
                isRemoving={removingItems.includes(currentItem.id)}
                onDelete={onDelete}
                onEditClick={onEditClick}
              />
            )}
          </Card>
        </div>

        <NavigationButton
          icon={<RightOutlined />}
          onClick={() => onNavigate('next')}
          disabled={currentIndex === items.length - 1}
          style={{ marginLeft: '10px' }}
        />
      </Flex>
    </CardWrapper>
  );
}
