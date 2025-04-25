import React from 'react'

function NotificationsTab() {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Notifications Settings</h2>
        <p className="text-gray-600 mb-4">Manage your notification preferences</p>
  
        
        <div className="mb-4">
          <input type="checkbox" id="email-notifications" className="mr-2" />
          <label htmlFor="email-notifications" className="text-gray-700">Receive email notifications</label>
        </div>
        <div className="mb-4">
          <input type="checkbox" id="push-notifications" className="mr-2" />
          <label htmlFor="push-notifications" className="text-gray-700">Receive push notifications</label>
        </div>
  
        <button className="bg-[#A855F7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save Notification Preferences
        </button>
      </div>
    );
  }

export default NotificationsTab
