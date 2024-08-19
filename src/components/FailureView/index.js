import './index.css'

const FailureView = props => {
  const {retry} = props
  const onRetry = () => retry()
  return (
    <div className="failureViewContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png alt should"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}
export default FailureView
