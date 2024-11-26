import React from 'react'
import './MainPage.css'
import './Calendar.css'
import Calendar from './Calendar'
import Sidebar from './Sidebar'
import Header from './Header'
import Summary from './Summary'

const MainPage: React.FC = () => {
  return (
    <div className="container_main">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="main_container">
          <Calendar />
          <Summary />
        </div>
      </main>
    </div>
  )
}
export default MainPage