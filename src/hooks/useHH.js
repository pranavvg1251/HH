import { useState, useEffect } from "react";

// Parse "5:00 PM" → minutes from midnight
function toMinutes(str) {
  const [time, period] = str.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

// Parse "Mon–Fri" or "Sun–Thu" into array of day numbers
function parseDays(str) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nums = days.map((d, i) => (d === "Sun" ? 0 : i));
  const dayNums = days.map((_, i) => i);

  if (str.includes("–")) {
    const [a, b] = str.split("–").map(s => s.trim());
    const startIdx = days.indexOf(a);
    const endIdx = days.indexOf(b);
    const result = [];
    if (startIdx <= endIdx) {
      for (let i = startIdx; i <= endIdx; i++) result.push(i);
    } else {
      for (let i = startIdx; i < days.length; i++) result.push(i);
      for (let i = 0; i <= endIdx; i++) result.push(i);
    }
    return result;
  }

  // Handle comma-separated: "Mon, Wed, Fri"
  if (str.includes(",")) {
    return str.split(",").map(s => days.indexOf(s.trim()));
  }

  return [days.indexOf(str)];
}

export function useHH() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const isHHNow = (bar) => {
    const today = now.getDay();
    const currentMin = now.getHours() * 60 + now.getMinutes();

    return bar.happyHours.some((hh) => {
      const dayNums = parseDays(hh.days);
      const startMin = toMinutes(hh.start);
      const endMin = toMinutes(hh.end);
      return dayNums.includes(today) && currentMin >= startMin && currentMin < endMin;
    });
  };

  return { now, isHHNow };
}   