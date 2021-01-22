import {getSaves} from '../api'

export default function Saves (props) {

  async function fetchSaves(){
    const saves = await getSaves()
    return saves
  }

  return (
    <div className='control-panel'>
      <button>Save Current Board</button>
      <button>Save Initial Generation</button>
      <button onClick={()=> {fetchSaves()}}>Get Saves</button>
    </div>
  )
}