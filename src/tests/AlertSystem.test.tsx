import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import user-event
import AlertSystem from "../pages/AlertSystem";
import "@testing-library/jest-dom";

test("renders the initial rows correctly", () => {
  render(<AlertSystem />);

  const tableRows = screen.getAllByRole("row");

  const dataRows = tableRows.slice(1);

  expect(dataRows.length).toBe(9);

  const initialRows = [
    {
      name: "123",
      description: "CDM for 123",
      duration: "00:01:00",
      events: 10,
      status: "New Event",
    },
    {
      name: "234",
      description: "CDM for 234",
      duration: "00:05:00",
      events: 12,
      status: "Actioned by: James",
    },
    {
      name: "345",
      description: "CDM for 345",
      duration: "00:03:00",
      events: 4,
      status: "New Event",
    },
    {
      name: "456",
      description: "CDM for 456",
      duration: "00:05:00",
      events: 6,
      status: "Actioned by: James",
    },
    {
      name: "567",
      description: "CDM for 567",
      duration: "00:05:00",
      events: 18,
      status: "New Event",
    },
    {
      name: "213",
      description: "CDM for 213",
      duration: "00:05:00",
      events: 23,
      status: "Actioned by: James",
    },
    {
      name: "334",
      description: "CDM for 334",
      duration: "00:04:00",
      events: 36,
      status: "New Event",
    },
    {
      name: "435",
      description: "CDM for 435",
      duration: "00:07:00",
      events: 17,
      status: "Actioned by: James",
    },
    {
      name: "543",
      description: "CDM for 543",
      duration: "00:10:00",
      events: 15,
      status: "New Event",
    },
  ];

  dataRows.forEach((row, index) => {
    const cells = row.querySelectorAll("td");
    expect(cells[0].textContent).toBe(initialRows[index].name);
    expect(cells[1].textContent).toBe(initialRows[index].description);
    expect(cells[2].textContent).toBe(initialRows[index].duration);
    expect(cells[3].textContent).toBe(initialRows[index].events.toString());
    expect(cells[4].textContent).toContain(initialRows[index].status);
  });
});

test("Sort By Events button sorts rows in descending order by events", async () => {
  render(<AlertSystem />);

  const sortByEventsButton = await screen.findByRole("button", {
    name: /sort by events/i,
  });

  expect(sortByEventsButton).toBeInTheDocument();

  await userEvent.click(sortByEventsButton);

  const rows = screen.getAllByRole("row").slice(1);

  const events = rows.map((row) => {
    const tableRow = row as HTMLTableRowElement;
    return Number(tableRow.cells[3].textContent);
  });

  expect(events).toEqual([36, 23, 18, 17, 15, 12, 10, 6, 4]);
});
