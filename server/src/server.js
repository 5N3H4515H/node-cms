require("dotenv").config();
const path = require("path");
const port = 3000;
const express = require("express");

const mongoose = require("mongoose");
const routes = require("./api/api");
const app = express();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api", routes);

(async () => {
  const filesToImport = ["./module1.js", "./module2.js"]; // Add more file paths as needed

  try {
    const importPromises = filesToImport.map(async (filePath) => {
      const module = await import(filePath);
      return module;
    });

    const importedModules = await Promise.all(importPromises);

    // Access functions or properties from the imported modules
    Object.keys(importedModules).forEach((moduleName) => {
      const moduleFunctions = importedModules[moduleName];

      Object.keys(moduleFunctions).forEach((funcName) => {
        if (typeof moduleFunctions[funcName] === "function") {
          moduleFunctions[funcName]("Poco");
        }
      });
    });

    console.log("Dynamic import successful!");
  } catch (error) {
    console.error("Error during dynamic import:", error);
  }
})();
app.listen(port, (error) => {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log(`Subprocess server is running on http://localhost:${port}`);
  }
});
