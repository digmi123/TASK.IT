const options = {
  long: {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  },
  short: {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  },
};

export const formatDate = (date, variant = "long") => {
  const option = options[variant];
  return new Date(date).toLocaleDateString("en-US", option);
};
