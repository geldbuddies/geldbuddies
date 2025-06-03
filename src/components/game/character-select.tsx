'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useGameStore from '@/store/game/game-store';
import { useState } from 'react';
import { toast } from 'sonner';

// Define starting scenarios
const startingScenarios = [
  {
    id: 'scenario-1',
    name: 'Student',
    description: 'Je bent een student met een beperkt budget maar veel potentieel om te leren.',
    character: {
      money: 500,
      birthYear: 2004,
      birthMonth: 9,
    },
  },
  {
    id: 'scenario-2',
    name: 'Starter',
    description: 'Je hebt net je eerste baan en moet leren omgaan met een regelmatig inkomen.',
    character: {
      money: 1200,
      birthYear: 1999,
      birthMonth: 5,
    },
  },
  {
    id: 'scenario-3',
    name: 'Schuldenaar',
    description: 'Je zit in de schulden en moet leren hoe je hier uit kunt komen.',
    character: {
      money: -1500,
      birthYear: 1997,
      birthMonth: 3,
    },
  },
  {
    id: 'scenario-custom',
    name: 'Aangepast',
    description: 'Maak je eigen financiële startpositie.',
    character: {
      money: 0,
      birthYear: 2000,
      birthMonth: 1,
    },
  },
];

// Months for the select dropdown
const months = [
  { value: '1', label: 'Januari' },
  { value: '2', label: 'Februari' },
  { value: '3', label: 'Maart' },
  { value: '4', label: 'April' },
  { value: '5', label: 'Mei' },
  { value: '6', label: 'Juni' },
  { value: '7', label: 'Juli' },
  { value: '8', label: 'Augustus' },
  { value: '9', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export function CharacterSelect() {
  const { initializePlayer } = useGameStore();
  const [name, setName] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(startingScenarios[0].id);
  const [nameError, setNameError] = useState('');

  // Custom scenario state
  const [customMoney, setCustomMoney] = useState('0');
  const [customBirthYear, setCustomBirthYear] = useState('2000');
  const [customBirthMonth, setCustomBirthMonth] = useState('1');
  const [customMoneyError, setCustomMoneyError] = useState('');
  const [customBirthYearError, setCustomBirthYearError] = useState('');

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error('Vul een naam in');
      return;
    }

    initializePlayer({
      name,
      birthMonth: parseInt(customBirthMonth),
      birthYear: parseInt(customBirthYear),
      money: 1000, // Start met €1000
    });

    toast.success('Karakter aangemaakt!');
  };

  const isCustomScenario = selectedScenario === 'scenario-custom';

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Begin je financiële reis</DialogTitle>
          <DialogDescription>
            Vul je gegevens in en kies een scenario om te starten
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Jouw naam</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                placeholder="Vul je naam in"
                className={nameError ? 'border-destructive' : ''}
              />
              {nameError && <p className="text-sm text-destructive mt-1">{nameError}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {startingScenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selectedScenario === scenario.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleSelectScenario(scenario.id)}
              >
                <CardHeader>
                  <CardTitle>{scenario.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>{scenario.description}</p>
                    {scenario.id !== 'scenario-custom' && (
                      <div className="pt-2">
                        <div className="flex justify-between">
                          <span>Geld:</span>
                          <span className={scenario.character.money < 0 ? 'text-red-500' : ''}>
                            €{scenario.character.money.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isCustomScenario && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
              <h3 className="font-medium mb-4">Aangepaste instellingen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customMoney">Startgeld (€)</Label>
                  <Input
                    id="customMoney"
                    type="number"
                    value={customMoney}
                    onChange={(e) => {
                      setCustomMoney(e.target.value);
                      setCustomMoneyError('');
                    }}
                    placeholder="0"
                    className={customMoneyError ? 'border-destructive' : ''}
                  />
                  {customMoneyError && (
                    <p className="text-sm text-destructive mt-1">{customMoneyError}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="customBirthYear">Geboortejaar</Label>
                  <Input
                    id="customBirthYear"
                    type="number"
                    value={customBirthYear}
                    onChange={(e) => {
                      setCustomBirthYear(e.target.value);
                      setCustomBirthYearError('');
                    }}
                    placeholder="2000"
                    className={customBirthYearError ? 'border-destructive' : ''}
                  />
                  {customBirthYearError && (
                    <p className="text-sm text-destructive mt-1">{customBirthYearError}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="customBirthMonth">Geboortemaand</Label>
                  <Select
                    value={customBirthMonth}
                    onValueChange={(value) => setCustomBirthMonth(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer maand" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button type="submit" size="lg">
              Start je financiële avontuur
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
