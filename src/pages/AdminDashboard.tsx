import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("hodAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    // Load data from localStorage
    const savedAnnouncements = localStorage.getItem("announcements");
    const savedFaculty = localStorage.getItem("faculty");
    
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    }
    if (savedFaculty) {
      setFaculty(JSON.parse(savedFaculty));
    }
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold">HOD Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage department content and data</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
          </TabsList>

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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
