import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Innings = () => {
  const navigate = useNavigate()

  const {
    state: { id, name },
  } = useLocation()
  console.log(id, 'idddddddd')

  const [matches, setMatches] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/innings?match_id=${id}`)
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

  const handleItemClick = (id, match_id) => {
    navigate('/InningsDetails', { state: { id, match_id } })
  }

  return (
    <div>
      {/* <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Matches for: {name}</h2> */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
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
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Team Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Runs</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Overs</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Innings</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} onClick={() => handleItemClick(match.id, match.match_id)}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.team_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.runs}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.overs}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.inning_number}</td>
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

export default Innings
