const express = require("express");
const mongoose = require("mongoose");
const dataSchema = require("./middleware/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");



const app = express();

app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.DBLink)
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("not connected");
  });

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  // console.log(token);

  if (!token) return res.json("token not found");

  let tokenGen = token.split(" ")[1];

  console.log(tokenGen);

  jwt.verify(tokenGen, process.env.secret, (err, decoded) => {
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.json(err);
    }
  });
}

app.post("/createData", async (req, res) => {
  // const hassPossword = await bcrypt.hash(req.body.possword, 7);

  const addData = await dataSchema({
    ...req.body,
    
  });

  const findEmail = await dataSchema.findOne({ email: req.body.email });

  if (findEmail) return res.json("email already exist");

  const saveData = await addData.save();
  res.json({
    msg: "post data successfully",
    saveData,
  });
});

app.get("/readData", verifyToken, async (req, res) => {
  console.log(req.user.role);
  if (req.user.role !== "user") {
    const displayData = await dataSchema.find();
    res.json(displayData);
  } else {
    res.json("you are not admin");
  }
});
app.get("/GetData", async (req, res) => {
  const displayData = await dataSchema.find();
  res.json(displayData);
});

app.delete("/deleteData/:id", async (req, res) => {
  const deleted = await dataSchema.findByIdAndDelete(req.params.id);
  res.json({
    msg: "Delete data",
    deleted,
  });
});

app.put("/updateData/:id", async (req, res) => {
  const updateData = await dataSchema.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json({
    msg: "Updated",
    updateData,
  });
});

app.post("/loginData", async (req, res) => {
  const findEmail = await dataSchema.findOne({ email: req.body.email });
  if (!findEmail) return res.json("email not valid");

  const findPossword = await bcrypt.compare(
    req.body.possword,
    findEmail.possword
  );
  if (!findPossword) return res.json("possword not valid");

  let token = jwt.sign(
    {
      email: findEmail.email,
      id: findEmail._id,
      name: findEmail.name,
      role: findEmail.role,
    },
    process.env.secret,
    { expiresIn: "5m" }
  );

  res.json({
    msg: "Login success",
    token,
  });
});

app.listen(process.env.port, () => {
  console.log("connected port 3000");
});
