import { render } from '@testing-library/react';
import ErrorPage from './404';

test('renders component error page', () => {
  const { getByText } = render(
      <ErrorPage />
  );

  expect(getByText(/error page/i)).toBeInTheDocument();
});