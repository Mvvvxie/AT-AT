const form = document.getElementById("form");
const inputField = document.getElementById("input");
const outputField = document.getElementById("output");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = inputField.value;
  const data = { input: input };
  try {
    const response = await fetch("/api/runPythonScript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    outputField.innerText = responseData.output;
  } catch (error) {
    console.error(error);
  }
});
