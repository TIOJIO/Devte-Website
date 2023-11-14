import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Typography, Badge, Box, TextField } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import Deroul from "./Deroul";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import FixedPlugin from "../FixedPlugin/FixedPlugin";
import Sidebar from "components/Sidebar/Sidebar.js";
import Tooltip from "@mui/material/Tooltip";
import Spinner from "./Spinner";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import OfflineOnline from "./OfflineOnline";

import "./Styl.css";
import {
  getBusinessKey,
  setClassRooms,
  getClassRooms,
  getBusinessId,
  getEmploye,
  setStudents,
  setEmployees,
  getLessonNotes,
  setLessonNotes,
  getBulletins,
  setBulletins,
  getLessons,
  setLessons,
  setPayments,
  getPayments,
  setClaimings,
  getStudent,
  setSchoolAnnouncements,
  getSchoolAnnouncements,
  setAttendances,
  getAttendances,
  setHomeWorks,
  getHomeWorks,
  getOfflineMode,
  setCurrentBusiness,
  setIsMultiple,
  setBusinessId,
  setBusinessKey,
  setBusinessSchoolType,
  setBusinesses,
  getUserId,
} from "utils/session";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import { getCurrentBusiness } from "utils/session";
import Axios from "axios";
import Dashboard from "../../views/Dashboard";
import Schoolinformation from "../../views/Schoolinformation";
import Classroom from "../../views/Classroom";
import Students from "../../views/Students";
import Teachers from "../../views/Teachers";
import Courses from "../../views/Courses";
import Finance from "../../views/Finance";
import Attendance from "../../views/Attendance";
import UserPage from "../../views/UserPage";
import LasterActivity from "../../views/LasterActivity";
import Administration from "../../views/Administration";
import Exam from "../../views/Exam";
import LoginUser from "../../views/LoginUser";
import LoginAdmin from "../../views/LoginAdmin";
import Welcome from "../../views/Welcome/Welcome";
import { useTranslation } from "react-i18next";
function DemoNavbar(props) {
  const history = useHistory();
  const { t } = useTranslation();
  const routers = [
    {
      path: "/dashboard",
      name: t("dashboard"),
      icon: "design_app",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/schoolinformation",
      name: t("school_information"),
      icon: "business_badge",
      component: Schoolinformation,
      layout: "/admin",
    },
    {
      path: "/classroom",
      name: t("classroom"),
      icon: "files_paper",
      component: Classroom,
      layout: "/admin",
    },
    {
      path: "/students",
      name: t("students"),
      icon: "business_briefcase-24",
      component: Students,
      layout: "/admin",
    },

    {
      path: "/teachers",
      name: t("teachers"),
      icon: "business_badge",
      component: Teachers,
      layout: "/admin",
    },

    {
      path: "/courses",
      name: t("courses"),
      icon: "design-2_ruler-pencil",
      component: Courses,
      layout: "/admin",
    },

    {
      path: "/finance",
      name: t("finances"),
      icon: "design-2_ruler-pencil",
      component: Finance,
      layout: "/admin",
    },

    {
      path: "/attendance",
      name: t("attendances"),
      icon: "design-2_ruler-pencil",
      component: Attendance,
      layout: "/admin",
    },

    {
      path: "/user-page",
      name: t("user_profile"),
      icon: "users_single-02",
      component: UserPage,
      layout: "/admin",
    },
    {
      path: "/lasterActivity",
      name: t("last_activity"),
      icon: "design-2_ruler-pencil",
      component: LasterActivity,
      layout: "/admin",
    },
    {
      path: "/administration",
      name: t("administrations"),
      icon: "location_map-big",
      component: Administration,
      layout: "/admin",
    },
    {
      path: "/exam",
      name: t("exams"),
      icon: "location_map-big",
      component: Exam,
      layout: "/admin",
    },

    {
      path: "/loginUser",
      component: LoginUser,
    },

    {
      path: "/loginAdmin",
      component: LoginAdmin,
    },
    {
      path: "/welcome",
      component: Welcome,
    },
  ];
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const handleColorClick = (color) => {
    setBackgroundColor(color);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const businesskey = getBusinessKey();
  const businessId = getBusinessId();
  const employe = getEmploye();
  const student = getStudent();

  const localgetAnnounces = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientschoolannouncementByBusiness";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
          is_web_request: "1",
        },
      }).then((res) => {
        if (!res.data.error) {
          let business_schoolannouncement_json =
            res.data?.business_client_schoolannouncement;
          if (
            business_schoolannouncement_json !== null &&
            Array.isArray(business_schoolannouncement_json)
          ) {
            const announcementobjs = [];
            for (const announcementobj of business_schoolannouncement_json) {
              let announcement = JSON.parse(
                announcementobj?.business_client_schoolannouncement_list
              );
              announcement.business_client_schoolannouncement_id =
                announcement?.business_client_schoolannouncement_id;
              announcementobjs.push(announcement);
            }
            setSchoolAnnouncements(JSON.stringify(announcementobjs));
          }
        }
      });
    } catch (e) {
      //alert("error")
      console.log(e);
    }
  };

  const localgetClaimings = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientclaimingByBusiness_authenticate";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
          is_web_request: "1",
        },
      }).then((res) => {
        if (!res.data.error) {
          let business_claiming_json = res.data?.business_client_claiming;

          if (
            business_claiming_json !== null &&
            Array.isArray(business_claiming_json)
          ) {
            const claimingobjs = [];
            for (const claimingobj of business_claiming_json) {
              let claiming = JSON.parse(
                claimingobj?.business_client_claiming_list
              );
              claiming.business_client_claiming_id =
                claimingobj?.business_client_claiming_id;
              claimingobjs.push(claiming);
            }
            setClaimings(JSON.stringify(claimingobjs));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };

  const localgetPayments = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientPaymentByBusinessKeyLight";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
          is_web_request: "1",
        },
      }).then((res) => {
        if (!res.data.error) {
          let business_payment_json = res.data?.business_payment;

          if (
            business_payment_json !== null &&
            Array.isArray(business_payment_json)
          ) {
            const paymentobjs = [];
            for (const paymentobj of business_payment_json) {
              let payment = JSON.parse(
                paymentobj?.business_client_payment_list
              );
              payment.business_client_payment_id =
                paymentobj?.business_client_payment_id;
              paymentobjs.push(payment);
            }
            setPayments(JSON.stringify(paymentobjs));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };

  const localgetLessons = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientschoollessonByBusiness";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        if (!res.data.error) {
          let business_lessons_json = res.data?.business_client_schoollesson;

          if (
            business_lessons_json !== null &&
            Array.isArray(business_lessons_json)
          ) {
            const lessonobj = [];
            for (const lesson_json of business_lessons_json) {
              let lesson = JSON.parse(
                lesson_json?.business_client_schoollesson_list
              );
              lesson.lesson_id = lesson_json?.business_client_schoollesson_id;
              lessonobj.push(lesson);
            }

            setLessons(JSON.stringify(lessonobj));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };

  const localgetClassRooms = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL + "/getAllBusinessBouquetByBusinessKey";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        ////console.log("bouquetResponse:"+res.data)
        const classRoomobj = [];
        if (!res.data.error) {
          let business_bouquets_json = res.data?.business_bouquet;

          if (
            business_bouquets_json !== null &&
            Array.isArray(business_bouquets_json)
          ) {
            for (const classroom_json of business_bouquets_json) {
              let classroom = JSON.parse(classroom_json?.business_bouquet_list);
              classroom.business_bouquet_id =
                classroom_json?.business_bouquet_id;

              if (employe != null && employe != undefined) {
                let isFound = false;
                let teacher = JSON.parse(employe?.business_employe_list);
                let classRoomLessonInfosJson = teacher?.classRoomLessonInfos;
                try {
                  for (const classRoomLessonInfo of classRoomLessonInfosJson) {
                    let class_room_ids = classRoomLessonInfo?.class_room_ids;
                    if (
                      classroom_json?.business_bouquet_id ===
                      parseInt(class_room_ids)
                    ) {
                      isFound = true;
                      break;
                    }
                  }
                } catch (e) {}
                if (isFound) {
                  classRoomobj.push(classroom);
                }
              } else {
                classRoomobj.push(classroom);
              }
            }
          }

          setClassRooms(JSON.stringify(classRoomobj));
        }
      });
    } catch (e) {}
  };

  function getBusinessInformations(userId) {
    //if (!userId) return;
    const url = process.env.REACT_APP_API_URL + "/GetAllBusinessSMSInfoNameByBusKeyAuthenticate";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          user_id: userId,
        },
      }).then((res) => {
        //console.log("businessResponse:"+res.data)
        if (!res.data.error) {
          let business = res.data.business;

          if (business?.length >= 0) {
            setBusinesses(JSON.stringify(business));
            if (business?.length > 0) {
              setIsMultiple(true);
            }
            setBusinessId(business[0]?.business_id);
            setBusinessKey(business[0]?.business_key);
            setBusinessSchoolType(business[0]?.school_type);

            setCurrentBusiness(business[0]);
          } else {
          }
        } else {
        }
      });
    } catch (e) {
      // alert("error")
      //console.log(e);
    }
  }

  const localgetAllStudents = () => {
    if (businessId === null || businessId === undefined) return;

    let url =
      process.env.REACT_APP_API_URL + "/getBusinessClientByBusinessIDLigh";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_id: businessId,
        },
      }).then((res) => {
        ////console.log("bouquetResponse:"+res.data)
        const Studentsobj = [];

        if (res.data !== null && Array.isArray(res.data)) {
          for (const business_client_json of res.data) {
            const business_client_split = business_client_json.split("___");

            if (business_client_split.length > 1) {
              let business_client_list;
              try {
                business_client_list = JSON.parse(business_client_split[0]);
              } catch (e) {
                // alert("error")
                //console.log(e);
              }
              if (business_client_list) {
                business_client_list.business_client_id =
                  business_client_split[1];

                if (employe != null && employe != undefined) {
                  let teacher = JSON.parse(employe?.business_employe_list);
                  let isFound = false;
                  let classRoomLessonInfosJson = teacher?.classRoomLessonInfos;
                  try {
                    for (const classRoomLessonInfo of classRoomLessonInfosJson) {
                      let class_room_ids = classRoomLessonInfo?.class_room_ids;

                      let businessBouquet_ids =
                        business_client_list?.business_bouquet_id;
                      for (const businessBouquet_id of businessBouquet_ids) {
                        if (businessBouquet_id === class_room_ids) {
                          isFound = true;
                          break;
                        }
                      }
                    }
                  } catch (e) {}
                  if (isFound) {
                    Studentsobj.push(business_client_list);
                  }
                } else {
                  Studentsobj.push(business_client_list);
                }
              }
            }
          }

          setStudents(JSON.stringify(Studentsobj));
          setOpen(false);
        }
      });
    } catch (e) {
      // alert("error")
      console.log(e);
    }
  };
  const localgetAllTeachers = () => {
    if (businesskey === null) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/getAllBusinessEmployeByBusinessKey_authenticate";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        ////console.log("bouquetResponse:"+res.data)
        const employeobj = [];
        if (!res.data.error) {
          let business_employes_json = res.data?.business_employe;
          if (
            business_employes_json !== null &&
            Array.isArray(business_employes_json)
          ) {
            for (const employe_json of business_employes_json) {
              let employe = JSON.parse(employe_json?.business_employe_list);
              employe.business_employe_id = employe_json?.business_employe_id;
              employeobj.push(employe);
            }
          }
          setEmployees(JSON.stringify(employeobj));
        }
      });
    } catch (e) {
      // alert("error")
      ////console.log(e)
    }
  };
  const localgetAllLessons = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientschoollessonByBusiness";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        ////console.log("lessonNoteResponse:"+res.data)
        if (!res.data.error) {
          let business_client_schoollesson_json = res.data?.business_client_schoollesson;

          if (
            business_client_schoollesson_json !== null &&
            Array.isArray(business_client_schoollesson_json)
          ) {
            const lessonobjs = [];
            for (const lesson_json of business_client_schoollesson_json) {
              let lesson = JSON.parse(
                lesson_json?.business_client_schoollesson_list
              );
              lesson.business_client_schoollesson_id =
              lesson_json?.business_client_schoollesson_id;
              lessonobjs.push(lesson);
            }

            setLessons(JSON.stringify(lessonobjs));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };
  const getAllLessonNotes = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientschoollesson_noteByBusiness";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        ////console.log("lessonNoteResponse:"+res.data)
        if (!res.data.error) {
          let business_lessonNotes_json = res.data?.business_client_schoolnote;

          if (
            business_lessonNotes_json !== null &&
            Array.isArray(business_lessonNotes_json)
          ) {
            const lessonNotesobj = [];
            for (const lessonNotes_json of business_lessonNotes_json) {
              let lessonNotes = JSON.parse(
                lessonNotes_json?.business_client_schoolnote_list
              );
              lessonNotes.schoollesson_note_id =
                lessonNotes_json?.business_client_schoollesson_id;
              lessonNotesobj.push(lessonNotes);
            }

            setLessonNotes(JSON.stringify(lessonNotesobj));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };
  const getAllBulletins = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientschoolbulletinByBusiness";

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        if (!res.data.error) {
          let business_bulletins_json =
            res.data?.business_client_schoolbulletin;

          if (
            business_bulletins_json !== null &&
            Array.isArray(business_bulletins_json)
          ) {
            const bulletinobjs = [];
            for (const bulletin_json of business_bulletins_json) {
              let bulletin = JSON.parse(
                bulletin_json?.business_client_schoolbulletin_list
              );
              bulletin.business_client_schoolbulletin_id =
                bulletin_json?.business_client_schoolbulletin_id;
              bulletinobjs.push(bulletin);
            }
            setBulletins(JSON.stringify(bulletinobjs));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };

  const LocalgetHomeWorks = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientschoolhomeWorkByBusiness";

    if (employe != null) {
      url =
        process.env.REACT_APP_API_URL +
        "/GetAllBusinessClientschoolhomeWorkByClassRoom";
    }

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        if (!res.data.error) {
          let business_schoolhomeWork_json =
            res.data?.business_client_schoolhomeWork;

          if (
            business_schoolhomeWork_json !== null &&
            Array.isArray(business_schoolhomeWork_json)
          ) {
            const homeWorkobjs = [];
            for (const homeWorkobj of business_schoolhomeWork_json) {
              let homework = JSON.parse(
                homeWorkobj?.business_client_schoolhomeWork_list
              );
              homework.business_client_schoolhomeWork_id =
                homeWorkobj?.business_client_schoolhomeWork_id;
              homeWorkobjs.push(homework);
            }
            setHomeWorks(JSON.stringify(homeWorkobjs));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };
  const LocalgetAttendencies = () => {
    if (businesskey === null || businesskey === undefined) return;

    let url =
      process.env.REACT_APP_API_URL +
      "/GetAllBusinessClientschoolattendanceByBusiness";

    if (employe != null) {
      url =
        process.env.REACT_APP_API_URL +
        "/GetAllBusinessClientschoolattendanceByClassRoom";
    }

    try {
      Axios.request({
        method: "POST",
        url,
        data: {
          business_key: businesskey,
        },
      }).then((res) => {
        if (!res.data.error) {
          let business_attendancejson =
            res.data?.business_client_schoolattendance;

          if (
            business_attendancejson !== null &&
            Array.isArray(business_attendancejson)
          ) {
            const attendanceobjs = [];
            for (const attendanceobj of business_attendancejson) {
              let attendence = JSON.parse(
                attendanceobj?.business_client_schoolattendance_list
              );
              attendence.business_client_schoolattendance_id =
                attendanceobj?.business_client_schoolattendance_id;
              attendanceobjs.push(attendence);
            }
            setAttendances(JSON.stringify(attendanceobjs));
          }
        }
      });
    } catch (e) {
      //alert("error")
      ////console.log(e)
    }
  };

  async function handleRefresh() {
    setOpen(true);
    if (getOfflineMode()) {
      setIsRefresh(true);
    } else {
      getBusinessInformations(/*getUserId()*/);

      localgetAllStudents();
      localgetClassRooms();
      localgetAllTeachers();
      localgetLessons();
      localgetPayments();
      localgetClaimings();
      localgetAnnounces();
      LocalgetHomeWorks();
      LocalgetAttendencies();
      getAllBulletins();
      localgetAllLessons();
      //getAllLessonNotes();
    }

    await delay(9000);
    setOpen(false);
    history.push("admin/dashboard");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const currentBusiness = getCurrentBusiness();

  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("white");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    var name;
    routers.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("white");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
  }, []);
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    // add or remove classes depending if we are on full-screen-maps page or not

    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "white"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Nav navbar>
            <NavItem
              style={{
                display: "flex",
                width: "150px",
                justifyContent: "space-around",
              }}
            >
              <Link onClick={handleRefresh} className="nav-link">
                <Tooltip title="refresh page" arrow>
                  <Avatar style={{ backgroundColor: "rgb(17, 141, 65)" }}>
                    <Badge overlap="rectangular" variant="dot" color="success">
                      <RefreshIcon color="white" />
                    </Badge>
                  </Avatar>
                </Tooltip>
              </Link>

              <Link to="#pablo" className="nav-link">
                <Tooltip title="Notification" arrow>
                  <Avatar style={{ backgroundColor: "rgb(17, 141, 65)" }}>
                    <Badge overlap="rectangular" variant="dot" color="success">
                      <NotificationsIcon color="white" />
                    </Badge>
                  </Avatar>
                </Tooltip>
              </Link>
            </NavItem>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div
              style={{
                display: "flex",
                height: "50px",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  textAlign: "end",
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  {" "}
                  {currentBusiness?.name}
                </Typography>
                <Typography color="black"> Admin </Typography>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Deroul />
            </div>
          </Nav>
        </Collapse>
        {isRefresh && (
          <OfflineOnline isRefresh={isRefresh} onClose={handleClose} />
        )}
      </Container>
    </Navbar>
  );
}

export default DemoNavbar;
