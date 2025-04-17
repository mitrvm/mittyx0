import { Checkbox, Tag, Typography } from 'antd';
import styled from 'styled-components';
import { getColorByCategoryName, getColorByTagName } from '~entities/groceries';
import { useTheme } from '~entities/contexts/theme-context';

const GroceryItemWrapper = styled.div`
  transition: all 0.3s ease-in-out;
  opacity: 1;
  transform: translateX(0);

  &.removing {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

interface Props {
  item: {
    id: number;
    name: string;
    category: string;
    bought: boolean;
    tags: Array<{ name: string }>;
  };
  onToggle: (id: number) => void;
  isRemoving: boolean;
}

export function GroceryListItem({ item, onToggle, isRemoving }: Props) {
  const { isDarkTheme } = useTheme();
  const groceryItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px',
    marginBottom: '8px',
    background: isDarkTheme ? '#42424c' : 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    minWidth: 'auto',
    userSelect: 'none',
    width: '100%',
  };

  return (
    <GroceryItemWrapper className={isRemoving ? 'removing' : ''}>
      <div
        role="button"
        tabIndex={0}
        style={{
          ...groceryItemStyle,
          borderLeft: `4px solid ${getColorByCategoryName(item.category) || '#999'}`,
        }}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('.ant-checkbox')) {
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
          checked={item.bought}
          onChange={() => onToggle(item.id)}
        />
        <div style={{ marginLeft: '12px', flex: 1, width: '100%' }}>
          <Typography.Text
            style={{
              textDecoration: item.bought ? 'line-through' : 'none',
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
                color={getColorByTagName(tag.name)}
              >
                {tag.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </GroceryItemWrapper>
  );
}
