import Navigation from "@/components/Navigation";

/**
 * Design Philosophy: Modern Minimalist Engineering
 * School Work page showcasing academic projects and coursework
 */
export default function SchoolWork() {
  const courses = [
    {
      title: "Introduction to Engineering",
      description: "Fundamentals of engineering design, problem-solving methodologies, and technical communication. Introduction to CAD and design principles.",
    },
    {
      title: "Engineering Graphics & CAD",
      description: "Technical drawing, 3D modeling, and computer-aided design principles using industry-standard software like SolidWorks and Fusion 360.",
    },
    {
      title: "Physics I & II",
      description: "Mechanics, thermodynamics, waves, and electricity. Laboratory work and practical applications of physics principles in engineering.",
    },
    {
      title: "Calculus & Differential Equations",
      description: "Advanced mathematics for engineering applications. Problem-solving techniques essential for mechanical engineering analysis.",
    },
    {
      title: "Materials Science",
      description: "Study of material properties, selection, and applications in mechanical design and manufacturing processes.",
    },
    {
      title: "Statics & Dynamics",
      description: "Analysis of forces, moments, and motion in mechanical systems. Foundation for advanced engineering mechanics.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <section className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
          School Work
        </h1>
        
        <div className="max-w-3xl space-y-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {course.title}
              </h3>
              <p className="text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
