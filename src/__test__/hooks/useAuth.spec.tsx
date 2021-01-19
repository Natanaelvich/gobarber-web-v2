import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/modules/AuthContext';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should increment counter', async () => {
    const user = {
      id: 'user-123',
      name: 'John doe',
      email: 'johndoe@example.com.br',
    };
    apiMock.onPost('sessions').reply(200, {
      user,
      token: 'token-123',
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@Gobarber:token', 'token-123');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restore saved data from storage when auth inits', () => {
    const user = {
      id: 'user-123',
      name: 'John doe',
      email: 'johndoe@example.com.br',
    };

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return 'token-123';
        case '@Gobarber:user':
          return JSON.stringify(user);
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should be able to sign out', () => {
    const user = {
      id: 'user-123',
      name: 'John doe',
      email: 'johndoe@example.com.br',
    };

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return 'token-123';
        case '@Gobarber:user':
          return JSON.stringify(user);
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledWith('@Gobarber:token');
    expect(removeItemSpy).toHaveBeenCalledWith('@Gobarber:user');

    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', () => {
    const user = {
      id: 'user-123',
      name: 'John doe',
      email: 'johndoe@example.com.br',
      avatar_url: '',
    };

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
