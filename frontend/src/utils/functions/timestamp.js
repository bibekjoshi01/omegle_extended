const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  const timeDifferenceInSeconds = Math.floor((now - date) / 1000);

  if (timeDifferenceInSeconds < 60) {
    // Less than a minute ago
    return "Just now";
  } else if (timeDifferenceInSeconds < 3600) {
    // Less than an hour ago
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (
    timeDifferenceInSeconds < 86400 &&
    date.getDate() === now.getDate()
  ) {
    // Today
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  } else if (timeDifferenceInSeconds < 172800) {
    // Yesterday
    return "Yesterday";
  } else if (timeDifferenceInSeconds < 604800) {
    // Less than a week ago
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else {
    // Display the full timestamp for messages older than a week
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  }
};

export default formatTimestamp;
