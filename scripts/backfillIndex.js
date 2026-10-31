import "dotenv/config";
import mongoose from "mongoose";
import Student from "../models/student.js";

await mongoose.connect(process.env.MONGO_URL);

const students = await Student.find({ indexSeq: { $exists: false } });
let done = 0;
const skipped = [];

for (const s of students) {
  const m = /^[A-Z]\/(\d{4}[A-Z])\/(\d{3})/.exec(s.indexNo || "");
  if (!m) {
    skipped.push(s.indexNo || s._id.toString());
    continue;
  }
  try {
    await Student.updateOne(
      { _id: s._id },
      { $set: { indexKey: m[1], indexSeq: parseInt(m[2], 10) } }
    );
    done++;
  } catch (e) {
    skipped.push(`${s.indexNo} (${e.message})`);
  }
}

console.log(`Updated: ${done}`);
console.log(`Skipped: ${skipped.length}`, skipped);
await mongoose.disconnect();