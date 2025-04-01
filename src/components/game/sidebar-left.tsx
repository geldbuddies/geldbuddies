'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useGameStore from '@/store/game/game-store';
import { useState } from 'react';

export default function SidebarLeft() {
  const { player, jobs, assets, goods } = useGameStore();

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="h-14 border-b px-4 flex items-center">
        <h2 className="text-lg font-semibold">Activiteiten</h2>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-4 space-y-3">
          {/* Career Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <span className="mr-2 text-xl">💼</span>
                Carrière
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Carrière Management</DialogTitle>
              </DialogHeader>
              <div className="pt-2">
                <Tabs defaultValue="current-job">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="current-job">Huidige Baan</TabsTrigger>
                    <TabsTrigger value="find-job">Vacatures</TabsTrigger>
                  </TabsList>
                  <TabsContent value="current-job" className="space-y-4 pt-3">
                    {jobs.currentJob ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>{jobs.currentJob.title}</CardTitle>
                          <CardDescription>{jobs.currentJob.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Salaris: €{jobs.currentJob.salary.toLocaleString()} / jaar</p>
                          <p>
                            Maandelijks Inkomen: €
                            {Math.round(jobs.currentJob.salary / 12).toLocaleString()}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={() => {
                              useGameStore.getState().quitJob();
                            }}
                          >
                            Ontslag Nemen
                          </Button>
                        </CardFooter>
                      </Card>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Je bent momenteel werkloos.</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ga naar de Vacatures tab om werk te vinden.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="find-job" className="pt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {jobs.availableJobs.map((job) => (
                        <Card key={job.id}>
                          <CardHeader>
                            <CardTitle>{job.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                            <p className="mt-1">€{job.salary.toLocaleString()} / jaar</p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="mt-2 w-full flex-1 sm:w-auto"
                              size="sm"
                              onClick={() => {
                                useGameStore.getState().applyForJob(job.id);
                              }}
                            >
                              Solliciteren
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>

          {/* Finance Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <span className="mr-2 text-xl">💰</span>
                Financiën
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Financieel Beheer</DialogTitle>
              </DialogHeader>
              <div className="pt-2">
                <Tabs defaultValue="assets-owned">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="assets-owned">Jouw Bezittingen</TabsTrigger>
                    <TabsTrigger value="buy-assets">Koop Bezittingen</TabsTrigger>
                  </TabsList>
                  <TabsContent value="assets-owned" className="pt-3">
                    {assets.owned.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {assets.owned.map((asset) => (
                          <Card key={asset.id} className="p-3">
                            <h3 className="font-medium">{asset.name}</h3>
                            <div className="mt-1 grid grid-cols-2 gap-1 text-sm">
                              <div>
                                <p className="text-muted-foreground">Aankoopprijs</p>
                                <p>€{asset.purchasePrice.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Huidige Waarde</p>
                                <p>€{asset.value.toLocaleString()}</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className="mt-2 w-full sm:w-auto"
                              size="sm"
                              onClick={() => {
                                useGameStore.getState().sellAsset(asset.id);
                              }}
                            >
                              Verkopen
                            </Button>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Je bezit nog geen bezittingen.</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ga naar de Koop Bezittingen tab om te investeren.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="buy-assets" className="pt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { name: 'Klein Appartement', type: 'property' as const, price: 150000 },
                        { name: 'Aandelen Portefeuille', type: 'property' as const, price: 25000 },
                        { name: 'Vakantiehuis', type: 'property' as const, price: 300000 },
                      ].map((asset, index) => (
                        <Card key={index} className="p-3">
                          <h3 className="font-medium">{asset.name}</h3>
                          <p className="text-xs text-muted-foreground">{asset.type}</p>
                          <p className="mt-1">€{asset.price.toLocaleString()}</p>
                          <Button
                            className="mt-2 w-full sm:w-auto"
                            size="sm"
                            disabled={player.money < asset.price}
                            onClick={() => {
                              useGameStore.getState().buyAsset(asset);
                            }}
                          >
                            Kopen
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>

          {/* Lifestyle Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <span className="mr-2 text-xl">🎮</span>
                Levensstijl
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Levensstijl & Aankopen</DialogTitle>
              </DialogHeader>
              <div className="pt-2">
                <Tabs defaultValue="your-goods">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="your-goods">Jouw Spullen</TabsTrigger>
                    <TabsTrigger value="buy-goods">Koop Spullen</TabsTrigger>
                  </TabsList>
                  <TabsContent value="your-goods" className="pt-3">
                    {goods.owned.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {goods.owned.map((good) => (
                          <Card key={good.id} className="p-3">
                            <h3 className="font-medium">{good.name}</h3>
                            <div className="mt-1 grid grid-cols-2 gap-1 text-sm">
                              <div>
                                <p className="text-muted-foreground">Aankoopprijs</p>
                                <p>€{good.purchasePrice.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Doorverkoopwaarde</p>
                                <p>€{good.resellValue.toLocaleString()}</p>
                              </div>
                              {good.monthlyCost > 0 && (
                                <div className="col-span-2">
                                  <p className="text-muted-foreground mt-1">Maandelijkse Kosten</p>
                                  <p>€{good.monthlyCost.toLocaleString()}</p>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              className="mt-2 w-full sm:w-auto"
                              size="sm"
                              onClick={() => {
                                useGameStore.getState().sellGood(good.id);
                              }}
                            >
                              Verkopen
                            </Button>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Je hebt nog geen spullen.</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ga naar de Koop Spullen tab om te winkelen.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="buy-goods" className="pt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { name: 'Smartphone', price: 1000, resellValue: 500, monthlyCost: 50 },
                        { name: 'Laptop', price: 2000, resellValue: 800, monthlyCost: 0 },
                        {
                          name: 'Merkkleding',
                          price: 3000,
                          resellValue: 1000,
                          monthlyCost: 0,
                        },
                        {
                          name: 'Sportschool Abonnement',
                          price: 500,
                          resellValue: 0,
                          monthlyCost: 50,
                        },
                      ].map((good, index) => (
                        <Card key={index} className="p-3">
                          <h3 className="font-medium">{good.name}</h3>
                          <div className="mt-1 text-xs">
                            <p className="text-muted-foreground">
                              Prijs: €{good.price.toLocaleString()}
                              {good.monthlyCost > 0 && ` + €${good.monthlyCost}/maand`}
                            </p>
                            <p className="text-muted-foreground">
                              Doorverkoopwaarde: €{good.resellValue.toLocaleString()}
                            </p>
                          </div>
                          <Button
                            className="mt-2 w-full sm:w-auto"
                            size="sm"
                            disabled={player.money < good.price}
                            onClick={() => {
                              useGameStore.getState().buyGood(good);
                            }}
                          >
                            Kopen
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>

          {/* Game Controls */}
          <Button
            variant="default"
            className="w-full justify-start"
            size="lg"
            onClick={() => useGameStore.getState().advanceMonth()}
          >
            <span className="mr-2 text-xl">📅</span>
            Volgende Maand
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
