"use client"
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Assessment,
  addAssessment,
  updateAssessment,
  deleteAssessment,
  toggleAssessmentSelection,
  selectAllAssessments,
} from '@/redux/slices/assessmentSlice';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Plus, Download, FileUp } from 'lucide-react';
import { toast } from 'sonner';
type AssessmentData = {
    id: string;
    taxYear: string;
    company: string;
    state: string;
    assessor: string;
    accountNumber: string;
    appealedDate: string;
    selected: boolean;
  };
  
  type AssessmentFormData = Omit<AssessmentData, 'id' | 'selected'>;



  
export function AssessmentTable() {
  const dispatch = useAppDispatch();
  const assessments = useAppSelector((state: { assessments: { items: any; }; }) => state.assessments.items);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [formData, setFormData] = useState<AssessmentFormData>({
    taxYear: '',
    company: '',
    state: '',
    assessor: '',
    accountNumber: '',
    appealedDate: '',
  });

  const resetFormData = () => {
    setFormData({
      taxYear: '',
      company: '',
      state: '',
      assessor: '',
      accountNumber: '',
      appealedDate: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAssessment = () => {
    dispatch(addAssessment(formData));
    resetFormData();
    setIsAddDialogOpen(false);
    toast.success('Assessment added successfully');
  };

  const handleUpdateAssessment = () => {
    if (currentAssessment) {
      dispatch(
        updateAssessment({
          ...formData,
          id: currentAssessment.id,
          selected: currentAssessment.selected,
        })
      );
      setIsEditDialogOpen(false);
      toast.success('Assessment updated successfully');
    }
  };

  const handleDeleteAssessment = () => {
    if (currentAssessment) {
      dispatch(deleteAssessment(currentAssessment.id));
      setIsDeleteDialogOpen(false);
      toast.success('Assessment deleted successfully');
    }
  };

  const handleEdit = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setFormData({
      taxYear: assessment.taxYear,
      company: assessment.company,
      state: assessment.state,
      assessor: assessment.assessor,
      accountNumber: assessment.accountNumber,
      appealedDate: assessment.appealedDate,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setIsDeleteDialogOpen(true);
  };

  const handleSelectionToggle = (id: string) => {
    dispatch(toggleAssessmentSelection(id));
  };

  const handleSelectAll = (checked: boolean) => {
    dispatch(selectAllAssessments(checked));
  };

  const selectedCount = assessments.filter((item: { selected: any; }) => item.selected).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Property Tax Appeals</div>
        
        <div className="flex gap-2  text-black">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
       
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Assessment</DialogTitle>
                <DialogDescription>
                  Enter the details for the new assessment record.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxYear">Tax Year</Label>
                    <Input
                      id="taxYear"
                      name="taxYear"
                      value={formData.taxYear}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assessor">Assessor</Label>
                    <Input
                      id="assessor"
                      name="assessor"
                      value={formData.assessor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appealedDate">Appealed Date</Label>
                    <Input
                      id="appealedDate"
                      name="appealedDate"
                      value={formData.appealedDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAssessment}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="p-3 bg-blue-50 rounded-md flex justify-between items-center">
          <div className="text-sm font-medium">
            {selectedCount} items selected
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export Selected
            </Button>
            <Button variant="outline" size="sm">
              Download Letter
            </Button>
            <Button size="sm">Change Status</Button>
          </div>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  onCheckedChange={(checked) => 
                    handleSelectAll(checked as boolean)
                  } 
                />
              </TableHead>
              <TableHead>Tax Year</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Assessor</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Appealed Date</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment: Assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>
                  <Checkbox 
                    checked={assessment.selected} 
                    onCheckedChange={() => handleSelectionToggle(assessment.id)} 
                  />
                </TableCell>
                <TableCell>{assessment.taxYear}</TableCell>
                <TableCell>{assessment.company}</TableCell>
                <TableCell>{assessment.state}</TableCell>
                <TableCell>{assessment.assessor}</TableCell>
                <TableCell>{assessment.accountNumber}</TableCell>
                <TableCell>{assessment.appealedDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(assessment)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(assessment)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Assessment</DialogTitle>
            <DialogDescription>
              Update the assessment details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-taxYear">Tax Year</Label>
                <Input
                  id="edit-taxYear"
                  name="taxYear"
                  value={formData.taxYear}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-state">State</Label>
                <Input
                  id="edit-state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-assessor">Assessor</Label>
                <Input
                  id="edit-assessor"
                  name="assessor"
                  value={formData.assessor}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-accountNumber">Account Number</Label>
                <Input
                  id="edit-accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-appealedDate">Appealed Date</Label>
                <Input
                  id="edit-appealedDate"
                  name="appealedDate"
                  value={formData.appealedDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAssessment}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAssessment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
