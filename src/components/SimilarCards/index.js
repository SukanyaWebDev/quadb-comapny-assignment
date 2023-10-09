import './index.css'

const SimilarCards = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachItem

  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1>{title}</h1>
          <div>
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div>
        <p>{location}</p>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarCards
