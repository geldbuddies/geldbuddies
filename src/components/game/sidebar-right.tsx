'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';
import useGameStore from '@/store/game/game-store';

export default function SidebarRight() {
  const { history } = useGameStore();

  // Function to format game timestamp to readable date
  const formatDate = (timestamp: number) => {
    // Extract year and month from the game timestamp
    // Format is: YYYYMM00
    const year = Math.floor(timestamp / 10000);
    const month = Math.floor((timestamp % 10000) / 100);

    // Convert month number to name
    const monthNames = [
      'Januari',
      'Februari',
      'Maart',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Augustus',
      'September',
      'Oktober',
      'November',
      'December',
    ];
    const monthName = monthNames[month - 1];

    return `${monthName} ${year}`;
  };

  // Function to get appropriate icon or emoji based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return '💰';
      case 'job':
        return '💼';
      case 'asset':
        return '🏠';
      case 'good':
        return '🛍️';
      case 'life':
        return '📅';
      default:
        return '📝';
    }
  };

  // Group events by month/year
  const groupEventsByMonth = () => {
    const groupedEvents: Record<string, typeof history.events> = {};

    history.events.forEach((event) => {
      const monthYearKey = formatDate(event.timestamp);
      if (!groupedEvents[monthYearKey]) {
        groupedEvents[monthYearKey] = [];
      }
      groupedEvents[monthYearKey].push(event);
    });

    return groupedEvents;
  };

  const groupedEvents = groupEventsByMonth();

  return (
    <Sidebar side="right" className="border-l">
      <SidebarHeader className="h-14 border-b px-4 flex items-center">
        <h2 className="text-lg font-semibold">Geschiedenis</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          {history.events.length > 0 ? (
            Object.entries(groupedEvents).map(([monthYear, events]) => (
              <SidebarGroup key={monthYear}>
                <SidebarGroupLabel>{monthYear}</SidebarGroupLabel>
                <SidebarGroupContent className="space-y-2">
                  {events.map((event) => (
                    <Card key={event.id} className="p-3 gap-1">
                      <CardHeader className="items-center flex-row gap-3 px-1">
                        <div className="text-2xl">{getEventIcon(event.type)}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.description}</p>
                        </div>
                      </CardHeader>
                      {event.amount && (
                        <CardContent className="px-1">
                          <p
                            className={`text-base font-semibold ${
                              event.amount > 0
                                ? 'text-green-600'
                                : event.amount < 0
                                ? 'text-red-600'
                                : ''
                            }`}
                          >
                            {event.amount > 0
                              ? `+€${event.amount.toLocaleString()}`
                              : event.amount < 0
                              ? `−€${Math.abs(event.amount).toLocaleString()}`
                              : `€${event.amount.toLocaleString()}`}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nog geen geschiedenis.</p>
              <p className="text-sm">Begin met spelen om je levensverhaal te schrijven!</p>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
