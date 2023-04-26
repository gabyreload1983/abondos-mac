const listCustomers = document.querySelector("#listCustomers");
const addingTerminal = document.querySelector("#addingTerminal");
const mac = document.querySelector("#mac");
const code_terminal = document.querySelector("#code_terminal");
const description = document.querySelector("#description");

const getCustomers = async () => {
  const data = await fetch("/api/customers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (data.status === 200) {
    const { customers } = await data.json();
    customers.forEach((customer) => {
      const option = document.createElement("option");
      option.value = customer.code;
      option.innerText = customer.name;
      listCustomers.append(option);
    });
  }
};

getCustomers();

addingTerminal.addEventListener("click", async () => {
  const terminal = {
    code: listCustomers.value,
    mac: mac.value,
    code_terminal: code_terminal.value,
    description: description.value,
  };
  const result = await fetch("/api/terminal/", {
    method: "POST",
    body: JSON.stringify(terminal),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await result.json();
  if (json.status === "success") {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      text: `Terminal agregada!`,
      icon: "success",
      willClose: () => {
        mac.value = "";
        code_terminal.value = "";
        description.value = "";
        mac.focus();
      },
    });
  }
  if (json.status === "error") {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      text: `${json.message}`,
      icon: "error",
    });
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addingTerminal.click();
  }
});
