
export const FirstRowDivContent = [
  {
    id: 1,
    text: "Customers",
    Number: 5406000,
  },
  {
    id: 2,
    text: "Active-Loans",
    Number: 33450000,
  },
  {
    id: 3,
    text: "Total-Borrowed",
    Number: 6000000,
  },
  {
    id: 4,
    text: "Total-Deposited",
    Number: 6783700,
  },
]

export const NavText = [
  {
    id: 1,
    name: "Dashboard",
    icon: "LuLayoutDashboard",
    icon2: "FaAngleRight",
    icon3: "FaAngleDown",
    sublinks: [
      { id: 1, name: "Dashboard", link: "/home/dashboard" },  // Add the link property
      { id: 2, name: "D-Items", link: "/home/dashboard/items" }, // Add the link property
    ],
  },
  {
    id: 2,
    name: "Users",
    icon: "PiUsersThin",
    icon2: "FaAngleRight",
    icon3: "FaAngleDown",
    sublinks: [
      { id: 1, name: "AdminReg", link: "/home/AdminReg" },  // Add the link property
      { id: 2, name: "User", link: "/home/users" },  // Add the link property
      { id: 3, name: "Deposit", link: "/home/users/deposit" },  // Add the link property
      
    ],
  },
  {
    id: 3,
    name: "Loans",
    icon: "MdBalance",
    icon2: "FaAngleRight",
    icon3: "FaAngleDown",
    sublinks: [
      { id: 1, name: "Loan Status", link: "/home/loans/status" },  // Add the link property
      { id: 2, name: "New Loans", link: "/home/loans/new" },  // Add the link property
      { id: 3, name: "Paid", link: "/home/loans/paid" },  // Add the link property
    ],
  },
];

