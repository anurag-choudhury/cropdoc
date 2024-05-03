import './Irrigation.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Navbar from './Navbar.jsx'

function Irrigation() {
  return (
    <div className='containerIrr'>
      
      <h1>Irrigation Schedule GUI</h1>
      <div className='calendar'>
      <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      weekends={true}
      events={[
        { title: 'event 1', date: '2024-03-01' },
        { title: 'event 2', date: '2024-03-18' }
  ]}
      />
      </div>
      <Navbar/>
    </div>
  )
}

export default Irrigation
