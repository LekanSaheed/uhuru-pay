import {
  MdSpaceDashboard,
  MdHistory,
  MdOutlineAddCircle,
} from "react-icons/md";
import { RiBookletFill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import classes from "../components/TimeFilter.module.css";
import { HiReceiptTax } from "react-icons/hi";
import { FaCalendarCheck } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";
import moment from "moment";

const jsDate = new Date();
const today = moment(jsDate).format();

const getMonday = (d) => {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return moment(new Date(d.setDate(diff))).format();
};

const firstDayWeek = getMonday(jsDate);

const firstDayMonth = moment(
  new Date(jsDate.getFullYear(), jsDate.getMonth(), 1)
).format();

const firstDayYear = moment(new Date(jsDate.getFullYear(), 0, 1)).format();

export const defaultState = {
  isDropdown: true,
  user: {},
  token: "",
  isUser: false,
  isToggledMobileNav: false,
  isToggled: false,
  filters: [
    { id: 1, text: "All Time", class: classes.clicked, date: [] },
    { id: 2, text: "Today", date: [today, today] },
    { id: 3, text: "This Week", date: [firstDayWeek, today] },
    { id: 4, text: "This Month", date: [firstDayMonth, today] },
    { id: 5, text: "This Year", date: [firstDayYear, today] },
    // { id: 6, text: "Custom Period", date: [] },
  ],
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
          // access: "admin",
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
    {
      text: "Analytics",
      dropdown: [
        {
          text: "Transaction History",
          icon: <MdHistory />,
          link: "/transaction-history",
        },
      ],
    },
  ],
};
