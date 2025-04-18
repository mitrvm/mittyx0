import { Checkbox, Tag, Typography, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useTheme } from '~entities/contexts/theme-context';
import { useGroceries } from '~entities/groceries';
import toast from 'react-hot-toast';

const GroceryItemWrapper = styled.div`
  transition: all 0.3s ease-in-out;
  opacity: 1;
  transform: translateX(0);

  &.removing {
    opacity: 0;
    transform: translateX(-100%);
  }
`;
type ProductStatus = 'need_buying' | 'bought';
interface TagsAndCategories {
  id: number;
  name: string;
  color: string;
}
interface Props {
  item: {
    id: number;
    name: string;
    priority: number;
    status: ProductStatus;
    category_id: number;
    tags: TagsAndCategories[];
    category: TagsAndCategories;
  };
  onToggle: (id: number) => void;
  isRemoving: boolean;
  onDelete: () => Promise<void>;
  onEditClick: (item: Props['item']) => void;
}

export function GroceryListItem({
  item,
  onToggle,
  isRemoving,
  onDelete,
  onEditClick,
}: Props) {
  const { isDarkTheme } = useTheme();
  const { deleteGrocery } = useGroceries();

  const getBackgroundColor = () => {
    if (isDarkTheme) {
      return item.status === 'bought' ? '#363639' : '#42424c';
    }
    return item.status === 'bought' ? '#ebebeb' : 'white';
  };

  const groceryItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px',
    marginBottom: '8px',
    background: getBackgroundColor(),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    minWidth: 'auto',
    userSelect: 'none',
    width: '100%',
  };

  const handleDelete = async (itemId: number) => {
    try {
      await deleteGrocery(itemId);
      await onDelete();
      toast.success('Вроде успех!!!');
    } catch (error) {
      toast.error('Ошибка!! :(');
    }
  };

  return (
    <GroceryItemWrapper className={isRemoving ? 'removing' : ''}>
      <div
        role="button"
        tabIndex={0}
        style={{
          ...groceryItemStyle,
          borderLeft: `4px solid ${item.category.color}`,
        }}
        onClick={(e) => {
          if (
            !(e.target as HTMLElement).closest('.ant-checkbox') &&
            !(e.target as HTMLElement).closest('.ant-popconfirm') &&
            !(e.target as HTMLElement).closest('.delete-icon')
          ) {
            onToggle(item.id);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(item.id);
          }
        }}
      >
        <Checkbox
          className="ant-checkbox"
          checked={item.status === 'bought'}
          onChange={() => onToggle(item.id)}
        />
        <div style={{ marginLeft: '12px', flex: 1, width: '100%' }}>
          <Typography.Text
            style={{
              textDecoration:
                item.status === 'bought' ? 'line-through' : 'none',
              marginLeft: '8px',
              userSelect: 'none',
              wordBreak: 'break-word',
            }}
          >
            {item.name}
          </Typography.Text>
          <div
            style={{
              marginTop: '4px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
            }}
          >
            {item.tags.map((tag) => (
              <Tag
                key={`${item.id}-${tag.name}`}
                color={tag.color}
                style={{
                  color: tag.color === '#ffffff' ? '#000000' : undefined,
                  border: tag.color === '#ffffff' ? '1px solid #ccc' : 'none',
                }}
              >
                {tag.name}
              </Tag>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignSelf: 'center' }}>
          <EditOutlined
            className="edit-icon"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(item);
            }}
            style={{
              fontSize: '20px',
              color: isDarkTheme ? '#ffffff80' : '#858585',
              cursor: 'pointer',
            }}
          />
          <Popconfirm
            title="Удалить этот предмет из списка?"
            onConfirm={() => handleDelete(item.id)}
            okText="Да"
            cancelText="Нет"
          >
            <DeleteOutlined
              className="delete-icon"
              style={{
                fontSize: '20px',
                color: isDarkTheme ? '#ffffff80' : '#858585',
                marginRight: '4px',
                cursor: 'pointer',
                alignSelf: 'center',
              }}
            />
          </Popconfirm>
        </div>
      </div>
    </GroceryItemWrapper>
  );
}
