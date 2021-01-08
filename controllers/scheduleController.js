exports.parseName = (name1, name2) => {
  if (name1 === "New" && name2 === "York") return "New York";
  if (name1 === "New" && name2 === "Orleans") return "New Orleans";
  if (name1 === "San") return "San Antonio";
  if (name1 === "Golden") return "Golden State";
  return name1;
};

exports.parseTime = (time1, time2) => {
  if (time1 === undefined) return;
  if (time1.includes(":")) return time1;
  if (time2.includes(":")) return time2;
  if (time1.includes("-")) return time1;
  if (time2.includes("-")) return time2;
};

exports.parseImg = (url) => {
  const newUrl = url.replace(/50/g, "300");
  const finalUrl = newUrl.replace(/3000/g, "500");
  return finalUrl;
};
