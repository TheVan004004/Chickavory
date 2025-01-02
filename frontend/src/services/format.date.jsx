export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    year: "numeric", // Hiển thị năm
    month: "long", // Tên tháng đầy đủ (ví dụ: January)
    day: "numeric", // Ngày trong tháng (ví dụ: 1)
    hour: "2-digit", // Giờ (ví dụ: 2 PM)
    minute: "2-digit", // Phút (ví dụ: 00)
    hour12: true, // Định dạng 12 giờ (AM/PM)
    timeZone: "Asia/Ho_Chi_Minh", // Múi giờ Việt Nam
  });
}

export function timeAgo(dateString) {
  const now = new Date();
  const inputDate = new Date(dateString);

  const diffInMilliseconds = now - inputDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Nếu cùng ngày theo toDateString
  if (now.toDateString() === inputDate.toDateString()) {
    if (diffInHours > 0) {
      return `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minutes ago`;
    } else {
      return `${diffInSeconds} seconds ago`;
    }
  }

  // Nếu khác ngày nhưng vẫn dưới 24 giờ
  if (diffInDays === 0) {
    return `${diffInHours} hours ago`;
  }

  const dayOfWeekNow = now.getDay();
  const dayOfWeekInput = inputDate.getDay();
  const isWithinWeek = diffInDays < 7 && dayOfWeekInput <= dayOfWeekNow;

  if (isWithinWeek) {
    return `${diffInDays} days ago`;
  }

  return formatDate(dateString);
}

export function getMonthName(monthNumber) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Kiểm tra nếu số tháng hợp lệ
  if (monthNumber < 1 || monthNumber > 12) {
    return "Invalid month number";
  }

  return monthNames[monthNumber - 1];
}
