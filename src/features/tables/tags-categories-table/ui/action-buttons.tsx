import { Flex, Popconfirm } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { KeyboardEvent } from 'react';
import { TagsAndCategories } from '~entities/groupers';

interface ActionButtonsProps {
  record: TagsAndCategories;
  editable: boolean;
  type: 'Tags' | 'Categories';
  isDarkTheme: boolean;
  onSave: (id: number) => void;
  onCancel: () => void;
  onEdit: (record: TagsAndCategories) => void;
  onDelete: (id: number) => void;
}

export function ActionButtons({
  record,
  editable,
  type,
  isDarkTheme,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  return editable ? (
    <Flex wrap="nowrap" gap="small" justify="flex-end">
      <CheckOutlined
        onClick={() => onSave(record.id)}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') onSave(record.id);
        }}
        style={{
          fontSize: '16px',
          color: '#67A654',
          cursor: 'pointer',
        }}
      />
      <CloseOutlined
        onClick={onCancel}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') onCancel();
        }}
        style={{
          fontSize: '16px',
          color: '#ff4d4f',
          cursor: 'pointer',
        }}
      />
    </Flex>
  ) : (
    <Flex wrap="nowrap" gap="small" justify="flex-end">
      <EditOutlined
        onClick={() => onEdit(record)}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') onEdit(record);
        }}
        style={{ fontSize: '16px' }}
        color={isDarkTheme ? '#ffffff80' : '#858585'}
      />
      <Popconfirm
        title={`Удалить этот ${type === 'Tags' ? 'тег' : 'категорию'}?`}
        onConfirm={() => onDelete(record.id)}
        okText="Да"
        cancelText="Нет"
      >
        <DeleteOutlined
          color={isDarkTheme ? '#ffffff80' : '#858585'}
          style={{ fontSize: '16px' }}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === 'Enter') onDelete(record.id);
          }}
        />
      </Popconfirm>
    </Flex>
  );
}
