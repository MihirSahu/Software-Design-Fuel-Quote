import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test-utils/index';
import '@testing-library/jest-dom'
import { before } from 'node:test';
import LoginPage from '../login/page';

beforeEach(() => {
    window.confirm = jest.fn(() => true); // This will make window.confirm always return true
})

afterEach(() => {
    window.confirm.mockClear(); // This will clear the mock after each test
});

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

test('renders LoginPage', () => {
    const { getByText } = render(<LoginPage />);
    expect(getByText('Login')).toBeInTheDocument();
});