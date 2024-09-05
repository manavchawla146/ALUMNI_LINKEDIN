import React from 'react'
import AllInvitations from './Invitations/AllInvitations'
import AllConnections from './Connections/AllConnections'
import { Outlet, useNavigate } from 'react-router-dom'
import AllSuggestions from './Suggestions/AllSuggestions'

const UpperSection = () => {
    const navigate=useNavigate();
  return (
    <div>
        <div className="bg-white" style={{ width: '85vw', margin: 'auto',marginTop:'7rem'}}>
                <nav className="bg-white p-4">
                    <div className="flex space-x-8">
                        <div className="relative" onClick={() => navigate('/alumni/myNetwork/invitations')}>
                            <span className="text-teal-400 font-semibold">Invitations</span>
                            {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-400"></div> */}
                        </div>
                        <div onClick={() => navigate('/alumni/myNetwork/connections')}>
                            <span className="text-gray-400">My Connections</span>
                        </div>
                    </div>
                </nav>
            </div>

           
          
    
    </div>
  )
}

export default UpperSection
