import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import api from 'src/services/api';
import MockAdapter from 'axios-mock-adapter';
import Profile from 'src/pages/Profile';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedUpdateUser = jest.fn();

jest.mock('../../hooks/modules/AuthContext.tsx', () => {
  return {
    useAuth: () => ({
      user: {
        id: '123asd',
        name: 'test_name',
        email: 'teste@teste.com',
        avatar_url: null,
      },
      updateUser: mockedUpdateUser,
    }),
  };
});

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

describe('Profile Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to edit my profile data', async () => {
    apiMock.onPut('/profile/update').reply(200, {
      id: 'id_user',
      name: 'test_name',
      email: 'teste@teste.com',
      avatar_url: null,
      token: 'abc123',
    });
    mockedUpdateUser.mockImplementation(data => {
      return data;
    });

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const old_passwordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const password_confirmationField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameField, {
      target: { value: 'new teste' },
    });
    fireEvent.change(emailField, {
      target: { value: 'newteste@teste.com' },
    });
    fireEvent.change(old_passwordField, {
      target: { value: 'old_password' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'new_password' },
    });
    fireEvent.change(password_confirmationField, {
      target: { value: 'new_password' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedUpdateUser).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' }),
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to edit profile without required data', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const old_passwordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const password_confirmationField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameField, {
      target: { value: null },
    });
    fireEvent.change(emailField, {
      target: { value: null },
    });
    fireEvent.change(old_passwordField, {
      target: { value: null },
    });
    fireEvent.change(passwordField, {
      target: { value: null },
    });
    fireEvent.change(password_confirmationField, {
      target: { value: null },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to show toast on error in the profile update', async () => {
    apiMock.onPut('/profile/update').reply(500);

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const old_passwordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const password_confirmationField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar mudanças');

    fireEvent.change(nameField, {
      target: { value: 'new teste' },
    });
    fireEvent.change(emailField, {
      target: { value: 'newteste@teste.com' },
    });
    fireEvent.change(old_passwordField, {
      target: { value: 'old_password' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'new_password' },
    });
    fireEvent.change(password_confirmationField, {
      target: { value: 'new_password' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });

  it('should be able to show toast on error', async () => {
    const event = {
      target: {
        files: ['/not/sure/what/goes/in/here'],
      },
    };

    const data = new FormData();

    data.append('avatar', event.target.files[0]);

    apiMock.onPatch('/users/avatar').reply(200, data);

    mockedUpdateUser.mockImplementation(data => {
      return data;
    });

    const { getByTestId } = render(<Profile />);

    const fileInputField = getByTestId('avatar');

    fireEvent.change(fileInputField, event);

    await wait(() => {
      expect(mockedUpdateUser).toHaveBeenCalled();
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });

  it('should be able to show toast on error update avatar', async () => {
    apiMock.onPatch('/users/avatar').reply(500);
    const event = {
      target: {
        files: [null],
      },
    };

    const { getByTestId } = render(<Profile />);

    const fileInputField = getByTestId('avatar');

    fireEvent.change(fileInputField, event);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
