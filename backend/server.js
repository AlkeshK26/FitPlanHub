const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");



dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));
app.use("/api/follow", require("./routes/followRoutes"));
app.use("/api/feed", require("./routes/feedRoutes"));
app.use("/api/subscriptions", require("./routes/subscriptionRoutes"));
app.use("/api/analytics",require("./routes/planCheckRoutes"));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
