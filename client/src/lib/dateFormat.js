const dateFormate = (date) => {
  

  return new Date(date).toLocaleString("en-US", {
    weekday: "short",   // e.g. "Mon"
    month: "long",      // e.g. "September"
    day: "numeric",     // e.g. "24"
    hour: "numeric",    // e.g. "5 PM"
    minute: "numeric"   // e.g. "30"
  });
};

export default dateFormate;
