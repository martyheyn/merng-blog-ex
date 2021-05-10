// import Button from '../Button';
// import boxing from '../videos/boxing.mp4';
import '../../styles/LandingPage.css';

function LandingPage() {
  return (
    <div className='landing-container'>
      {/* <video src={boxing} autoPlay loop muted /> */}
      <h1>Example Blog</h1>
      <p>Created with React and Graphql</p>
      {/* <div className='landing-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div> */}
    </div>
  );
}

export default LandingPage;
