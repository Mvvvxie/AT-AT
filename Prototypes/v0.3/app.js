const express = require("express");
const app = express();
const { spawn } = require("child_process");

app.use(express.static("public"));
app.use(express.json());

app.post("/api/runPythonScript", (req, res) => {
  const input = req.body.input;

  const pythonProcess = spawn("python", ["./public/py/script.py", input]);

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.send({ output: output });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
