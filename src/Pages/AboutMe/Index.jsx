import './Index.css'

export default function AboutME(){
  return(
    <div className="About-Container">
      <div className="About-Me">
        <h1>About Me</h1>
      </div>
      <div className='container-two'>
      <div className="My-Skills">
        <h1>Skills</h1>
        <Skills/>
      </div>
      <div className="Tech">
        <h1>Technologies I am familiar with:</h1>
      </div>
      </div>
    </div>
  )
}

function Skills(){
  return(
    <section class="section skills">
            <div class="container">
                <div class="row responsive">
                    <div class="col-md-12">
                    </div>
                </div>
            </div>
        </section>
  )

}