
import react,{ useState,useEffect } from 'react';
import { set,ref,onValue,update } from "firebase/database"

import {uid} from "uid";
import { width } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { Grid ,Container,Card,TableContainer,Box,Button,Table,TextField,TableBody,TableRow,TableCell} from '@mui/material';
  import {
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
  } from '../sections/@dashboard/app';
  import Iconify from '../components/Iconify';
  import {db} from "../firebase";
  import Timer from './Timer'


  let id=0;
  let starttime=0;
let endtime=0;
export default function Tasks()
{

  
  const [alltasks,setalltasks]=useState([])
  const [otask,setotask]=useState(0)
  const [task,setTask]=useState([])
  const [taskk,setTaskk]=useState("")
  const [categg,setcategg]=useState("")
  const [timer,settimer]=useState(0)
  useEffect(()=>{
    
    
    onValue(ref(db),(snapshot)=>{
      let data=snapshot.val();
      console.log("drhdth",data.projects);
      data=data.projects;
      if(data!=null)
      {
     
        setalltasks(data)

      }
      console.log(alltasks.length);
      
    })
  },[])

  const opentask=()=>
  {
      setotask(1);
  }
const addtask= async (event) => {
  event.preventDefault();
  id=alltasks.length;

  set(ref(db,`/projects/${id+1}`),{
    id:id+1,
    label:taskk,
    compl:"no",
    first:"",
    second:"",
    third:"",
    four:"",
    five:"",
    six:"",
    seven:"",
    afirst:"",
    asecond:"",
    athird:"",
    afour:"",
    afive:"",
    asix:"",
    aseven:"",
    categ:categg,
  });
  
 
  setTaskk("")
  setotask(0);
  id+=1;

  console.log(alltasks)
}

function taskcompleted(name) {
  const idd=name.id;
  update(ref(db,`/projects/${idd}`),{
    name,
    id:idd,
    compl:'yes',
    label:name.label
  })

 

  console.log(alltasks)
}

const opentimer=()=>
 {
    starttime=performance.now();
 }
 const closetimer=()=>
 {
    endtime=performance.now();
 }

const savettime=(name)=>
{
  update(ref(db,`/projects/${name.id}`),{
      name,
      id:name.id,
      afirst:(endtime-starttime)/(1000)
  })
}

    return(
        <div>
                <Card>
                  <h2><center>PENDING!!!</center></h2>
      <TableContainer sx={{ minWidth: 800 }}>
              <Table>
              <TableBody>
              <TableRow>
                      <TableCell >
            {alltasks.filter(etas=>etas.compl==='no').map(eachtask=>(
              
              <div>
                <br/>
                <h2>{eachtask.label}
                </h2>
                <br/>
                <h3>Related to :&nbsp;&nbsp;<Button variant style={{backgroundColor:"wheat",width:"auto",padding:0}}> {eachtask.categ}</Button></h3>
                <br/>
                
                <Button variant style={{backgroundColor:"green"}} onClick={opentimer}>Start</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant style={{backgroundColor:"red"}} onClick={closetimer}>Stop</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant style={{backgroundColor:"orange"}} onClick={() => savettime(eachtask)}>Save</Button>
              
               {/* {timer===1?<><Timer />
                <br/>
                <Button variant style={{backgroundColor:"yellow"}} onClick={closetimer}>Close Timer</Button>
                <br/></>:<></>} */}
                <br/><br/>
                <Button variant style={{backgroundColor:"lightgreen"}} onClick={() => taskcompleted(eachtask)}>Completed!!!</Button>
                <br/>
                <br/>
                <hr/>
              </div>
            ))}
            </TableCell>
            </TableRow>

                      </TableBody>
                      </Table>
                      </TableContainer>
                      </Card>
                      <br />
                      <Button variant="contained"  onClick={opentask}  startIcon={<Iconify icon="eva:plus-fill" />}>
            Add task
          </Button>
           <br/>
           <br/>
           <div> {otask===1?
              

<div style={{width:"400px",height:"1000px"}}>


           <Card>
             <br/>
             <form onSubmit={addtask}>
            <center><h2>Task</h2>
            <TextField type="text" value={taskk} onChange={(e) => setTaskk(e.target.value)}/><br/><br/>
            <h2>Category</h2>
            <TextField value={categg} onChange={(e) => setcategg(e.target.value)} />
              <br/><br/>
            <Button  type="submit" variant="contained"   >
              
            ADD
          </Button>
          <br/>
          <br/>
          </center>
           
             </form>
           </Card>
        
          
          
              </div>
              
              :
              <div>.</div>}
                </div>
         <Card>
           <br/>
         <h2><center>COMPLETED</center></h2>
<TableContainer sx={{ minWidth: 800 }}>
     <Table>
     <TableBody>
     <TableRow>
             <TableCell >
   {alltasks.filter(etas=>etas.compl==='yes').map(eachtask=>(
     
     <div>
       <br />
       <h3>{eachtask.label}</h3>
    <br />
    
                <h3>Related to :&nbsp;&nbsp;<Button variant style={{backgroundColor:"wheat",width:"auto",padding:0}}> {eachtask.categ}</Button></h3>
                <br/>
                
       <hr/>
     </div>
   ))}
   </TableCell>
   </TableRow>

             </TableBody>
             </Table>
             </TableContainer>
             </Card>
        
             </div>
    )
}