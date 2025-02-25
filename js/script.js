document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", addPrefix);

  function addPrefix(event) {
    const phoneInput = event.target;

    if (!phoneInput.value.startsWith("+998")) {
      phoneInput.value = "+998" + phoneInput.value.replace(/^(\+998|)/, "");
    }

    phoneInput.value = phoneInput.value.replace(/[^0-9+]/g, "");
  }

  // const form = document.querySelector("form"),
  //   tokenBot = "7855425337:AAFy18wAwne0JHEnu1RTj6But_AdYWlkdE0",
  //   chatId = "-1002442975458";

  const orders = document.querySelectorAll(".order");
  let selectedOrder = "Taksi zakas";

  const habarlar = {
    loading: "Loading...",
    success: "Rahmat ma'lumot yuborildi!",
    failure: "Nimadir xato ketti keyinroq urinib ko'ring",
  };

  orders.forEach((order) => {
    order.addEventListener("click", () => {
      orders.forEach((order) => order.classList.remove("active"));
      order.classList.add("active");
      selectedOrder = order.textContent;
    });
  });
    
});
