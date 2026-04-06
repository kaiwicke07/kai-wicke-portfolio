import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

/**
 * Design Philosophy: Modern Minimalist Engineering
 * Projects page showcasing personal and professional work with detailed descriptions and images/videos
 */
export default function Projects() {
  const projects = [
    {
      title: "Robotic Model Car with Sensor Navigation",
      description: "Designed and built an autonomous robot that uses sensors to drive and detect walls. The robot features advanced obstacle avoidance capabilities and demonstrates practical application of robotics principles in autonomous navigation.",
      video: "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/WhatsAppVideo2026-03-11at12.31.04AM_ebf4538b.mp4",
      photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/WhatsAppImage2026-03-11at12.31.04AM(1)_5373e7ee.jpeg",
      tags: ["Robotics", "Sensors", "Autonomous Systems"],
      year: "2025",
    },
    {
      title: "AI Golf Swing Analyzer",
      description: "Developed an AI-powered golf swing analyzer that tracks multiple metrics and rates golf swing performance. The system uses computer vision and machine learning to analyze form, offers personalized drills, and leverages an API to provide comprehensive swing analysis and improvement recommendations.",
      video: "https://d2xsxph8kpxj0f.cloudfront.net/310519663197481809/Vrwu7wDuztPRkw74evFdnx/Recording2026-03-11004434_f7a9ed10.mp4",
      tags: ["AI", "Machine Learning", "Computer Vision"],
      year: "2026",
    },
    {
      title: "Maker Faire Competition Projects",
      description: "Competed in regional Maker Faire competitions, designing and building innovative projects that combine engineering principles with practical problem-solving. These experiences strengthened my ability to turn technical concepts into physical builds.",
      tags: ["CAD", "Prototyping", "Design"],
      year: "2020",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <section className="container mx-auto px-4 py-20">
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
      </section>
    </div>
  );
}
