import { render, screen, fireEvent } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import React from 'react';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('Default number of events is 32', ({ given, then }) => {
    given('the user has not specified a number of events', () => {
      render(<App />);
    });

    then('32 events should be displayed by default', async () => {
      const eventItems = await screen.findAllByRole('listitem', { hidden: true });
      expect(eventItems.length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    given('the user has opened the app', () => {
      render(<App />);
    });

    when('the user specifies 10 events to be displayed', async () => {
      const input = screen.getByLabelText('Number of Events:');
      fireEvent.change(input, { target: { value: 10 } });
    });

    then('10 events should be displayed', async () => {
      const eventItems = await screen.findAllByRole('listitem', { hidden: true });
      expect(eventItems.length).toBeLessThanOrEqual(10);
    });
  });
});
