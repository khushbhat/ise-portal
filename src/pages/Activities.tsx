import { Calendar, Users, Trophy, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Activities = () => {
  const activities = [
    {
      category: "Technical Workshops",
      icon: Lightbulb,
      events: [
        {
          title: "Machine Learning Workshop",
          date: "March 2025",
          description: "Intensive 5-day workshop on ML fundamentals and applications",
          participants: "120 students",
        },
        {
          title: "Web Development Bootcamp",
          date: "February 2025",
          description: "Full-stack development training with industry experts",
          participants: "80 students",
        },
      ],
    },
    {
      category: "Hackathons & Competitions",
      icon: Trophy,
      events: [
        {
          title: "Code Sprint 2025",
          date: "January 2025",
          description: "24-hour coding marathon with industry problem statements",
          participants: "150+ students",
        },
        {
          title: "AI Challenge",
          date: "December 2024",
          description: "National level AI/ML competition",
          participants: "200+ students from various colleges",
        },
      ],
    },
    {
      category: "Guest Lectures",
      icon: Users,
      events: [
        {
          title: "Industry Expert Talk Series",
          date: "Ongoing",
          description: "Monthly lectures by industry professionals",
          participants: "All students",
        },
        {
          title: "Research Seminar Series",
          date: "Ongoing",
          description: "Faculty and student research presentations",
          participants: "Faculty and research scholars",
        },
      ],
    },
    {
      category: "Student Clubs",
      icon: Users,
      events: [
        {
          title: "Coding Club",
          date: "Year-round",
          description: "Weekly coding sessions and competitive programming practice",
          participants: "Active members: 60+",
        },
        {
          title: "AI/ML Club",
          date: "Year-round",
          description: "Projects, workshops, and discussions on AI/ML topics",
          participants: "Active members: 45+",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl font-heading font-bold mb-4 animate-fade-in">
            Department Activities
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in">
            Enriching student experience through workshops, competitions, and technical events
          </p>
        </div>
      </section>

      {/* Activities Section */}
      <section className="container mx-auto px-4 py-16">
        {activities.map((activity, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <activity.icon className="h-10 w-10 text-accent" />
              <h2 className="text-3xl font-heading font-bold">{activity.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activity.events.map((event, eventIndex) => (
                <Card key={eventIndex} className="glass-card hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-accent mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="text-base">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Participation:</strong> {event.participants}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-heading font-semibold mb-4">Get Involved</h3>
          <p className="text-muted-foreground">
            The department regularly organizes various technical and co-curricular activities to enhance 
            student learning and development. Students are encouraged to actively participate in these events. 
            For upcoming activities and registration details, please check the notice board or contact the 
            student activity coordinators.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Activities;
