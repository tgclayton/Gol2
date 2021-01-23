import { getSaves, saveGame } from '../api'
import {useState, useEffect} from 'react'

import '../styles/saves.css'

export default function Saves(props) {
  const [refresh, setRefresh] = useState(false)
  const [saves, setSaves] = useState(() => fetchSaves())

  useEffect(() => {
    // console.log('effect called')
    setSaves(fetchSaves())
  }, [refresh])

  async function save(cells, title, desc) {
    const save = {
      cells: cells,
      minSize: props.boardSize,
      title: title,
      desc: desc
    }
    console.log(save)
    // await saveGame(save)
    // console.log('refreshed')
    setRefresh(!refresh)
  }

  async function fetchSaves() {
    // console.log('saves fetched')
    const saves = await getSaves()
    setSaves(saves)
    // return saves
  }

  return (
    <>

      <div id='save-panel' className='control-panel'>
        <h3>Save Game</h3>
        {/* <button>Save Initial Generation</button> */}
        {/* <button onClick={() => { fetchSaves() }}>Get Saves</button> */}
        {/* <br/><br/> */}
        <input id='save-title' type='text' ></input>
        <p>Save Title</p>
        <input id='save-desc' type='text' ></input>
        <p>Save Description</p>
        <button onClick={() => { save(props.liveCells, document.getElementById('save-title').value, document.getElementById('save-desc').value) }} 
        style={{marginTop:'1em'}}>Save Current Generation</button>
      </div>

      <div className='control-panel'>

      </div>

    </>
  )
}