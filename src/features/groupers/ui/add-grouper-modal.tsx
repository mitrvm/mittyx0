import { Modal, Form, Input, Button, ColorPicker } from 'antd';
import { toast } from 'react-hot-toast';
import { useTags, useCategories } from '~entities/groupers';

interface AddGroceryFormData {
  name: string;
  color: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: 'tag' | 'category';
  onSuccess?: () => void;
}

export function AddGrouperModal({ isOpen, onClose, type, onSuccess }: Props) {
  const [form] = Form.useForm<AddGroceryFormData>();
  const { createTag } = useTags();
  const { createCategory } = useCategories();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // @ts-ignore
      const color = values.color?.toHexString() || values.color;

      if (type === 'tag') {
        await createTag({
          name: values.name,
          color,
        });
      } else {
        await createCategory({
          name: values.name,
          color,
        });
      }
      toast.success(type === 'tag' ? 'Тэг добавлен.' : 'Категория добавлена.');
      form.resetFields();
      onClose();
      onSuccess?.();
    } catch (error) {
      toast.error('Ошибка!! :(');
    }
  };

  return (
    <Modal
      title={type === 'tag' ? 'Добавить новый тэг' : 'Добавить новую категорию'}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отменить
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          style={{ backgroundColor: '#67A654' }}
        >
          Добавить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={{ tags: [] }}>
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>
        <Form.Item
          name="color"
          label="Цвет"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <ColorPicker showText />
        </Form.Item>
      </Form>
    </Modal>
  );
}
