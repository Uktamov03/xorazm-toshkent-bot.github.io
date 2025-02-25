// const btn1 = document.querySelectorAll('.order1'),
//     btn2 = document.querySelectorAll('.order2')

// Button
// btn1.forEach(btn => {
//     btn.addEventListener('click', () => {
//         document.querySelector('.orders1 .active').classList.remove('active')
//         btn.classList.add('active')
//         selectedTool = btn.id
//     })
// });
// btn2.forEach(btn => {
//     btn.addEventListener('click', () => {
//         document.querySelector('.orders2 .active').classList.remove('active')
//         btn.classList.add('active')
//         selectedTool = btn.id
//     })
// });
document.addEventListener("DOMContentLoaded", () => {

// Telefon raqami inputini olish
const phoneInput = document.getElementById("phone");

// Telefon raqamiga yozish paytida `addPrefix` funksiyasini chaqirish
phoneInput.addEventListener("input", addPrefix);

// `addPrefix` funksiyasi
function addPrefix(event) {
  const phoneInput = event.target; // `event.target` input elementini anglatadi

  // Telefon raqamining boshlanishi +998 bo'lishi kerak, agar bo'lmasa, qo'shamiz
  if (!phoneInput.value.startsWith("+998")) {
    phoneInput.value = "+998" + phoneInput.value.replace(/^(\+998|)/, ""); // Agar prefiks yo'q bo'lsa, qo'shamiz
  }

  // Telefon raqamida faqat raqamlar va + belgisi bo'lishi kerak
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
  // Buyurtmalar ro'yxatidagi itemlarga event listener qo'shish
  orders.forEach((order) => {
    order.addEventListener("click", () => {
      // Barcha buyurtmalarni "active" holatdan chiqarish
      orders.forEach((order) => order.classList.remove("active"));

      // Tanlangan buyurtmaga "active" holatini qo'shish
      order.classList.add("active");
      selectedOrder = order.textContent; // Tanlangan buyurtma nomini saqlash
    });
 
    const tg = window.Telegram.WebApp;
    let userId = null;

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    userId = tg.initDataUnsafe.user.id; // Foydalanuvchi ID sini olish
    }

  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // form.reset()
    const statusMassage = document.createElement("div");
    form.append(statusMassage);

    const formData = new FormData(form);

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    // const json = JSON.stringify(object)
    fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `
          Buyurtma: ${selectedOrder}
  
  Telefon raqam: ${object.phone}
  
  Izoh: ${object.izoh}
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
      .then(
        () => (statusMassage.textContent = habarlar.success),
        form.reset(),
        setTimeout(() => {
          statusMassage.style.display = "none";
        }, 3000)
      )
      .catch(
        () => (statusMassage.textContent = habarlar.failure),
        setTimeout(() => {
          statusMassage.style.display = "none";
        }, 3000)
      );
  });
});
