import Navbar from './component/Navbar.jsx'
import Hero from './component/Hero-section.jsx'
import About from './component/About.jsx'
import ProjectsPage from './component/ProjectsPage.jsx'
import BlogPage from './component/BlogPage.jsx'
import ContactPage from './component/ContactPage.jsx'
import ScrollIndicator from './component/ScrollIndicator.jsx'
import BackToTop from './component/BackToTop.jsx'
import CustomCursor from './component/CustomCursor.jsx'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollIndicator />
      <Navbar />
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsPage />
      </section>

      {/* Blog Section */}
      <section id="blog">
        <BlogPage />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactPage />
      </section>

      <BackToTop />
    </>
  )
}

export default App
