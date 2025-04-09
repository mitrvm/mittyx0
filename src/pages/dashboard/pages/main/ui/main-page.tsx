import { useTranslation } from 'react-i18next';
import { DashboardLayoutSidebar } from '~pages/dashboard/ui/layout';

export function MainPage() {
  const { t } = useTranslation();
  return (
    <DashboardLayoutSidebar>
      <div>
        <h1>{t('mainPageText')}</h1>
        <h1>{t('mainPageText')}</h1>
        <h1>{t('mainPageText')}</h1>
        <h1>{t('mainPageText')}</h1>
        <h1>{t('mainPageText')}</h1>
      </div>
    </DashboardLayoutSidebar>
  );
}
