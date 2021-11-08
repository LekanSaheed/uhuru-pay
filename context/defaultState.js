import {
  MdSpaceDashboard,
  MdPeopleAlt,
  MdLock,
  MdStream,
  MdOutlineAddCircle,
} from "react-icons/md";
import { RiBookletFill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import { BiMessageSquareAdd } from "react-icons/bi";
import { HiReceiptTax } from "react-icons/hi";
import { FaReceipt, FaStream } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
export const defaultState = {
  isDropdown: true,
  user: {},
  token: "",
  isUser: false,
  isToggledProfile: false,
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
      icon: <MdPeopleAlt />,
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
      icon: <FaReceipt />,
      open: true,
      dropdown: [
        { text: "Batch", icon: <RiBookletFill />, link: "/pin-batch" },
        { text: "Generate Pin", icon: <CgPassword />, link: "/pin" },
      ],
    },
    {
      id: 4,
      open: true,
      text: "Revenue Streams",
      expandable: true,
      icon: <MdStream />,
      dropdown: [
        {
          text: "Add New",
          icon: <MdOutlineAddCircle />,
          link: "/add-revenue",
          isConditioned: true,
        },
        {
          text: "All Revenues",
          icon: <HiReceiptTax />,
          link: "/all-revenues",
        },
      ],
    },
  ],
};
