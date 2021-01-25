import { getSaves, saveGame, delSave } from '../api'
import { useState, useEffect } from 'react'

import '../styles/saves.css'

export default function Saves(props) {
  const [refresh, setRefresh] = useState(false)
  const [saves, setSaves] = useState([])

  useEffect(() => {
    setSaves(fetchSaves() || [])
  }, [])

  function clearSaveFields() {
    console.log('got into clearsaves')
    document.getElementById('save-title').value = ''
    document.getElementById('save-desc').value = ''
  }

  async function save(cells, title, desc) {
    clearSaveFields()
    let valid = true
    saves.forEach(save => {
      if (save.title === title) valid = false
    })
    if (valid){
      const save = {
        cells: Array.from(cells),
        minSize: props.boardSize,
        title: title,
        desc: desc
      }
      const success = await saveGame(save)
      fetchSaves()
    }
  }
  
  async function fetchSaves() {
    const saves = await getSaves()
    setSaves(saves)
  }
  
  async function deleteSave(id) {
   const success = await delSave(id)
   console.log(success)
  fetchSaves()
  }

  return (
    <>

      <div id='save-panel' className='control-panel '>
        <h3 className='save-panel-title'>Save Game</h3>
        {/* <button>Save Initial Generation</button> */}
        {/* <button onClick={() => { fetchSaves() }}>Get Saves</button> */}
        {/* <br/><br/> */}
        <p>Title:</p>
        <input id='save-title' className ='editable' type='text' ></input>
        <p>Description:</p>
        <input id='save-desc' className ='editable' type='text' ></input>
        <button onClick={() => { save(props.liveCells, document.getElementById('save-title').value, document.getElementById('save-desc').value) }}
          style={{ marginTop: '1em' }}>Save Current Generation</button>
      </div>

      <div id='saves-selector' className='control-panel'>
        <div style={{}}>
          <h3 className='save-panel-title' id='savegames-title'>Saves</h3>
        </div>
        <div style={{}}>
          {saves[0] &&
            saves.map(save => {
              return (
                <div key={`save-${save._id}`} className='save-box'>
                  <h5 className='editable'contenteditable="true" style={{ margin: '0 0 .5em', }}>{save.title}</h5>
                  <p className='save-p editable' contenteditable="true">{save.desc}</p>
                  <p className='save-p'>Required Size: {save.minSize}x{save.minSize}</p>
                  <button onClick={() => props.loadSave(save.cells, save.minSize)}>Load</button>
                  <button onClick={() => deleteSave(save.title)}>Delete</button>
                </div>
              )
            })
          }
        </div>
      </div>

    </>
  )
}