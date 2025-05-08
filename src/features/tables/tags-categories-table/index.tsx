import { Table, Tag, Form, Button, Flex, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TagsAndCategories } from '~entities/groupers';
import { useCategories, useTags } from '~entities/groupers';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useTheme } from '~entities/contexts/theme-context';
import { AddGrouperModal } from '~features/groupers/ui/add-grouper-modal';
import { EditableCell } from './ui/editable-cell';
import { ActionButtons } from './ui/action-buttons';
import { TableProps } from './model/types';
import { isLightColor } from '~shared/utils';

export function TagsCategoriesTable({ type, data, onEdit }: TableProps) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number>(-1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
      if (row.color?.toHexString) {
        row.color = row.color.toHexString();
      }

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
      key: 2,
      title: 'Название',
      dataIndex: 'name',
      editable: true,
      render: (text: string) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-all' }}>
          {text}
        </div>
      ),
    },
    {
      key: 3,
      title: 'Цвет',
      dataIndex: 'color',
      editable: true,
      render: (_: any, record: TagsAndCategories) => (
        <Tag
          key={`${record.id}-${record.color}`}
          color={record.color}
          style={{
            color: isLightColor(record.color) ? '#000000' : undefined,
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
      align: 'right' as const,
      render: (_: any, record: TagsAndCategories) => (
        <ActionButtons
          record={record}
          editable={isEditing(record)}
          type={type}
          isDarkTheme={isDarkTheme}
          onSave={save}
          onCancel={cancel}
          onEdit={edit}
          onDelete={handleDelete}
        />
      ),
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
      <Flex justify="space-between" align="center" style={{ marginTop: 20 }}>
        <Typography.Text style={{ fontSize: 18, fontWeight: 600 }}>
          {type === 'Tags' ? 'Тэги' : 'Категории'}
        </Typography.Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: '#67A654' }}
          onClick={() => setIsAddModalOpen(true)}
        >
          Добавить
        </Button>
      </Flex>
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

      <AddGrouperModal
        type={type === 'Tags' ? 'tag' : 'category'}
        isOpen={isAddModalOpen}
        onClose={async () => {
          setIsAddModalOpen(false);
          onEdit();
        }}
      />
    </>
  );
}
