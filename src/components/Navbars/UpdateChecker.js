import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DraftsIcon from "@material-ui/icons/Drafts";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Check from "@mui/icons-material/Check";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
require("moment/locale/fr");

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

export default function AlertDialog({ onClose }) {
  const { t } = useTranslation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openn, setOpenn] = React.useState(false);

  const handleClose1 = () => {
    setOpenn(false);
  };

  const handleConfirmClick = () => {
    history.push("app/dashboard");
    onClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledMenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <Check fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("check_4_update")} />
      </StyledMenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("check_4_update")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div> {t("click_refresh_to_check_if_there_are_updates")}</div>
          </DialogContentText>
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
            {t("refresh")}
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
