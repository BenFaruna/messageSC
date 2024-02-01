import { useState } from 'react'
import './App.css'

import { ethers } from "ethers";

import abi from "./abi.json";

function App() {
  const [contract, setContract] = useState(undefined)
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")

  const contractAddress = "0x4B7e00f107CcB2ae3982DaE5692238eB6B811959";
  const contractAbi = abi;


  async function setupContract() {
    if (typeof window.ethereum !== "undefined") {
      const address = await window.ethereum.request({ method: "eth_requestAccounts" });
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);


      setContract(contract);
      setAddress(address);

      await getMessage();
    }
  }

  async function getMessage() {
    try {
      const message = await contract.getMessage();
      setMessage(message);
    } catch (err) {
      console.log(err)
    }
  }

  async function changeMessage() {
    const messageInput = document.getElementById("message")
    const newMessage = messageInput.value

    if (newMessage == "") {
      alert("Enter a message");
      return
    }

    try {
      const message = await contract.setMessage(newMessage)
      await message.wait();
  
      await getMessage();
      messageInput.value = ""
    } catch (err) {
      alert(err)
    }
  }

  getMessage()

  return (
    <>
      <div>
        {address == "" ? <button onClick={setupContract}>Connect</button> : null }
        <p>Address: {address}</p>
        <p>Message: {message}</p>
      </div>
      <div>
        <input type="text" name="message" id="message" /><br />
        <input type="button" value="change message" id="button" onClick={async () => { await changeMessage() }} />
      </div>
    </>
  )
}

export default App
