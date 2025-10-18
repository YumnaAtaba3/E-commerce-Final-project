import fs from "fs";

const source = "dist/index.html";
const dest = "dist/404.html";

fs.copyFileSync(source, dest);
console.log("✅ Created 404.html successfully");
