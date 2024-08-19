import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Items from '../Items'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Main extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseData: []}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
    }
    const response = await fetch(coursesApiUrl, option)
    if (response.ok) {
      const data = await response.json()
      const formatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      // console.log('formatedData===', formatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        courseData: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  RenderCourses = () => {
    const {apiStatus, courseData} = this.state
    return (
      <>
        {/* no-nested-ternary */}
        {apiStatus === apiStatusConstants.failure ? (
          <FailureView retry={this.getCourseData} />
        ) : (
          <div className="contentContainer">
            <h1 className="mainHeading">Courses</h1>
            <ul className="courseContainer">
              {courseData.map(each => (
                <Items key={each.id} data={each} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  render() {
    // const content = this.RenderCourses()
    const {apiStatus} = this.state
    return (
      <div className="mainContentContainer">
        {apiStatus === apiStatusConstants.inProgress ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.RenderCourses()
        )}
      </div>
    )
  }
}
export default Main
