// HeaderTabs.test.js or HeaderTabs.test.tsx if using TypeScript

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderTabs } from '../../components/Navbar/HeaderTabs'; // Adjust the import path based on your project structure
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

jest.mock('next/navigation', () => require('../__mocks__/next_navigation'));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

describe('HeaderTabs Component', () => {
    const WrappedHeaderPage = () => (
        <MantineProvider>
          <HeaderTabs />
        </MantineProvider>
    );


    // Test 01
    it('renders tabs and settings dropdown', () => {
        render(<WrappedHeaderPage />);
        expect(screen.getByText('Quote')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

});
