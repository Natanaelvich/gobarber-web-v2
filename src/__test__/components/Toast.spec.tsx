import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import ToastContainer from 'src/components/ToastContainer';
import { ToastMessage } from 'src/hooks/modules/ToastContext';

const messages: ToastMessage[] = [
  {
    id: '1',
    title: 'test1',
    description: 'test desc 1',
  },
];

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/modules/ToastContext.tsx', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('Toast Component', () => {
  beforeEach(() => {
    mockedRemoveToast.mockClear();
  });

  it('should be able to close toasts', async () => {
    mockedRemoveToast.mockImplementation((messageId: string) => {});
    const { getByTestId } = render(<ToastContainer messages={messages} />);

    const buttonElement = getByTestId('button-close-toast');

    fireEvent.click(buttonElement);

    expect(mockedRemoveToast).toHaveBeenCalledWith('1');
  });

  it('should be able to auto close toasts', async () => {
    mockedRemoveToast.mockImplementation((messageId: string) => {});
    render(<ToastContainer messages={messages} />);

    jest.setTimeout(3500);
    await wait(() => {
      expect(mockedRemoveToast).toHaveBeenCalledWith('1');
    });
  }, 10000);
});
