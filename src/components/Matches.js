import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Matches = () => {
  const [searchParams] = useSearchParams()
  const [matches, setMatches] = useState(null)
  const [error, setError] = useState(null)

  const seriesId = searchParams.get('series_id') // Get series_id from URL
  const leagueName = searchParams.get('name') // Get league name from URL

  // Function to format date with months in words
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } // Month in words
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/matches?series_id=${seriesId}`)
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
  }, [seriesId])

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Matches for: {decodeURIComponent(leagueName)}
      </h2>
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
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Match Description</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>End Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {match.description}
                </td>
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
