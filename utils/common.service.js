async function splitFrequencyString(frequencyString) {
  // Split the string by space
  const parts = frequencyString.split(" ");

  if (parts.length !== 3 || parts[0].toLowerCase() !== "every") {
    throw new Error("Invalid frequency string format");
  }

  const frequency = parseInt(parts[1]);
  const frequencyType = parts[2].toLowerCase();

  return { frequency, frequencyType };
}

async function calculateStartDate(loanDate, frequency, frequencyType) {
  let startDate = new Date(loanDate);

  switch (frequencyType.toLowerCase()) {
    case "weeks":
      startDate.setDate(startDate.getDate() + frequency * 7);
      break;
    case "days":
      startDate.setDate(startDate.getDate() + frequency);
      break;
    case "months":
      startDate.setMonth(startDate.getMonth() + frequency);
      break;
    case "years":
      startDate.setFullYear(startDate.getFullYear() + frequency);
      break;
    default:
      throw new Error("Invalid frequency type");
  }

  return startDate;
}

async function calculateEndDate(startDate, tenure, frequency, frequencyType) {
  let endDate = new Date(startDate);
  tenure -= 1;
  switch (frequencyType.toLowerCase()) {
    case "weeks":
      endDate.setDate(endDate.getDate() + tenure * frequency * 7);
      break;
    case "days":
      endDate.setDate(endDate.getDate() + tenure * frequency);
      break;
    case "months":
      endDate.setMonth(endDate.getMonth() + tenure * frequency);
      break;
    case "years":
      endDate.setFullYear(endDate.getFullYear() + tenure * frequency);
      break;
    default:
      throw new Error("Invalid frequency type");
  }

  return endDate;
}

async function calculateNextDueDate(currentDate, frequency, frequencyType) {
  let nextDueDate = new Date(currentDate);

  switch (frequencyType.toLowerCase()) {
    case "weeks":
      nextDueDate.setDate(nextDueDate.getDate() + frequency * 7);
      break;
    case "days":
      nextDueDate.setDate(nextDueDate.getDate() + frequency);
      break;
    case "months":
      nextDueDate.setMonth(nextDueDate.getMonth() + frequency);
      break;
    case "years":
      nextDueDate.setFullYear(nextDueDate.getFullYear() + frequency);
      break;
    default:
      throw new Error("Invalid frequency type");
  }

  return nextDueDate;
}

function convertUTCtoIST(utcDateStr) {
  // Create a Date object from the UTC string
  const utcDate = new Date(utcDateStr);

  // Calculate the IST offset in milliseconds (IST is UTC+5:30)
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;

  // Create a new Date object for IST by adding the offset
  const istDate = new Date(utcDate.getTime() + IST_OFFSET);

  // Format the IST date as a string
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(istDate.getUTCDate()).padStart(2, "0");
  const hours = String(istDate.getUTCHours()).padStart(2, "0");
  const minutes = String(istDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(istDate.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} IST`;
}
module.exports = {
  splitFrequencyString,
  calculateStartDate,
  calculateEndDate,
  calculateNextDueDate,
  convertUTCtoIST,
};
