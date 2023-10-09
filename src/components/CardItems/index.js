import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const CardItems = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachItem
  return (
    <li
      style={{
        backgroundColor: ' #202020',
        padding: '20px',
        margin: '10px',
        width: '90%',
        borderRadius: '20px',
        maxHeight: '190px',
        color: 'white',
        listStyleType: 'none',
        textDecoration: 'none',
      }}
    >
      <Link to={`/jobs/${id}`}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '10px'}}>
            <img
              src={companyLogoUrl}
              alt="company logo"
              style={{height: '30px'}}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <h1 style={{fontSize: '10px'}}>{title}</h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AiFillStar
                style={{color: ' #fbbf24', marginRight: '5px', height: '26px'}}
              />
              <p style={{fontSize: '15px'}}>{rating}</p>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <div>{packagePerAnnum}</div>
        </div>
        <hr />
        <div>
          <h1 style={{fontSize: '15px'}}>Description</h1>
          <p style={{fontSize: '9px'}}>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default CardItems
