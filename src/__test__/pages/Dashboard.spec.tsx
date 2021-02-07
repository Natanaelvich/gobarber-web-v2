import React from 'react';
import Dashboard from 'src/pages/Dashboard';
import api from 'src/services/api';
import MockAdapter from 'axios-mock-adapter';
import { render, wait } from '@testing-library/react';

const apiMock = new MockAdapter(api);
const mockedHistoryPush = jest.fn();
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
      user: {
        id: 'abc-123',
      },
      signOut: jest.fn(),
    }),
  };
});

describe('Dashboard Page', () => {
  it('should be able to look appointments dashboard', async () => {
    apiMock.onGet('/providers/appointments').reply(200, []);
    apiMock.onGet('/providers/abc-123/month-availibity').reply(200, []);

    const { getByText } = render(<Dashboard />);

    await wait(() => {
      expect(getByText('Bem-vindo,')).toBeTruthy();
    });
  });

  it('should be able to look appointments list', async () => {
    apiMock.onGet('/providers/appointments').reply(200, [
      {
        id: 'id-appointment',
        provider_id: 'provider_id',
        user_id: 'user_id',
        user: {
          id: 'user_id',
          name: 'john',
          email: 'john@gmail.com',
          avatar: null,
          created_at: '2021-02-07T03:28:52.000Z',
          updated_at: '2021-02-07T03:28:52.000Z',
          avatar_url: null,
        },
        date: '2021-02-07T11:00:00.000Z',
        created_at: '2021-02-07T03:29:14.000Z',
        updated_at: '2021-02-07T03:29:14.000Z',
      },
      {
        id: 'id-appointment-1',
        provider_id: 'provider_id-1',
        user_id: 'user_id-1',
        user: {
          id: 'user_id-1',
          name: 'john1',
          email: 'john1@gmail.com',
          avatar: null,
          created_at: '2021-02-07T03:28:52.000Z',
          updated_at: '2021-02-07T03:28:52.000Z',
          avatar_url: null,
        },
        date: '2021-02-07T18:00:00.000Z',
        created_at: '2021-02-07T03:29:14.000Z',
        updated_at: '2021-02-07T03:29:14.000Z',
      },
    ]);

    const { getByTestId, getByText } = render(<Dashboard />);

    await wait(() => {
      expect(getByTestId('appointments-list-morning')).toBeTruthy();
      expect(getByTestId('appointments-list-afternoon')).toBeTruthy();
    });
  }, 10000);

  // it('should dysplay an error  if login fails', async () => {
  //   mockedSignIn.mockImplementation(() => {
  //     throw new Error();
  //   });

  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, {
  //     target: { value: 'johndoe@example.com' },
  //   });
  //   fireEvent.change(passwordField, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await wait(() => {
  //     expect(mockedAddToast).toHaveBeenCalledWith(
  //       expect.objectContaining({ type: 'error' }),
  //     );
  //   });
  // });
});
