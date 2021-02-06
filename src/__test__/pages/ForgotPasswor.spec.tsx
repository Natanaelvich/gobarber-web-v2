import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import api from 'src/services/api';
import MockAdapter from 'axios-mock-adapter';
import ForgotPassword from 'src/pages/ForgotPassword';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedReplace = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../hooks/modules/ToastContext.tsx', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: {
        replace: mockedReplace,
      },
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('ForgotPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to send a mail of forgot password to my mail', async () => {
    apiMock.onPost('/password/forgot').reply(200);

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, {
      target: { value: 'my_email@gmail.com' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' }),
      );
    });

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to send mail with email invalid', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, {
      target: { value: 'invalid_email' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });

  it('should be able to show toast on error', async () => {
    apiMock.onPost('/password/forgot').reply(500);

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, {
      target: { value: 'my_email@gmail.com' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
