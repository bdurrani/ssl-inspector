import csvparse from "csv-parse/lib/sync";
import fs from "fs";
import path from "path";

const cipherSource = "tls-parameters-4.csv";
const inputPath = path.join(__dirname, cipherSource);

const csvdata = fs.readFileSync(inputPath, "utf8");
const records: Array<any> = csvparse(csvdata, {
  columns: true
});

const actualRecords = records.map(rec => {
  const val = rec.Value.split(",").map((i: string) => parseInt(i, 16));
  rec.Value = val;
  return rec as Record;
});

const blah = JSON.stringify(actualRecords, null, "\t");
const outFile = path.join(__dirname, "outfile.json");

fs.writeFileSync(outFile, blah);
interface Record {
  Description: string;
  ["DTLS-OK"]: string;
  Recommended: string;
  Reference: string;
  Value: number[];
}

console.log(__dirname);

(async () => {})();
