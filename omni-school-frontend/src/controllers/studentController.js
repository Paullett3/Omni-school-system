// GET /api/students?name=Paul&class=10A
exports.getStudents = async (req, res) => {
  try {
    const { name, currentClass } = req.query;
    let query = {};

    // If user typed a name, find names that "start with" that text
    if (name) query.name = { $regex: name, $options: 'i' };
    
    // If they filtered by class, add that to the search
    if (currentClass) query.currentClass = currentClass;

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Search failed on our end. Sorry!" });
  }
};