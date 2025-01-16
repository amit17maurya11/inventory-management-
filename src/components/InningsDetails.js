import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const InningsDetails = () => {
  const navigate = useNavigate()

  const {
    state: { id, match_id },
  } = useLocation()
  console.log(id, 'idddddddd')
  console.log(match_id, 'match_id')

  const [battingData, setBattingData] = useState(null)
  const [bowlingData, setBowlingData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/inning_details?match_id=${match_id}&inning_id=${id}`)
      .then((res) => {
        if (res.data?.status === 200) {
          console.log(res.data.data.data.batting_details, 'res.data.data.data')
          setBattingData(res.data.data.data.batting_details)
          setBowlingData(res.data.data.data.bowling_details)
        } else {
          console.log('herepppppppp')
          setError(res.data.message || 'No matches found.')
        }
      })
      .catch((error) => {
        console.error('Error fetching matches:', error)
        setError('Failed to load matches. Please try again later.')
      })
  }, [id, match_id]) // Added match_id in the dependency array for completeness

  return (
    <div>
      {/* <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Matches for: {name}</h2> */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {battingData && battingData.length > 0 ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Player Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Runs</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Balls</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Four</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sixes</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>strike_rate</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Wicket Taken</th>
            </tr>
          </thead>
          <tbody>
            {battingData.map((match, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.runs}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.balls}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.fours}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.sixes}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.strike_rate}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.out_desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p style={{ textAlign: 'center' }}>No matches found for the selected series.</p>
      )}
      {bowlingData && bowlingData.length > 0 ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Player Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Overs</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Maidens</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Runs</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Wickets</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Economy</th>
            </tr>
          </thead>
          <tbody>
            {bowlingData.map((match, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.overs}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.maindens}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.runs}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.wickets}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{match.economy}</td>
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

export default InningsDetails
