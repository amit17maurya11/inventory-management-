  // import React, { useEffect, useState } from 'react'
  // import classNames from 'classnames'
  // import axios from 'axios'

  // import {
  //   CAvatar,
  //   CButton,
  //   CButtonGroup,
  //   CCard,
  //   CCardBody,
  //   CCardFooter,
  //   CCardHeader,
  //   CCol,
  //   CProgress,
  //   CRow,
  //   CTable,
  //   CTableBody,
  //   CTableDataCell,
  //   CTableHead,
  //   CTableHeaderCell,
  //   CTableRow,
  // } from '@coreui/react'
  // import CIcon from '@coreui/icons-react'
  // import {
  //   cibCcAmex,
  //   cibCcApplePay,
  //   cibCcMastercard,
  //   cibCcPaypal,
  //   cibCcStripe,
  //   cibCcVisa,
  //   cibGoogle,
  //   cibFacebook,
  //   cibLinkedin,
  //   cifBr,
  //   cifEs,
  //   cifFr,
  //   cifIn,
  //   cifPl,
  //   cifUs,
  //   cibTwitter,
  //   cilCloudDownload,
  //   cilPeople,
  //   cilUser,
  //   cilUserFemale,
  // } from '@coreui/icons'

  // import avatar1 from 'src/assets/images/avatars/1.jpg'
  // import avatar2 from 'src/assets/images/avatars/2.jpg'
  // import avatar3 from 'src/assets/images/avatars/3.jpg'
  // import avatar4 from 'src/assets/images/avatars/4.jpg'
  // import avatar5 from 'src/assets/images/avatars/5.jpg'
  // import avatar6 from 'src/assets/images/avatars/6.jpg'

  // import WidgetsBrand from '../widgets/WidgetsBrand'
  // import WidgetsDropdown from '../widgets/WidgetsDropdown'
  // import MainChart from './MainChart'

  // const Dashboard = () => {

  //   const [matchDetails, setMatchDetails] = useState(null)
  //   const [seriesId, setSeriesId] = useState('')

  //   useEffect(() => {
  //     axios
  //       .get('http://127.0.0.1:8000/api/all_series')
  //       .then((res) => {
  //         setMatchDetails(res.data)
  //       })
  //       .catch((error) => console.log(error))
  //   }, [])

  //   console.log(matchDetails ? matchDetails.data.data : 'Loading...', 'rockets')


  //   const handleItemClick = (id) => {
  //     setSeriesId(id)
  //     console.log('Selected ID:', id)
  //   }

  //   return (
  //     <>
  //       <div>
  //         <div
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'row',
  //             width: '100%',
  //             justifyContent: 'space-evenly',
  //             padding: '10px',
  //           }}
  //         >
  //           <div
  //             style={{
  //               width: '30%',
  //               textAlign: 'center',
  //               fontFamily: 'monospace',
  //               fontSize: '18px',
  //             }}
  //           >
  //             League Name
  //           </div>
  //           <div
  //             style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}
  //           >
  //             Start Date
  //           </div>
  //           <div
  //             style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}
  //           >
  //             End Date
  //           </div>
  //           <div
  //             style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}
  //           >
  //             Month
  //           </div>
  //         </div>
  //         {matchDetails && (
  //           <div>
  //             {matchDetails.data.data.map((item, index) => {
  //               return (
  //                 <div
  //                   key={index}
  //                   onClick={() => handleItemClick(item.series_id)}
  //                   style={{
  //                     display: 'flex',
  //                     flexDirection: 'row',
  //                     width: '100%',
  //                     justifyContent: 'space-evenly',
  //                     border: '1px solid black',
  //                     padding: '6px',
  //                   }}
  //                 >
  //                   <div
  //                     style={{
  //                       width: '30%',
  //                       textAlign: 'center',
  //                       padding: '10px',
  //                     }}
  //                   >
  //                     {item.name}
  //                   </div>
  //                   <div style={{ width: '30%', textAlign: 'center' }}>{item.start_date}</div>
  //                   <div style={{ width: '30%', textAlign: 'center' }}>{item.end_date}</div>
  //                   <div style={{ width: '30%', textAlign: 'center' }}>{item.series_date}</div>
  //                 </div>
  //               )
  //             })}
  //           </div>
  //         )}
  //       </div>
  //     </>
  //   )
  // }

  // export default Dashboard


  import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const [matchDetails, setMatchDetails] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/all_series')
      .then((res) => {
        setMatchDetails(res.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleItemClick = (id) => {
    navigate(`/matches?series_id=${id}`) // Navigate to the new page with series_id
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
        <div style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}>
          League Name
        </div>
        <div style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}>
          Start Date
        </div>
        <div style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}>
          End Date
        </div>
        <div style={{ width: '30%', textAlign: 'center', fontFamily: 'monospace', fontSize: '18px' }}>
          Month
        </div>
      </div>
      {matchDetails && (
        <div>
          {matchDetails.data.data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item.series_id)}
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
              <div style={{ width: '30%', textAlign: 'center' }}>{item.start_date}</div>
              <div style={{ width: '30%', textAlign: 'center' }}>{item.end_date}</div>
              <div style={{ width: '30%', textAlign: 'center' }}>{item.series_date}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
