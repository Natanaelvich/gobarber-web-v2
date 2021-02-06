import React, { useMemo } from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import Dashboard from 'src/pages/Dashboard';
import { renderHook } from '@testing-library/react-hooks';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const useStateMock = jest.fn();

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

jest.mock('react', () => ({
  // ...jest.requireActual('react'),
  useState: useStateMock,
}));

jest.mock('../../hooks/modules/AuthContext.tsx', () => {
  return {
    useAuth: () => ({
      user: {},
      signOut: jest.fn(),
    }),
  };
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  const setAppointments = jest.fn();

  it('should be able to appointmens date', async () => {
    const { getByText, getByTestId } = render(<Dashboard />);
    useStateMock.mockImplementation(init => [init, setAppointments]);

    // const wrapper = mount(<Dashboard />);
    // expect(wrapper.find('Dropdown').to.have.length(2));

    expect(getByText('Bem-vindo,')).toBeTruthy();
    // expect(getByTestId('appointment-morning')).toBeTruthy();
    expect(setAppointments).toHaveBeenCalledTimes(1);
  });

  // it('should not be able to sign in with invalid crendencials', async () => {
  //   const { getByPlaceholderText, getByText } = render(<SingnIn />);

  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailField, {
  //     target: { value: 'not-valid-email' },
  //   });
  //   fireEvent.change(passwordField, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await wait(() => {
  //     expect(mockedHistoryPush).not.toHaveBeenCalledWith('/dashboard');
  //   });
  // });

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
