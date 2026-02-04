const app= require("express");
const mongoose = require("mongoose");



mongoose.connect("mongodb+srv://hdamruthesh222_db_user:vrWJ3vvbfPVWs91P@cluster0.vdndo7z.mongodb.net/?appName=Cluster0/day6")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error:", err.message);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
