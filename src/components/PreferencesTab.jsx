import React from 'react'

function PreferencesTab() {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">General Preferences</h2>
        <p className="text-gray-600 mb-4">Customize your general preferences</p>
  
        
        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
            Language
          </label>
          <select id="language" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option>English</option>
            <option>French</option>
            
          </select>
        </div>
  
        <button className="bg-[#F59E0B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save Preferences
        </button>
      </div>
    );
  }

export default PreferencesTab
