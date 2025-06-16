
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Book, Mail, Phone, MapPin, Calendar, Plus, Edit, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LecturerAssignment = () => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');

  const lecturers = [
    {
      id: "LEC001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      office: "CS Building 301",
      specialization: "Data Structures, Algorithms",
      experience: "8 years",
      status: "Active",
      courses: ["CS301", "CS302"],
      maxCourses: 4
    },
    {
      id: "LEC002",
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      phone: "+1 (555) 234-5678",
      department: "Computer Science",
      office: "CS Building 302",
      specialization: "Database Systems, Software Engineering",
      experience: "12 years",
      status: "Active",
      courses: ["CS302", "CS401"],
      maxCourses: 3
    },
    {
      id: "LEC003",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@university.edu",
      phone: "+1 (555) 345-6789",
      department: "Mathematics",
      office: "Math Building 201",
      specialization: "Discrete Mathematics, Linear Algebra",
      experience: "6 years",
      status: "Active",
      courses: ["MATH201"],
      maxCourses: 4
    },
    {
      id: "LEC004",
      name: "Dr. Alex Kumar",
      email: "alex.kumar@university.edu",
      phone: "+1 (555) 456-7890",
      department: "Computer Science",
      office: "CS Building 401",
      specialization: "Machine Learning, AI",
      experience: "10 years",
      status: "Active",
      courses: [],
      maxCourses: 3
    }
  ];

  const courses = [
    {
      id: "CS401",
      name: "Machine Learning",
      credits: 4,
      semester: "Fall 2024",
      schedule: "MWF 9:00-10:00 AM",
      lecturer: "Dr. Alex Kumar",
      status: "Assigned"
    },
    {
      id: "CS402",
      name: "Software Engineering",
      credits: 3,
      semester: "Fall 2024",
      schedule: "TTh 11:00-12:30 PM",
      lecturer: null,
      status: "Unassigned"
    },
    {
      id: "CS403",
      name: "Computer Networks",
      credits: 3,
      semester: "Fall 2024",
      schedule: "MWF 2:00-3:00 PM",
      lecturer: null,
      status: "Unassigned"
    },
    {
      id: "MATH301",
      name: "Linear Algebra",
      credits: 3,
      semester: "Fall 2024",
      schedule: "TTh 9:00-10:30 AM",
      lecturer: null,
      status: "Unassigned"
    }
  ];

  const handleAssignLecturer = () => {
    if (!selectedCourse || !selectedLecturer) {
      toast({
        title: "Assignment Failed",
        description: "Please select both a course and a lecturer.",
        variant: "destructive",
      });
      return;
    }

    const course = courses.find(c => c.id === selectedCourse);
    const lecturer = lecturers.find(l => l.id === selectedLecturer);

    toast({
      title: "Assignment Successful",
      description: `${lecturer.name} has been assigned to ${course.name} (${course.id}).`,
    });

    setIsAssignDialogOpen(false);
    setSelectedCourse('');
    setSelectedLecturer('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned':
        return 'bg-green-500';
      case 'Unassigned':
        return 'bg-red-500';
      case 'Active':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getWorkloadColor = (current, max) => {
    const ratio = current / max;
    if (ratio >= 0.8) return 'text-red-600';
    if (ratio >= 0.6) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Lecturer Assignment</h2>
          <p className="text-gray-600">Manage lecturer assignments to courses</p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Assign Lecturer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Lecturer to Course</DialogTitle>
              <DialogDescription>
                Select a course and lecturer to create a new assignment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.filter(course => course.status === 'Unassigned').map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.id} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lecturer">Lecturer</Label>
                <Select value={selectedLecturer} onValueChange={setSelectedLecturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lecturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {lecturers.filter(lecturer => lecturer.courses.length < lecturer.maxCourses).map((lecturer) => (
                      <SelectItem key={lecturer.id} value={lecturer.id}>
                        {lecturer.name} ({lecturer.courses.length}/{lecturer.maxCourses} courses)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignLecturer} className="bg-blue-600 hover:bg-blue-700">
                Assign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-md border-0 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Lecturers</p>
                <p className="text-2xl font-bold text-blue-900">{lecturers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Assigned Courses</p>
                <p className="text-2xl font-bold text-green-900">
                  {courses.filter(c => c.status === 'Assigned').length}
                </p>
              </div>
              <Book className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Unassigned</p>
                <p className="text-2xl font-bold text-red-900">
                  {courses.filter(c => c.status === 'Unassigned').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Courses</p>
                <p className="text-2xl font-bold text-purple-900">{courses.length}</p>
              </div>
              <Book className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lecturers */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Faculty Members</CardTitle>
            <CardDescription>Overview of all lecturers and their current workload</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lecturers.map((lecturer) => (
              <div key={lecturer.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{lecturer.name}</h4>
                    <p className="text-sm text-gray-600">{lecturer.department}</p>
                  </div>
                  <Badge className={getStatusColor(lecturer.status)}>
                    {lecturer.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{lecturer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{lecturer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{lecturer.office}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{lecturer.experience}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Course Load</span>
                    <span className={`text-sm font-bold ${getWorkloadColor(lecturer.courses.length, lecturer.maxCourses)}`}>
                      {lecturer.courses.length}/{lecturer.maxCourses}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(lecturer.courses.length / lecturer.maxCourses) * 100}%` }}
                    />
                  </div>
                </div>

                {lecturer.courses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Assigned Courses:</p>
                    <div className="flex flex-wrap gap-1">
                      {lecturer.courses.map((courseId) => (
                        <Badge key={courseId} variant="outline" className="text-xs">
                          {courseId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-600">
                  <strong>Specialization:</strong> {lecturer.specialization}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Courses */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Course Assignments</CardTitle>
            <CardDescription>Current course assignments and availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.name}</h4>
                    <p className="text-sm text-gray-600 font-mono">{course.id}</p>
                  </div>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Book className="h-3 w-3" />
                    <span>{course.credits} Credits • {course.semester}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{course.schedule}</span>
                  </div>
                  {course.lecturer && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-3 w-3" />
                      <span>{course.lecturer}</span>
                    </div>
                  )}
                </div>

                {course.status === 'Unassigned' && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedCourse(course.id);
                      setIsAssignDialogOpen(true);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Assign Lecturer
                  </Button>
                )}

                {course.status === 'Assigned' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Reassign
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LecturerAssignment;
