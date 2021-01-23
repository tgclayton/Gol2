import { getSaves, saveGame } from '../api'
import {useState, useEffect} from 'react'

import '../styles/saves.css'

export default function Saves(props) {
  const [refresh, setRefresh] = useState(false)
  const [saves, setSaves] = useState(fetchSaves())

  useEffect(() => {
    setSaves(fetchSaves())
  }, [refresh])

  async function save(cells, title, desc) {
    const save = {
      cells: cells,
      minSize: props.boardSize,
      title: title,
      desc: desc
    }
    await saveGame(save)
    setRefresh(!refresh)
  }

  async function fetchSaves() {
    const saves = await getSaves()
    return saves
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
        <button onClick={() => { save(props.liveCells) }} style={{marginTop:'1em'}}>Save Current Generation</button>
      </div>

      <div className='control-panel'>

      </div>

    </>
  )
}