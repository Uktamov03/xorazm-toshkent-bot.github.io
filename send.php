<?php
// Bot tokeni va guruh ID
$token = "7855425337:AAFy18wAwne0JHEnu1RTj6But_AdYWlkdE0"; 
$chat_id = "-1002442975458"; 

// Formadan kelgan ma’lumotlar
$userId   = $_POST['userId']   ?? '';
$userName = $_POST['userName'] ?? '';
$phone    = $_POST['phone']    ?? '';
$izoh     = $_POST['izoh']     ?? '';

// Xabar matni
$message = "
📍 Buyurtma: Xorazm - Toshkent
📞 Telefon raqam: $phone
📝 Izoh: $izoh
";

// Inline tugma (reply_markup) ni tayyorlash
$replyMarkup = null; 
if (!empty($userId) || !empty($userName)) {
    // Agar username bo‘lsa, https://t.me/username, bo‘lmasa tg://user?id=ID
    $url = $userName ? "https://t.me/$userName" : "tg://user?id=$userId";

    $replyMarkup = [
        "inline_keyboard" => [
            [
                [
                    "text" => "📩 Lichkaga o‘tish",
                    "url"  => $url
                ]
            ]
        ]
    ];
}

// Telegram API ga so‘rov
$url  = "https://api.telegram.org/bot$token/sendMessage";
$data = [
    "chat_id"    => $chat_id,
    "text"       => $message,
    "parse_mode" => "HTML",
];

// Agar replyMarkup bo‘lsa, JSON formatida qo‘shamiz
if ($replyMarkup) {
    $data["reply_markup"] = json_encode($replyMarkup);
}

// cURL orqali yuboramiz
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Natija
if ($response) {
    echo "Rahmat, ma'lumot yuborildi!";
} else {
    echo "Xatolik yuz berdi!";
}
