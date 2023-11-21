import { Mail, User, Circle } from "react-feather";

const navigationData = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Mail size={20} />,
    navLink: "/dashboard",
  },
  {
    id: 'users',
    title: 'User',
    icon: <User size={20} />,
    children: [
      {
        id: 'sellers',
        title: 'Sellers',
        icon: <Circle size={16} />,
        navLink: '/users/sellers',
      },
      {
        id: 'buyers',
        title: 'Buyers',
        icon: <Circle size={16} />,
        navLink: '/users/buyers',
      },
    ],
  },
];

export default navigationData;
