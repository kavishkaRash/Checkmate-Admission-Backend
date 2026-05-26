import Student from "../models/student.js";

// ─── CREATE ───────────────────────────────────────────────────────────────────
export const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: saved,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET ALL WITH ADVANCED FILTERS ────────────────────────────────────────────
export const getStudents = async (req, res) => {
  try {
    const { university, program, city, search, semester, year } = req.query;

    const filter = {};
    if (university) filter.applyingUniversity = university;
    if (program) filter.applyingProgram = program;
    if (city) filter.city = city;
    
    // 1. Semester Filter එක සාමාන්‍ය විදියට එකතු කරනවා
    if (semester) filter.applyingSemester = semester;
    
    // 2. Year Filter එක Index Number එක ඇතුලෙන් පරීක්ෂා කරනවා (උදා: /2024/)
    if (year) {
      filter.indexNo = { $regex: `/${year}/`, $options: "i" };
    }

    // 3. Global Search (Name, Index, Passport, Email)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { indexNo: { $regex: search, $options: "i" } },
        { passportNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Server Terminal එකේ මොන වගේ Filters ද ක්‍රියාත්මක වෙන්නේ කියලා බලාගන්න ලොග් එකක්
    console.log("⚡ Active Filter Query:", JSON.stringify(filter, null, 2));

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── GET ONE ──────────────────────────────────────────────────────────────────
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────────────
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};