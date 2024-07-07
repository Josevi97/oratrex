import { render } from '@testing-library/react';
import LoginForm from './LoginForm';

test('LoginForm should work correctly', () => {
  const component = render(<LoginForm />);

  expect(component.getByText('Enviar')).toBeTruthy();
});
