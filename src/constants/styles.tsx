import { useTheme } from '~entities/contexts/theme-context';

export const useGlobalStyles = () => {
  const { isDarkTheme } = useTheme();
  return {
    text: {
      fontFamily: `fontFamily: 'Inter, sans-serif'`,
      fontWeight: '400',
      color: '#333333',
    },
    textBold: {
      fontFamily: `fontFamily: 'Inter, sans-serif'`,
      fontWeight: '700',
      color: '#1E232D',
    },
    floatingLabel: {
      position: 'absolute',
      pointerEvents: 'none',
      left: 15,
      top: 8,
      fontSize: 14,
      color: '#848E9C',
      transition: '0.2s ease all',
    },
    divider: {
      border: isDarkTheme ? '1px solid #818181' : '1px solid #F5F5F5',
    },
  };
};
