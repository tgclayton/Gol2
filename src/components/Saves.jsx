import { getSaves, saveGame } from '../api'
import {useState, useEffect} from 'react'

import '../styles/saves.css'

export default function Saves(props) {
  const [refresh, setRefresh] = useState(false)
  const [saves, setSaves] = useState([])

  useEffect(() => {
    setSaves(fetchSaves())
  }, [refresh])

  async function save(cells, title, desc) {
    const save = {
      cells: Array.from(cells),
      minSize: props.boardSize,
      title: title,
      desc: desc
    }
    console.log(save)
    await saveGame(save)
    setRefresh(!refresh)
  }

  async function fetchSaves() {
    const saves = await getSaves()
    setSaves(saves)
  }

  return (
    <>

      <div id='save-panel' className='control-panel '>
        <h3 className='save-panel-title'>Save Game</h3>
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

      <div id = 'saves-selector' className='control-panel'>
      <h3 className='save-panel-title'>Saves</h3>
        {saves[0] &&
          saves.map(save => {
            return (
              <div key ={`save-${save._id}`} className = 'save-box'>
                <h5 style={{margin:'0 0 .5em',}}>{save.title}</h5>
                <p className='save-p'>{save.desc}</p>
                <p className='save-p'>Required Size: {save.minSize}x{save.minSize}</p>
                <button onClick = {() => props.loadSave(save.cells)}>Load Save</button>
              </div>
            )
          })
        }
        
      </div>

    </>
  )
}