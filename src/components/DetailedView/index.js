import {Component} from 'react'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class DetailedView extends Component {
  state = {courseData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }

    const response = await fetch(courseDetailsApiUrl, option)
    if (response.ok) {
      const data = await response.json()
      // console.log('data===', data)
      const updatedData = {
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      // console.log('updatedData===', updatedData)

      this.setState({
        courseData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseItemDetails = () => {
    const {courseData, apiStatus} = this.state
    const {name, imageUrl, description} = courseData

    return (
      <>
        {apiStatus === apiStatusConstants.failure ? (
          <FailureView retry={this.getCourseData} />
        ) : (
          <div className="cardContainer">
            <img src={imageUrl} alt={name} className="courseDetailImage" />
            <div className="cardDetailsContainer">
              <h1 className="cardTitle">{name}</h1>
              <p className="cardDescription">{description}</p>
            </div>
          </div>
        )}
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div className="DetailedViewContainer">
        {apiStatus === apiStatusConstants.inProgress ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderCourseItemDetails()
        )}
      </div>
    )
  }
}

export default DetailedView
