import React from 'react';
import Dashboard from 'src/pages/Dashboard';
import api from 'src/services/api';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

let daysAvailables: MonthAvailabilityItem[] = [];

for (let i = 0; i < 31; i++) {
  if (i === 11) {
    daysAvailables.push({
      day: i,
      available: true,
    });
  } else {
    daysAvailables.push({
      day: i,
      available: false,
    });
  }
}
const apointmentsFake = [
  {
    id: 'id-appointment',
    provider_id: 'provider_id',
    user_id: 'user_id',
    user: {
      id: 'user_id',
      name: 'john',
      email: 'john@gmail.com',
      avatar_url: null,
    },
    date: '2021-02-07T11:00:00.000Z',
  },
  {
    id: 'id-appointment-1',
    provider_id: 'provider_id-1',
    user_id: 'user_id-1',
    user: {
      id: 'user_id-1',
      name: 'john1',
      email: 'john1@gmail.com',
      avatar_url: null,
    },
    date: '2021-02-07T18:00:00.000Z',
  },
];

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
    apiMock
      .onGet('/providers/abc-123/month-availibity')
      .reply(200, daysAvailables);

    const { getByText } = render(<Dashboard />);

    await waitFor(() =>
      expect(getByText('Bem-vindo,')).toBeTruthy()
    );

    screen.logTestingPlaygroundURL()
  });

  it('should be able to look appointments list', async () => {
    apiMock.onGet('/providers/appointments').reply(200, apointmentsFake);

    const { getByTestId } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByTestId('appointments-list-morning')).toBeTruthy();
      expect(getByTestId('appointments-list-afternoon')).toBeTruthy();
    });
  }, 10000);

  it('should be able to see the calendar', async () => {
    const { container } = render(<Dashboard />);

    await waitFor(() =>{
      const calendar = container.querySelector('.DayPicker');

      expect(calendar).toBeTruthy();
    });
  }, 10000);

  it('should be able to change date and month at in calendar', async () => {
    const { container, getByText } = render(<Dashboard />);

    await waitFor(() =>{
      const calendarDay = container.querySelector(
        '[aria-label="Thu Feb 11 2021"]',
      );
      const calendarNextMonth = container.querySelector(
        '[aria-label="Next Month"]',
      );
      if (calendarDay) {
        fireEvent(
          calendarDay,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      }
      if (calendarNextMonth) {
        fireEvent(
          calendarNextMonth,
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          }),
        );
      }

      expect(getByText('Bem-vindo,')).toBeTruthy();
      expect(getByText('Horários agendados')).toBeTruthy();
      expect(getByText('Manhã')).toBeTruthy();
      expect(getByText('Tarde')).toBeTruthy();
    });
  }, 10000);
});
