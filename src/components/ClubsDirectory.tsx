import image_e446bf8227aaed3588683fe7723a351f5ec0a987 from '../assets/e446bf8227aaed3588683fe7723a351f5ec0a987.jpg';
import image_c7faeb04cad9f07ce67a7727096631a6bad4ab5e from '../assets/c7faeb04cad9f07ce67a7727096631a6bad4ab5e.jpg';
import image_8de1574cf5d81e7b002af0edd0e2a186fec47a2d from '../assets/8de1574cf5d81e7b002af0edd0e2a186fec47a2d.jpg';
import image_0c883af2add5e8bea0105691d5fa5907bae247c5 from '../assets/0c883af2add5e8bea0105691d5fa5907bae247c5.jpg';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Search, MapPin, Phone, Clock, Camera, Users, Star, Navigation, Filter, Expand, X, Calendar, Check, AlertCircle } from "lucide-react";
import Header from "./Header";
import logoImage from "../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


import InteractiveMap from './InteractiveMap';

const ClubsDirectory = ({
  user,
  onLogout,
  isAuthenticated,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [filters, setFilters] = useState({
    membership: "all",
    amenities: [],
  });

  const fetchSchedule = async (clubId) => {
    try {
      const response = await fetch(`/api/schedules/${clubId}`);
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleBookCourt = (slot) => {
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch(`/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username, // Change from user.id to user.username
          schedule_id: selectedSlot.id,
        }),
      });

      if (response.ok) {
        setBookingStatus('success');
        fetchSchedule(selectedClub.id);
      } else {
        const errorData = await response.json();
        console.error('Booking failed:', errorData);
        setBookingStatus('error');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setBookingStatus('error');
    }
  };


  useEffect(() => {
    if (selectedClub) {
      fetchSchedule(selectedClub.id);
    }
  }, [selectedClub]);
  const clubs = [
    {
      id: 1,
      name: "City Tennis Center",
      address: "123 Sports Ave, Downtown",
      city: "New York",
      zip: "10001",
      phone: "(555) 123-4567",
      aiCourts: 8,
      totalCourts: 12,
      rating: 4.8,
      image:
        image_0c883af2add5e8bea0105691d5fa5907bae247c5,
      amenities: [
        "Pro Shop",
        "Locker Rooms",
        "Coaching",
        "Restaurant",
      ],
      hours: "Mon-Sun: 6:00 AM - 10:00 PM",
      membershipRequired: false,
      courtTypes: ["Hard Court", "Clay Court"],
      lat: 40.7069,
      lng: -74.0031,
    },
    {
      id: 2,
      name: "Valley Sports Club",
      address: "456 Valley Rd, Suburbs",
      city: "New York",
      zip: "10002",
      phone: "(555) 234-5678",
      aiCourts: 4,
      totalCourts: 8,
      rating: 4.6,
      image:
        image_8de1574cf5d81e7b002af0edd0e2a186fec47a2d,
      amenities: [
        "Pro Shop",
        "Pool",
        "Fitness Center",
        "Childcare",
      ],
      hours: "Mon-Sun: 6:00 AM - 11:00 PM",
      membershipRequired: true,
      courtTypes: ["Hard Court"],
      lat: 40.8981,
      lng: -73.9018,
    },
    {
      id: 3,
      name: "Riverside Tennis Academy",
      address: "789 River Dr, Riverside",
      city: "New York",
      zip: "10003",
      phone: "(555) 345-6789",
      aiCourts: 6,
      totalCourts: 10,
      rating: 4.9,
      image:
        image_c7faeb04cad9f07ce67a7727096631a6bad4ab5e,
      amenities: [
        "Academy Training",
        "Pro Shop",
        "Video Analysis",
        "Sports Medicine",
      ],
      hours: "Mon-Sun: 5:30 AM - 10:30 PM",
      membershipRequired: false,
      courtTypes: ["Hard Court", "Clay Court", "Grass Court"],
      lat: 40.8174,
      lng: -73.9563,
    },
    {
      id: 4,
      name: "Metro Tennis Complex",
      address: "321 Metro Blvd, Midtown",
      city: "New York",
      zip: "10004",
      phone: "(555) 456-7890",
      aiCourts: 12,
      totalCourts: 16,
      rating: 4.7,
      image:
        image_e446bf8227aaed3588683fe7723a351f5ec0a987,
      amenities: [
        "Tournament Hosting",
        "Pro Shop",
        "Parking",
        "Cafe",
      ],
      hours: "Mon-Sun: 6:00 AM - 11:00 PM",
      membershipRequired: false,
      courtTypes: ["Hard Court", "Indoor Courts"],
      lat: 40.7549,
      lng: -73.9840,
    },
  ];

  const filteredClubs = clubs.filter((club) => {
    const searchTermMatch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.zip.includes(searchTerm);

    const membershipMatch = filters.membership === "all" || 
                            (filters.membership === "yes" && club.membershipRequired) ||
                            (filters.membership === "no" && !club.membershipRequired);

    const amenitiesMatch = filters.amenities.length === 0 || 
                         filters.amenities.every(amenity => club.amenities.includes(amenity));

    return searchTermMatch && membershipMatch && amenitiesMatch;
  });

  // Public Header Component for non-authenticated users
  const PublicHeader = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center">
            <img
              src={logoImage}
              alt="TensorCourt"
              className="h-10 w-auto brightness-0"
            />
          </Link>
          <div className="flex space-x-4">
            <Link to={{ pathname: "/auth", search: "?redirectTo=/clubs" }} state={{ defaultTab: 'signin' }}>
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to={{ pathname: "/auth", search: "?redirectTo=/clubs" }} state={{ defaultTab: 'signup' }}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );

  const ContactDialog = ({ club, onClose }) => (
    <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Contact {club.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>{club.address}, {club.city}, {club.zip}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>{club.phone}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>{club.name.toLowerCase().replace(/\s/g, '.')}@tennis.com</p>
                </div>
                <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p>{club.hours}</p>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Close</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );

  // Schedule Modal
  // Schedule Modal
  const ScheduleModal = ({ club, onClose, onBook }) => {
    const getTodayAtUTCMidnight = () => {
        const today = new Date();
        return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    };

    const [selectedDate, setSelectedDate] = useState(getTodayAtUTCMidnight());
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const filteredSchedule = schedule.filter(slot => {
        const slotDate = new Date(slot.start_time);
        return slotDate.getUTCFullYear() === selectedDate.getUTCFullYear() &&
               slotDate.getUTCMonth() === selectedDate.getUTCMonth() &&
               slotDate.getUTCDate() === selectedDate.getUTCDate();
    }).sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    const handleBooking = () => {
        if (selectedSlotId) {
            const slotToBook = schedule.find(s => s.id.toString() === selectedSlotId);
            if (slotToBook) {
                onBook(slotToBook);
            }
        }
    };

    const toYYYYMMDD = (date) => {
        return date.toISOString().split('T')[0];
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Book a Court at {club.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="date-selector" className="block text-sm font-medium text-gray-700">Select a Date</label>
                        <Input
                            id="date-selector"
                            type="date"
                            min={toYYYYMMDD(new Date())}
                            value={toYYYYMMDD(selectedDate)}
                            onChange={(e) => {
                                // Parse the date string as UTC midnight to avoid timezone issues
                                const [year, month, day] = e.target.value.split('-').map(Number);
                                setSelectedDate(new Date(Date.UTC(year, month - 1, day)));
                                setSelectedSlotId(null);
                            }}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="time-selector" className="block text-sm font-medium text-gray-700">Select a Time Slot</label>
                        <Select onValueChange={setSelectedSlotId} value={selectedSlotId || ""}>
                            <SelectTrigger id="time-selector" className="w-full">
                                <SelectValue placeholder="Choose an available time" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredSchedule.length > 0 ? (
                                    filteredSchedule.map((slot) => (
                                        <SelectItem key={slot.id} value={slot.id.toString()} disabled={slot.is_booked}>
                                            {`${new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${slot.court_name})`}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="none" disabled>No slots available for this date</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleBooking} disabled={!selectedSlotId}>
                        Book Selected Slot
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
  };

  // Booking Modal
  const BookingModal = ({ slot, club, onClose, onConfirm }) => (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
        </DialogHeader>
        {bookingStatus === 'success' ? (
          <div className="text-center p-4">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Booking Successful!</h3>
            <p>You have booked {slot.court_name} at {club.name} from {new Date(slot.start_time).toLocaleTimeString()} to {new Date(slot.end_time).toLocaleTimeString()}.</p>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </div>
        ) : bookingStatus === 'error' ? (
          <div className="text-center p-4">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Booking Failed</h3>
            <p>There was an error processing your booking. Please try again.</p>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </div>
        ) : (
          <div>
            <p>You are about to book the following slot:</p>
            <p><strong>Club:</strong> {club.name}</p>
            <p><strong>Court:</strong> {slot.court_name}</p>
            <p><strong>Time:</strong> {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}</p>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={onConfirm}>Confirm</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  if (selectedClub) {
    return (
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated ? (
          <Header user={user} onLogout={onLogout} />
        ) : (
          <PublicHeader />
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedClub(null)}
              className="mb-4"
            >
              ← Back to Directory
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Club Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header Image */}
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <img
                    src={selectedClub.image}
                    alt={selectedClub.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-6 text-white">
                      <h1 className="text-3xl font-bold mb-2">
                        {selectedClub.name}
                      </h1>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{selectedClub.rating}</span>
                        </div>
                        <Badge className="bg-green-600">
                          <Camera className="w-3 h-3 mr-1" />
                          {selectedClub.aiCourts} AI Courts
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">
                        {selectedClub.address}
                      </p>
                      <p className="text-gray-600 mb-4">
                        {selectedClub.city}, {selectedClub.zip}
                      </p>
                      <Button className="w-full" onClick={() => window.open(`https://www.google.com/maps?q=${selectedClub.lat},${selectedClub.lng}`, '_blank')}>
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        {selectedClub.hours}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Courts & Amenities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Court Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Courts:</span>
                          <span className="font-medium">
                            {selectedClub.totalCourts}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>AI-Enabled Courts:</span>
                          <span className="font-medium text-green-600">
                            {selectedClub.aiCourts}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Membership Required:</span>
                          <span className="font-medium">
                            {selectedClub.membershipRequired
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Court Types:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedClub.courtTypes.map(
                            (type) => (
                              <Badge
                                key={type}
                                variant="outline"
                              >
                                {type}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedClub.amenities.map(
                          (amenity) => (
                            <div
                              key={amenity}
                              className="flex items-center"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              <span>{amenity}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {isAuthenticated ? (
                      <>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600" onClick={() => setShowScheduleModal(true)}>
                          Book Court
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to={{ pathname: "/auth", search: "?redirectTo=/clubs" }} state={{ redirectTo: '/clubs' }}>
                          <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                            Sign In/Up to Book
                          </Button>
                        </Link>
                      </>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowContactPopup(true)} >
                      Contact Club
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Court Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Court 1:</span>
                        <Badge className="bg-green-100 text-green-800">
                          Available
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Court 2:</span>
                        <Badge className="bg-red-100 text-red-800">
                          In Use
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Court 3:</span>
                        <Badge className="bg-green-100 text-green-800">
                          Available
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Court 4:</span>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Maintenance
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Map</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="h-64 rounded-lg overflow-hidden">
                      <InteractiveMap lat={selectedClub.lat} lng={selectedClub.lng} />
                    </div>
                    <Button onClick={() => setIsMapExpanded(true)} variant="ghost" size="icon" className="absolute bottom-2 right-2 bg-white rounded-full">
                      <Expand className="w-6 h-6" />
                    </Button>
                  </CardContent>
                </Card>

                {isMapExpanded && (
                  <Dialog open={isMapExpanded} onOpenChange={setIsMapExpanded}>
                    <DialogContent className="max-w-4xl h-3/4">
                      <div className="relative w-full h-full">
                        <InteractiveMap lat={selectedClub.lat} lng={selectedClub.lng} />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </main>
        {showContactPopup && <ContactDialog club={selectedClub} onClose={() => setShowContactPopup(false)} />}
        {showScheduleModal && <ScheduleModal club={selectedClub} onBook={handleBookCourt} onClose={() => setShowScheduleModal(false)} />}
        {showBookingModal && <BookingModal slot={selectedSlot} club={selectedClub} onConfirm={handleConfirmBooking} onClose={() => {setShowBookingModal(false); setBookingStatus(null);}} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <Header user={user} onLogout={onLogout} />
      ) : (
        <PublicHeader />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tennis Clubs Directory
          </h1>
          <p className="text-gray-600">
            Find AI-enabled tennis courts near you
          </p>
          {!isAuthenticated && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                Sign up to book courts and access premium
                features
              </p>
              <div className="flex justify-center space-x-4">
                <Link to={{ pathname: "/auth", search: "?redirectTo=/clubs" }} state={{ defaultTab: 'signup', redirectTo: '/clubs' }}>
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by club name, city, or zip code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={() => document.getElementById('filter-details').classList.toggle('hidden')}>
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            <div id="filter-details" className="hidden pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="membership-filter" className="block text-sm font-medium text-gray-700 mb-1">Membership</label>
                  <select id="membership-filter" value={filters.membership} onChange={(e) => setFilters({...filters, membership: e.target.value})} className="w-full p-2 border rounded-md">
                    <option value="all">All</option>
                    <option value="yes">Required</option>
                    <option value="no">Not Required</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Pro Shop", "Locker Rooms", "Coaching", "Restaurant", "Pool", "Fitness Center", "Childcare", "Academy Training", "Video Analysis", "Sports Medicine", "Tournament Hosting", "Parking", "Cafe"].map(amenity => (
                      <div key={amenity} className="flex items-center">
                        <input type="checkbox" id={amenity} value={amenity} onChange={(e) => {
                          const newAmenities = e.target.checked
                            ? [...filters.amenities, amenity]
                            : filters.amenities.filter(a => a !== amenity);
                          setFilters({...filters, amenities: newAmenities});
                        }} className="mr-2" />
                        <label htmlFor={amenity} className="text-sm">{amenity}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredClubs.length} club
            {filteredClubs.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <Card
              key={club.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedClub(club)}
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600">
                    <Camera className="w-3 h-3 mr-1" />
                    {club.aiCourts} AI Courts
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {club.name}
                  </CardTitle>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {club.rating}
                    </span>
                  </div>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {club.address}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Total Courts:
                    </span>
                    <span>{club.totalCourts}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      AI Courts:
                    </span>
                    <span className="text-green-600 font-medium">
                      {club.aiCourts}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className={`text-xs ${club.membershipRequired ? 'border-orange-300 text-orange-700 bg-orange-50' : 'border-green-300 text-green-700 bg-green-50'}`}
                  >
                    <Users className="w-3 h-3 mr-1" />
                    {club.membershipRequired ? 'Membership Required' : 'NO Membership Required'}
                  </Badge>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {club.amenities
                      .slice(0, 2)
                      .map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="secondary"
                          className="text-xs"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    {club.amenities.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        +{club.amenities.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No clubs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClubsDirectory;