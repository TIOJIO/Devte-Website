import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DraftsIcon from "@material-ui/icons/Drafts";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Logout from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import {
  clearSession,
  getBusinesses,
  getBusinessName,
  setBusinessId,
  setBusinessKey,
  getBusinessKey,
  setBusinessSchoolType,
  setCurrentBusiness,
  getCurrentBusiness,
  setBusinessName,
  getBusinessId,
  getBusinessSchoolType
} from "utils/session";
import { useEffect, useState } from "react";
import { refreshAllData } from "../../utils/services/ServerCall";
import { ChangeCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "rgb(17, 141, 65)",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function SelectSchoolDialog({ onClose }) {
  const { t } = useTranslation();
  const history = useHistory();
  const [allSchools, setAllSchools] = useState([]);
  //const [schoolName, setSchoolName] = useState(getBusinessName() || "");
  //const [selectedKey, setSelectedKey] = useState(getBusinessKey( )|| "");
  
  const [selectedSchool, setSelectedSchool] = useState({
    business_key:getBusinessKey( ),
    name:getBusinessName(),
    school_type:getBusinessSchoolType( ),
    business_id:getBusinessId(),
    school:getCurrentBusiness()
  });
  useEffect(() => {
    getAllgetBusinesses();
  }, []);
  const getAllgetBusinesses = () => {
    try {
      let business = JSON.parse(getBusinesses());
      if (Array.isArray(business) && business.length > 0) {
        setAllSchools(business);
      }
    } catch (e) {}
  };

  const [open, setOpen] = React.useState(false);
  const [openn, setOpenn] = React.useState(false);

  const handleSchoolChange = (event) => {
    for (const school of allSchools) {
      if (school?.business_key === event.target.value) {
        /*setBusinessId(school.business_id);
        setBusinessName(school.name);
        setBusinessKey(school.business_key);
        setBusinessSchoolType(school.school_type);
        setCurrentBusiness(school);
        setSchoolName(school.name);
        setSelectedKey(school.business_key);*/

        setSelectedSchool({
          business_id:school.business_id,
          business_key:school.business_key,
          name:school.name,
          school_type:school.school_type,
          business_id:school.business_id,
          school:school
        });
        //setSchoolName(school.name);
        //setSelectedKey(school.business_key);
        break;
      }
    }
  };

  const handleClose1 = () => {
    setOpenn(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleConfirmClick = async () => {
    setOpen(false);
    setOpenn(true);
    setBusinessId(selectedSchool?.business_id);
    setBusinessName(selectedSchool?.name);
    setBusinessKey(selectedSchool?.business_key);
    setBusinessSchoolType(selectedSchool?.school_type);
    setCurrentBusiness(selectedSchool?.school);

    
    refreshAllData();
    await delay(1000);
    setOpenn(false);
    onClose();
    //window.location.href="/app/admin";
    history.push("admin/dashboard");
  };

  return (
    <div>
      <StyledMenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <ChangeCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("select_a_school")} />
      </StyledMenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("change_school")}</DialogTitle>
        <DialogContent>
          <div> {t("select_a_school")}</div>
          <select
            name="school-list"
            id="school-list"
            fullWidth
            displayEmpty
            value={selectedSchool?.business_key}
            defaultValue={selectedSchool?.name}
            onChange={handleSchoolChange}
          >
            {allSchools.map((element, index) => (
              <option key={index} value={element.business_key}>
                {element.name}
              </option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              backgroundColor: "rgb(17, 141, 65)",
              width: "120px",
              color: "white",
            }}
            onClick={handleConfirmClick}
            autoFocus
          >
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openn}
        onClick={handleClose1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
