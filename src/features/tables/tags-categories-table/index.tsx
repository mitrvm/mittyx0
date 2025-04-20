import { Table, Tag, Typography, Popconfirm, Form, Input, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TagsAndCategories } from '~entities/groupers';
import { useCategories, useTags } from '~entities/groupers';
import toast from 'react-hot-toast';
import { useState, KeyboardEvent } from 'react';
import { JSX } from 'react/jsx-runtime';
import { useTheme } from '~entities/contexts/theme-context';

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: TagsAndCategories;
  index: number;
  children: React.ReactNode;
}

function EditableCell({
  editing,
  dataIndex,
  title,
  record,
  children,
  ...restProps
}: EditableCellProps): JSX.Element {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}

interface TableProps {
  type: 'Tags' | 'Categories';
  data: TagsAndCategories[];
  onEdit: () => void;
}

export function TagsCategoriesTable({
  type,
  data,
  onEdit,
}: TableProps): JSX.Element {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number>(-1);
  const { deleteCategory, editCategory } = useCategories();
  const { deleteTag, editTag } = useTags();
  const { isDarkTheme } = useTheme();
  const isEditing = (record: TagsAndCategories) => record.id === editingKey;

  const edit = (record: TagsAndCategories) => {
    form.setFieldsValue({ name: record.name, color: record.color });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const save = async (id: number) => {
    try {
      const row = await form.validateFields();
      const updateFn = type === 'Categories' ? editCategory : editTag;

      await updateFn(id, row);
      setEditingKey(-1);
      onEdit();
      toast.success('Успешно обновлено!');
    } catch (error) {
      toast.error('Ошибка!!!! :(');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (type === 'Categories') {
        await deleteCategory(id);
      } else {
        await deleteTag(id);
      }
      onEdit();
      toast.success('Успешно удалено!');
    } catch (error) {
      toast.error('Ошибка!!!! :(');
    }
  };

  const columns = [
    {
      key: 1,
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
      editable: false,
    },
    {
      key: 2,
      title: 'Название',
      dataIndex: 'name',
      width: '40%',
      editable: true,
    },
    {
      key: 3,
      title: 'Цвет',
      dataIndex: 'color',
      width: '40%',
      editable: true,
      render: (_: any, record: TagsAndCategories) => (
        <Tag
          key={`${record.id}-${record.color}`}
          color={record.color}
          style={{
            color: record.color === '#ffffff' ? '#000000' : undefined,
            border: record.color === '#ffffff' ? '1px solid #ccc' : 'none',
          }}
        >
          {record.color}
        </Tag>
      ),
    },
    {
      key: 4,
      title: '',
      width: '10%',
      render: (_: any, record: TagsAndCategories) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => save(record.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save(record.id);
              }}
              style={{
                marginRight: 8,
                background: 'none',
                border: 'none',
                color: '#1677ff',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              Редактировать
            </Button>
            <Button
              type="link"
              onClick={cancel}
              onKeyDown={(e) => {
                if (e.key === 'Enter') cancel();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#1677ff',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              Отмена
            </Button>
          </span>
        ) : (
          <span>
            <EditOutlined
              disabled={editingKey !== -1}
              onClick={() => edit(record)}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === 'Enter') edit(record);
              }}
              style={{ fontSize: '16px', marginRight: 8 }}
              color={isDarkTheme ? '#ffffff80' : '#858585'}
            />
            <Popconfirm
              title={`Удалить этот ${type === 'Tags' ? 'тег' : 'категорию'}?`}
              onConfirm={() => handleDelete(record.id)}
              okText="Да"
              cancelText="Нет"
            >
              <DeleteOutlined
                color={isDarkTheme ? '#ffffff80' : '#858585'}
                style={{ fontSize: '16px', marginLeft: 8 }}
                onKeyDown={(e: KeyboardEvent) => {
                  if (e.key === 'Enter') handleDelete(record.id);
                }}
              />
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TagsAndCategories) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Typography.Title level={4} style={{ marginBottom: 0 }}>
        {type === 'Tags' ? 'Тэги' : 'Категории'}
      </Typography.Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={data}
          pagination={false}
          rowKey="id"
        />
      </Form>
    </>
  );
}
