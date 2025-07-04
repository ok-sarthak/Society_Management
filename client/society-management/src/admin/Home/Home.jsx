import React, { useState } from 'react'
import SlideNavbar from '../Navbar.jsx'
import { 
  BarChart, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  Activity,
  Target,
  Calendar,
  FileText 
} from 'lucide-react'

const ExamplePage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Define your navigation items for this specific page
  const navItems = [
    { id: 'overview', name: 'Overview', icon: BarChart },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'reports', name: 'Reports', icon: PieChart, badge: '3' },
    { id: 'trends', name: 'Trends', icon: LineChart },
    { id: 'activities', name: 'Activities', icon: Activity },
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'reports', name: 'Reports', icon: PieChart, badge: '3' },
    { id: 'trends', name: 'Trends', icon: LineChart },
    { id: 'activities2', name: 'Activities2', icon: Activity },
    { id: 'goals', name: 'Goals', icon: Target },
  ]

  const handleNavClick = (item, index) => {
    setActiveTab(item.id)
    console.log('Clicked on:', item.name)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div className="p-6">Overview Content</div>
      case 'analytics':
        return <div className="p-6">Analytics Content</div>
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

export default ExamplePage