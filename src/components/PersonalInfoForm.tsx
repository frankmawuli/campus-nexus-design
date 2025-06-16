
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface PersonalInfoFormProps {
  studentData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    emergencyContact: string;
  };
  isEditing: boolean;
  onDataChange: (field: string, value: string) => void;
}

const PersonalInfoForm = ({ studentData, isEditing, onDataChange }: PersonalInfoFormProps) => {
  return (
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Personal Information
        </CardTitle>
        <CardDescription>
          Your basic personal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={studentData.firstName}
              onChange={(e) => onDataChange('firstName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={studentData.lastName}
              onChange={(e) => onDataChange('lastName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={studentData.email}
              onChange={(e) => onDataChange('email', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              value={studentData.phone}
              onChange={(e) => onDataChange('phone', e.target.value)}
              disabled={!isEditing}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Textarea
              id="address"
              value={studentData.address}
              onChange={(e) => onDataChange('address', e.target.value)}
              disabled={!isEditing}
              className="pl-10 min-h-[80px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={studentData.dateOfBirth}
            onChange={(e) => onDataChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={studentData.emergencyContact}
            onChange={(e) => onDataChange('emergencyContact', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
