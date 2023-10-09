import {withRouter, Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'

import {Component} from 'react'

import Header from '../Header'

import CardItems from '../CardItems/index'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Home extends Component {
  state = {
    myArray: [],
    myProfile: {},
    userInput: '',
    myOption: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
    this.renderProfile()
  }

  salaryNumber = event => {
    console.log(event.target.value)
  }

  getData = async () => {
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedArray = data.jobs
    const updatedMyArray = updatedArray.map(eachItem => ({
      id: eachItem.id,
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    // console.log(updatedArray)
    this.setState({myArray: updatedMyArray})
  }

  renderCards = () => {
    const {myArray, userInput, searchInput} = this.state
    console.log(userInput)
    const updatedArray = myArray.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput),
    )

    const isLengthGreater = updatedArray.length > 1
    console.log(updatedArray)
    return (
      <div>
        {isLengthGreater ? (
          <ul style={{color: 'white'}} className="overManager">
            {updatedArray.map(eachItem => (
              <CardItems eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          <div
            style={{
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        )}
      </div>
    )
  }

  renderProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const data = await fetch('https://apis.ccbp.in/profile', options)
    const response = await data.json()
    const at = response.profile_details
    const updatedArray = {
      name: at.name,
      profileImageUrl: at.profile_image_url,
      shortBio: at.short_bio,
    }

    this.setState({myProfile: updatedArray})
  }

  renderProfileImage = () => {
    const {myProfile} = this.state
    return (
      <div className="cardDec">
        <img src={myProfile.profileImageUrl} alt="profile" />
        <h1>{myProfile.name}</h1>
        <p>{myProfile.shortBio}</p>
      </div>
    )
  }

  onChangeTheValue = event => {
    this.setState({userInput: event.target.value})
  }

  getDetailsOfMatchedData = () => {
    const {userInput} = this.state
    this.setState({searchInput: userInput})
  }

  typeTaker = event => {
    const {myOption} = this.state
    const intVal = event.target.value
  }

  render() {
    const {userInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
      // eslint-disable-next-line no-else-return
    }

    return (
      <div>
        <Header />
        <div className="first-dev">
          <div className="firstDev" style={{marginRight: '3px'}}>
            <div style={{color: 'wheat'}}>{this.renderProfileImage()}</div>
            <div>
              <h1 style={{color: 'white', fontSize: '20px'}}>
                Type of Employment
              </h1>
              <ul className="myListFor">
                {employmentTypesList.map(eachItem => (
                  <li key={eachItem.employmentTypeId}>
                    <input
                      type="checkbox"
                      name="salary"
                      id={eachItem.employmentTypeId}
                      onClick={this.typeTaker}
                      value={eachItem.employmentTypeId}
                    />
                    <label htmlFor={eachItem.employmentTypeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h1 style={{color: 'wheat', fontSize: '20px'}}>Salary Range</h1>
              <ul className="myListFor">
                {salaryRangesList.map(eachItem => (
                  <li key={eachItem.salaryRangeId}>
                    <input
                      type="radio"
                      id={eachItem.salaryRangeId}
                      name="salary"
                      value={eachItem.label}
                      onClick={this.salaryNumber}
                    />
                    <label htmlFor={eachItem.salaryRangeId}>
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="secondDiv">
            <div
              style={{
                backgroundColor: '#000000',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: '#cbd5e1',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#cbd5e1',
                padding: '10px',
                width: '30%',
                maxHeight: '45px',
                marginLeft: '50px',
                marginTop: '30px',
              }}
            >
              <input
                type="search"
                placeholder="search"
                onChange={this.onChangeTheValue}
                value={userInput}
                style={{
                  backgroundColor: '#000000',
                  width: '85%',
                  height: '30px',
                  color: '#f1f5f9',
                  border: 'hidden',
                  background: 'none',
                  outline: 'none',
                }}
              />
              <AiOutlineSearch
                testid="searchButton"
                style={{
                  height: '30px',
                  backgroundColor: '#202020',
                  width: '39px',
                  padding: '5px',
                  marginLeft: '3px',
                }}
                onClick={this.getDetailsOfMatchedData}
              />
            </div>

            <div className="ashok">{this.renderCards()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
