import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home site/i);
  expect(linkElement).toBeInTheDocument();
});
