import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
];

export function LangSelect() {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onChange={(value) => i18n.changeLanguage(value)}
      style={{ width: 100 }}
    >
      {languages.map((lang) => (
        <Select.Option key={lang.code} value={lang.code}>
          {lang.name}
        </Select.Option>
      ))}
    </Select>
  );
}
