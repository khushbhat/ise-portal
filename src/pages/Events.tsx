import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventsAPI } from "@/services/api";

interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getAll();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Separate events into upcoming and past
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.event_date) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.event_date) < currentDate);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="glass-card hover-lift">
                    <CardHeader>
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-secondary" />
                            <span className="font-medium">{formatDate(event.event_date)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-secondary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-6">
            {pastEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="glass-card hover-lift">
                    <CardHeader>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-secondary" />
                          <span className="font-medium">{formatDate(event.event_date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-secondary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No past events available.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Events;
