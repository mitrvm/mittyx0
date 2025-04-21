import { TagsAndCategories } from '~entities/groupers';
import React from 'react';

export interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: TagsAndCategories;
  index: number;
  children: React.ReactNode;
}

export interface TableProps {
  type: 'Tags' | 'Categories';
  data: TagsAndCategories[];
  onEdit: () => void;
}
