import "./styles/Career.css";

const Career = () => {
  return (
    <section className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Marketing &amp; Growth Intern</h4>
                <h5>Codju Technologies</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Run Codju's website, SEO, and social channels. Build AI content
              systems—videos, newsletters, YouTube—around practical AI learning.
              Ship AI-driven workflows and site optimizations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital Marketing Intern</h4>
                <h5>brandMongo</h5>
              </div>
              <h3>2025–26</h3>
            </div>
            <p>
              Built AI content systems and digital experiments for brand growth.
              Created Framer websites with SEO-focused structure. Ran keyword
              experiments, designed an AI content persona for a travel platform,
              tested AI tools for content workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Marketing &amp; Branding</h4>
                <h5>AuraFlo</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Created pitch decks and brand positioning for a student startup.
              Represented AuraFlo at Circuitpreneur—Top 4 finish. Handled
              messaging, storytelling, and team communication strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
