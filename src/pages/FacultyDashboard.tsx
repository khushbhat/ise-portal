import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { facultyAPI, researchAPI } from "@/services/api";
import { LogOut, User, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<any>(null);
  const [newPublication, setNewPublication] = useState({
    title: "",
    author: "",
    publication: "",
    year: new Date().getFullYear(),
    description: "",
  });

  useEffect(() => {
    const isAuth = localStorage.getItem("facultyAuthenticated");
    if (!isAuth) {
      navigate("/admin");
      return;
    }

    const facultyId = localStorage.getItem("facultyId");
    if (facultyId) {
      loadFacultyData(parseInt(facultyId));
    }
  }, [navigate]);

  const loadFacultyData = async (id: number) => {
    try {
      const data = await facultyAPI.getById(id);
      setFaculty(data);
    } catch (error) {
      console.error("Failed to load faculty data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("facultyAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("facultyId");
    localStorage.removeItem("facultyUserId");
    navigate("/");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await facultyAPI.update(faculty.id, faculty);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleAddPublication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await researchAPI.create(newPublication);
      toast({
        title: "Success",
        description: "Publication added successfully",
      });
      setNewPublication({
        title: "",
        author: "",
        publication: "",
        year: new Date().getFullYear(),
        description: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add publication",
        variant: "destructive",
      });
    }
  };

  if (!faculty) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">Faculty Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {faculty.name || "Faculty Member"}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              My Profile
            </TabsTrigger>
            <TabsTrigger value="publications">
              <BookOpen className="mr-2 h-4 w-4" />
              Add Publication
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Update Your Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={faculty.name || ""}
                        onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input
                        value={faculty.designation || ""}
                        onChange={(e) => setFaculty({ ...faculty, designation: e.target.value })}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Education</Label>
                    <Textarea
                      value={faculty.education || ""}
                      onChange={(e) => setFaculty({ ...faculty, education: e.target.value })}
                      placeholder="Enter your educational qualifications..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Subjects Taught</Label>
                    <Textarea
                      value={faculty.subjects_taught || ""}
                      onChange={(e) => setFaculty({ ...faculty, subjects_taught: e.target.value })}
                      placeholder="List subjects you teach..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Funded Projects</Label>
                    <Textarea
                      value={faculty.funded_projects || ""}
                      onChange={(e) => setFaculty({ ...faculty, funded_projects: e.target.value })}
                      placeholder="List your funded projects..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Honours & Achievements</Label>
                    <Textarea
                      value={faculty.honours_achievements || ""}
                      onChange={(e) => setFaculty({ ...faculty, honours_achievements: e.target.value })}
                      placeholder="List your honours and achievements..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Professional Memberships</Label>
                    <Textarea
                      value={faculty.memberships || ""}
                      onChange={(e) => setFaculty({ ...faculty, memberships: e.target.value })}
                      placeholder="List your professional society memberships..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Patents</Label>
                    <Textarea
                      value={faculty.patents || ""}
                      onChange={(e) => setFaculty({ ...faculty, patents: e.target.value })}
                      placeholder="List your patents..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Workshops/FDP/Guest Lectures Attended</Label>
                    <Textarea
                      value={faculty.workshops_attended || ""}
                      onChange={(e) => setFaculty({ ...faculty, workshops_attended: e.target.value })}
                      placeholder="List workshops, FDPs, and guest lectures attended..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">Update Profile</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications">
            <Card>
              <CardHeader>
                <CardTitle>Add New Publication</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPublication} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={newPublication.title}
                      onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
                      placeholder="Enter publication title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Author(s) *</Label>
                    <Input
                      value={newPublication.author}
                      onChange={(e) => setNewPublication({ ...newPublication, author: e.target.value })}
                      placeholder="Enter author names"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Publication/Journal *</Label>
                    <Input
                      value={newPublication.publication}
                      onChange={(e) => setNewPublication({ ...newPublication, publication: e.target.value })}
                      placeholder="Enter publication or journal name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Year *</Label>
                    <Input
                      type="number"
                      value={newPublication.year}
                      onChange={(e) => setNewPublication({ ...newPublication, year: parseInt(e.target.value) })}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newPublication.description}
                      onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}
                      placeholder="Enter publication description"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">Add Publication</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyDashboard;
