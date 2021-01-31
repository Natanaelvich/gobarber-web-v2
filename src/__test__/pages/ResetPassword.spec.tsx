import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import api from 'src/services/api';
import MockAdapter from 'axios-mock-adapter';
import ResetPassword from 'src/pages/ResetPassword';

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

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to reset password', async () => {
    apiMock.onPost('password/reset').reply(200);
    mockedReplace.mockImplementation(() => 'abc123');

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const senhaField = getByPlaceholderText('Senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar Senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(senhaField, {
      target: { value: 'new_password' },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: 'new_password' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to reset password without token', async () => {
    mockedReplace.mockImplementation(() => null);
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const senhaField = getByPlaceholderText('Senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar Senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(senhaField, {
      target: { value: 'new_password' },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: 'new_password' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });

  it('should not be able to reset password with invalid crendencials', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const senhaField = getByPlaceholderText('Senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar Senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(senhaField, {
      target: { value: '' },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: '' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });
});
