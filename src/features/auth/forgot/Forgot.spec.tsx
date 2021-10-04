import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import Forgot from './Forgot';

test('renders component forgot', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Forgot />
    </Provider>
  );

  expect(getByText(/forgot page/i)).toBeInTheDocument();
});