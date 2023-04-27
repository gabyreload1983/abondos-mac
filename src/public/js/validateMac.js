const validateBtn = document.querySelector("#validateBtn");
const mac = document.querySelector("#mac");
const responseContainer = document.querySelector("#responseContainer");

validateBtn.addEventListener("click", async () => {
  const macToValidate = mac.value;

  const response = await fetch(`/api/terminals/${macToValidate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (json.status === "success") {
    const terminal = json.terminal[0];
    responseContainer.innerHTML = `
    <strong>ABONADO</strong>
    <p>Cliente: ${terminal.customer.name}</p>
    <p>MAC: ${terminal.mac}</p>
    <p>Numero de Terminal: ${
      terminal?.code_terminal ? terminal.code_terminal : ""
    }</p>
    <p>Descripcion: ${terminal?.description ? terminal.description : ""}</p>
    `;
  }
  if (json.status === "error") {
    responseContainer.innerHTML = `
    <strong>TERMINAL NO ABONADA!!!</strong>
    `;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    validateBtn.click();
  }
});
