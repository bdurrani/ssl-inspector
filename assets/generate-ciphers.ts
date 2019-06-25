import csvparse from "csv-parse/lib/sync";
import fs from "fs";
import path from "path";

const cipherSource = "tls-parameters-4.csv";
const inputPath = path.join(__dirname, cipherSource);

const csvdata = fs.readFileSync(inputPath, "utf8");
const records: Array<any> = csvparse(csvdata, {
  columns: true
});

const actualRecords = records
  .filter(rec => {
    const description: string = rec.Description;
    if (!description) {
      return false;
    }
    const lowercaseDescription = description.toLowerCase();
    if (lowercaseDescription === "unassigned") {
      return false;
    }

    if (lowercaseDescription.includes("reserved")) {
      return false;
    }

    return true;
  })
  .map(rec => {
    const val = rec.Value.split(",").map((i: string) => parseInt(i, 16));
    rec.Value = val;
    return rec as Record;
  });

const cleanedRecords = JSON.stringify(actualRecords, null, "\t");
const outFile = path.join(__dirname, "..", "src", "outfile.json");

console.log(`Generating cipher data to ${outFile}`);

fs.writeFileSync(outFile, cleanedRecords, {
  encoding: "utf8"
});

interface Record {
  Description: string;
  ["DTLS-OK"]: string;
  Recommended: string;
  Reference: string;
  Value: number[];
}
