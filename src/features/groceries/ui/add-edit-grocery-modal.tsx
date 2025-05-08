import { Modal, Button } from 'antd';
import { toast } from 'react-hot-toast';
import { useGroceries } from '~entities/groceries/groceries.queries';
import React, { useEffect } from 'react';
import { useTags, useCategories } from '~entities/groupers/groupers.queries';
import { AddGrouperModal } from '~features/groupers/ui/add-grouper-modal';
import { Form } from 'antd';
import { GroceryForm, AddGroceryFormData, ModalType } from './grocery-form';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  initialData?: AddGroceryFormData;
}

export function AddEditGroceryModal({
  isOpen,
  onClose,
  type,
  initialData,
}: Props) {
  const [form] = Form.useForm<AddGroceryFormData>();
  const { createGrocery, editGrocery } = useGroceries();
  const { fetchTags } = useTags();
  const { fetchCategories } = useCategories();

  const [isAddCategoryOpen, setIsAddCategoryOpen] = React.useState(false);
  const [isAddTagOpen, setIsAddTagOpen] = React.useState(false);
  const [isCategorySelectOpen, setIsCategorySelectOpen] = React.useState(false);
  const [isTagSelectOpen, setIsTagSelectOpen] = React.useState(false);

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);

  useEffect(() => {
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
          priority: Number(values.priority) || undefined,
        });
        toast.success('Изменения сохранены.');
      } else {
        await createGrocery({
          name: values.name,
          category_id: values.category,
          tags_id: values.tags,
          priority: Number(values.priority) || undefined,
        });
        toast.success('Товар добавлен.');
      }

      form.resetFields();
      onClose();
    } catch (error) {
      toast.error('Ошибка!! :(');
    }
  };

  const handleAddCategory = React.useCallback(() => {
    setIsAddCategoryOpen(true);
    setIsCategorySelectOpen(false);
  }, []);

  const handleAddTag = React.useCallback(() => {
    setIsAddTagOpen(true);
    setIsTagSelectOpen(false);
  }, []);

  return (
    <>
      <Modal
        title={type === 'add' ? 'Добавить новый товар' : 'Изменить товар'}
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
            {type === 'add' ? 'Добавить' : 'Изменить'}
          </Button>,
        ]}
      >
        <GroceryForm
          form={form}
          isCategorySelectOpen={isCategorySelectOpen}
          isTagSelectOpen={isTagSelectOpen}
          setIsCategorySelectOpen={setIsCategorySelectOpen}
          setIsTagSelectOpen={setIsTagSelectOpen}
          onAddCategory={handleAddCategory}
          onAddTag={handleAddTag}
        />
      </Modal>

      <AddGrouperModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        type="category"
        onSuccess={() => {
          setIsAddCategoryOpen(false);
          fetchCategories();
        }}
      />

      <AddGrouperModal
        isOpen={isAddTagOpen}
        onClose={() => setIsAddTagOpen(false)}
        type="tag"
        onSuccess={() => {
          setIsAddTagOpen(false);
          fetchTags();
        }}
      />
    </>
  );
}
