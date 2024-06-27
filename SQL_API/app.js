require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("../SQL_API/routes/user.routes");
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});



// ------for auto generate and increment id------
// create table user (
//   user_id int NOT NULL AUTO_INCREMENT,
//   firstName varchar (20),
//   lastName varchar (30),
//   email varchar(30),
//   password varchar(255),
//   mobileNo double,
//   PRIMARY KEY (user_id)
//   );
