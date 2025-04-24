import React, { useState } from 'react';
import Layout from './Layout';
import ProfileTab from './ProfileTab';
import NotificationsTab from './NotificationsTab';
import PreferencesTab from './PreferencesTab';

function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileTab />;
      case 'Notifications':
        return <NotificationsTab />;
      case 'Preferences':
        return <PreferencesTab />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600 mb-4">Manage your account settings and preferences</p>

          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-4">
              <button
                onClick={() => handleTabChange('Profile')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'Profile'
                    ? 'border-[#0F766EFF] text-[#0F766EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-current={activeTab === 'Profile' ? 'page' : undefined}
              >
                Profile
              </button>
              <button
                onClick={() => handleTabChange('Notifications')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'Notifications'
                    ? 'border-[#0F766EFF] text-[#0F766EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => handleTabChange('Preferences')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                  activeTab === 'Preferences'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Preferences
              </button>
            </nav>
          </div>

          <div>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}


export default Settings;
