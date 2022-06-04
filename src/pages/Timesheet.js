/* eslint-disable */

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { set,ref,onValue,update } from "firebase/database"
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,TextField
} from '@mui/material';
import {db} from "../firebase";
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------


let i;
let id=0;
export default function Timesheet() {
    
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const datesCollection = []
 
  for ( i = 1; i < 12; i+=1) {
    const newDate = new Date();
    newDate.setDate(current.getDate() + i)
    datesCollection.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
  }

  const [projects,setprojects]=useState([]);
  const [opro,setopro]=useState(0)
  const [pro,setpro]=useState("");
  const openpro=()=>
  {
    setopro(1);
  }


  useEffect(()=>{
    
    
    onValue(ref(db),(snapshot)=>{
      let data=snapshot.val();
      console.log("drhdth",data.projects);
      data=data.projects;
      if(data!=null)
      {
     
        setprojects(data)

      }
      console.log(projects.length);
      
    })
  },[])


  const addproject= (event) => {
    event.preventDefault();
    id=projects.length;

    set(ref(db,`/projects/${id+1}`),{
      id:id+1,
      label:pro,
      first:"",
      second:"",
      third:"",
      four:"",
      five:"",
      six:"",
      seven:"",
      compl:"no",
      afirst:"",
      asecond:"",
      athird:"",
      afour:"",
      afive:"",
      asix:"",
      aseven:"",
      categ:"",
    });
    
    
   
    
   // setprojects(allprojects => [...allprojects,kkk])
    setpro("")
    setopro(0);
    id+=1;
  
    console.log(projects)
  }



  const changeHandler = (pro) => event => {

    const { name, value } = event.target;
    const idd=pro.id;
  update(ref(db,`/projects/${pro.id}`),{
    
    pro,
    id:pro.id,
  [name]:value
  })

    setprojects(input => input.map((el) => el.id === id
      ? {
          ...el,
          [name]: value,
        }
      : el,
    ));
  };

    
  
  return (
    <div>
      <Card>
      <TableContainer sx={{ minWidth: 800 }}>
              <Table>
              <TableBody>
                <center><h2>Allocated Time</h2></center>
              <TableRow>
                      <TableCell >
                       <strong>Projects</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[0]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[1]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[2]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[3]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[4]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[5]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[6]}</strong>
                      </TableCell>
                     
                    </TableRow>
               {projects.map(pro=> (
               <TableRow>
                      <TableCell >
                       {pro.label}
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='first' value={pro.first} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='second' value={pro.second} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='third' value={pro.third} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='four' value={pro.four} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='five' value={pro.five} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='six' value={pro.six} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='seven' value={pro.seven} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      
                </TableRow>))}
                
                  </TableBody>
                  </Table>
                  </TableContainer>
               
      </Card>
      <br/>
      <br/>
      <Button variant style={{backgroundColor:"lightgrey"}} onClick={openpro}>Add Project</Button>
      <br/>
      <br/>
      {opro===1?
  

  <div style={{width:"300px",height:"1000px"}}>
  
  
             <Card>
               <center><form onSubmit={addproject}><br/><br/>
              <h3>Project name</h3><TextField type="text" value={pro} onChange={(e) => setpro(e.target.value)}/>
               <br/><br/>
               <Button variant style={{backgroundColor:"lightgrey"}} type="submit">ADD</Button>
               <br/>
               <br/>
               </form></center>
             </Card>
          
            
            
                </div>
                
                :
                <div/>}
                 <Card>
      <TableContainer sx={{ minWidth: 800 }}>
              <Table>
              <TableBody>
              <center><h2>Actual Time</h2></center>

              <TableRow>
                      <TableCell >
                       <strong>Projects</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[0]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[1]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[2]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[3]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[4]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[5]}</strong>
                      </TableCell>
                      <TableCell >
                       <strong>{datesCollection[6]}</strong>
                      </TableCell>
                     
                    </TableRow>
               {projects.map(pro=> (
               <TableRow>
                      <TableCell >
                       {pro.label}
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='afirst' value={pro.afirst} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='asecond' value={pro.asecond} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='athird' value={pro.athird} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='afour' value={pro.afour} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='afive' value={pro.afive} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='asix' value={pro.asix} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      <TableCell >
                       <TextField type="text" name='aseven' value={pro.aseven} onChange={(e)=>changeHandler(pro)(e)} />
                      </TableCell>
                      
                </TableRow>))}
                
                  </TableBody>
                  </Table>
                  </TableContainer>
               
      </Card>
      
          
                </div>
  );
}
