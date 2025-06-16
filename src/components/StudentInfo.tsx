
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import PersonalInfoForm from "./PersonalInfoForm";
import AcademicInfoCard from "./AcademicInfoCard";
import QuickActionsCard from "./QuickActionsCard";

const StudentInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Campus Drive, University City, UC 12345",
    dateOfBirth: "1998-05-15",
    studentId: "STU-2024-001",
    program: "Computer Science",
    year: "3rd Year",
    gpa: "3.85",
    emergencyContact: "Jane Doe - +1 (555) 987-6543"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your personal information has been successfully updated.",
    });
  };

  const handleDataChange = (field: string, value: string) => {
    setStudentData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Student Information</h2>
          <p className="text-gray-600">Manage your personal and academic details</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2">
          <PersonalInfoForm
            studentData={studentData}
            isEditing={isEditing}
            onDataChange={handleDataChange}
          />
        </div>

        {/* Academic Information and Quick Actions */}
        <div className="space-y-6">
          <AcademicInfoCard studentData={studentData} />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
