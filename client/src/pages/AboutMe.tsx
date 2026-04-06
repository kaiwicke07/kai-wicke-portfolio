import Navigation from "@/components/Navigation";

/**
 * Design Philosophy: Modern Minimalist Engineering
 * About page with personal background, photo, and skills
 */
export default function AboutMe() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <section className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
          About Me
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Profile Photo */}
          <div className="md:col-span-1 flex justify-center">
            <div className="rounded-lg overflow-hidden border border-border shadow-lg">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/WhatsAppImage2026-03-11at12.31.04AM_c0a04860.jpeg"
                alt="Kai Wicke"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Background & Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Background
              </h2>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                I'm a first-year Mechanical Engineering student at Northeastern University with a background in retail and teaching. I've developed a strong work ethic and the time management skills needed to balance a demanding academic schedule with professional responsibilities. I am deeply interested in how CAD, robotics, and AI can be used to build real-world technology. My experience goes beyond the classroom; I've competed in regional Maker Faire competitions, where I enjoyed the challenge of turning technical concepts into physical builds.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Interests & Hobbies
              </h2>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                I have a strong interest in mathematics and its practical application in engineering and problem-solving. When I'm not studying, I'm usually outdoors hiking or camping. I'm also into weightlifting, chess, and golf, and I genuinely enjoy teaching others about the things I'm passionate about.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Programming Languages
              </h3>
              <ul className="text-muted-foreground space-y-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <li>• C++</li>
                <li>• Python</li>
                <li>• HTML/CSS</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Engineering & Design
              </h3>
              <ul className="text-muted-foreground space-y-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                <li>• CAD (SolidWorks, Fusion 360)</li>
                <li>• Robotics</li>
                <li>• 3D Printing & Prototyping</li>
                <li>• Circuit Design</li>
                <li>• Problem Solving</li>
                <li>• Technical Communication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
