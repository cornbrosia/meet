import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import React from "react";
import { getEvents, extractLocations } from "../api";

// Mock API
jest.mock("../api", () => ({
  getEvents: jest.fn(() =>
    Promise.resolve([
      { id: 1, location: "New York", name: "Event 1" },
      { id: 2, location: "Berlin", name: "Event 2" },
    ])
  ),
  extractLocations: jest.fn(() => ["New York", "Berlin"]),
}));

afterEach(() => {
  jest.clearAllMocks(); // Reset mock state between tests
});

test("renders App and resolves useEffect updates", async () => {
  render(<App />);

  // Wait for events to be set
  await waitFor(() => {
    const numberOfEventsInput = screen.getByTestId("numberOfEventsInput");
    expect(numberOfEventsInput).toBeInTheDocument();
    expect(numberOfEventsInput.value).toBe("32"); // Default value
  });

  // Verify CitySearch component is rendered
  expect(screen.getByText(/city search/i)).toBeInTheDocument();
});
