import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Matches = () => {
  const navigate = useNavigate()

  const {
    state: { id, name },
  } = useLocation()

  const [matches, setMatches] = useState(null)
  const [error, setError] = useState(null)
  const [venue, setVenue] = useState(null)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } // Month in words
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/matches?series_id=${id}`)
      .then((res) => {
        if (res.data?.status === 200) {
          setMatches(res.data.data.data)
        } else {
          setError(res.data.message || 'No matches found.')
        }
      })
      .catch((error) => {
        console.error('Error fetching matches:', error)
        setError('Failed to load matches. Please try again later.')
      })
  }, [id])

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/venues`)
      .then((res) => {
        if (res.data?.status === 200) {
          setVenue(res.data.data.data)
        } else {
          setError(res.data.message || 'No matches found.')
        }
      })
      .catch((error) => {
        console.error('Error fetching matches:', error)
        setError('Failed to load matches. Please try again later.')
      })
  }, [id])

  const handleItemClick = (id) => {
    navigate('/innings', { state: { id } })
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Matches for: {name}</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {venue && venue.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'center' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Match Venues</th>
            </tr>
          </thead>
          <tbody>
            {venue.map((venues, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{venues.ground}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {matches && matches.length > 0 ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Match Description</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>End Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} onClick={() => handleItemClick(match.id)}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.description}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {formatDate(match.start_date)}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {formatDate(match.end_date)}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p style={{ textAlign: 'center' }}>No matches found for the selected series.</p>
      )}
    </div>
  )
}

export default Matches
