import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Events = () => {
  const upcomingEvents = [
    {
      title: "International Conference on AI & ML",
      date: "April 15-17, 2025",
      time: "9:00 AM - 5:00 PM",
      venue: "Auditorium, Main Block",
      type: "Conference",
      attendees: "200+",
      description: "Three-day international conference featuring keynote speakers from leading tech companies and academic institutions.",
    },
    {
      title: "Workshop on Cloud Computing",
      date: "March 25, 2025",
      time: "10:00 AM - 4:00 PM",
      venue: "Computer Lab 5",
      type: "Workshop",
      attendees: "50",
      description: "Hands-on workshop covering AWS, Azure, and Google Cloud Platform fundamentals.",
    },
    {
      title: "Hackathon 2025",
      date: "March 20-21, 2025",
      time: "24 hours",
      venue: "Innovation Lab",
      type: "Hackathon",
      attendees: "100+",
      description: "48-hour coding marathon to build innovative solutions for real-world problems.",
    },
    {
      title: "Guest Lecture: Cybersecurity Trends",
      date: "March 18, 2025",
      time: "2:00 PM - 4:00 PM",
      venue: "Seminar Hall",
      type: "Seminar",
      attendees: "150",
      description: "Expert talk on latest cybersecurity threats and defense mechanisms by industry professionals.",
    },
  ];

  const pastEvents = [
    {
      title: "Tech Fest 2024",
      date: "December 10-12, 2024",
      venue: "College Campus",
      type: "Festival",
      description: "Annual technical festival featuring competitions, exhibitions, and cultural events.",
      highlights: "500+ participants, 20+ competitions, Industry exhibitions",
    },
    {
      title: "AI/ML Bootcamp",
      date: "November 15, 2024",
      venue: "Computer Lab 3",
      type: "Workshop",
      description: "Intensive bootcamp on machine learning algorithms and deep learning frameworks.",
      highlights: "75 participants, Hands-on projects, Industry mentors",
    },
    {
      title: "Research Symposium",
      date: "October 5, 2024",
      venue: "Conference Hall",
      type: "Symposium",
      description: "Platform for students and faculty to present their research work.",
      highlights: "30+ paper presentations, Best paper awards",
    },
  ];

  const getEventColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Conference: "bg-primary",
      Workshop: "bg-secondary",
      Hackathon: "bg-accent",
      Seminar: "bg-muted",
      Festival: "bg-primary",
      Symposium: "bg-secondary",
    };
    return colors[type] || "bg-muted";
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold mb-6">Events & Activities</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stay updated with our latest workshops, seminars, and technical events
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        {/* Upcoming Events */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <Badge className={getEventColor(event.type)}>{event.type}</Badge>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-secondary" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-secondary" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-secondary" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-secondary" />
                        <span>{event.attendees} Attendees Expected</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Past Events */}
        <TabsContent value="past" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-secondary mb-1">Highlights:</p>
                      <p className="text-sm text-muted-foreground">{event.highlights}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Announcements Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-heading font-bold mb-6">Latest Announcements</h2>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <ul className="space-y-4">
              <li className="flex gap-3 pb-4 border-b last:border-0">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-secondary" />
                <div>
                  <p className="font-medium mb-1">Registration Open for Cloud Computing Workshop</p>
                  <p className="text-sm text-muted-foreground">
                    Limited seats available. Register before March 20, 2025
                  </p>
                  <span className="text-xs text-secondary mt-1 inline-block">March 12, 2025</span>
                </div>
              </li>
              <li className="flex gap-3 pb-4 border-b last:border-0">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-secondary" />
                <div>
                  <p className="font-medium mb-1">Call for Papers: AI/ML Conference 2025</p>
                  <p className="text-sm text-muted-foreground">
                    Submit your research papers by March 31, 2025
                  </p>
                  <span className="text-xs text-secondary mt-1 inline-block">March 10, 2025</span>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-secondary" />
                <div>
                  <p className="font-medium mb-1">Guest Lecture Postponed</p>
                  <p className="text-sm text-muted-foreground">
                    Cybersecurity lecture rescheduled to March 18 due to unforeseen circumstances
                  </p>
                  <span className="text-xs text-secondary mt-1 inline-block">March 8, 2025</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Events;
