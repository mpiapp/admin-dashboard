import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import Register from './Register';

test('renders all component register', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Register />
    </Provider>
  );

  expect(getByText(/register page/i)).toBeInTheDocument();
});