const express = require("express");
const router = express.Router();
const fs = require("fs");
const { join } = require("path");

const createRouteHandler = require("../middleware/controllerHandler");

const InvoicedetailController = require("../controllers/InvoicedetailController");
const InvoiceController = require("../controllers/InvoiceController");
const MilkbrandController = require("../controllers/MilkbrandController");
const MilkdetailController = require("../controllers/MilkdetailController");
const MilktasteController = require("../controllers/MilktasteController");
const MilktypeController = require("../controllers/MilktypeController");
const PackagingunitController = require("../controllers/PackagingunitController");
const ProductController = require("../controllers/ProductController");
const TargetuserController = require("../controllers/TargetuserController");
const UsagecapacityController = require("../controllers/UsagecapacityController");
const UserinvoiceController = require("../controllers/UserinvoiceController");
const VoucherController = require("../controllers/VoucherController");

const routes = {
  Invoicedetail: InvoicedetailController,
  Invoice: InvoiceController,
  Milkbrand: MilkbrandController,
  Milkdetail: MilkdetailController,
  Milktaste: MilktasteController,
  Milktype: MilktypeController,
  Packagingunit: PackagingunitController,
  Product: ProductController,
  Targetuser: TargetuserController,
  Usagecapacity: UsagecapacityController,
  Userinvoice: UserinvoiceController,
  Voucher: VoucherController,
};

// Setting up API routes dynamically based on controllers
Object.entries(routes).forEach(([routeName, controller]) => {
  router.get(
    `/api/${routeName}/lst`,
    createRouteHandler(controller, `getAll${routeName}s`)
  );
  router.get(
    `/api/${routeName}/:id`,
    createRouteHandler(controller, `get${routeName}ById`)
  );
  router.delete(
    `/api/${routeName}/:id`,
    createRouteHandler(controller, `delete${routeName}`)
  );
  router.post(
    `/api/${routeName}/add`,
    createRouteHandler(controller, `add${routeName}`)
  );
  router.put(
    `/api/${routeName}/update/:id`,
    createRouteHandler(controller, `update${routeName}`)
  );
});

// Function to render layout with content
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
  { path: "/SanPham/:id", view: "SanPham.html" },
  { path: "/DanhMuc", view: "DanhMucSanPham.html" },
  { path: "/DangNhap", view: "DangNhap.html" },
  { path: "/giohang", view: "giohang.html" },
];

// Set up view routes
viewRoutes.forEach(({ path, view }) => {
  router.get(path, (req, res) => {
    try {
      const content = fs.readFileSync(
        join(__dirname, `../views/${view}`),
        "utf-8"
      );
      res.send(renderLayout(content));
    } catch (error) {
      console.error(`Error reading view file: ${view}`, error);
      res.status(500).send("Internal Server Error");
    }
  });
});

module.exports = router;
