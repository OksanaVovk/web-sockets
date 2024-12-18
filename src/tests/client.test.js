import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import WebSocket from "./ws.js";

describe("index.html", () => {
  function setup(jsx) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  afterAll(() => {}
  );  
  
  const cases = [
    [
      "Sender",
      "This text will be sent to WebSocket Server",
      "Sender: This text will be sent to WebSocket Server",
    ],
    ["Another sender", "Message 2", "Another sender: Message 2"],
    ["Helga", "Hello!", "Helga: Hello!"],
  ];
  test.each(cases)(
    "With given sender %p and message %p client sends %p to the server.",
    async (sender, message, result) => {

      const ws = new WebSocket();
      const { user } = setup(<App ws={ws} />);
      let inputUserName = screen.getByPlaceholderText("Your nickname");
      let inputMessage = screen.getByPlaceholderText("Type your message");

      let button = screen.getByRole("button", { name: /send/i });

      const { jest } = require("@jest/globals");
      const spy = jest.spyOn(ws, "send");

      await user.type(inputUserName, sender);
      await user.type(inputMessage, message);
      await user.click(button);
      
      expect(spy).toHaveBeenCalledWith(result);
    }
  );

  test("Data is displayed correctly when received from WebSocket Server", async () => {
    const ws = new WebSocket();
    render(<App ws={ws} />);
    await act(() => ws.send("This is test data"));
    await act(() => ws.send("And another test data"));
    let areaChat = screen.getByLabelText("chat");

    await waitFor(
      () =>
        expect(areaChat).toHaveTextContent(
          'This is test data And another test data'
        ),
      {
        options: { timeout: 2000 },
      }
    );
  });
});
