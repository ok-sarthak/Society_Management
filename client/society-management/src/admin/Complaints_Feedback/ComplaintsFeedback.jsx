import React, { useState } from 'react'
import SlideNavbar from '../Navbar.jsx'
import { 
  BarChart, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  Activity,
  Target,
} from 'lucide-react'
import Feedback from './Feedback/Feedback.jsx'

const ComplaintsFeedback = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Define your navigation items for this specific page
  const navItems = [
    { id: 'raisecomplaint', name: 'Raise Complaint', icon: BarChart },
    { id: 'complaintcategories', name: 'Complaint Categories', icon: TrendingUp },
    { id: 'complainttracker', name: 'Complaint Tracker', icon: PieChart, badge: '3' },
    { id: 'resolutionnotes', name: 'Resolution Notes', icon: LineChart },
    { id: 'feedback', name: 'Feedback', icon: Activity },
    { id: 'feedbackanalysis', name: 'Feedback Analysis', icon: Target },
  ]

  const handleNavClick = (item, index) => {
    setActiveTab(item.id)
    console.log('Clicked on:', item.name)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div className="p-6">Overview Content</div>
      case 'feedback':
        return <div className="p-6"><Feedback/></div>
      case 'reports':
        return <div className="p-6">Reports Content</div>
      // Add more cases as needed
      default:
        return <div className="p-6">Default Content</div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{``}</h1>
      </div> */}

      {/* Sliding Navbar */}
      <SlideNavbar
        navItems={navItems}
        activeItem={activeTab}
        onItemClick={handleNavClick}
        variant="glass"
        className="mb-8"
      />

      {/* Content Area */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
        {renderContent()}
      </div>
    </div>
  )
}

export default ComplaintsFeedback