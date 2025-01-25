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

  const orders1 = document.querySelectorAll(".order1");
  let selectedOrder = "Taksi zakas";

  // Yo'nalishlar ro'yxatiga kiruvchi elementlar
  const orders2 = document.querySelectorAll(".order2");
  let selectedRoute = "Toshkent - Xorazm";

  const habarlar = {
    loading: "Loading...",
    success: "Rahmat ma'lumot yuborildi!",
    failure: "Nimadir xato ketti keyinroq urinib ko'ring",
  };
  // Buyurtmalar ro'yxatidagi itemlarga event listener qo'shish
  orders1.forEach((order) => {
    order.addEventListener("click", () => {
      // Barcha buyurtmalarni "active" holatdan chiqarish
      orders1.forEach((order) => order.classList.remove("active"));

      // Tanlangan buyurtmaga "active" holatini qo'shish
      order.classList.add("active");
      selectedOrder = order.textContent; // Tanlangan buyurtma nomini saqlash
    });
  });

  // Yo'nalishlar ro'yxatidagi itemlarga event listener qo'shish
  orders2.forEach((route) => {
    route.addEventListener("click", () => {
      // Barcha yo'nalishlarni "active" holatdan chiqarish
      orders2.forEach((route) => route.classList.remove("active"));

      // Tanlangan yo'nalishga "active" holatini qo'shish
      route.classList.add("active");
      selectedRoute = route.textContent; // Tanlangan yo'nalish nomini saqlash
    });
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
  
  Yo'nalish: ${selectedRoute} 
  
  Telefon raqam: ${object.phone}
  
  Izoh: ${object.izoh}
          `,
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
