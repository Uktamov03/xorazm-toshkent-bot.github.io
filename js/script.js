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

  const form = document.querySelector("form"),
    tokenBot = "7855425337:AAFy18wAwne0JHEnu1RTj6But_AdYWlkdE0",
    chatId = "-1002442975458";

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

  // Telegram WebApp orqali foydalanuvchi ID sini olish
  let userId = null;
  if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    userId = Telegram.WebApp.initDataUnsafe?.user?.id || null;
  }

  console.log("User ID:", userId); // Foydalanuvchi ID ni console ga chiqaramiz

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const statusMassage = document.createElement("div");
    form.append(statusMassage);

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `
📍 Buyurtma: ${selectedOrder}

📞 Telefon raqam: ${object.phone}

📝 Izoh: ${object.izoh}
        `,
        parse_mode: "HTML",
        reply_markup: userId
          ? {
              inline_keyboard: [
                [{ text: "📩 Lichkaga o‘tish", url: `https://t.me/user?id=${userId}` }],
              ],
            }
          : undefined, // Agar ID null bo'lsa, tugma qo'shilmaydi
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
