'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export function CreateOrganizationDialog() {
  const [newOrgName, setNewOrgName] = useState('');
  const router = useRouter();

  const handleCreateOrganization = async () => {
    try {
      const organization = await authClient.organization.create({
        name: newOrgName,
        slug: newOrgName.toLowerCase().replace(/\s+/g, '-'),
      });
      setNewOrgName('');
      router.push(`/dashboard/classrooms/${organization.data?.id}`);
      router.refresh();
    } catch (error) {
      console.error('Failed to create organization:', error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="border-dashed cursor-pointer hover:border-primary/50 transition-colors">
          <CardContent className="flex items-center justify-center h-32">
            <PlusIcon className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nieuwe Organisatie</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Naam
            </label>
            <Input
              id="name"
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Voer een naam in"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setNewOrgName('')}>Annuleren</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCreateOrganization}
            disabled={!newOrgName.trim()}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Aanmaken
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
