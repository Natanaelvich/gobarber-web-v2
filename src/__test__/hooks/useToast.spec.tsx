import { renderHook, act } from '@testing-library/react-hooks';
import {
  ToastMessage,
  ToastProvider,
  useToast,
} from 'src/hooks/modules/ToastContext';

jest.mock('uuid', () => {
  return {
    v4: () => 'id-abc-123',
  };
});

describe('Toast hook', () => {
  it('should be able to add news toasts', async () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const message: Omit<ToastMessage, 'id'> = {
      type: 'success',
      title: 'test1',
      description: 'desc test1',
    };
    act(() => {
      result.current.addToast(message);
    });

    expect(result.current.messages).toEqual([
      {
        id: 'id-abc-123',
        ...message,
      },
    ]);
  });

  it('should be able to remove toasts', async () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const message: Omit<ToastMessage, 'id'> = {
      type: 'success',
      title: 'test1',
      description: 'desc test1',
    };
    act(() => {
      result.current.addToast(message);
    });

    // const message: Omit<ToastMessage, 'id'> = {
    //   type: 'success',
    //   title: 'test1',
    //   description: 'desc test1',
    // };
    // act(() => {
    //   result.current.addToast(message);
    // });
    // act(() => {
    //   result.current.addToast(message);
    // });
    // act(() => {
    //   result.current.addToast(message);
    // });

    act(() => {
      result.current.removeToast('id-abc-123');
    });

    expect(result.current.messages).toEqual([]);
  });
});
