
import React from 'react'
import { Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  Bell, 
  FileText, 
  Users, 
  Settings,
  Database,
  Book,
  ListChecks,
  Menu
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface SidebarProps {
  isMobile?: boolean
}

const SidebarMenuButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <li>
      {children}
    </li>
  )
}

export function TeacherSidebar({ isMobile = false }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {isMobile ? (
          <Button variant="ghost" size="sm" className="p-0 rounded-md w-8 h-8">
            <Menu className="h-5 w-5" />
          </Button>
        ) : null}
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 mt-6">
            <SheetTitle className="font-bold text-lg">
              Acme Corp.
            </SheetTitle>
            <SheetDescription>
              Teacher Dashboard
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-2">
            <nav className="grid gap-6 px-6">
              <ul className="grid gap-1">
                <SidebarMenuButton>
                  <Link 
                    to="/teacher" 
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <Link 
                    to="/teacher/messages" 
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Messages
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <Link 
                    to="/teacher/notifications" 
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Link>
                </SidebarMenuButton>
              </ul>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="exams">
                  <AccordionTrigger className="text-sm font-medium">
                    <FileText className="h-4 w-4 mr-2" /> Exams
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid gap-1 pl-2">
                      <SidebarMenuButton>
                        <Link 
                          to="/teacher/exams" 
                          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                        >
                          <ListChecks className="h-4 w-4" />
                          All Exams
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuButton>
                        <Link 
                          to="/teacher/question-bank" 
                          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                        >
                          <Database className="h-4 w-4" />
                          Question Bank
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuButton>
                        <Link 
                          to="/teacher/instructions" 
                          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                        >
                          <Book className="h-4 w-4" />
                          Instructions
                        </Link>
                      </SidebarMenuButton>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="batches">
                  <AccordionTrigger className="text-sm font-medium">
                    <Users className="h-4 w-4 mr-2" /> Batches
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid gap-1 pl-2">
                      <SidebarMenuButton>
                        <Link 
                          to="/teacher/batches" 
                          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                        >
                          All Batches
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuButton>
                        <Link 
                          to="/teacher/directory" 
                          className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                        >
                          Directory
                        </Link>
                      </SidebarMenuButton>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <ul className="grid gap-1">
                <SidebarMenuButton>
                  <Link 
                    to="/teacher/schedule" 
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <Link 
                    to="/teacher/settings" 
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-accent"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </ul>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
