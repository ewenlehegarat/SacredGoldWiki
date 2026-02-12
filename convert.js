const fs = require("fs");
const path = require("path");

const inputFolder = "./csv";
const outputFolder = "./json";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
  if (file.endsWith(".csv")) {
    const csv = fs.readFileSync(path.join(inputFolder, file), "utf-8");
    const lines = csv.split("\n").filter(line => line.trim() !== "");
    const headers = lines[0].split(",");

    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const obj = {};

      headers.forEach((header, index) => {
        let value = values[index];

        if (!isNaN(value) && value !== "") {
          value = Number(value);
        }

        obj[header.trim()] = value;
      });

      result.push(obj);
    }

    const jsonFile = file.replace(".csv", ".json");

    fs.writeFileSync(
      path.join(outputFolder, jsonFile),
      JSON.stringify(result, null, 4)
    );

    console.log(`${file} → ${jsonFile} ✔`);
  }
});
