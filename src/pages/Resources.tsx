import { useState, useEffect } from "react";
import { BookOpen, FileText, GraduationCap, Calendar, BookMarked, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Resources = () => {
  const [resourceCategories, setResourceCategories] = useState([
    {
      id: "1",
      icon: "BookOpen",
      title: "Syllabus",
      description: "Course syllabus and curriculum details",
      link: "#",
    },
    {
      id: "2",
      icon: "FileText",
      title: "Study Materials",
      description: "Lecture notes and reference materials",
      link: "#",
    },
    {
      id: "3",
      icon: "GraduationCap",
      title: "Innovations in Teaching & Learning",
      description: "Modern pedagogical approaches and methods",
      link: "#",
    },
    {
      id: "4",
      icon: "Calendar",
      title: "Timetables",
      description: "Current semester schedules and timetables",
      link: "#",
    },
    {
      id: "5",
      icon: "BookMarked",
      title: "Vo'ISE Magazines",
      description: "Departmental magazine and publications",
      link: "#",
    },
    {
      id: "6",
      icon: "Award",
      title: "NBA Documents",
      description: "Accreditation and quality assurance documents",
      link: "#",
    },
  ]);

  const iconMap: { [key: string]: any } = {
    BookOpen,
    FileText,
    GraduationCap,
    Calendar,
    BookMarked,
    Award,
  };

  useEffect(() => {
    const savedResources = localStorage.getItem("resources");
    if (savedResources) {
      setResourceCategories(JSON.parse(savedResources));
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl font-heading font-bold mb-4 animate-fade-in">
            Academic Resources
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in">
            Access syllabus, study materials, timetables, and departmental publications
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((resource) => {
            const IconComponent = iconMap[resource.icon] || BookOpen;
            return (
              <a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="glass-card hover-lift cursor-pointer h-full">
                  <CardHeader>
                    <IconComponent className="h-12 w-12 text-accent mb-4" />
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-heading font-semibold mb-4">Note for Students</h3>
          <p className="text-muted-foreground">
            All resources are hosted on Google Drive. Click on any card above to access the respective materials. 
            Make sure you're logged in with your institutional email for full access. For any issues accessing the materials, 
            please contact the department office.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Resources;
