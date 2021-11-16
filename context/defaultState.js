import {
  MdSpaceDashboard,
  MdHistory,
  MdOutlineAddCircle,
} from "react-icons/md";
import { RiBookletFill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";

import { HiReceiptTax } from "react-icons/hi";
import { FaCalendarCheck } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
export const defaultState = {
  isDropdown: true,
  user: {},
  token: "",
  isUser: false,
  isToggledMobileNav: false,
  isToggled: false,
  asideContents: [
    {
      text: "Dashboard",
      icon: <MdSpaceDashboard />,
      id: 1,
      open: true,
      link: "/",
    },

    {
      id: 2,
      text: "Stakeholders",
      expandable: true,
      dropdown: [
        {
          text: "Add New",

          link: "/add-new-stakeholder",
          icon: <BsFillPersonPlusFill />,
        },
        {
          text: "Members",

          link: "/members",
          icon: <IoMdPeople />,
        },
      ],
      open: true,
    },
    {
      id: 3,
      text: "Pin Management",
      open: true,
      dropdown: [
        {
          text: "Verify Pin",
          icon: <FaCalendarCheck />,
          link: "/verify-pin",
          access: "admin",
        },
        {
          text: "Batch",
          icon: <RiBookletFill />,
          link: "/pin-batch",
          access: "regular",
        },
        {
          text: "Generate Pin",
          icon: <CgPassword />,
          link: "/pin",
          access: "regular",
        },
      ],
    },
    {
      id: 4,
      open: true,
      text: "Revenue Streams",
      expandable: true,
      dropdown: [
        {
          text: "Add New",
          icon: <MdOutlineAddCircle />,
          link: "/add-revenue",
          isConditioned: true,
          access: "regular",
        },
        {
          text: "All Revenues",
          icon: <HiReceiptTax />,
          link: "/all-revenues",
        },
        {
          text: "Pending Revenues",
          icon: <FaCalendarCheck />,
          link: "/pending-revenues",
          access: "admin",
        },
      ],
    },
    // {
    //   text: "Analytics",
    //   dropdown: [
    //     {
    //       text: "Transaction History",
    //       icon: <MdHistory />,
    //       link: "/transaction-history",
    //     },
    //   ],
    // },
  ],
};
