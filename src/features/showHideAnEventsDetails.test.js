import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default', ({ given, then }) => {
    given('the user opens the app', () => {
      render(<App />);
    });

    then('all event details should be collapsed', () => {
      const eventDetails = document.querySelector('.eventDetails');  // ✅ Correct selector
      expect(eventDetails).toBeNull();
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    given('the user opens the app', () => {
      render(<App />);
    });

    when('the user clicks on the "Show Details" button of an event', async () => {
        const showDetailsButton = await screen.findAllByRole('button', { name: /show details/i });
        fireEvent.click(showDetailsButton[0]);
        
    });

    then('the event details should be visible', () => {
      const eventDetails = document.querySelector('.eventDetails');  // ✅ Correct selector
      expect(eventDetails).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details',({ given, when, then }) => {
    given('the user opens the app', async () => {
      render(<App />);
      const showDetailsButton = await screen.findAllByRole('button', { name: /show details/i });
        fireEvent.click(showDetailsButton[0]);
    });

    when('the user clicks on the "Hide Details" button of that event', async () => {
        const hideDetailsButton = await screen.findByRole('button', { name: /hide details/i });
        fireEvent.click(hideDetailsButton);
    });

    then('the event details should be hidden', () => {
      const eventDetails = document.querySelector('.eventDetails');  // ✅ Correct selector
      expect(eventDetails).toBeNull();
    });
  });

});
