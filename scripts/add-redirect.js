
import fs from "fs";
import path from "path";

const filePath = path.resolve("dist/404.html");
let html = fs.readFileSync(filePath, "utf8");


html = html.replace(/<meta[^>]*http-equiv="refresh"[^>]*>/g, "");


if (!html.includes("window.location.replace")) {
  html = html.replace(
    "<head>",
    `<head>
    <script type="text/javascript">
     
      const redirect = window.location.pathname.replace("/E-commerce-Final-project", "");
      sessionStorage.setItem("redirect", redirect);
     
      window.location.replace("/E-commerce-Final-project/");
    </script>`
  );

  fs.writeFileSync(filePath, html, "utf8");
  console.log("✅ Added smart redirect script to 404.html");
} else {
  console.log("ℹ️ Redirect script already present in 404.html");
}
