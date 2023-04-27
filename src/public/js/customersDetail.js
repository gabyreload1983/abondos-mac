const listCustomers = document.querySelector("#listCustomers");
const btnSearch = document.querySelector("#btnSearch");
const bodyTerminals = document.querySelector("#bodyTerminals");
const terminalsCount = document.querySelector("#terminalsCount");

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

btnSearch.addEventListener("click", async () => {
  bodyTerminals.innerHTML = "";
  const code = listCustomers.value;
  const result = await fetch(`/api/customers/${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { customer } = await result.json();
  terminalsCount.innerHTML = customer.terminals.length;
  customer.terminals.forEach((terminal) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${terminal.code_terminal}</td>
      <td>${terminal.description}</td>
      <td>${terminal.mac}</td>
    `;
    bodyTerminals.append(tr);
  });
});
