import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Accounts from './Accounts/Accounts.jsx'
import BuildingManagement from './Building Management/buildingManagement.jsx'
import AdminSettings from './Admin_Settings/adminSettings.jsx'
import CoCurricular from './Co_Curricular/coCurricular.jsx'
import ComplaintFeedback from './Complaints_Feedback/ComplaintsFeedback.jsx'
import EventsActivities from './Events_Activities/eventsActivities.jsx'
import Health from './Health/health.jsx'
import NoticesCommunication from './Notices_Communication/noticesCommunication.jsx'
import Members from './Members/Members.jsx'
import MaintenanceRent from './Maintenance_Rent/maintenanceRent.jsx'
import ReportsAnalysis from './Reports_Analysis/ReportsAnalysis.jsx'
import Services from './Services/Services.jsx'
import Shopping from './Shopping/Shopping.jsx'
import StaffManagement from './Staff_Management/StaffManagement.jsx'
import SystemSecurity from './System_Security/SystemSecurity.jsx'
import SupportContacts from './Support_Contacts/SupportContacts.jsx'
import Visitors from './Visitors/Visitors.jsx'
import Layout from './Layout.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<><Home/></>} />
        <Route path="/accounts" element={<><Accounts/></>} />
        <Route path="/adminsettings" element={<><AdminSettings/></>} />
        <Route path="/buildingmanagement" element={<><BuildingManagement/></>} />
        <Route path="/cocurricular" element={<><CoCurricular/></>} />
        <Route path="/complaintsfeedback" element={<><ComplaintFeedback/></>} />
        <Route path="/eventsactivities" element={<><EventsActivities/></>} />
        <Route path="/health" element={<><Health/></>} />
        <Route path='/maintenancerent' element={<><MaintenanceRent/></>} />
        <Route path='/noticescommunication' element={<><NoticesCommunication/></>} />
        <Route path='/members' element={<><Members/></>} />
        <Route path='/reportsanalysis' element={<><ReportsAnalysis/></>} />
        <Route path='/services' element={<><Services/></>} />
        <Route path='/shopping' element={<><Shopping/></>} />
        <Route path='/staffmanagement' element={<><StaffManagement/></>} />
        <Route path='/systemsecurity' element={<><SystemSecurity/></>} />
        <Route path='/supportcontacts' element={<><SupportContacts/></>} />
        <Route path='/visitors' element={<><Visitors/></>} />
      </Route>
    </Routes>
  )
}
