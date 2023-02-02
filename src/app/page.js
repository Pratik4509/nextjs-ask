"use client";
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [que, setQue] = useState("");
  const [ans, setAns] = useState("");
  const [currentQue, setCurrentQue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const options = {
    method: "POST",
    url: "https://you-chat-gpt.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d537a01898mshdab471e7421511cp1f72d5jsn642a6661fb46",
      "X-RapidAPI-Host": "you-chat-gpt.p.rapidapi.com"
    },
    data: `{"question":"${que}","max_response_time":30}`
  };
  const getData = (que) => {
    setIsLoading(true);
    axios.request(options).then(function (response) {
      console.log(response.data);
      setAns(response.data)
      setCurrentQue(que)
      setQue('')
      setIsLoading(false)
    }).catch(function (error) {
      console.error(error);
      setIsLoading(false);
    });
  };
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {/* <div className={styles.description}>
          <p>
            Get started by asking anything you wish to&nbsp;
          </p>
        </div> */}
        <form className={styles.form}>
          <input
            type="text"
            className={styles.form__field}
            placeholder="Ask anything"
            value = {que}
            onChange={(e) => setQue(e.target.value)}
          />
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnInside} ${styles.uppercase}`}
            onClick={() => getData(que)}
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
        <br />
        
        {isLoading ? <LoadingSpinner /> : <p>{currentQue}</p>}
        <br />
        <p className={styles.p}>{ans.answer}</p>
      </div>
    </main>
  )
}
