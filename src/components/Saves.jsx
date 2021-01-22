import {getSaves} from '../api'

export default function Saves (props) {

  async function fetchSaves(){
    const saves = await getSaves()
    console.log(saves)
  }

  return (
    <div>
      Saves
      <button>Get Saves</button>
    </div>
  )
}