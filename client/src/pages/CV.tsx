import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

/**
 * Design Philosophy: Modern Minimalist Engineering
 * Combined CV and Projects page with downloadable resume
 */
export default function CV() {
  const projects = [
    {
      title: "FocusFinder — Attention-Tracking Desk Robot",
      description: "Built a desk-mounted productivity tool using a Raspberry Pi Zero 2W with OpenCV face detection to monitor user attention in real time. Animated robot eyes on a transparent OLED follow the user; a Pico-controlled LED and buzzer system provides passive physical feedback when focus is lost.",
      photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/506868280-1f1b2b09-88cc-4f34-92ae-d8a03c3a54cc_58b6a7bc.webp",
      tags: ["Raspberry Pi", "OpenCV", "Python", "Hardware"],
      year: "2026",
    },
    {
      title: "SwingIQ — AI Golf Swing Analyzer",
      description: "Developed a web application using Google Gemini AI and computer vision to analyze golf swing form, track metrics, and suggest personalized drills. Built with React and vanilla JavaScript; deployed via Netlify.",
      video: "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/Recording2026-03-11004434_f7a9ed10.mp4",
      tags: ["AI", "React", "Computer Vision", "Web App"],
      year: "2026",
    },
    {
      title: "Robotic Model Car with Sensor Navigation",
      description: "Designed and built an autonomous robot that uses sensors to drive and detect walls. The robot features advanced obstacle avoidance capabilities and demonstrates practical application of robotics principles in autonomous navigation.",
      video: "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/WhatsAppVideo2026-03-11at12.31.04AM_ebf4538b.mp4",
      photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/WhatsAppImage2026-03-11at12.31.04AM(1)_5373e7ee.jpeg",
      tags: ["Robotics", "Sensors", "Autonomous Systems", "C++"],
      year: "2025",
    },
    {
      title: "Maker Faire — Catapult Build",
      description: "Designed and constructed a functional catapult for a regional Maker Faire competition, applying prototyping and physics principles to create an engaging and effective mechanical device.",
      tags: ["CAD", "Prototyping", "Design", "Physics"],
      year: "2020",
    },
  ];

  const handleDownloadCV = () => {
    const cvUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/Kai_Wicke_CV_1_57743c89.pdf";
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Kai_Wicke_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <section className="container mx-auto px-4 py-20">
        {/* Projects Section */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Projects
          </h1>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                {/* Header with Title and Year */}
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {project.title}
                    </h3>
                    <span className="text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {project.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {project.description}
                  </p>
                </div>

                {/* Media Section - Video and Photo with proper aspect ratio */}
                {(project.video || project.photo) && (
                  <div className={`grid ${project.video && project.photo ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 p-6 md:p-8 bg-black/20`}>
                    {/* Video */}
                    {project.video && (
                      <div className="rounded-lg overflow-hidden bg-black flex items-center justify-center aspect-video">
                        <video
                          src={project.video}
                          controls
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Photo */}
                    {project.photo && (
                      <div className="rounded-lg overflow-hidden bg-black flex items-center justify-center aspect-video">
                        <img
                          src={project.photo}
                          alt={`${project.title} - Photo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="p-6 md:p-8 border-t border-border flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CV Download Section */}
        <div className="border-t border-border pt-20">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Download Full CV
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Get a comprehensive overview of my education, experience, skills, and projects in a single PDF document.
            </p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
              onClick={handleDownloadCV}
            >
              Download CV as PDF
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
