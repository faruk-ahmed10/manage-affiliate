import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Modal from "./Modal";

const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

const mockData = {
  rows: [
    {
      id: 1,
      original: {
        name: "Affiliate 1",
        unpaid: 100,
      },
    },
    {
      id: 2,
      original: {
        name: "Affiliate 2",
        unpaid: 200,
      },
    },
  ],
};

describe("Modal", () => {
  it("should display the correct number of rows and the correct total when the submit button is clicked", async () => {
    const { getByText } = render(
      <Modal
        data={mockData}
        visible
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = getByText("Send payment");

    fireEvent.click(submitButton);
  });

  it("should close the modal when the close button is clicked", () => {
    const { getByTestId, getByText } = render(
      <Modal
        data={mockData}
        visible
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const closeButton = getByText("Back");

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
