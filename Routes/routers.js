const express = require("express");
const router = express.Router();
const fs = require("fs");
const { join } = require("path");

const renderLayout = (content) => {
  const header = fs.readFileSync(
    join(__dirname, "../views/layout/header.html"),
    "utf-8"
  );
  const footer = fs.readFileSync(
    join(__dirname, "../views/layout/footer.html"),
    "utf-8"
  );
  const layout = fs.readFileSync(
    join(__dirname, "../views/layout.html"),
    "utf-8"
  );
  return layout
    .replace("{{header}}", header)
    .replace("{{content}}", content)
    .replace("{{footer}}", footer);
};

const viewRoutes = [
  { path: "/", view: "index.html" },
  { path: "/SanPham", view: "SanPham.html" },
  { path: "/DanhMuc", view: "DanhMucSanPham.html" },
];

viewRoutes.forEach(({ path, view }) => {
  router.get(path, (req, res) => {
    const content = fs.readFileSync(
      join(__dirname, `../views/${view}`),
      "utf-8"
    );
    res.send(renderLayout(content));
  });
});

module.exports = router;
