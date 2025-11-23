import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders and executes action', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {} as any);
    render(<App />);
    const button = screen.getByText('Execute Append Action');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => expect(alertSpy).toHaveBeenCalled());
    alertSpy.mockRestore();
  });
});
