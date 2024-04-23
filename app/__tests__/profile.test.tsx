// app/__tests__/profile.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '../profile/page';
import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';

jest.mock('next/navigation', () => require('../__mocks__/next_navigation'));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

describe('ProfilePage Render and Interaction', () => {
  const WrappedProfilePage = () => (
    <MantineProvider>
        <ProfilePage />
    </MantineProvider>
  )


  // Test 01
  it('Renders all fields for input', () => {
    render(<WrappedProfilePage />);
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1234 Main Street')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Apt 5')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('New York City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('NY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('12345')).toBeInTheDocument();
  });

  
});
