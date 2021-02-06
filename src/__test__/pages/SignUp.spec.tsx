import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import SignUp from '../../pages/SingnUp';
import api from 'src/services/api';
import MockAdapter from 'axios-mock-adapter';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedSignUp = jest.fn();
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
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/modules/AuthContext.tsx', () => {
  return {
    useAuth: () => ({
      signUP: mockedSignUp,
    }),
  };
});

describe('Sign Up Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign up', async () => {
    apiMock.onPost('users').reply(200);

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nomeField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Casdatrar');

    fireEvent.change(nomeField, {
      target: { value: 'johndoe' },
    });
    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign in with invalid crendencials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nomeField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Casdatrar');

    fireEvent.change(nomeField, {
      target: { value: '' },
    });
    fireEvent.change(emailField, {
      target: { value: 'not-valid-email' },
    });
    fireEvent.change(passwordField, { target: { value: '1234' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });

  it('should dysplay an error  if login fails', async () => {
    apiMock.onPost('users').reply(500);

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nomeField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Casdatrar');

    fireEvent.change(nomeField, {
      target: { value: 'johndoe' },
    });
    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
