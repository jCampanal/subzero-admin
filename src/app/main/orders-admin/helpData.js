export const optionsStatus = [
  "Waiting",
  "Processing",
  "Shipping",
  "Delivered",
  "Canceled",
];
export const optionsTermOrder = ["Net30", "Net7", "COD", "NET60"];
export const days = [
  { name: "MON", index: 2 },
  { name: "TUE", index: 3 },
  { name: "WEN", index: 4 },
  { name: "THE", index: 5 },
  { name: "FRI", index: 6 },
  { name: "SAT", index: 7 },
  { name: "SAN", index: 1 },
];

export const MenuProps = {
  variant: "menu",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

export const ShipmentStatus = {
  Waiting: { name: "Waiting", icon: "fa-truck", tColor: "blue-700" },
  Processing: { name: "PROCESSING", icon: "fa-truck", tColor: "blue-700" },
  Shipping: { name: "SHIPPING", icon: "fa-truck", tColor: "blue-700" },
  Delivered: { name: "DELIVERED", icon: "fa-handshake", tColor: "green-700" },
  Canceled: { name: "CANCELED", icon: "fa-times", tColor: "red-700" },
};
