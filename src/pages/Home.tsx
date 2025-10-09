import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Users, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";
import { homeAPI } from "@/services/api";

const Home = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [homeContent, setHomeContent] = useState({
    heroTitle: "Information Science & Engineering",
    heroSubtitle: "Department of ISE at Ramaiah Institute of Technology",
    aboutTitle: "Welcome to ISE Department",
    aboutDescription: "The Information Science and Engineering department is committed to providing cutting-edge education in computer science, data analytics, artificial intelligence, and emerging technologies."
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await homeAPI.get();
        if (data.content) {
          setHomeContent({
            heroTitle: data.content.hero_title || homeContent.heroTitle,
            heroSubtitle: data.content.hero_subtitle || homeContent.heroSubtitle,
            aboutTitle: data.content.about_title || homeContent.aboutTitle,
            aboutDescription: data.content.about_description || homeContent.aboutDescription,
          });
        }
        if (data.announcements) {
          setAnnouncements(data.announcements);
        }
      } catch (error) {
        console.error("Failed to load home data:", error);
      }
    };
    loadData();
  }, []);

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
            {homeContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            {homeContent.heroSubtitle}
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
          <h2 className="text-4xl font-heading font-bold mb-4">{homeContent.aboutTitle}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {homeContent.aboutDescription}
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
            {announcements.length > 0 ? (
              announcements.slice(0, 3).map((announcement) => (
                <Card key={announcement.id} className="glass-card hover-lift">
                  <CardHeader>
                    <div className="text-sm text-accent font-medium mb-2">
                      {announcement.created_at ? new Date(announcement.created_at).toLocaleDateString() : ''}
                    </div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground col-span-3 text-center">No announcements yet</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
