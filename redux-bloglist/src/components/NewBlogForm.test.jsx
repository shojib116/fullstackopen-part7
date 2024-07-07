import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlogForm from "./NewBlogForm";
import { expect, test } from "vitest";

test("right details are submitted when creating a blog", async () => {
  const createNew = vi.fn();

  const newBlog = {
    title: "new title",
    author: "new author",
    url: "new.url",
  };

  const contianer = render(<NewBlogForm createNew={createNew} />).container;

  const titleInput = contianer.querySelector("#title");
  const authorInput = contianer.querySelector("#author");
  const urlInput = contianer.querySelector("#url");
  const submitButton = screen.getByText("create");

  await userEvent.type(titleInput, newBlog.title);
  await userEvent.type(authorInput, newBlog.author);
  await userEvent.type(urlInput, newBlog.url);
  await userEvent.click(submitButton);

  expect(createNew.mock.calls).toHaveLength(1);

  const props = createNew.mock.calls[0][0];
  expect(props.title).toBe(newBlog.title);
  expect(props.author).toBe(newBlog.author);
  expect(props.url).toBe(newBlog.url);
});
