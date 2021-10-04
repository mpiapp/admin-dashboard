import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import Login from './Login';

test('renders all component login', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(getByText(/login page/i)).toBeInTheDocument();
});