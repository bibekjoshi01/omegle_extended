import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Searching.module.scss'
import { RiUserSearchLine } from "react-icons/ri";

const Searching = () => {

  const navigation = useNavigate()
  const userData = JSON.parse(localStorage.getItem('userData'));
  const handleSearch = () =>{
    navigation('/chat-dashboard');
  }
  return (
    <div className={styles.main}>
    <p className={styles.usersName}>Hii {userData.nickName} !! </p>
    <button onClick={handleSearch} className={styles.searchingPage}>
      Start Searching <RiUserSearchLine/>
    </button>

    </div>
  )
}

export default Searching

