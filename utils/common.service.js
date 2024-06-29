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
    case "week":
      startDate.setDate(startDate.getDate() + frequency * 7);
      break;
    case "day":
      startDate.setDate(startDate.getDate() + frequency);
      break;
    case "month":
      startDate.setMonth(startDate.getMonth() + frequency);
      break;
    case "year":
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
    case "week":
      endDate.setDate(endDate.getDate() + tenure * frequency * 7);
      break;
    case "day":
      endDate.setDate(endDate.getDate() + tenure * frequency);
      break;
    case "month":
      endDate.setMonth(endDate.getMonth() + tenure * frequency);
      break;
    case "year":
      endDate.setFullYear(endDate.getFullYear() + tenure * frequency);
      break;
    default:
      throw new Error("Invalid frequency type");
  }

  return endDate;
}

async function calculateNextDueDate(
  frequency,
  frequencyType,
  startDate,
  endDate
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (now > end) {
    return now; // If the current date is past the end date, return the current date
  }

  let nextDueDate = new Date(start);

  // Calculate the difference in time from the start date to the current date in milliseconds
  const timeDiff = now - start;

  let intervalsPassed;

  switch (frequencyType.toLowerCase()) {
    case "week":
      intervalsPassed = Math.ceil(
        timeDiff / (frequency * 7 * 24 * 60 * 60 * 1000)
      );
      nextDueDate.setDate(start.getDate() + intervalsPassed * frequency * 7);
      break;
    case "day":
      intervalsPassed = Math.ceil(timeDiff / (frequency * 24 * 60 * 60 * 1000));
      nextDueDate.setDate(start.getDate() + intervalsPassed * frequency);
      break;
    case "month":
      intervalsPassed = Math.ceil(
        (now.getFullYear() * 12 +
          now.getMonth() -
          (start.getFullYear() * 12 + start.getMonth())) /
          frequency
      );
      nextDueDate.setMonth(start.getMonth() + intervalsPassed * frequency);
      break;
    case "year":
      intervalsPassed = Math.ceil(
        (now.getFullYear() - start.getFullYear()) / frequency
      );
      nextDueDate.setFullYear(
        start.getFullYear() + intervalsPassed * frequency
      );
      break;
    default:
      throw new Error("Invalid frequency type");
  }

  // Ensure the next due date is not past the end date
  if (nextDueDate > end) {
    return now;
  }

  // Ensure the next due date is not before the current date
  if (nextDueDate < now) {
    switch (frequencyType.toLowerCase()) {
      case "week":
        nextDueDate.setDate(nextDueDate.getDate() + frequency * 7);
        break;
      case "day":
        nextDueDate.setDate(nextDueDate.getDate() + frequency);
        break;
      case "month":
        nextDueDate.setMonth(nextDueDate.getMonth() + frequency);
        break;
      case "year":
        nextDueDate.setFullYear(nextDueDate.getFullYear() + frequency);
        break;
    }
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
