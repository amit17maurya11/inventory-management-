import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Matches = () => {
  const [searchParams] = useSearchParams()
  const [matches, setMatches] = useState(null)

  const seriesId = searchParams.get('series_id') // Get series_id from URL

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/matches?series_id=${seriesId}`)
      .then((res) => {
        setMatches(res.data)
      })
      .catch((error) => console.log(error))
  }, [seriesId])

  return (
    <div>
      <h2>Matches for Series ID: {seriesId}</h2>
      {matches ? (
        matches.data.data.map((match, index) => (
          <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>{match.name}</h3>
            <p>Start Date: {match.start_date}</p>
            <p>End Date: {match.end_date}</p>
            <p>Location: {match.location}</p>
          </div>
        ))
      ) : (
        <p>Loading matches...</p>
      )}
    </div>
  )
}

export default Matches
