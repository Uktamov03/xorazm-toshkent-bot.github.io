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

  // Telegram WebApp orqali foydalanuvchi ma'lumotlarini olish
  let userId = null;
  let userName = null;
  if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    const userData = Telegram.WebApp.initDataUnsafe?.user;
    if (userData) {
      userId = userData.id;
      userName = userData.username; // Agar username mavjud bo'lsa
      console.log("Foydalanuvchi ma'lumotlari:", userData);
    } else {
      console.log("Foydalanuvchi ma'lumotlari topilmadi");
    }
  }
  console.log("User ID:", userId);

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
        // Foydalanuvchi ma'lumotlari mavjud bo'lsa, tugmaga profilga o'tish havolasini qo'shamiz
        reply_markup: userId
          ? {
              inline_keyboard: [
                [
                  {
                    text: "📩 Lichkaga o‘tish",
                    url: userName
                      ? `https://t.me/${userName}` // Agar username bo'lsa
                      : `tg://user?id=${userId}`, // Aks holda tg:// protokoli orqali
                  },
                ],
              ],
            }
          : undefined, // Agar userId topilmasa, tugma qo'shilmaydi
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
