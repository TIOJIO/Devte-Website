import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import logo1 from './fr.jpg';
import logo2 from './an.jpg';
import i18n from "i18next";
import Axios from "axios";
import {refreshAllData} from "../../utils/services/ServerCall";
import { useTranslation } from "react-i18next";

import {
  getOfflineMode,
  setOfflineMode,
  getPayments,
  setPayments,
  getStudents,
  setStudents,
  getClaimings,
  setClaimings,
  getBusinessKey,
  getBusinessId,
  getSchoolAnnouncements,
  setSchoolAnnouncements,
  setClassRooms,
  getClassRooms,
  setEmployees,
  getEmployees


} from 'utils/session'


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: "rgb(17, 141, 65)",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function AlertDialog({onClose,isRefresh}) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [openn, setOpenn] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  

  const handleClose1 = () => {
    setOpenn(false);
  };

    const changeOffline= () => {
      
      const isOffline = getOfflineMode();

     if(isOffline){
    
      setOfflineMode("0");
      if(isOnline){
        checkOfflineAndSync();
      }
    
      if(isRefresh && isOnline){
        refreshAllData();
      }
     }
     else {
      setOfflineMode("1");

     }
     setOpen(false);
     onClose();
    }
  
    const handleClickOpen = () => {
    setOpen(true);
  };

  const checkOfflineAndSync = () => {
    const payments = JSON.parse(getPayments());
    const allStudents = JSON.parse(getStudents());
    if(allStudents){
      let indexCounter =0;
      for (const student of allStudents){
        if(student?.is_created_in_offline_mode){
          student.is_created_in_offline_mode =false;
          asyncStudentCall(allStudents, student, payments,indexCounter);
        }
        indexCounter=indexCounter+1;
      }
    }
    /*if(payments){
      for(const payment of payments){
        if(payment?.is_created_in_offline_mode){

        const student = allStudents?.find((item) =>  item.business_client_id.trim()==payment.business_client_id.trim() && item?.is_created_in_offline_mode);
        if(payment && student && student){
          payment.is_created_in_offline_mode=false;
          student.is_created_in_offline_mode=false;
          asyncPaymentCall(payment, student, allStudents,payments)
        }
      
        }
      }
    }*/
    const claimings = JSON.parse(getClaimings());
    if(claimings){
      for(const claiming of claimings){
        if(claiming?.is_created_in_offline_mode){
          claiming.is_created_in_offline_mode =false;
        asyncClaimingCall(claimings, claiming)
      }
     }
    }

    const announces = JSON.parse(getSchoolAnnouncements());
    if(announces){
      for(const announce of announces){
        if(announce?.is_created_in_offline_mode){
          announce.is_created_in_offline_mode =false;
          asyncAnnounceCall(announces, announce)
      }
     }
    }


    const employees = JSON.parse(getEmployees());
    if(employees){
      for(const employe of employees){
        if(employe?.is_created_in_offline_mode){
          employe.is_created_in_offline_mode =false;
          asyncEmployeCall(employees, employe)
      }
     }
    }

    const classrooms = JSON.parse(getClassRooms());
    if(classrooms){
      for(const classroom of classrooms){
        if(classroom?.is_created_in_offline_mode){
          classroom.is_created_in_offline_mode =false;
          asyncClassRoomCall(classrooms, classroom)
      }
     }
    }

  };

 


  async function asyncPaymentCall(payment, data, allStudents, payments) {
    let url =process.env.REACT_APP_API_URL +"/updatebusiness_client_authenticate";

    if(payment?.is_modified_requested){
      url =process.env.REACT_APP_API_URL +"/UpdateBusinessClientPayment";
    }
    else if(payment?.is_deleted_requested){
      url =process.env.REACT_APP_API_URL +"/DeleteBusinessClientPayment";
    }
    try {
      Axios
          .request({
              method: 'POST',
              url,
              data: {
                  business_client_id: data.business_client_id,
                  topic: "my_appacademia"+getBusinessKey(),
                  topic_client:"my_appacademia"+getBusinessKey()+data.business_client_id,
                  business_id: getBusinessId(),
                  business_key: getBusinessKey(),
                  is_web_version: "1",
                  
                  business_client_list:JSON.stringify(data),
                  client_transaction_list:JSON.stringify(data?.chanels), //ToDo: should be save in backend
                  username:data.username,
                  passwort:data.password,
                  card_id:data?.school_immatricul,
                  sex:data?.sex,
                  amount:Number(payment?.amount),
                  name:data?.name,
                  business_client_payment_id:
                  payment?.business_client_payment_id,
                  business_client_payment_list:JSON.stringify(payment)

              }
          })
          .then(res=>{
              ////console.log(res.data)
              if(!res.data.error )
              {

                if(allStudents){
                  const newstudents = [...allStudents];
                  const index = allStudents.findIndex((item)=> item.business_client_id ===data.business_client_id);
                  newstudents[index] = data;

                  setStudents(JSON.stringify(newstudents))
                }
                
                if(payments){
                  const newStudentTransitions = [...payments];
                  payment.business_client_payment_id = res.data.business_client_payment_id
                  newStudentTransitions.push(payment)
            
                  setPayments(JSON.stringify(newStudentTransitions))
                }
              
                  
            
              }
              else{
              
              }
            

          })



  }catch(e){
    console.log(e)
  }
  }
  async function asyncClaimingCall(claimings, data) {
    const url =process.env.REACT_APP_API_URL +"/create_business_client_claiming_authenticate";
    try {
      Axios
      .request({
          method: 'POST',
          url,
          data: {
              business_id:getBusinessId(),
              business_client_id:data.business_client_id,
              business_key:getBusinessKey(),
              topic:"my_appacademia"+getBusinessKey(),
              is_response_client:"1",
              topic_client:"my_appacademia"+getBusinessKey()+data.business_client_id,
              agent_name: "Administrator",
              business_client_claiming_list:JSON.stringify(data),
              actionSend:data?.actionSend,
              sendMode:data?.sendMode,
              SmsID:data?.SmsID,
              isSmsEnable:data?.isSmsEnable,
              SMSThreshold:data?.SMSThreshold,
              msg:data?.message,
              phoneNumber:data?.phoneNumber,

          }


      })
      .then(res=> {
        
              if(res?.data !== null || !res?.data?.error) {
                data.is_created_in_offline_mode =false;
                data.business_client_claiming_id = res.data?.business_client_claiming_id;
          
              if(claimings == null){
                claimings = []
              }
              claimings.push(data)
              setClaimings(JSON.stringify(claimings))
              
          }
      })



  }catch(e){
    console.log(e)
  }
  }

  async function asyncAnnounceCall(announces, data) {
    const url =process.env.REACT_APP_API_URL +"/create_business_client_schoolannouncement";
    try {
      Axios
      .request({
          method: 'POST',
          url,
          data: {
              business_id:getBusinessId(),
              business_key:getBusinessKey(),
              topic: "my_appacademia" + getBusinessKey(),
              is_response_client: "1",
              agent_name: "Administrator",
              business_client_schoolannouncement_list:
              JSON.stringify(
                data
              ),
              response_message: "response_message",

          }


      })
      .then(res=> {
          
        if (res.data !== null && Array.isArray(res.data)) {
          data.business_client_schoolannouncement_id =
            res.data?.business_client_schoolannouncement_id;
      

          if (announces === undefined) {
            announces = [];
          }
          announces.push(data);
          setSchoolAnnouncements(JSON.stringify(announces));
        }
              
          
      })



  }catch(e){
    console.log(e)
  }
  }

  async function asyncStudentCall(students, student, payments, indexCounter) {

    const url_create =
      process.env.REACT_APP_API_URL + "/createbusiness_client_authenticate";
    const url_update =
      process.env.REACT_APP_API_URL + "/updatebusiness_client_authenticate";

    let url =url_update;
    if (student?.business_client_id?.length>9) {
      url = url_create;
    }
    student.local_business_client_id =student.business_client_id; //save local
    student.is_created_in_offline_mode = false;
    try {
      Axios
      .request({
          method: 'POST',
          url,
          data: {
              business_id:getBusinessId(),
              business_key:getBusinessKey(),
              topic: "my_appacademia" + getBusinessKey(),
              business_client_list: JSON.stringify(student),
              business_client_id: student.business_client_id,
              is_web_version: "1",
              username: student?.username,
              passwort: student?.password,
              card_id: student?.school_immatricul,
              sex: student?.sex,

          }


      })
      .then(res=> {
        if (res.data.status === "ok" || !res.data.error) {
         
          student.business_client_id =
            res.data?.id;
          if (students === undefined) {
            students = [];
          }
          students[indexCounter] = student;
          setStudents(JSON.stringify(students));

          if(student?.local_business_client_id>8){
            const studentPayments = payments?.map((item) =>  item?.business_client_id.trim()==student?.local_business_client_id.trim() && item?.is_created_in_offline_mode);
               
            //check if payment exist
            if(payments){
              for(const payment of studentPayments){
                if(payment?.is_created_in_offline_mode){
        
                if(payment && student){
                  payment.is_created_in_offline_mode=false;
                  student.is_created_in_offline_mode=false;
                  asyncPaymentCall(payment, student, undefined,studentPayments)
                }
              
                }
              }
            }
          }
        }
              
      })

  }catch(e){
    //console.log(e)
  }
  }

  async function asyncEmployeCall(employees, data) {

    const url_create =
    process.env.REACT_APP_API_URL + "/createbusiness_employe_authenticate";
    const url_update =
    process.env.REACT_APP_API_URL + "/updatebusiness_employe_authenticate";

    let url =url_create;
    if (data.business_employe_id.length>7) {
      url = url_update;
    }

    try {
      Axios
      .request({
          method: 'POST',
          url,
          data: {
              business_id:getBusinessId(),
              business_key:getBusinessKey(),
              topic: "my_appacademia" + getBusinessKey(),
              business_employe_list: JSON.stringify(data),
              business_employe_id: data.business_employe_id,
              is_web_version: "1",
              first_name: data.firstName,
              last_name: data.lastNam,
              phone: data.Phone,
              username: data.userName,
              password: data.password,

          }


      })
      .then(res=> {
        if (res.data !== null && Array.isArray(res.data)) {
          data.employe_id =
            res.data?.id;
          if (employees === undefined) {
            employees = [];
          }
          employees.push(data);
          setEmployees(JSON.stringify(employees));
        }
              
      })

  }catch(e){
    //console.log(e)
  }
  }
  async function asyncClassRoomCall(classRooms, data) {

    const url_create =
    process.env.REACT_APP_API_URL + "/createbusiness_bouquet_authenticate";
  const url_update =
    process.env.REACT_APP_API_URL + "/updatebusiness_bouquet_authenticate";

    let url =url_create;
    if (data.business_bouquet_id.length>7) {
      url = url_update;
    }

    try {
      Axios
      .request({
          method: 'POST',
          url,
          data: {
              business_id:getBusinessId(),
              business_key:getBusinessKey(),
              topic: "my_appacademia" + getBusinessKey(),
              business_bouquet_id: business_bouquet_id,
              business_bouquet_list: JSON.stringify(data),
              is_web_version: "1",
              prof_name: data.prof_name,
              name: data.name,
              student_number: data.student_number,
              business_client_schoolfaculty_id:
                data.business_client_schoolfaculty_id,
              business_client_schoolfaculty_name:
                data.business_client_schoolfaculty_name,
              business_client_schooldepartment_id:
                data.business_client_schooldepartment_id,
              business_client_schooldepartment_name:
                data.business_client_schooldepartment_name,
              business_client_schoolfiliare_id:
                data.business_client_schoolfiliare_id,
              business_client_schoolfiliare_name:
                data.business_client_schoolfiliare_name,
              business_client_schoolexpertise_id:
                data.business_client_schoolexpertise_id,
              business_client_schoolexpertise_name:
                data.business_client_schoolexpertise_name,

          }


      })
      .then(res=> {
        if (res.data !== null && Array.isArray(res.data)) {
          data.employe_id =
            res.data?.id;
          if (classRooms === undefined) {
            classRooms = [];
          }
          classRooms.push(data);
          setEmployees(JSON.stringify(classRooms));
        }
              
      })

  }catch(e){
    //console.log(e)
  }
  }

  

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>

    <StyledMenuItem  onClick={handleClickOpen} >
          <ListItemIcon>
          {getOfflineMode()? <WifiOffIcon fontSize="small"/>: <NetworkWifiIcon fontSize="small"/>} 
          </ListItemIcon>
          <ListItemText primary= {getOfflineMode()? t("switch_to_online"): t("switch_to_offline")} />
        </StyledMenuItem>
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {getOfflineMode()? t("switch_to_online"): t("switch_to_offline")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {getOfflineMode()? t("switch_to_online_warning"): t("switch_to_offline_warning")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <Button 
           style={{backgroundColor:'rgb(17, 141, 65)',width:'120px',color:'white'}}
          onClick={changeOffline} autoFocus
          >
             {t("yes")}
          </Button>

          <Button 
           style={{backgroundColor:'rgb(240, 0, 0)',width:'120px',color:'white'}}
          onClick={handleClose} autoFocus
          >
             {t("no")}
          </Button>
        </DialogActions>
     
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openn}
        onClick={handleClose1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}