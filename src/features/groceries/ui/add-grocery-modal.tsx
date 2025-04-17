import { Modal, Form, Input, Select, Button } from 'antd';

interface AddGroceryFormData {
  name: string;
  category: string;
  tags: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddGroceryFormData) => void;
}

const categories = ['Молочные продукты', 'Фрукты', 'Овощи', 'Мясо', 'Снеки'];
const availableTags = ['Еженедельно', 'Завтрак', 'Вкусно', 'Здорово'];

export function AddGroceryModal({ isOpen, onClose, onAdd }: Props) {
  const [form] = Form.useForm<AddGroceryFormData>();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onAdd(values);
      form.resetFields();
      onClose();
    } catch (error) {
      // Form validation error
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
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="tags" label="Теги">
          <Select mode="multiple" placeholder="Выберите теги" allowClear>
            {availableTags.map((tag) => (
              <Select.Option key={tag} value={tag}>
                {tag}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
