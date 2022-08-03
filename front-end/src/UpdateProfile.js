import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { store } from './Store';
import { toast } from "react-toastify";
import './UpdateProfile.css';
import axios from 'axios';

const UpdateProfile = () => {
    ///////////////////////////////////////////////////////////
    const {state , dispatch} = useContext(store);
    const {userInfo} = state;
    //////////////////////////////////////////////////////////
    const [name , setName]  = useState(userInfo.name);
    const [email , setEmail] = useState(userInfo.email);
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');

    /////////////////////////////////////////////////////////
  const  HandleUpdate= async (e)=>{
        e.preventDefault();
        if(password !== confirmPassword)
        {
            toast.error("Must have same Password and Confirm Password");
            return;
        }
        try {
            const {data} = await axios.put('http://localhost:8001/api/user/profile',{
                name,
                email,
                password
            },
            {
                headers:{
                    authorization :userInfo.token, 
                }
            });
            dispatch({type: 'USER_SIGNIN' , payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success("User Updated Successfully");
            
        } catch (err) {
            toast.error("Error Occurred");
        };

    }
    ////////////////////////////////////////////////////////
  return (
    <div className='container main-div'>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <h1>Update Profile</h1>
      <div >
        <form onsubmit={HandleUpdate}>
            <label>Name</label>
            <br/>
            <input type='text' required value={name} onChange={e=>setName(e.target.value)}></input>
            <br/>
            <label>Email</label>
            <br/>
            <input type='email' required value={email} onChange={e=>setEmail(e.target.value)}></input>
            <br/>
            <label>Password</label>
            <br/>
            <input type='password' required value={password} onChange={e=>setPassword(e.target.value)}></input>
            <br/>
            <label>Confirm Password</label>
            <br/>
            <input type='password'  value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></input>
            <br/>
            <button className='btn btn-success btn-lg  my-2 ' type='submit'>Update User</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
