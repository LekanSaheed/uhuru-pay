import { MdSpaceDashboard, MdPeopleAlt } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";

const localUser = JSON.parse(localStorage.getItem("stakeholder"));
export const defaultState = {
  isDropdown: true,
  user: localUser ? localUser : {},
  isUser: localUser ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
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
      link: "",
      expandable: true,
      icon: <MdPeopleAlt />,
      dropdown: [
        {
          text: "Add New",
          icon: <BsFillPersonPlusFill />,
          link: "/add-new-stakeholder",
        },
        { text: "Members", icon: "", link: "/members" },
      ],
      open: true,
    },
    { id: 3, text: "Pin Management", icon: "", open: true, link: "" },
    {
      id: 4,
      open: true,
      text: "Revenue Streams",
      expandable: true,
      icon: "",
      link: "",
      dropdown: [
        { text: "Add New", icons: "", link: "/add-revenue" },
        { text: "All Revenues", icons: "", link: "/all-revenues" },
      ],
    },
  ],
};
