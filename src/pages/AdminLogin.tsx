import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, UserCog, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authAPI } from "@/services/api";

const AdminLogin = () => {
  const [hodEmail, setHodEmail] = useState("");
  const [hodPassword, setHodPassword] = useState("");
  const [facultyEmail, setFacultyEmail] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleHodLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login(hodEmail, hodPassword, 'hod');

      if (response.success) {
        localStorage.setItem("hodAuthenticated", "true");
        localStorage.setItem("userRole", "hod");
        toast({
          title: "Login Successful",
          description: "Welcome to the HoD dashboard",
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // (only the handleFacultyLogin is shown with the minimal fix)
const handleFacultyLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await authAPI.login(facultyEmail, facultyPassword, 'faculty');

    if (response.success) {
      // store the same keys your FacultyDashboard expects
      localStorage.setItem("facultyAuthenticated", "true");
      localStorage.setItem("userRole", "faculty");

      // normalize id keys if backend uses different names
      const userObj = response.user || {};
      const facultyId = userObj.faculty_id ?? userObj.facultyId ?? userObj.id ?? null;
      if (facultyId) localStorage.setItem("facultyId", String(facultyId));
      if (userObj.id) localStorage.setItem("facultyUserId", String(userObj.id));

      if (response.token) localStorage.setItem("token", response.token);

      toast({
        title: "Login Successful",
        description: "Welcome to the Faculty dashboard",
      });

      // NAVIGATE TO THE ROUTE REGISTERED IN App.tsx
      navigate("/faculty/dashboard");
    }
  } catch (error) {
    toast({
      title: "Login Failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-accent" />
          </div>
          <CardTitle className="text-2xl">Department Login</CardTitle>
          <CardDescription>
            Access your dashboard - HoD or Faculty
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hod" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hod">
                <UserCog className="mr-2 h-4 w-4" />
                HoD
              </TabsTrigger>
              <TabsTrigger value="faculty">
                <Users className="mr-2 h-4 w-4" />
                Faculty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hod">
              <form onSubmit={handleHodLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="hod-email">Email</Label>
                  <Input
                    id="hod-email"
                    type="email"
                    placeholder="hod@rit.edu"
                    value={hodEmail}
                    onChange={(e) => setHodEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hod-password">Password</Label>
                  <Input
                    id="hod-password"
                    type="password"
                    placeholder="Enter your password"
                    value={hodPassword}
                    onChange={(e) => setHodPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login as HoD"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="faculty">
              <form onSubmit={handleFacultyLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="faculty-email">Email</Label>
                  <Input
                    id="faculty-email"
                    type="email"
                    placeholder="faculty@rit.edu"
                    value={facultyEmail}
                    onChange={(e) => setFacultyEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faculty-password">Password</Label>
                  <Input
                    id="faculty-password"
                    type="password"
                    placeholder="Enter your password"
                    value={facultyPassword}
                    onChange={(e) => setFacultyPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login as Faculty"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
