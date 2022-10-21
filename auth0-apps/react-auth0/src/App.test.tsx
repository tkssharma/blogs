import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react auth0', () => {
  setTimeout(() => {
    render(<App />);
    const element = screen.getAllByText(/react auth0/i);
    expect(element).toHaveLength(2);
  }, 1000);
});
