
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
  GraduationCap
} from 'lucide-react'

import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

export function TeacherSidebar() {
  return (
    <Sidebar className="border-r-0 bg-white shadow-modern-lg">
      <SidebarHeader className="border-b border-border/40 p-6 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 shadow-modern">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">Learniz</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Teacher</Badge>
            </div>
            <span className="text-xs text-gray-600">Teacher Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold mb-4 px-2">
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/teacher" 
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/teacher/messages" 
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Messages
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/teacher/notifications" 
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="exams" className="border-none">
              <AccordionTrigger className="text-sm font-medium px-2 py-2 hover:bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Exams
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <SidebarMenu className="space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        to="/teacher/exams" 
                        className="flex items-center gap-3 px-6 py-2 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        <ListChecks className="h-4 w-4" />
                        All Exams
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        to="/teacher/question-bank" 
                        className="flex items-center gap-3 px-6 py-2 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        <Database className="h-4 w-4" />
                        Question Bank
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        to="/teacher/instructions" 
                        className="flex items-center gap-3 px-6 py-2 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        <Book className="h-4 w-4" />
                        Instructions
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="batches" className="border-none">
              <AccordionTrigger className="text-sm font-medium px-2 py-2 hover:bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Batches
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <SidebarMenu className="space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        to="/teacher/batches" 
                        className="flex items-center gap-3 px-6 py-2 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        All Batches
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        to="/teacher/directory" 
                        className="flex items-center gap-3 px-6 py-2 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        Directory
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/teacher/schedule" 
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link 
                    to="/teacher/settings" 
                    className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
