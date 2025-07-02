import React from 'react'
import videoSrc from '../../assets/AnimationBB.webm'

export default function Hero() {
  return (
    <div className="flex flex-col-2 items-center justify-center h-screen bg-gray-900 text-white">
    <video src={videoSrc} autoPlay loop muted style={{ width: '40%', height: '80vh' }} />
        <div className="max-w-xl mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Getting Started</h1>
            <ol className="relative border-l border-gray-700">
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 ring-8 ring-gray-900">
                        1
                    </span>
                    <h3 className="font-semibold text-lg mb-1">Register Your Society by Contacting Us</h3>
                    <p className="text-gray-300">Sign up and create your society profile to get started.</p>
                </li>
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 ring-8 ring-gray-900">
                        2
                    </span>
                    <h3 className="font-semibold text-lg mb-1">Add Members</h3>
                    <p className="text-gray-300">Invite and manage members of your society easily.</p>
                </li>
                <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full -left-4 ring-8 ring-gray-900">
                        3
                    </span>
                    <h3 className="font-semibold text-lg mb-1">Manage Activities</h3>
                    <p className="text-gray-300">Organize events, meetings, accounts, allowance collections, rent collection and activities for your society.</p>
                </li>
            </ol>
        </div>
    </div>
  )
}