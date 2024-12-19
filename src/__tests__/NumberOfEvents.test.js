import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App'; // Import App for integration testing
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getEvents } from '../api'; // Mock or import the API function

jest.mock('../api'); // Mock the API to control test data

describe('<NumberOfEvents /> Component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />
    );
  });

  test('component contains input textbox', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('ensures the default value of textbox is 32', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toHaveValue('32');
  });

  test('textbox value changes when user updates input', async () => {
    const input = NumberOfEventsComponent.getByTestId('numberOfEventsInput');
    const user = userEvent.setup();
    await user.type(input, '{backspace}{backspace}10');
    expect(input).toHaveValue('10');
  });
});

describe('<NumberOfEvents /> Integration with <App />', () => {
  beforeEach(() => {
    // Mock API data
    getEvents.mockResolvedValue([
      { id: 1, location: 'Berlin, Germany', name: 'Event 1' },
      { id: 2, location: 'Berlin, Germany', name: 'Event 2' },
      { id: 3, location: 'Berlin, Germany', name: 'Event 3' },
    ]);
  });

  test('renders a list of events matching the number input by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const NumberOfEventsInput = within(NumberOfEventsDOM).getByTestId('numberOfEventsInput');

    // Change the number of events to 2
    await user.type(NumberOfEventsInput, '{backspace}{backspace}2');

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    // Mocked API response
    const filteredEvents = (await getEvents()).slice(0, 2);

    // Verify the number of rendered events matches the input
    expect(allRenderedEventItems.length).toBe(filteredEvents.length);
  });
});
