import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Crypto } from '../../context/CryptoContext'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase'
const Signup = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] =  useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const {setAlert} = useContext(Crypto)

  const handleSubmit = async() =>{
     if(password !== confirmPassword){
      setAlert({
        open:'true',
        message:'password dose not match',
        type:'error'
      })
     }
     try{
       const result = await createUserWithEmailAndPassword(auth,email,password)
       setAlert({
        open:true,
        message:`Sign up successful. Welcome${result.email}`
       })
       handleSubmit()
     }catch(error){
       setAlert({
        open:true,
        message:error.message,
        type:'error'
       })
     }
  }
  return (
    <Box
     p={3}
     style={{display:'flex',flexDirection:'column',gap:'20px'}}
    >
      <TextField
       variant='outlined'
       type='email'
       label=" Enter email "
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       fullWidth
      />
      <TextField
       variant='outlined'
       type='password'
       label="Enter password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       fullWidth
      />
      <TextField
       variant='outlined'
       type='password'
       label="Re-enter Password"
       value={confirmPassword}
       onChange={(e)=>setConfirmPassword(e.target.value)}
       fullWidth
      />
      <Button
       variant='contained'
       size='large'
       style={{backgroundColor:'#EEBC1D'}}
       onClick={handleSubmit}
      >Sign up</Button>
    </Box>
  )
}

export default Signup