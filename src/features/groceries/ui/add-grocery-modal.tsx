import { Modal, Form, Input, Select, Button } from 'antd';
import { toast } from 'react-hot-toast';
import { useGroceries } from '~entities/groceries/groceries.queries';

interface AddGroceryFormData {
  name: string;
  category: number;
  tags: number[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
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

export function AddGroceryModal({ isOpen, onClose }: Props) {
  const [form] = Form.useForm<AddGroceryFormData>();
  const { createGrocery } = useGroceries();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createGrocery({
        name: values.name,
        category_id: values.category,
        tags_id: values.tags,
      });
      toast.success('Вроде успех!!!');
      form.resetFields();
      onClose();
    } catch (error) {
      toast.error('Ошибка!! :(');
    }
  };

  return (
    <Modal
      title="Добавить новый товар"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отменить
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Добавить
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
      </Form>
    </Modal>
  );
}
