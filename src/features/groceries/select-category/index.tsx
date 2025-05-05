import { Select } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useCategories } from '~entities/groupers';

const StyledSelect = styled(Select)`
  width: 12vw;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export function SelectCategory() {
  const placeholder = 'Категории';
  const { categories, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <StyledSelect
      placeholder={placeholder}
      mode="multiple"
      options={categories.map((category: any) => ({
        label: category.name,
        value: category.id,
      }))}
      allowClear
    />
  );
}
