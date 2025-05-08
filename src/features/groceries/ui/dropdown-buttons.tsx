import { Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

interface DropdownButtonProps {
  onClick: () => void;
  label: string;
}

function DropdownButton({ onClick, label }: DropdownButtonProps) {
  return (
    <>
      <Divider style={{ margin: '8px 0' }} />
      <Button
        type="text"
        icon={<PlusOutlined />}
        onClick={onClick}
        style={{ width: '100%', textAlign: 'left' }}
      >
        {label}
      </Button>
    </>
  );
}

export const MemoizedDropdownButton = React.memo(DropdownButton);

export function createDropdownRender(onClick: () => void, label: string) {
  return function DropdownRender(menu: React.ReactNode) {
    return (
      <>
        {menu}
        <MemoizedDropdownButton onClick={onClick} label={label} />
      </>
    );
  };
}
