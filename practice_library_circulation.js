const circulationLogs = [
  {
    logId: "L001",
    studentCode: "SV01",
    bookIsbn: "ISBN-111",
    status: "BORROWING",
    fineAmount: 0,
    daysLate: 0,
    daysResolved: 0,
  },
  {
    logId: "L002",
    studentCode: "SV02",
    bookIsbn: "ISBN-222",
    status: "BORROWING",
    fineAmount: 0,
    daysLate: 3,
    daysResolved: 0,
  },
  {
    logId: "L003",
    studentCode: "SV03",
    bookIsbn: "ISBN-333",
    status: "RETURNED",
    fineAmount: 0,
    daysLate: 0,
    daysResolved: 45,
  },
];

console.log("=== 1. DANH SÁCH NHẬT KÝ ĐẦU NGÀY ===");
console.table(circulationLogs);

const newLog = {
  logId: "L004",
  studentCode: "SV04",
  bookIsbn: "ISBN-444",
  status: "BORROWING",
  fineAmount: 0,
  daysLate: 0,
  daysResolved: 0,
};
circulationLogs.push(newLog);
console.log(
  "-> Đã ghi nhận giao dịch mượn mới cho sinh viên SV04 (Mã GD: L004).",
);

console.log("=== 2. XỬ LÝ GIAO DỊCH TRẢ SÁCH TẠI QUẦY ===");

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].logId === "L002") {
    circulationLogs[i].status = "RETURNED";
    circulationLogs[i].fineAmount = circulationLogs[i].daysLate * 5000;
    console.log(
      `-> L002: SV02 đã trả sách. Trễ ${circulationLogs[i].daysLate} ngày. Phạt: ${circulationLogs[i].fineAmount} VNĐ`,
    );
    break;
  }
}

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].logId === "L001") {
    circulationLogs[i].status = "LOST";
    circulationLogs[i].fineAmount = 200000;
    console.log(
      `-> L001: SV01 báo mất sách. Phạt đền bù: ${circulationLogs[i].fineAmount} VNĐ`,
    );
    break;
  }
}

let deletedCount = 0;
for (let i = circulationLogs.length - 1; i >= 0; i--) {
  let isResolved =
    circulationLogs[i].status === "RETURNED" ||
    circulationLogs[i].status === "LOST";
  let isOldLog = circulationLogs[i].daysResolved > 30;

  if (isResolved && isOldLog) {
    circulationLogs.splice(i, 1);
    deletedCount++;
  }
}
console.log(
  `=== 3. TỐI ƯU HỆ THỐNG ===-> Đã tự động dọn dẹp ${deletedCount} bản ghi cũ (quá 30 ngày).`,
);

let totalBooksCurrentlyBorrowed = 0;
let totalFinesCollected = 0;

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].status === "BORROWING") {
    totalBooksCurrentlyBorrowed++;
  }
  totalFinesCollected += circulationLogs[i].fineAmount;
}

console.log(
  "\n=================== BÁO CÁO KẾT THÚC NGÀY VẬN HÀNH ===================",
);
console.table(circulationLogs);
console.log(`TỔNG QUAN:`);
console.log(
  `- Số lượng sách vẫn đang được sinh viên mượn: ${totalBooksCurrentlyBorrowed} cuốn.`,
);
console.log(
  `- Tổng tiền phạt thu được trong hệ thống      : ${totalFinesCollected.toLocaleString("vi-VN")} VNĐ.`,
);
console.log(
  "======================================================================",
);
