import { getSaves, saveGame } from '../api'
import {useState, useEffect} from 'react'

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

      <div className='control-panel'>
        <button onClick={() => { save(props.liveCells) }} >Save Current Board</button>
        <button>Save Initial Generation</button>
        <button onClick={() => { fetchSaves() }}>Get Saves</button>
      </div>

      <div className='control-panel'>

      </div>

    </>
  )
}