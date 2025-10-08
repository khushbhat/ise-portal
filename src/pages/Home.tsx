import { ArrowRight, BookOpen, Users, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const announcements = [
    {
      title: "Workshop on Machine Learning",
      date: "March 15, 2025",
      description: "Join us for an intensive workshop on modern ML techniques",
    },
    {
      title: "Research Paper Published",
      date: "March 10, 2025",
      description: "Dr. Smith's paper on AI ethics accepted in top-tier journal",
    },
    {
      title: "Placement Drive Success",
      date: "March 5, 2025",
      description: "95% of students placed in leading tech companies",
    },
  ];

  const quickLinks = [
    {
      icon: Users,
      title: "Faculty",
      description: "Meet our experienced team",
      link: "/faculty",
    },
    {
      icon: BookOpen,
      title: "Research",
      description: "Explore our publications",
      link: "/research",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Upcoming workshops & seminars",
      link: "/events",
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Student success stories",
      link: "/achievements",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Information Science & Engineering
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Department of ISE at Ramaiah Institute of Technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/about">
              <Button size="lg" variant="secondary" className="group">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16 animate-slide-up">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold mb-4">Welcome to ISE Department</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The Information Science and Engineering department is committed to providing cutting-edge
            education in computer science, data analytics, artificial intelligence, and emerging technologies.
            We nurture innovation, research excellence, and industry-ready graduates.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickLinks.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="glass-card hover-lift cursor-pointer h-full">
                <CardHeader>
                  <item.icon className="h-12 w-12 text-accent mb-4" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Announcements */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold">Latest Announcements</h2>
            <Link to="/events">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardHeader>
                  <div className="text-sm text-accent font-medium mb-2">
                    {announcement.date}
                  </div>
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{announcement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
