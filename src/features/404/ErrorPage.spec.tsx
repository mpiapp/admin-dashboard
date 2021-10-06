import { render } from '@testing-library/react';
import ErrorPage from './ErrorPage';

test('renders component error page', () => {
  const { getByText } = render(
      <ErrorPage />
  );

  expect(getByText(/error page/i)).toBeInTheDocument();
});