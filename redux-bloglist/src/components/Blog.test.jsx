import { cleanup, render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";

describe("<Blog /> component", () => {
  let container;
  const blog = {
    title: "new title",
    author: "new author",
    url: "new.url",
    likes: 5,
    user: {
      username: "nhs",
      name: "nhs",
      id: "fkdai44jjfsjajfhas",
    },
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("initially blog summary is rendered but details is not rendered", async () => {
    //checking if the blog summary is properly rendered with proper content
    const summary = container.querySelector(".blogSummary");
    expect(summary).toBeDefined();
    expect(summary).toHaveTextContent(`${blog.title} - ${blog.author}`);

    //checking if the button is in view state
    screen.getByText("view");

    //checking that details is not rendered
    const details = container.querySelector(".blogDetails");
    expect(details).toBeNull();
  });

  test("details is shown when view button is clicked", async () => {
    const button = screen.getByText("view");

    await userEvent.click(button);

    //checking if button value is changed to hide
    expect(button).toHaveValue("hide");

    //checking that blog details is rendered properly
    const details = container.querySelector(".blogDetails");
    expect(details).toBeDefined();
    expect(details).toHaveTextContent(blog.url);
    expect(details).toHaveTextContent(`likes ${blog.likes}`);
    expect(details).toHaveTextContent(blog.user.name);
  });

  test("if clicked twice, 2 clicks are registered", async () => {
    const increaseLikes = vi.fn();

    cleanup();
    render(<Blog blog={blog} increaseLikes={increaseLikes} />);

    const viewButton = screen.getByText("view");

    await userEvent.click(viewButton);

    const likeButton = screen.getByText("like");

    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(increaseLikes.mock.calls).toHaveLength(2);
  });
});
