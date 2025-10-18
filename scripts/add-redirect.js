import fs from "fs";
import path from "path";

const filePath = path.resolve("dist/404.html");
let html = fs.readFileSync(filePath, "utf8");

// إذا لم يكن هناك وسم refresh أضفه تلقائيًا داخل <head>
if (!html.includes('http-equiv="refresh"')) {
  html = html.replace(
    "<head>",
    `<head>\n    <meta http-equiv="refresh" content="0; url=/E-commerce-Final-project/" />`
  );
  fs.writeFileSync(filePath, html, "utf8");
  console.log("✅ Added redirect meta tag to 404.html");
} else {
  console.log("ℹ️ Redirect already present in 404.html");
}
