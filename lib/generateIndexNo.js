import Student from "../models/student.js";

const initial = (s) => (s || "").trim().charAt(0).toUpperCase();

export default  async function generateIndexNo({
    applyingProgram,
    applyingYear,
    applyingSemester,
    refference,
}) {
    const year = Number(applyingYear) || new Date().getFullYear();
    const indexKey = `${year}${initial(applyingSemester)}`; 

    
    const rows = await Student.find({ indexKey }).select("indexSeq").lean();
    const used = new Set(rows.map((r) => r.indexSeq));

    
    let indexSeq = 101;
    while (used.has(indexSeq)) indexSeq++;

    const ref = refference && refference !== "N/A" ? `/${refference}` : "";
    const indexNo = `${initial(applyingProgram)}/${indexKey}/${String(indexSeq).padStart(3, "0")}${ref}`;

    return { indexNo, indexKey, indexSeq };
};