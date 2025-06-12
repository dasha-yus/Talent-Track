import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme, App as AppContainer } from 'antd';

import { router } from './routes';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#c6e4f5',
        },
      }}
    >
      <AppContainer>
        <RouterProvider router={router} />
      </AppContainer>
    </ConfigProvider>
  );
};

export default App;
