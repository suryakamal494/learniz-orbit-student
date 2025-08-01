
import type { Question } from '@/types/questionBank'

export const mockQuestions: Question[] = [
  {
    id: '1',
    content: {
      text: 'What is the capital of France?',
      html: '<p>What is the capital of France?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Geography',
    type: 'single',
    options: [
      { text: 'London', isCorrect: false },
      { text: 'Paris', isCorrect: true },
      { text: 'Berlin', isCorrect: false },
      { text: 'Rome', isCorrect: false }
    ],
    correctAnswer: 1,
    explanation: {
      text: 'Paris is the capital and largest city of France.',
      html: '<p>Paris is the capital and largest city of France.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    content: {
      text: 'Solve the equation: x² - 5x + 6 = 0',
      html: '<p>Solve the equation: x² - 5x + 6 = 0</p>',
      hasmath: true,
      images: []
    },
    subject: 'Mathematics',
    type: 'multiple',
    options: [
      { text: 'x = 2', isCorrect: true },
      { text: 'x = 3', isCorrect: true },
      { text: 'x = 1', isCorrect: false },
      { text: 'x = 4', isCorrect: false }
    ],
    correctAnswer: [0, 1],
    explanation: {
      text: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3',
      html: '<p>Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    content: {
      text: 'The process by which plants make their own food is called _____.',
      html: '<p>The process by which plants make their own food is called _____.</p>',
      hasmath: false,
      images: []
    },
    subject: 'Biology',
    type: 'fillInBlanks',
    options: [],
    correctAnswer: 0,
    explanation: {
      text: 'Photosynthesis is the process by which plants use sunlight to synthesize food.',
      html: '<p>Photosynthesis is the process by which plants use sunlight to synthesize food.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    content: {
      text: 'Which of the following are programming languages?',
      html: '<p>Which of the following are programming languages?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Computer Science',
    type: 'multiple',
    options: [
      { text: 'Python', isCorrect: true },
      { text: 'JavaScript', isCorrect: true },
      { text: 'HTML', isCorrect: false },
      { text: 'Java', isCorrect: true }
    ],
    correctAnswer: [0, 1, 3],
    explanation: {
      text: 'Python, JavaScript, and Java are programming languages. HTML is a markup language.',
      html: '<p>Python, JavaScript, and Java are programming languages. HTML is a markup language.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    content: {
      text: 'What is the derivative of sin(x)?',
      html: '<p>What is the derivative of sin(x)?</p>',
      hasmath: true,
      images: []
    },
    subject: 'Mathematics',
    type: 'single',
    options: [
      { text: 'cos(x)', isCorrect: true },
      { text: '-cos(x)', isCorrect: false },
      { text: 'sin(x)', isCorrect: false },
      { text: '-sin(x)', isCorrect: false }
    ],
    correctAnswer: 0,
    explanation: {
      text: 'The derivative of sin(x) is cos(x).',
      html: '<p>The derivative of sin(x) is cos(x).</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    content: {
      text: 'Who wrote the novel "Pride and Prejudice"?',
      html: '<p>Who wrote the novel "Pride and Prejudice"?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Literature',
    type: 'single',
    options: [
      { text: 'Charlotte Bronte', isCorrect: false },
      { text: 'Jane Austen', isCorrect: true },
      { text: 'Emily Dickinson', isCorrect: false },
      { text: 'Virginia Woolf', isCorrect: false }
    ],
    correctAnswer: 1,
    explanation: {
      text: 'Jane Austen wrote "Pride and Prejudice" in 1813.',
      html: '<p>Jane Austen wrote "Pride and Prejudice" in 1813.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    content: {
      text: 'Calculate the area of a circle with radius 5 units.',
      html: '<p>Calculate the area of a circle with radius 5 units.</p>',
      hasmath: true,
      images: []
    },
    subject: 'Mathematics',
    type: 'single',
    options: [
      { text: '25π', isCorrect: true },
      { text: '10π', isCorrect: false },
      { text: '5π', isCorrect: false },
      { text: '50π', isCorrect: false }
    ],
    correctAnswer: 0,
    explanation: {
      text: 'Area = πr² = π × 5² = 25π square units',
      html: '<p>Area = πr² = π × 5² = 25π square units</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    content: {
      text: 'Which elements are noble gases?',
      html: '<p>Which elements are noble gases?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Chemistry',
    type: 'multiple',
    options: [
      { text: 'Helium', isCorrect: true },
      { text: 'Neon', isCorrect: true },
      { text: 'Oxygen', isCorrect: false },
      { text: 'Argon', isCorrect: true }
    ],
    correctAnswer: [0, 1, 3],
    explanation: {
      text: 'Noble gases include Helium, Neon, Argon, Krypton, Xenon, and Radon.',
      html: '<p>Noble gases include Helium, Neon, Argon, Krypton, Xenon, and Radon.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    content: {
      text: 'The speed of light in vacuum is approximately _____ m/s.',
      html: '<p>The speed of light in vacuum is approximately _____ m/s.</p>',
      hasmath: false,
      images: []
    },
    subject: 'Physics',
    type: 'fillInBlanks',
    options: [],
    correctAnswer: 0,
    explanation: {
      text: 'The speed of light in vacuum is approximately 3 × 10⁸ m/s.',
      html: '<p>The speed of light in vacuum is approximately 3 × 10⁸ m/s.</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    content: {
      text: 'What is the largest planet in our solar system?',
      html: '<p>What is the largest planet in our solar system?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Astronomy',
    type: 'single',
    options: [
      { text: 'Saturn', isCorrect: false },
      { text: 'Jupiter', isCorrect: true },
      { text: 'Neptune', isCorrect: false },
      { text: 'Earth', isCorrect: false }
    ],
    correctAnswer: 1,
    explanation: {
      text: 'Jupiter is the largest planet in our solar system.',
      html: '<p>Jupiter is the largest planet in our solar system.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '11',
    content: {
      text: 'Solve for x: 2x + 8 = 20',
      html: '<p>Solve for x: 2x + 8 = 20</p>',
      hasmath: true,
      images: []
    },
    subject: 'Mathematics',
    type: 'single',
    options: [
      { text: 'x = 6', isCorrect: true },
      { text: 'x = 4', isCorrect: false },
      { text: 'x = 8', isCorrect: false },
      { text: 'x = 10', isCorrect: false }
    ],
    correctAnswer: 0,
    explanation: {
      text: '2x + 8 = 20, so 2x = 12, therefore x = 6',
      html: '<p>2x + 8 = 20, so 2x = 12, therefore x = 6</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    content: {
      text: 'Which of the following are characteristics of mammals?',
      html: '<p>Which of the following are characteristics of mammals?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Biology',
    type: 'multiple',
    options: [
      { text: 'Warm-blooded', isCorrect: true },
      { text: 'Have fur or hair', isCorrect: true },
      { text: 'Lay eggs', isCorrect: false },
      { text: 'Produce milk', isCorrect: true }
    ],
    correctAnswer: [0, 1, 3],
    explanation: {
      text: 'Mammals are warm-blooded, have fur or hair, and produce milk. Most mammals give birth to live young.',
      html: '<p>Mammals are warm-blooded, have fur or hair, and produce milk. Most mammals give birth to live young.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '13',
    content: {
      text: 'The chemical symbol for gold is _____.',
      html: '<p>The chemical symbol for gold is _____.</p>',
      hasmath: false,
      images: []
    },
    subject: 'Chemistry',
    type: 'fillInBlanks',
    options: [],
    correctAnswer: 0,
    explanation: {
      text: 'The chemical symbol for gold is Au, from the Latin word "aurum".',
      html: '<p>The chemical symbol for gold is Au, from the Latin word "aurum".</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '14',
    content: {
      text: 'What is the integral of x²?',
      html: '<p>What is the integral of x²?</p>',
      hasmath: true,
      images: []
    },
    subject: 'Mathematics',
    type: 'single',
    options: [
      { text: 'x³/3 + C', isCorrect: true },
      { text: 'x³ + C', isCorrect: false },
      { text: '2x + C', isCorrect: false },
      { text: 'x²/2 + C', isCorrect: false }
    ],
    correctAnswer: 0,
    explanation: {
      text: 'The integral of x² is x³/3 + C, where C is the constant of integration.',
      html: '<p>The integral of x² is x³/3 + C, where C is the constant of integration.</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '15',
    content: {
      text: 'Which countries are part of the United Kingdom?',
      html: '<p>Which countries are part of the United Kingdom?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Geography',
    type: 'multiple',
    options: [
      { text: 'England', isCorrect: true },
      { text: 'Scotland', isCorrect: true },
      { text: 'Ireland', isCorrect: false },
      { text: 'Wales', isCorrect: true }
    ],
    correctAnswer: [0, 1, 3],
    explanation: {
      text: 'The United Kingdom consists of England, Scotland, Wales, and Northern Ireland.',
      html: '<p>The United Kingdom consists of England, Scotland, Wales, and Northern Ireland.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '16',
    content: {
      text: 'Newton\'s second law states that F = _____.',
      html: '<p>Newton\'s second law states that F = _____.</p>',
      hasmath: true,
      images: []
    },
    subject: 'Physics',
    type: 'fillInBlanks',
    options: [],
    correctAnswer: 0,
    explanation: {
      text: 'Newton\'s second law states that F = ma, where F is force, m is mass, and a is acceleration.',
      html: '<p>Newton\'s second law states that F = ma, where F is force, m is mass, and a is acceleration.</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '17',
    content: {
      text: 'What is the longest river in the world?',
      html: '<p>What is the longest river in the world?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Geography',
    type: 'single',
    options: [
      { text: 'Amazon River', isCorrect: false },
      { text: 'Nile River', isCorrect: true },
      { text: 'Mississippi River', isCorrect: false },
      { text: 'Yangtze River', isCorrect: false }
    ],
    correctAnswer: 1,
    explanation: {
      text: 'The Nile River is the longest river in the world at approximately 6,650 kilometers.',
      html: '<p>The Nile River is the longest river in the world at approximately 6,650 kilometers.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '18',
    content: {
      text: 'Which data structures use LIFO (Last In, First Out) principle?',
      html: '<p>Which data structures use LIFO (Last In, First Out) principle?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Computer Science',
    type: 'multiple',
    options: [
      { text: 'Stack', isCorrect: true },
      { text: 'Queue', isCorrect: false },
      { text: 'Linked List', isCorrect: false },
      { text: 'Call Stack', isCorrect: true }
    ],
    correctAnswer: [0, 3],
    explanation: {
      text: 'Stack and Call Stack both use LIFO principle. Queue uses FIFO (First In, First Out).',
      html: '<p>Stack and Call Stack both use LIFO principle. Queue uses FIFO (First In, First Out).</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '19',
    content: {
      text: 'The powerhouse of the cell is the _____.',
      html: '<p>The powerhouse of the cell is the _____.</p>',
      hasmath: false,
      images: []
    },
    subject: 'Biology',
    type: 'fillInBlanks',
    options: [],
    correctAnswer: 0,
    explanation: {
      text: 'The mitochondria is known as the powerhouse of the cell because it produces ATP.',
      html: '<p>The mitochondria is known as the powerhouse of the cell because it produces ATP.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '20',
    content: {
      text: 'Calculate the quadratic formula for ax² + bx + c = 0',
      html: '<p>Calculate the quadratic formula for ax² + bx + c = 0</p>',
      hasmath: true,
      images: []
    },
    subject: 'Mathematics',
    type: 'single',
    options: [
      { text: 'x = (-b ± √(b²-4ac)) / 2a', isCorrect: true },
      { text: 'x = (-b ± √(b²+4ac)) / 2a', isCorrect: false },
      { text: 'x = (b ± √(b²-4ac)) / 2a', isCorrect: false },
      { text: 'x = (-b ± √(b²-4ac)) / a', isCorrect: false }
    ],
    correctAnswer: 0,
    explanation: {
      text: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a',
      html: '<p>The quadratic formula is x = (-b ± √(b²-4ac)) / 2a</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'hard',
    marks: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '21',
    content: {
      text: 'Which of the following are benefits of renewable energy?',
      html: '<p>Which of the following are benefits of renewable energy?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Environmental Science',
    type: 'multiple',
    options: [
      { text: 'Reduces carbon emissions', isCorrect: true },
      { text: 'Sustainable long-term', isCorrect: true },
      { text: 'Increases pollution', isCorrect: false },
      { text: 'Cost-effective over time', isCorrect: true }
    ],
    correctAnswer: [0, 1, 3],
    explanation: {
      text: 'Renewable energy reduces carbon emissions, is sustainable long-term, and becomes cost-effective over time.',
      html: '<p>Renewable energy reduces carbon emissions, is sustainable long-term, and becomes cost-effective over time.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '22',
    content: {
      text: 'The formula for calculating compound interest is _____.',
      html: '<p>The formula for calculating compound interest is _____.</p>',
      hasmath: true,
      images: []
    },
    subject: 'Mathematics',
    type: 'fillInBlanks',
    options: [],
    correctAnswer: 0,
    explanation: {
      text: 'The compound interest formula is A = P(1 + r/n)^(nt), where A is final amount, P is principal, r is annual interest rate, n is number of times interest is compounded per year, and t is time in years.',
      html: '<p>The compound interest formula is A = P(1 + r/n)^(nt)</p>',
      hasmath: true,
      images: []
    },
    difficulty: 'hard',
    marks: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '23',
    content: {
      text: 'What is the pH value of pure water at 25°C?',
      html: '<p>What is the pH value of pure water at 25°C?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Chemistry',
    type: 'single',
    options: [
      { text: '6', isCorrect: false },
      { text: '7', isCorrect: true },
      { text: '8', isCorrect: false },
      { text: '14', isCorrect: false }
    ],
    correctAnswer: 1,
    explanation: {
      text: 'Pure water has a pH of 7 at 25°C, which is neutral on the pH scale.',
      html: '<p>Pure water has a pH of 7 at 25°C, which is neutral on the pH scale.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'easy',
    marks: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '24',
    content: {
      text: 'Which programming paradigms are supported by Python?',
      html: '<p>Which programming paradigms are supported by Python?</p>',
      hasmath: false,
      images: []
    },
    subject: 'Computer Science',
    type: 'multiple',
    options: [
      { text: 'Object-oriented', isCorrect: true },
      { text: 'Functional', isCorrect: true },
      { text: 'Procedural', isCorrect: true },
      { text: 'Assembly', isCorrect: false }
    ],
    correctAnswer: [0, 1, 2],
    explanation: {
      text: 'Python supports object-oriented, functional, and procedural programming paradigms.',
      html: '<p>Python supports object-oriented, functional, and procedural programming paradigms.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '25',
    content: {
      text: 'The study of earthquakes is called _____.',
      html: '<p>The study of earthquakes is called _____.</p>',
      hasmath: false,
      images: []
    },
    subject: 'Geology',
    type: 'fillInBlanks',
    options: [],
    correctAnswer: 0,
    explanation: {
      text: 'Seismology is the scientific study of earthquakes and the propagation of elastic waves through the Earth.',
      html: '<p>Seismology is the scientific study of earthquakes and the propagation of elastic waves through the Earth.</p>',
      hasmath: false,
      images: []
    },
    difficulty: 'medium',
    marks: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]
