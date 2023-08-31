import express from "express";
import ReactDOMServer from "react-dom/server";
import templatePath from "./index.html";
import { readFileSync } from "fs";
import path from "path";

export const html = (root: string) =>
  readFileSync(path.resolve(__dirname, templatePath), "utf8").replace(
    "{{root}}",
    root
  );

const render = (element: React.ReactElement) =>
  ReactDOMServer.renderToString(element);

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.send(
    html(
      render(
        <div className="p-10">
          <h1 className="text-xl font-semibold mb-4">Hello World!</h1>
          <button
            hx-get="/click"
            hx-swap="outerHTML"
            className="text-xl bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Click Me!
          </button>
        </div>
      )
    )
  );
});

router.get("/click", (req, res) => {
  res.send(
    render(
      <h1 className="text-xl bg-green-500 text-white px-4 py-2 rounded-md">
        Clicked!
      </h1>
    )
  );
});

export default router;
