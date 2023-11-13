import "@testing-library/jest-dom";
import { within } from '@testing-library/dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import EditProfile from "./EditProfile";
import TestEnvironmentWrapper from "../../utils/TestEnvironmentWrapper";
import { LANGUAGE } from "../../utils/enums";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: jest.fn(() => ({
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  })),
}));

test("Renders the entire page", async () => {
  render(
    <TestEnvironmentWrapper>
      <EditProfile />
    </TestEnvironmentWrapper>,
  );

  const { getByText } = within(screen.getByTestId("form-title"));
  expect(getByText("Preferred Programming Language")).toBeInTheDocument();
});

test("Preferred language update", async () => {
  render(
    <TestEnvironmentWrapper>
        <EditProfile />
    </TestEnvironmentWrapper>
  );

  const languageSelector = screen.getByTestId("language-selector");

  const options = screen.getAllByTestId("language-option");

  expect((options[0] as HTMLOptionElement).selected).toBe(true);
  expect((options[1] as HTMLOptionElement).selected).toBe(false);
  expect((options[2] as HTMLOptionElement).selected).toBe(false);

  await waitFor(() => {
    fireEvent.change(languageSelector, {
      target: { value: LANGUAGE.JAVASCRIPT },
    });
  });

  expect((options[0] as HTMLOptionElement).selected).toBe(false);
  expect((options[1] as HTMLOptionElement).selected).toBe(false);
  expect((options[2] as HTMLOptionElement).selected).toBe(true);

  await waitFor(() => {
    fireEvent.change(languageSelector, {
      target: { value: LANGUAGE.CPP },
    });
  });

  expect((options[0] as HTMLOptionElement).selected).toBe(false);
  expect((options[1] as HTMLOptionElement).selected).toBe(true);
  expect((options[2] as HTMLOptionElement).selected).toBe(false);
});

// test("Info alert display on same language submission", async () => {
//   render(
//     <TestEnvironmentWrapper>
//         <EditProfile />
//     </TestEnvironmentWrapper>
//   );

//   const updateButton = screen.getByTestId("update-button");
//   await waitFor(() => fireEvent.click(updateButton));

//   expect(screen.getByText("Same language identified, no need to change!")).toBeInTheDocument();
// });
