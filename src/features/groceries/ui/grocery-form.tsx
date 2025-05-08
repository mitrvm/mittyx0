import { Form, Input, Select, Alert } from 'antd';
import { useTags, useCategories } from '~entities/groupers';
import { createDropdownRender } from './dropdown-buttons';
import { useGroceries } from '~entities/groceries';
import { useEffect, useState } from 'react';
import { findSimilarNames } from '../utils/similarity-check';

export interface AddGroceryFormData {
  id?: number;
  name: string;
  category: number;
  tags: number[];
  priority: number | undefined;
}

export type ModalType = 'add' | 'edit';

interface GroceryFormProps {
  form: any;
  isCategorySelectOpen: boolean;
  isTagSelectOpen: boolean;
  setIsCategorySelectOpen: (value: boolean) => void;
  setIsTagSelectOpen: (value: boolean) => void;
  onAddCategory: () => void;
  onAddTag: () => void;
}

export function GroceryForm({
  form,
  isCategorySelectOpen,
  isTagSelectOpen,
  setIsCategorySelectOpen,
  setIsTagSelectOpen,
  onAddCategory,
  onAddTag,
}: GroceryFormProps) {
  const { tags } = useTags();
  const { categories } = useCategories();
  const { groceries, fetchGroceries } = useGroceries();
  const [similarItems, setSimilarItems] = useState<string[]>([]);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const categoryDropdownRender = createDropdownRender(
    onAddCategory,
    'Добавить категорию',
  );
  const tagDropdownRender = createDropdownRender(onAddTag, 'Добавить тег');

  return (
    <Form form={form} layout="vertical" initialValues={{ tags: [] }}>
      <Form.Item
        name="name"
        label="Название товара"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Input
          placeholder="Введите название товара"
          onChange={(e) => {
            const similar = findSimilarNames(
              e.target.value,
              groceries.map((item) => item.name),
            );
            setSimilarItems(similar);
          }}
        />
      </Form.Item>

      {similarItems.length > 0 && (
        <Alert
          message="Похожие товары уже существуют:"
          description={
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {similarItems.map((name, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>{name}</li>
              ))}
            </ul>
          }
          type="warning"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      <Form.Item
        name="category"
        label="Категория"
        rules={[{ required: true, message: 'Обязательное поле' }]}
      >
        <Select
          placeholder="Выберите категорию"
          showSearch
          open={isCategorySelectOpen}
          onDropdownVisibleChange={setIsCategorySelectOpen}
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          dropdownRender={categoryDropdownRender}
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="tags" label="Теги">
        <Select
          placeholder="Выберите теги"
          allowClear
          mode="multiple"
          open={isTagSelectOpen}
          onDropdownVisibleChange={setIsTagSelectOpen}
          filterOption={(input, option) =>
            (option?.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          dropdownRender={tagDropdownRender}
        >
          {tags.map((tag) => (
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
  );
}
