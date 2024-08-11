import React, { useEffect } from 'react';

// import components
import Navbar from './components/navbar';
import AboutMe from './components/aboutme';
import Typewriter from './components/typewriter';
import ProjectCard from './components/projectcard';
import MapComponent from './components/mapcomponent';
import JobEduWidget from './components/jobeduwidget';
import BlinkingCursor from './components/blinkingcursor';

// import styles
import './styles/App.css';
import './styles/_fonts.css';
import './styles/Sections.css';

// import assets
import memoji from './images/memoji.png';
import propic from './images/propic.jpg';
import unisaLogo from './images/unisa.png';
import consideraLogo from './images/considera.png';
import iocommerceLogo from './images/iocommerce.png';
import matteidocsLogo from './images/matteidocs.png';
import highschoolLogo from './images/italy-republic.png';

function HomePage() {

  useEffect(() => {
    document.title = "Francesco Peluso's portfolio";
    
    let navbarlinks = document.querySelectorAll('.navbar-links a');
    let sections = document.querySelectorAll('main > div');
    let actualurl = window.location.href;
    let segment = actualurl.split('#')[1] || '';

    navbarlinks.forEach((link) => {
      if (link.getAttribute('href') === `#${segment}`) {
        link.classList.add('active-link');
      } else if (segment === '' && link.getAttribute('href') === '#home') {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });

    function handleClick(link: Element) {
      navbarlinks.forEach((link) => {
        link.classList.remove('active-link');
      });
      link.classList.add('active-link');
    }
    
    navbarlinks.forEach((link: Element) => {
      link.addEventListener('click', () => {
        handleClick(link);
      });
    });

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach((section: Element) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id') ?? '';
        }
      });
    
      navbarlinks.forEach((link) => {
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active-link');
        } else {
          link.classList.remove('active-link');
        }
      });
    });

  });

  return (
    <>
      <Navbar />

      <main className='container'>
        
        <div id='home'>
          <div className='propic-container'>
            <img src={propic} alt='Francesco' className='propic'/>
          </div>
          <div className='greetings-container'>
            <p>Hello <span className='wave'>👋🏻</span>,</p>
            <p>I'm <span className='my-name'>Francesco Peluso</span></p>
            <p className='actual-position'>Computer Engineering student <br /> & Back-end developer</p>
          </div>
        </div>

        <div id='aboutme'>
          <AboutMe />
        </div>

        <div id='experience'>
          <h2>$ cat /var/log/<Typewriter text={"Jobs"} /><BlinkingCursor /></h2>
          <div className='jobs-container'>
            <JobEduWidget
              type='job'
              place='Considera SRL'
              start='July 2022'
              end='Present'
              description='Back-end developer.'
              color='#FFA500'
              icon={consideraLogo}
            />
          </div>
          <h2 style={{marginTop: 36}}>$ cat /var/log/<Typewriter text={"Education"} /><BlinkingCursor /></h2>
          <div className='education-container'>
            <JobEduWidget
              type='edu'
              place='University of Salerno'
              start='September 2022'
              end='Present'
              description="Bachelor's degree in Computer Engineering (L-8)."
              color='#FF0000'
              icon={unisaLogo}
            />
            <JobEduWidget
              type='edu'
              place='IIS Mattei-Fortunato di Eboli (SA)'
              start='September 2017'
              end='July 2022'
              description='High school diploma in IT and Telecommunications.'
              color='#0000FF'
              icon={highschoolLogo}
            />
          </div>

          <p className='disclaimer'>
            You can find more details about certifications and skills in my <a href='https://www.linkedin.com/in/francescopeluso04/'>LinkedIn profile</a>.
          </p>
        </div>

        <div id='projects'>
          <h2>$ cd /home/fp/<Typewriter text={"Projects"} /><BlinkingCursor /></h2>
          <div className='projects-container'>
            <ProjectCard
              title='This website'
              logo={memoji}
              description='This portfolio. Built with React and TypeScript.'
              techStack='ReactJS, TypeScript, NodeJS'
              githubLink='https://www.github.com/francescopeluso/portfolio'
              demoLink='https://www.francescopeluso.com'
            />

            <ProjectCard
              title='IOcommerce'
              logo={iocommerceLogo}
              description='Hackathon project: an e-commerce platform for zero-km products.'
              techStack='PHP, MySQL, HTML, CSS, JavaScript'
              demoLink='https://iocommerce.didamatteifortunato.it'
            />

            <ProjectCard
              title="MatteiFortunatoBot"
              logo={matteidocsLogo}
              description="[Discontinued] Telegram bot for high school students, providing notifications and links to all recents news."
              techStack='Python, Telegram API'
              demoLink='https://telegram.didamatteifortunato.it'
            />

          </div>

          <p className='disclaimer'>
            If you want to see more (and maybe recent) projects and collaborations, you can visit my <a href='https://www.github.com/francescopeluso'>GitHub profile</a>.
          </p>
        </div>


        <div id='connect'>
          <h2>$ <Typewriter text={"connect --with-me"} /><BlinkingCursor /></h2>
          <div className='connect-container'>
            <div className='connect-card'>
              <h3>This is where I study.</h3>
              <MapComponent position={[40.77218, 14.79159]} text='E2 building, DIEM UNISA'/>
            </div>
            <div className='connect-card'>
              <div>
                <h3>Let's talk...</h3>
                <p>
                  Wanna collaborate? Or maybe talk about tech, AI, Star Wars, rock music, or anything else? You can reach me at <a href='mailto:francesco.peluso04@gmail.com'>my email</a>, <a href='https:/t.me/thatsfrankiee'>Telegram</a>, or <a href='https://www.linkedin.com/in/francescopeluso04/'>LinkedIn</a>.
                </p>
              </div>
              <div>
                <h3>...or maybe just follow me.</h3>
                <p>
                  You can find me on <a href='https://www.linkedin.com/in/francescopeluso04/'>LinkedIn</a> and <a href='https://www.github.com/francescopeluso'>GitHub</a>.<br />
                  I also have a <a href='https://www.reddit.com/u/thatsfrankie'>Reddit profile</a> (but I do not post that much, and it is not all about tech).
                </p>
              </div>
            </div>
          </div>          
        </div>

      </main>
    </>
  );
}

export default HomePage;
