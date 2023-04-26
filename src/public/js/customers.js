const addingCustomer = document.querySelector("#addingCustomer");
const nameCustomer = document.querySelector("#name");
const code = document.querySelector("#code");

addingCustomer.addEventListener("click", (e) => {
  e.preventDefault();

  const customer = { name: nameCustomer.value, code: code.value };

  fetch("/api/customers", {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    result.json().then((json) => {
      if (json.status === "success") {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          text: `Customer added!`,
          icon: "success",
        });
        nameCustomer.value = "";
        code.value = "";
        nameCustomer.focus();
      }
      if (json.status === "error") {
        Swal.fire({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          title: `Error`,
          text: `${json?.message}`,
          icon: "error",
        });
      }
    });
  });
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addingCustomer.click();
  }
});
