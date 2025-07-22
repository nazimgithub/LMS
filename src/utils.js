export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getStatusClass(status) {
  switch (status) {
    case "Active":
      return "text-success";
    case "Approved":
      return "text-success";
    case "Rejected":
      return "text-danger";
    case "Pending":
      return "text-warning";
    case "In-Active":
      return "text-danger";
    default:
      return "text-warning";
  }
}
