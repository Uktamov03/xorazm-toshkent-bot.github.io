document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"),
    tokenBot = "7855425337:AAFy18wAwne0JHEnu1RTj6But_AdYWlkdE0",
    chatId = "-1002442975458";

  const orders = document.querySelectorAll(".order");
  let selectedOrder = "Taksi zakas";

  const habarlar = {
    loading: "Loading...",
    success: "Rahmat ma'lumot yuborildi!",
    failure: "Nimadir xato ketdi, keyinroq urinib ko'ring",
  };

  orders.forEach((order) => {
    order.addEventListener("click", () => {
      orders.forEach((order) => order.classList.remove("active"));
      order.classList.add("active");
      selectedOrder = order.textContent;
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const statusMassage = document.createElement("div");
    form.append(statusMassage);

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    const userId = "FOYDALANUVCHI_ID"; // Foydalanuvchi ID sini server yoki bot orqali olish kerak

    fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `
📌 *Buyurtma:* ${selectedOrder}

📞 *Telefon raqam:* ${object.phone}

📝 *Izoh:* ${object.izoh}
        `,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Lichkaga o'tish",
                url: `tg://user?id=${userId}`,
              },
            ],
          ],
        },
      }),
    })
      .then(() => {
        statusMassage.textContent = habarlar.success;
        form.reset();
        setTimeout(() => {
          statusMassage.style.display = "none";
        }, 3000);
      })
      .catch(() => {
        statusMassage.textContent = habarlar.failure;
        setTimeout(() => {
          statusMassage.style.display = "none";
        }, 3000);
      });
  });
});
