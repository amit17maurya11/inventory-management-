import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const [matchDetails, setMatchDetails] = useState(null)
  const navigate = useNavigate()

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } // Show only the date
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/all_series')
      .then((res) => {
        setMatchDetails(res.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleItemClick = (id, name) => {
    // navigate(`/matches?series_id=${id}&name=${encodeURIComponent(name)}`) // Pass series_id and name in the URL
    navigate('/matches', { state: { id, name } })
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly',
          padding: '10px',
        }}
      >
        <div
          style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}
        >
          League Name
        </div>
        <div
          style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}
        >
          Start Date
        </div>
        <div
          style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}
        >
          End Date
        </div>
        <div
          style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}
        >
          Month
        </div>
      </div>
      {matchDetails && (
        <div>
          {matchDetails.data.data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item.series_id, item.name)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
                border: '1px solid black',
                padding: '6px',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: '30%', textAlign: 'center', padding: '10px' }}>{item.name}</div>
              <div style={{ width: '30%', textAlign: 'center' }}>{formatDate(item.start_date)}</div>
              <div style={{ width: '30%', textAlign: 'center' }}>{formatDate(item.end_date)}</div>
              <div style={{ width: '30%', textAlign: 'center' }}>
                {item.series_date ? formatDate(item.series_date) : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
