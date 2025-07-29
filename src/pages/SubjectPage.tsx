import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { MediaViewer } from "@/components/MediaViewer";
import { ArrowRight, Book, ChevronsUpDown, GraduationCap, ListChecks, LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LMSContentItem {
  id: string;
  title: string;
  description: string;
  progress: number;
  content: any[];
}

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'pdf' | 'pdf-collection';
  duration?: string;
  url?: string;
  size?: string;
  pages?: number;
  hasSubContent?: boolean;
  subContent?: ContentItem[];
}

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [mediaContent, setMediaContent] = useState<ContentItem | null>(null);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);

  const subjectData = {
    id: "1",
    title: "Mathematics",
    description: "Advanced mathematical concepts and applications",
    color: "blue",
    lmsContent: [
      {
        id: "lms-1",
        title: "Introduction to Calculus",
        description: "Basic concepts of differential and integral calculus",
        progress: 60,
        content: [
          { id: "lms-1-1", title: "What is Calculus?", type: "video", duration: "15 min" },
          { id: "lms-1-2", title: "Derivatives Explained", type: "reading", duration: "20 min" },
          { id: "lms-1-3", title: "Integrals for Beginners", type: "reading", duration: "25 min" },
          { id: "lms-1-4", title: "Calculus Cheat Sheet", type: "pdf", url: "https://arxiv.org/pdf/1912.08775.pdf", size: "2.5 MB", pages: 12 }
        ]
      },
      {
        id: "lms-2",
        title: "Limits and Continuity",
        description: "Understanding limits and continuity in calculus",
        progress: 75,
        content: [
          { id: "lms-2-1", title: "Understanding Limits", type: "video", duration: "25 min" },
          { id: "lms-2-2", title: "Continuity Explained", type: "video", duration: "20 min" },
          { id: "lms-2-3", title: "Worked Examples", type: "reading", duration: "15 min" },
          { 
            id: "lms-2-4", 
            title: "Limits and Continuity Reference Materials", 
            type: "pdf-collection",
            duration: "Study materials",
            hasSubContent: true,
            subContent: [
              {
                id: "lms-2-4-1",
                title: "Sample PDF Document",
                type: "pdf",
                url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                size: "1.2 MB",
                pages: 10
              },
              {
                id: "lms-2-4-2",
                title: "Mathematical Reference Guide",
                type: "pdf", 
                url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
                size: "0.8 MB",
                pages: 5
              }
            ]
          }
        ]
      },
      {
        id: "lms-3",
        title: "Differentiation Techniques",
        description: "Advanced methods for finding derivatives",
        progress: 40,
        content: [
          { id: "lms-3-1", title: "The Power Rule", type: "video", duration: "18 min" },
          { id: "lms-3-2", title: "Product and Quotient Rules", type: "video", duration: "22 min" },
          { id: "lms-3-3", title: "Chain Rule Explained", type: "reading", duration: "17 min" },
          { id: "lms-3-4", title: "Differentiation Practice", type: "pdf", url: "https://www.math.ubc.ca/~pwalls/math100/derivative_rules.pdf", size: "1.8 MB", pages: 8 }
        ]
      },
      {
        id: "lms-4",
        title: "Integration Techniques",
        description: "Mastering various methods for finding integrals",
        progress: 80,
        content: [
          { id: "lms-4-1", title: "U-Substitution", type: "video", duration: "20 min" },
          { id: "lms-4-2", title: "Integration by Parts", type: "video", duration: "25 min" },
          { id: "lms-4-3", title: "Partial Fractions", type: "reading", duration: "22 min" },
          { id: "lms-4-4", title: "Integration Tables", type: "pdf", url: "https://tutorial.math.lamar.edu/pdf/calculus_cheat_sheet_integrals.pdf", size: "3.0 MB", pages: 15 }
        ]
      },
      {
        id: "lms-5",
        title: "Applications of Calculus",
        description: "Real-world applications of calculus in various fields",
        progress: 50,
        content: [
          { id: "lms-5-1", title: "Optimization Problems", type: "video", duration: "23 min" },
          { id: "lms-5-2", title: "Related Rates", type: "video", duration: "19 min" },
          { id: "lms-5-3", title: "Area Between Curves", type: "reading", duration: "16 min" },
          { id: "lms-5-4", title: "Calculus Applications", type: "pdf", url: "https://www.whitman.edu/mathematics/calculus_online/section06.01.html", size: "2.0 MB" }
        ]
      }
    ],
    instructor: {
      name: "Dr. Eleanor Vance",
      title: "Professor of Mathematics",
      university: "Stanford University",
      contact: "evance@stanford.edu"
    },
    resources: [
      { id: "res-1", title: "Calculus Textbook", type: "book", url: "https://www.amazon.com/Calculus-Early-Transcendentals-James-Stewart/dp/1285741552" },
      { id: "res-2", title: "Online Calculus Course", type: "course", url: "https://www.coursera.org/courses?query=calculus" },
      { id: "res-3", title: "Math Forum", type: "forum", url: "https://mathforum.org/" }
    ],
    assignments: [
      { id: "assign-1", title: "Assignment 1", dueDate: "2024-03-15", status: "graded", grade: "A" },
      { id: "assign-2", title: "Midterm Exam", dueDate: "2024-04-20", status: "graded", grade: "B+" },
      { id: "assign-3", title: "Final Project", dueDate: "2024-05-10", status: "pending" }
    ]
  }

  const handleOpenMedia = (content: ContentItem) => {
    setMediaContent(content);
    setIsMediaViewerOpen(true);
  };

  const handleCloseMedia = () => {
    setIsMediaViewerOpen(false);
    setMediaContent(null);
  };

  const renderContentItem = (item: ContentItem) => {
    if (item.type === 'pdf-collection' && item.hasSubContent && item.subContent) {
      return (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={item.id}>
            <AccordionTrigger className="data-[state=open]:bg-secondary">{item.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-none pl-4 mt-2">
                {item.subContent.map(subItem => (
                  <li key={subItem.id} className="mb-2">
                    <Button
                      variant="ghost"
                      className="justify-start w-full hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleOpenMedia(subItem)}
                    >
                      {subItem.title} ({subItem.type})
                    </Button>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <Button
        variant="ghost"
        className="justify-start w-full hover:bg-accent hover:text-accent-foreground"
        onClick={() => handleOpenMedia(item)}
      >
        {item.title} ({item.type})
      </Button>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{subjectData.title}</CardTitle>
          <CardDescription>{subjectData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{subjectId}</Badge>
            <Badge variant="outline">Instructor: {subjectData.instructor.name}</Badge>
          </div>
        </CardContent>
      </Card>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        {subjectData.lmsContent.map((item: LMSContentItem) => (
          <Card key={item.id} className="mb-4">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={item.progress} className="mb-2" />
              <ul className="list-none pl-4">
                {item.content.map((contentItem: ContentItem) => (
                  <li key={contentItem.id} className="mb-2">
                    {renderContentItem(contentItem)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectData.resources.map(resource => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    View <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Assignments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjectData.assignments.map(assignment => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.grade || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <MediaViewer isOpen={isMediaViewerOpen} onClose={handleCloseMedia} content={mediaContent} />
    </div>
  );
};

export default SubjectPage;
