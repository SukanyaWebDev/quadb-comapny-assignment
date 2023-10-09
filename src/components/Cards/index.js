import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import SimilarCards from '../SimilarCards/index'
import FormView from '../FormView/index'
import './index.css'

class Cards extends Component {
  state = {
    isLoading: true,
    skillToDisplay: [],
    jobDetails: {},
    liftAtCompany: {},
    sJobs: [],
    isSuccess: true,
    apply: false,
  }

  componentDidMount() {
    this.getTheDetails()
  }

  renderTheDataAgain = () => {
    this.getTheDetails()
  }

  getForm = () => {
    const {apply} = this.state
    this.setState({apply: true})
  }

  getTheDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const data = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    this.setState({isSuccess: data.ok})
    const response = await data.json()
    const skill = response.job_details.skills
    const displaySkill = skill.map(eachItem => ({
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))

    const detailsEntire = response.job_details
    const listAtCompany = {
      description: detailsEntire.life_at_company.description,
      imageUrl: detailsEntire.life_at_company.image_url,
    }

    const jobDetailsFor = {
      companyLogoUrl: detailsEntire.company_logo_url,
      companyWebsiteUrl: detailsEntire.company_website_url,
      employmentType: detailsEntire.employment_type,
      jobDescription: detailsEntire.job_description,
      location: detailsEntire.location,
      packagePerAnnum: detailsEntire.package_per_annum,
      rating: detailsEntire.rating,
      title: detailsEntire.title,
    }
    this.setState({jobDetails: jobDetailsFor, liftAtCompany: listAtCompany})
    console.log(response)
    const similarJob = response.similar_jobs
    const simJobs = similarJob.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))

    this.setState({isLoading: false, sJobs: simJobs})

    // eslint-disable-next-line react/no-unused-state
    this.setState({skillToDisplay: displaySkill})
  }

  renderBlogItemDetails = () => {
    const {
      skillToDisplay,
      jobDetails,
      liftAtCompany,
      sJobs,
      isSuccess,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="ashok-con">
        {isSuccess ? (
          <div>
            <Header />
            <div className="myDivForCards">
              <div className="myMainDiv">
                <div style={{display: 'flex', padding: '10px'}}>
                  <div>
                    <img
                      src={companyLogoUrl}
                      alt="job details company logo"
                      style={{height: '90px'}}
                    />
                  </div>
                  <div>
                    <h1>{title}</h1>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <AiFillStar
                        style={{
                          color: ' #fbbf24',
                          marginRight: '5px',
                          height: '26px',
                        }}
                      />
                      <p>{rating}</p>
                    </div>
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex'}}>
                    <p>{location}</p>
                    <p style={{marginLeft: '10px'}}>{employmentType}</p>
                  </div>
                  <p>{packagePerAnnum}</p>
                </div>
                <hr />
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <h1>Description</h1>
                    <span>
                      <a
                        href={companyWebsiteUrl}
                        style={{textDecoration: 'none'}}
                        target="_parent"
                      >
                        Visit
                      </a>
                    </span>
                  </div>
                  <p>{jobDescription}</p>
                </div>
                <div>
                  <h1>Skills</h1>
                  <ul style={{display: 'flex', flexWrap: 'wrap'}}>
                    {skillToDisplay.map(eachItem => (
                      <li key={eachItem.name}>
                        <img src={eachItem.imageUrl} alt={eachItem.name} />
                        <p>{eachItem.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h1>Life at Company</h1>
                  <div style={{display: 'flex'}}>
                    <p>{liftAtCompany.description}</p>
                    <img
                      src={liftAtCompany.imageUrl}
                      alt="life at company"
                      style={{height: '90px'}}
                    />
                  </div>
                </div>
              </div>
              <div className="apply-div">
                <button
                  type="button"
                  className="apply-button"
                  onClick={this.getForm}
                >
                  Apply
                </button>
              </div>
            </div>
            <div style={{backgroundColor: 'black'}}>
              <h1 style={{color: ''}}>Similar Jobs</h1>
              <ul>
                {sJobs.map(eachItem => (
                  <SimilarCards eachItem={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.renderTheDataAgain}>
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }

  render() {
    const {isLoading, apply} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="blog-container">
        {isLoading ? (
          <div>
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}
export default Cards
