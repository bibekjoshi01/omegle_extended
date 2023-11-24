import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Searching.module.scss'

const Searching = () => {

  const navigation = useNavigate()

  const handleSearch = () =>{
    navigation('/chat-dashboard');
  }
  return (
    <div className={styles.main}>
    <button onClick={handleSearch} className={styles.searchingPage}>
      Start Searching
    </button>

    </div>
  )
}

export default Searching

