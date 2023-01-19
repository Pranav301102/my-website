import './Index.scss'

export default function AboutME(){
  return(
    <div className="About-Container">
      
      <div className="About-Me">
      <h1 class="page-title">About Me</h1>
      <article class="content">
      <section class="content__descriptor">
        {/* <h2 class="content__title">Info</h2> */}
        <img class="content__img" src = "logo512.png" alt='me'></img>
      </section>
      <section class="content__text-box">
        <p class="content__text">
          We aim to be the investors we wished we had when we started out.
          Lightning-fast, always on your side and fundamentally helpful.
        </p>
        <p class="content__text">
          Our knowledge is your knowledge. Our network is your network. Your
          problems are our problems. We don't have all the answers, but we
          will help you find them.
        </p>
      </section>
      </article>
      </div>
      <div className='container-two'>
      <div className="My-Skills">
        <h1>Skills</h1>
        <Skills/>
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