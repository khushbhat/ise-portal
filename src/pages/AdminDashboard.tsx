import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Trash2, Edit, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
}

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  attendees: string;
  description: string;
  status: string;
}

interface BOSMember {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  type: string;
}

interface Achievement {
  id: string;
  title: string;
  student: string;
  year: string;
  description: string;
  category: string;
}

interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
}

interface AboutContent {
  vision: string;
  mission: string;
  departmentProfile: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [bosMembers, setBosMembers] = useState<BOSMember[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent>({
    heroTitle: "Information Science & Engineering",
    heroSubtitle: "Department of ISE at Ramaiah Institute of Technology",
    aboutTitle: "Welcome to ISE Department",
    aboutDescription: "The Information Science and Engineering department is committed to providing cutting-edge education in computer science, data analytics, artificial intelligence, and emerging technologies."
  });
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    vision: "To evolve as an outstanding education and research center of Information Technology to create high quality Engineering Professionals for the betterment of Society.",
    mission: "Department of Information Science and Engineering shall create high quality IT Engineering Professionals for the betterment of society.",
    departmentProfile: "The Department of Information Science and Engineering (ISE) was established in the year 1992..."
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("hodAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const savedAnnouncements = localStorage.getItem("announcements");
    const savedFaculty = localStorage.getItem("faculty");
    const savedResources = localStorage.getItem("resources");
    const savedEvents = localStorage.getItem("events");
    const savedBosMembers = localStorage.getItem("bosMembers");
    const savedAchievements = localStorage.getItem("achievements");
    const savedHomeContent = localStorage.getItem("homeContent");
    const savedAboutContent = localStorage.getItem("aboutContent");
    
    if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));
    if (savedFaculty) setFaculty(JSON.parse(savedFaculty));
    if (savedResources) setResources(JSON.parse(savedResources));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedBosMembers) setBosMembers(JSON.parse(savedBosMembers));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedHomeContent) setHomeContent(JSON.parse(savedHomeContent));
    if (savedAboutContent) setAboutContent(JSON.parse(savedAboutContent));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("hodAuthenticated");
    toast({
      title: "Logged Out",
      description: "Successfully logged out from admin dashboard",
    });
    navigate("/admin/login");
  };

  const handleAddAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
    };
    
    const updatedAnnouncements = [...announcements, newAnnouncement];
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem("announcements", JSON.stringify(updatedAnnouncements));
    
    toast({
      title: "Success",
      description: "Announcement added successfully",
    });
    e.currentTarget.reset();
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updatedAnnouncements = announcements.filter(a => a.id !== id);
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem("announcements", JSON.stringify(updatedAnnouncements));
    
    toast({
      title: "Deleted",
      description: "Announcement deleted successfully",
    });
  };

  const handleAddFaculty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newFaculty: FacultyMember = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      designation: formData.get("designation") as string,
      qualification: formData.get("qualification") as string,
      specialization: formData.get("specialization") as string,
    };
    
    const updatedFaculty = [...faculty, newFaculty];
    setFaculty(updatedFaculty);
    localStorage.setItem("faculty", JSON.stringify(updatedFaculty));
    
    toast({
      title: "Success",
      description: "Faculty member added successfully",
    });
    e.currentTarget.reset();
  };

  const handleDeleteFaculty = (id: string) => {
    const updatedFaculty = faculty.filter(f => f.id !== id);
    setFaculty(updatedFaculty);
    localStorage.setItem("faculty", JSON.stringify(updatedFaculty));
    
    toast({
      title: "Deleted",
      description: "Faculty member deleted successfully",
    });
  };

  const handleAddResource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newResource: Resource = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      link: formData.get("link") as string,
      icon: formData.get("icon") as string,
    };
    
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    
    toast({ title: "Success", description: "Resource added successfully" });
    e.currentTarget.reset();
  };

  const handleDeleteResource = (id: string) => {
    const updatedResources = resources.filter(r => r.id !== id);
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    toast({ title: "Deleted", description: "Resource deleted successfully" });
  };

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      venue: formData.get("venue") as string,
      type: formData.get("type") as string,
      attendees: formData.get("attendees") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    toast({ title: "Success", description: "Event added successfully" });
    e.currentTarget.reset();
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    toast({ title: "Deleted", description: "Event deleted successfully" });
  };

  const handleAddBOSMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMember: BOSMember = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      designation: formData.get("designation") as string,
      affiliation: formData.get("affiliation") as string,
      type: formData.get("type") as string,
    };
    
    const updatedMembers = [...bosMembers, newMember];
    setBosMembers(updatedMembers);
    localStorage.setItem("bosMembers", JSON.stringify(updatedMembers));
    
    toast({ title: "Success", description: "Member added successfully" });
    e.currentTarget.reset();
  };

  const handleDeleteBOSMember = (id: string) => {
    const updatedMembers = bosMembers.filter(m => m.id !== id);
    setBosMembers(updatedMembers);
    localStorage.setItem("bosMembers", JSON.stringify(updatedMembers));
    toast({ title: "Deleted", description: "Member deleted successfully" });
  };

  const handleAddAchievement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      student: formData.get("student") as string,
      year: formData.get("year") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
    };
    
    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);
    localStorage.setItem("achievements", JSON.stringify(updatedAchievements));
    
    toast({ title: "Success", description: "Achievement added successfully" });
    e.currentTarget.reset();
  };

  const handleDeleteAchievement = (id: string) => {
    const updatedAchievements = achievements.filter(a => a.id !== id);
    setAchievements(updatedAchievements);
    localStorage.setItem("achievements", JSON.stringify(updatedAchievements));
    toast({ title: "Deleted", description: "Achievement deleted successfully" });
  };

  const handleUpdateHomeContent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated: HomeContent = {
      heroTitle: formData.get("heroTitle") as string,
      heroSubtitle: formData.get("heroSubtitle") as string,
      aboutTitle: formData.get("aboutTitle") as string,
      aboutDescription: formData.get("aboutDescription") as string,
    };
    
    setHomeContent(updated);
    localStorage.setItem("homeContent", JSON.stringify(updated));
    toast({ title: "Success", description: "Home page updated successfully" });
  };

  const handleUpdateAboutContent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated: AboutContent = {
      vision: formData.get("vision") as string,
      mission: formData.get("mission") as string,
      departmentProfile: formData.get("departmentProfile") as string,
    };
    
    setAboutContent(updated);
    localStorage.setItem("aboutContent", JSON.stringify(updated));
    toast({ title: "Success", description: "About page updated successfully" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-heading font-bold">Department of ISE, RIT</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
            <div className="flex gap-2">
              <Link to="/" target="_blank">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Website
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="bos">BOS/BOE</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Home Content */}
          <TabsContent value="home" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit Home Page</CardTitle>
                <CardDescription>Update hero section and about content on home page</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateHomeContent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input id="heroTitle" name="heroTitle" defaultValue={homeContent.heroTitle} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Input id="heroSubtitle" name="heroSubtitle" defaultValue={homeContent.heroSubtitle} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutTitle">About Section Title</Label>
                    <Input id="aboutTitle" name="aboutTitle" defaultValue={homeContent.aboutTitle} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutDescription">About Section Description</Label>
                    <Textarea id="aboutDescription" name="aboutDescription" defaultValue={homeContent.aboutDescription} rows={5} required />
                  </div>
                  <Button type="submit">
                    <Edit className="mr-2 h-4 w-4" />
                    Update Home Page
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Content */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit About Page</CardTitle>
                <CardDescription>Update vision, mission, and department profile</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateAboutContent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vision">Vision</Label>
                    <Textarea id="vision" name="vision" defaultValue={aboutContent.vision} rows={4} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mission">Mission</Label>
                    <Textarea id="mission" name="mission" defaultValue={aboutContent.mission} rows={4} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departmentProfile">Department Profile</Label>
                    <Textarea id="departmentProfile" name="departmentProfile" defaultValue={aboutContent.departmentProfile} rows={8} required />
                  </div>
                  <Button type="submit">
                    <Edit className="mr-2 h-4 w-4" />
                    Update About Page
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements */}
          <TabsContent value="announcements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Announcement</CardTitle>
                <CardDescription>Create announcements to display on the home page</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAnnouncement} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" required />
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Announcement
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                {announcements.length === 0 ? (
                  <p className="text-muted-foreground">No announcements yet</p>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{announcement.title}</h3>
                          <p className="text-sm text-muted-foreground">{announcement.date}</p>
                          <p className="mt-2">{announcement.description}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Faculty */}
          <TabsContent value="faculty" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Faculty Member</CardTitle>
                <CardDescription>Add new faculty members to the department</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFaculty} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" name="designation" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input id="qualification" name="qualification" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input id="specialization" name="specialization" required />
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Faculty
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                {faculty.length === 0 ? (
                  <p className="text-muted-foreground">No faculty members yet</p>
                ) : (
                  <div className="space-y-4">
                    {faculty.map((member) => (
                      <div key={member.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.designation}</p>
                          <p className="text-sm mt-1">Qualification: {member.qualification}</p>
                          <p className="text-sm">Specialization: {member.specialization}</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteFaculty(member.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Resource Link</CardTitle>
                <CardDescription>Add syllabus, study materials, and other resources</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddResource} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="r-title">Title</Label>
                    <Input id="r-title" name="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-description">Description</Label>
                    <Textarea id="r-description" name="description" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-link">Google Drive Link</Label>
                    <Input id="r-link" name="link" type="url" placeholder="https://drive.google.com/..." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="r-icon">Icon Name</Label>
                    <Input id="r-icon" name="icon" placeholder="BookOpen" required />
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Resource
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Resources</CardTitle>
              </CardHeader>
              <CardContent>
                {resources.length === 0 ? (
                  <p className="text-muted-foreground">No resources yet</p>
                ) : (
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <div key={resource.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                            {resource.link}
                          </a>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Event</CardTitle>
                <CardDescription>Create upcoming or past events</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="e-title">Title</Label>
                      <Input id="e-title" name="title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="e-type">Type</Label>
                      <Input id="e-type" name="type" placeholder="Workshop, Conference, etc." required />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="e-date">Date</Label>
                      <Input id="e-date" name="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="e-time">Time</Label>
                      <Input id="e-time" name="time" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="e-venue">Venue</Label>
                      <Input id="e-venue" name="venue" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="e-attendees">Expected Attendees</Label>
                      <Input id="e-attendees" name="attendees" placeholder="100+" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="e-status">Status</Label>
                      <Input id="e-status" name="status" placeholder="upcoming/past" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-description">Description</Label>
                    <Textarea id="e-description" name="description" required />
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                {events.length === 0 ? (
                  <p className="text-muted-foreground">No events yet</p>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.date} | {event.venue}</p>
                          <p className="text-sm mt-1">{event.description}</p>
                          <span className="text-xs text-accent">{event.status}</span>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* BOS/BOE */}
          <TabsContent value="bos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add BOS/BOE Member</CardTitle>
                <CardDescription>Add members to Board of Studies or Board of Examiners</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBOSMember} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="b-name">Name</Label>
                    <Input id="b-name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-designation">Designation</Label>
                    <Input id="b-designation" name="designation" placeholder="Chairperson, Member, etc." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-affiliation">Affiliation</Label>
                    <Input id="b-affiliation" name="affiliation" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b-type">Type</Label>
                    <Input id="b-type" name="type" placeholder="BOS or BOE" required />
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Members</CardTitle>
              </CardHeader>
              <CardContent>
                {bosMembers.length === 0 ? (
                  <p className="text-muted-foreground">No members yet</p>
                ) : (
                  <div className="space-y-4">
                    {bosMembers.map((member) => (
                      <div key={member.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-accent">{member.designation}</p>
                          <p className="text-sm text-muted-foreground">{member.affiliation}</p>
                          <span className="text-xs text-muted-foreground">{member.type}</span>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteBOSMember(member.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Achievement</CardTitle>
                <CardDescription>Add student achievements and awards</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAchievement} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="a-title">Title</Label>
                    <Input id="a-title" name="title" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="a-student">Student/Team Name</Label>
                      <Input id="a-student" name="student" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="a-year">Year</Label>
                      <Input id="a-year" name="year" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="a-category">Category</Label>
                    <Input id="a-category" name="category" placeholder="academic, competition, placement, internship" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="a-description">Description</Label>
                    <Textarea id="a-description" name="description" required />
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <p className="text-muted-foreground">No achievements yet</p>
                ) : (
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.student} - {achievement.year}</p>
                          <p className="text-sm mt-1">{achievement.description}</p>
                          <span className="text-xs text-accent">{achievement.category}</span>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteAchievement(achievement.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
