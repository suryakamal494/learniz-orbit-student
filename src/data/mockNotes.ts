
import type { NotesData } from '@/types/notes'

export const mockNotesData: NotesData = {
  subjectId: "1",
  subjectName: "Mathematics",
  chapters: [
    {
      id: "chapter-1",
      title: "Introduction to Calculus",
      description: "Basic concepts and definitions",
      notes: [
        {
          id: "note-1-1",
          title: "Calculus Fundamentals",
          fileName: "calculus_fundamentals.pdf",
          fileUrl: "https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf",
          fileSize: "2.3 MB",
          uploadedAt: "2024-01-15",
          fileType: "pdf"
        },
        {
          id: "note-1-2", 
          title: "Limits and Continuity Notes",
          fileName: "limits_continuity.pdf",
          fileUrl: "https://www.whitman.edu/mathematics/calculus_online/section03.01.html",
          fileSize: "1.8 MB",
          uploadedAt: "2024-01-16",
          fileType: "pdf"
        },
        {
          id: "note-1-3",
          title: "Derivative Rules Summary",
          fileName: "derivative_rules.docx",
          fileUrl: "#",
          fileSize: "456 KB",
          uploadedAt: "2024-01-17",
          fileType: "docx"
        }
      ]
    },
    {
      id: "chapter-2",
      title: "Limits and Continuity",
      description: "Understanding limits and continuous functions",
      notes: [
        {
          id: "note-2-1",
          title: "Limit Properties",
          fileName: "limit_properties.pdf",
          fileUrl: "#",
          fileSize: "1.2 MB",
          uploadedAt: "2024-01-20",
          fileType: "pdf"
        },
        {
          id: "note-2-2",
          title: "Continuity Examples",
          fileName: "continuity_examples.pptx",
          fileUrl: "#",
          fileSize: "3.1 MB", 
          uploadedAt: "2024-01-22",
          fileType: "pptx"
        }
      ]
    },
    {
      id: "chapter-3",
      title: "Derivatives",
      description: "Introduction to derivatives and applications",
      notes: [
        {
          id: "note-3-1",
          title: "Derivative Introduction",
          fileName: "derivatives_intro.pdf",
          fileUrl: "#",
          fileSize: "2.8 MB",
          uploadedAt: "2024-01-25",
          fileType: "pdf"
        },
        {
          id: "note-3-2",
          title: "Chain Rule Examples",
          fileName: "chain_rule.doc",
          fileUrl: "#",
          fileSize: "892 KB",
          uploadedAt: "2024-01-28",
          fileType: "doc"
        },
        {
          id: "note-3-3",
          title: "Applications of Derivatives",
          fileName: "derivative_applications.pdf",
          fileUrl: "#", 
          fileSize: "4.2 MB",
          uploadedAt: "2024-01-30",
          fileType: "pdf"
        }
      ]
    }
  ]
}
