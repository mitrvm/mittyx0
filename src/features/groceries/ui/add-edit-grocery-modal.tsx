import { Modal, Form, Input, Select, Button } from 'antd';
import { toast } from 'react-hot-toast';
import { useGroceries } from '~entities/groceries/groceries.queries';
import React from 'react';

interface AddGroceryFormData {
  id?: number;
  name: string;
  category: number;
  tags: number[];
  priority: number;
}

type ModalType = 'add' | 'edit';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  initialData?: AddGroceryFormData;
}

const categories = [
  { id: 1, name: 'Молочные продукты' },
  { id: 2, name: 'Фрукты' },
  { id: 3, name: 'Овощи' },
  { id: 4, name: 'Мясо' },
  { id: 5, name: 'Снеки' },
];

const availableTags = [
  { id: 1, name: 'Еженедельно' },
  { id: 2, name: 'Завтрак' },
  { id: 3, name: 'Вкусно' },
  { id: 4, name: 'Здорово' },
];

export function AddEditGroceryModal({
  isOpen,
  onClose,
  type,
  initialData,
}: Props) {
  const [form] = Form.useForm<AddGroceryFormData>();
  const { createGrocery, editGrocery } = useGroceries();

  React.useEffect(() => {
    if (type === 'edit' && initialData) {
      form.setFieldsValue(initialData);
    }
  }, [form, type, initialData]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (type === 'edit' && initialData?.id) {
        await editGrocery({
          id: initialData.id,
          name: values.name,
          category_id: values.category,
          tags_id: values.tags,
          priority: values.priority,
        });
        toast.success('Изменения сохранены.');
      } else {
        await createGrocery({
          name: values.name,
          category_id: values.category,
          tags_id: values.tags,
          priority: values.priority,
        });
        toast.success('Товар добавлен.');
      }

      form.resetFields();
      onClose();
    } catch (error) {
      toast.error('Ошибка!! :(');
    }
  };

  return (
    <Modal
      title={type === 'add' ? 'Добавить новый товар' : 'Изменить товар'}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отменить
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {type === 'add' ? 'Добавить' : 'Изменить'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={{ tags: [] }}>
        <Form.Item
          name="name"
          label="Название товара"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input placeholder="Введите название товара" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Категория"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Select placeholder="Выберите категорию">
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="tags" label="Теги">
          <Select placeholder="Выберите теги" allowClear mode="multiple">
            {availableTags.map((tag) => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="priority" label="Приоритет %">
          <Input
            type="number"
            placeholder="Введите необходимость товара (От 1 до 100)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
