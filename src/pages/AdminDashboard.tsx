import * as XLSX from 'xlsx';
import { exportPublicationsToExcel } from "@/utils/excelExport";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Trash2, Edit, ExternalLink, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { homeAPI, announcementsAPI, aboutAPI, facultyAPI, resourcesAPI, eventsAPI, bosAPI, boeAPI, achievementsAPI, activitiesAPI } from "@/services/api";
import { researchAPI } from "@/services/api";
import { Download } from "lucide-react";
import { facultyUsersAPI } from "@/services/api";
import { useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Announcement {
  id: number;
  title: string;
  description: string;
  created_at?: string;
}

interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  specialization: string;
  email: string;
  phone: string;
}

interface Resource {
  id: number;
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
}

interface BOSMember {
  id: number;
  name: string;
  designation: string;
  organization: string;
}

interface BOEMember {
  id: number;
  name: string;
  designation: string;
  organization: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  activity_date: string;
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

interface Publication {
  id: number;
  title: string;
  author: string;
  publication: string;
  year: number;
  reference?: string;
  description?: string;
}


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [bosMembers, setBosMembers] = useState<BOSMember[]>([]);
  const [boeMembers, setBoeMembers] = useState<BOEMember[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
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
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPublicationIds, setSelectedPublicationIds] = useState<number[]>([]);
  const [searchPub, setSearchPub] = useState(""); // keyword search
  const [newPublication, setNewPublication] = useState<Publication>({
    id: 0,
    title: "",
    author: "",
    publication: "",
    year: new Date().getFullYear(),
    reference: "",
    description: "",
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("hodAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    loadData();
    fetchPublications();
  }, [navigate]);

  const fetchPublications = async () => {
    try {
      const pubs = await researchAPI.getAll();
      setPublications(pubs);
    } catch {
      setPublications([]);
    }
  };

  const loadData = async () => {
    try {
      const [
        homeData,
        announcementsData,
        aboutData,
        facultyData,
        resourcesData,
        eventsData,
        bosData,
        boeData,
        achievementsData,
        activitiesData
      ] = await Promise.all([
        homeAPI.get(),
        announcementsAPI.getAll(),
        aboutAPI.get(),
        facultyAPI.getAll(),
        resourcesAPI.getAll(),
        eventsAPI.getAll(),
        bosAPI.getAll(),
        boeAPI.getAll(),
        achievementsAPI.getAll(),
        activitiesAPI.getAll()
      ]);

      if (homeData.content) setHomeContent({
        heroTitle: homeData.content.hero_title || "",
        heroSubtitle: homeData.content.hero_subtitle || "",
        aboutTitle: homeData.content.about_title || "",
        aboutDescription: homeData.content.about_description || "",
      });
      setAnnouncements(announcementsData);
      if (aboutData) setAboutContent({
        vision: aboutData.vision || "",
        mission: aboutData.mission || "",
        departmentProfile: aboutData.department_profile || "",
      });
      setFaculty(facultyData);
      setResources(resourcesData);
      setEvents(eventsData);
      setBosMembers(bosData);
      setBoeMembers(boeData);
      setAchievements(achievementsData);
      setActivities(activitiesData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load data from server",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hodAuthenticated");
    toast({
      title: "Logged Out",
      description: "Successfully logged out from admin dashboard",
    });
    navigate("/admin/login");
  };

    const handleAddPublication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await researchAPI.create(newPublication);
      setNewPublication({ id: 0, title: "", author: "", publication: "", year: new Date().getFullYear(), reference: "", description: "" });
      await fetchPublications();
      toast({ title: "Success", description: "Publication added." });
    } catch {
      toast({ title: "Error", description: "Failed to add publication.", variant: "destructive" });
    }
  };

    const handleDeletePublication = async (id: number) => {
    try {
      await researchAPI.delete(id);
      await fetchPublications();
      toast({ title: "Deleted", description: "Publication deleted." });
    } catch {
      toast({ title: "Error", description: "Failed to delete publication.", variant: "destructive" });
    }
  };

  // Select/deselect publication for export
  const handleSelectPublication = (id: number) =>
    setSelectedPublicationIds(ids =>
      ids.includes(id) ? ids.filter(pid => pid !== id) : [...ids, id]
    );

  // Filtered publications
  const filteredPublications = publications.filter(pub =>
    [pub.title, pub.author, pub.publication, pub.reference, pub.description]
      .join(" ")
      .toLowerCase()
      .includes(searchPub.trim().toLowerCase())
  );

  // Export selected/all as XLSX
  const handleExportXLSX = () => {
    const pubsToExport = filteredPublications.filter(pub => selectedPublicationIds.includes(pub.id));
    exportPublicationsToExcel(pubsToExport.length > 0 ? pubsToExport : filteredPublications, "publications.xlsx");
  };

  // Export selected/all as CSV
  const handleExportCSV = () => {
    const pubsToExport = filteredPublications.filter(pub => selectedPublicationIds.includes(pub.id));
    const pubs = pubsToExport.length > 0 ? pubsToExport : filteredPublications;
    const csv = [
      ["Year", "Title", "Authors", "Publication/Journal", "Reference", "Description"],
      ...pubs.map(pub => [
        pub.year,
        `"${pub.title.replace(/"/g, '""')}"`,
        `"${pub.author.replace(/"/g, '""')}"`,
        `"${pub.publication.replace(/"/g, '""')}"`,
        `"${pub.reference?.replace(/"/g, '""') || ""}"`,
        `"${pub.description?.replace(/"/g, '""') || ""}"`
      ])
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "publications.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAddAnnouncement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await announcementsAPI.create({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
      });
      
      await loadData();
      toast({
        title: "Success",
        description: "Announcement added successfully",
      });
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add announcement",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    try {
      await announcementsAPI.delete(id);
      await loadData();
      toast({
        title: "Deleted",
        description: "Announcement deleted successfully",});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      });
    }
  };
    const addFacultyFormRef = useRef<HTMLFormElement>(null);
    const handleAddFaculty = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      try {
        const facultyProfile = {
          name: formData.get("name"),
          designation: formData.get("designation"),
          qualification: formData.get("qualification"),
          specialization: formData.get("specialization"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          // ...other optional fields
          brief_info: formData.get("brief_info"),
          education: formData.get("education"),
          subjects_taught: formData.get("subjects_taught"),
          funded_projects: formData.get("funded_projects"),
          honours_achievements: formData.get("honours_achievements"),
          memberships: formData.get("memberships"),
          patents: formData.get("patents"),
          workshops_attended: formData.get("workshops_attended")
        };
        const facultyRes = await facultyAPI.create(facultyProfile);
        await facultyUsersAPI.create({
          email: formData.get("email"),
          password: formData.get("password"),
          faculty_id: facultyRes.id,
          role: "faculty"
        });
        await loadData();
        toast({ title: "Success", description: "Faculty member added with login." });
        if (addFacultyFormRef.current) addFacultyFormRef.current.reset();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error?.message || "Failed to add faculty and login.",
          variant: "destructive"
        });
      }
    };

  const handleDeleteFaculty = async (id: number) => {
    try {
      await facultyAPI.delete(id);
      await loadData();
      toast({
        title: "Deleted",
        description: "Faculty member deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete faculty member",
        variant: "destructive",
      });
    }
  };

  const handleAddResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await resourcesAPI.create({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        link: formData.get("link") as string,
        icon: formData.get("icon") as string,
      });
      
      await loadData();
      toast({ title: "Success", description: "Resource added successfully" });
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add resource",
        variant: "destructive",
      });
    }
  };

  const handleDeleteResource = async (id: number) => {
    try {
      await resourcesAPI.delete(id);
      await loadData();
      toast({ title: "Deleted", description: "Resource deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      });
    }
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await eventsAPI.create({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        event_date: formData.get("event_date") as string,
        location: formData.get("location") as string,
      });
      
      await loadData();
      toast({ title: "Success", description: "Event added successfully" });
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add event",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await eventsAPI.delete(id);
      await loadData();
      toast({ title: "Deleted", description: "Event deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const handleAddBOSMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const memberType = formData.get("type") as string;
    
    try {
      const memberData = {
        name: formData.get("name") as string,
        designation: formData.get("designation") as string,
        organization: formData.get("organization") as string,
      };

      if (memberType === "BOS") {
        await bosAPI.create(memberData);
      } else {
        await boeAPI.create(memberData);
      }
      
      await loadData();
      toast({ title: "Success", description: "Member added successfully" });
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBOSMember = async (id: number, type: string) => {
    try {
      if (type === "BOS") {
        await bosAPI.delete(id);
      } else {
        await boeAPI.delete(id);
      }
      await loadData();
      toast({ title: "Deleted", description: "Member deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
    }
  };

  const handleAddAchievement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await achievementsAPI.create({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
      });
      
      await loadData();
      toast({ title: "Success", description: "Achievement added successfully" });
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add achievement",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAchievement = async (id: number) => {
    try {
      await achievementsAPI.delete(id);
      await loadData();
      toast({ title: "Deleted", description: "Achievement deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive",
      });
    }
  };

  const handleAddActivity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await activitiesAPI.create({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        activity_date: formData.get("activity_date") as string,
      });
      
      await loadData();
      toast({ title: "Success", description: "Activity added successfully" });
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add activity",
        variant: "destructive",
      });
    }
  };

  const handleDeleteActivity = async (id: number) => {
    try {
      await activitiesAPI.delete(id);
      await loadData();
      toast({ title: "Deleted", description: "Activity deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  const handleUpdateHomeContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await homeAPI.update({
        heroTitle: formData.get("heroTitle") as string,
        heroSubtitle: formData.get("heroSubtitle") as string,
        aboutTitle: formData.get("aboutTitle") as string,
        aboutDescription: formData.get("aboutDescription") as string,
      });
      
      await loadData();
      toast({ title: "Success", description: "Home page updated successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update home page",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAboutContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await aboutAPI.update({
        vision: formData.get("vision") as string,
        mission: formData.get("mission") as string,
        departmentProfile: formData.get("departmentProfile") as string,
      });
      
      await loadData();
      toast({ title: "Success", description: "About page updated successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about page",
        variant: "destructive",
      });
    }
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
        <div className="flex gap-4">
          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant={activeTab === "home" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("home")}>
                  Home
                </Button>
                <Button variant={activeTab === "about" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("about")}>
                  About
                </Button>
                <Button variant={activeTab === "announcements" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("announcements")}>
                  Announcements
                </Button>
                <Button variant={activeTab === "faculty" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("faculty")}>
                  Faculty
                </Button>
                <Button variant={activeTab === "resources" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("resources")}>
                  Resources
                </Button>
                <Button variant={activeTab === "events" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("events")}>
                  Events
                </Button>
                <Button variant={activeTab === "bos" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("bos")}>
                  BOS/BOE
                </Button>
                <Button variant={activeTab === "achievements" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("achievements")}>
                  Achievements
                </Button>
                <Button variant={activeTab === "research" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("research")}>
                  Research
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-9 h-auto">
                <TabsTrigger value="home" className="text-xs sm:text-sm">Home</TabsTrigger>
                <TabsTrigger value="about" className="text-xs sm:text-sm">About</TabsTrigger>
                <TabsTrigger value="announcements" className="text-xs sm:text-sm">Announcements</TabsTrigger>
                <TabsTrigger value="faculty" className="text-xs sm:text-sm">Faculty</TabsTrigger>
                <TabsTrigger value="resources" className="text-xs sm:text-sm">Resources</TabsTrigger>
                <TabsTrigger value="events" className="text-xs sm:text-sm">Events</TabsTrigger>
                <TabsTrigger value="bos" className="text-xs sm:text-sm">BOS/BOE</TabsTrigger>
                <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements</TabsTrigger>
                <TabsTrigger value="research" className="text-xs sm:text-sm">Research</TabsTrigger>
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
                          <p className="text-sm text-muted-foreground">{announcement.created_at ? new Date(announcement.created_at).toLocaleDateString() : ''}</p>
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
                <form ref={addFacultyFormRef} onSubmit={handleAddFaculty} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input id="designation" name="designation" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Input id="qualification" name="qualification" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Input id="specialization" name="specialization" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Faculty Email *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Faculty Password *</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  {/* Optional fields */}
                  <div className="space-y-2">
                    <Label htmlFor="brief_info">Brief Info (optional)</Label>
                    <Textarea id="brief_info" name="brief_info" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education (optional)</Label>
                    <Textarea id="education" name="education" />
                  </div>
                  {/* ...other optional fields as before */}
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
                      <div
                        key={member.id} 
                        className="flex justify-between items-start p-4 border rounded-lg cursor-pointer"
                        onClick={() => navigate(`/faculty/${member.id}`)}
                        title={`View full bio of ${member.name}`}
                      >
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.designation}</p>
                          <p className="text-sm mt-1">Qualification: {member.qualification}</p>
                          <p className="text-sm">Specialization: {member.specialization}</p>
                          {/* ...other info as before */}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={e => {e.stopPropagation(); handleDeleteFaculty(member.id);}}
                          title="Delete Faculty"
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
                  <div className="space-y-2">
                    <Label htmlFor="e-title">Title</Label>
                    <Input id="e-title" name="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-date">Event Date</Label>
                    <Input id="e-date" name="event_date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="e-location">Location</Label>
                    <Input id="e-location" name="location" required />
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
                          <p className="text-sm text-muted-foreground">{new Date(event.event_date).toLocaleDateString()} | {event.location}</p>
                          <p className="text-sm mt-1">{event.description}</p>
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
                <CardTitle>BOS Members</CardTitle>
              </CardHeader>
              <CardContent>
                {bosMembers.length === 0 ? (
                  <p className="text-muted-foreground">No BOS members yet</p>
                ) : (
                  <div className="space-y-4">
                    {bosMembers.map((member) => (
                      <div key={member.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-accent">{member.designation}</p>
                          <p className="text-sm text-muted-foreground">{member.organization}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteBOSMember(member.id, "BOS")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>BOE Members</CardTitle>
              </CardHeader>
              <CardContent>
                {boeMembers.length === 0 ? (
                  <p className="text-muted-foreground">No BOE members yet</p>
                ) : (
                  <div className="space-y-4">
                    {boeMembers.map((member) => (
                      <div key={member.id} className="flex justify-between items-start p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-accent">{member.designation}</p>
                          <p className="text-sm text-muted-foreground">{member.organization}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteBOSMember(member.id, "BOE")}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Research Publication</CardTitle>
                <CardDescription>HoD can add publications here</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAddPublication}>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={newPublication.title} onChange={e => setNewPublication({ ...newPublication, title: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Authors</Label>
                    <Input value={newPublication.author} onChange={e => setNewPublication({ ...newPublication, author: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Publication/Journal</Label>
                    <Input value={newPublication.publication} onChange={e => setNewPublication({ ...newPublication, publication: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input type="number" value={newPublication.year} onChange={e => setNewPublication({ ...newPublication, year: Number(e.target.value) })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Reference</Label>
                    <Input value={newPublication.reference || ""} onChange={e => setNewPublication({ ...newPublication, reference: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={newPublication.description || ""} onChange={e => setNewPublication({ ...newPublication, description: e.target.value })} />
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Publication
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>All Research Publications</CardTitle>
                <div className="flex flex-wrap gap-4 items-center mt-4">
                  <Input
                    type="text"
                    value={searchPub}
                    placeholder="Search by keyword, title, author..."
                    onChange={e => setSearchPub(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" onClick={handleExportXLSX}>
                    <Download className="h-4 w-4 mr-2" />
                    Export XLSX
                  </Button>
                  <Button variant="outline" onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr>
                        <th />
                        <th>Year</th>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Journal</th>
                        <th>Reference</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPublications.map(pub => (
                        <tr key={pub.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedPublicationIds.includes(pub.id)}
                              onChange={() => handleSelectPublication(pub.id)}
                            />
                          </td>
                          <td>{pub.year}</td>
                          <td>{pub.title}</td>
                          <td>{pub.author}</td>
                          <td>{pub.publication}</td>
                          <td>{pub.reference}</td>
                          <td>{pub.description}</td>
                          <td>
                            <Button variant="destructive" size="sm" onClick={() => handleDeletePublication(pub.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {filteredPublications.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-muted-foreground text-center py-8">
                            No publications found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
