
import type { Question } from '@/types/questionBank'

export const mockQuestions: Question[] = [
  {
    id: '1',
    questionContent: {
      text: 'What is the molecular formula of water?',
      html: '<p>What is the molecular formula of water?</p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'H2O', html: '<p>H2O</p>', hasmath: false, images: [] },
      { text: 'CO2', html: '<p>CO2</p>', hasmath: false, images: [] },
      { text: 'NaCl', html: '<p>NaCl</p>', hasmath: false, images: [] },
      { text: 'CH4', html: '<p>CH4</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Water is composed of two hydrogen atoms and one oxygen atom, hence H2O.',
      html: '<p>Water is composed of two hydrogen atoms and one oxygen atom, hence H2O.</p>',
      hasmath: false,
      images: []
    },
    hint: 'Think about the atoms that make up water',
    marks: 2,
    difficulty: 'easy',
    category: 'Chemistry',
    chapter: 'Basic Chemistry',
    topic: 'Molecular Formulas',
    hasImage: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    questionContent: {
      text: 'Solve for x: 2x + 5 = 15',
      html: '<p>Solve for x: <span class="math">2x + 5 = 15</span></p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: '5', html: '<p>5</p>', hasmath: false, images: [] },
      { text: '10', html: '<p>10</p>', hasmath: false, images: [] },
      { text: '7.5', html: '<p>7.5</p>', hasmath: false, images: [] },
      { text: '2.5', html: '<p>2.5</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: '2x + 5 = 15, so 2x = 10, therefore x = 5',
      html: '<p><span class="math">2x + 5 = 15</span><br><span class="math">2x = 10</span><br><span class="math">x = 5</span></p>',
      hasmath: true,
      images: []
    },
    hint: 'Isolate x by subtracting 5 from both sides first',
    marks: 3,
    difficulty: 'medium',
    category: 'Mathematics',
    chapter: 'Algebra',
    topic: 'Linear Equations',
    hasImage: false,
    createdAt: '2024-01-15T11:15:00Z'
  },
  {
    id: '3',
    questionContent: {
      text: 'What is the process by which plants make their own food using sunlight?',
      html: '<p>What is the process by which plants make their own food using sunlight?</p>',
      hasmath: false,
      images: ['plant-diagram.jpg']
    },
    type: 'single',
    options: [
      { text: 'Respiration', html: '<p>Respiration</p>', hasmath: false, images: [] },
      { text: 'Photosynthesis', html: '<p>Photosynthesis</p>', hasmath: false, images: [] },
      { text: 'Transpiration', html: '<p>Transpiration</p>', hasmath: false, images: [] },
      { text: 'Digestion', html: '<p>Digestion</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 1,
    explanationContent: {
      text: 'Photosynthesis is the process where plants convert light energy into chemical energy (glucose) using chlorophyll.',
      html: '<p>Photosynthesis is the process where plants convert light energy into chemical energy (glucose) using chlorophyll.</p>',
      hasmath: false,
      images: ['photosynthesis-process.jpg']
    },
    hint: 'This process requires sunlight, carbon dioxide, and water',
    marks: 2,
    difficulty: 'easy',
    category: 'Biology',
    chapter: 'Plant Biology',
    topic: 'Photosynthesis',
    hasImage: true,
    createdAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '4',
    questionContent: {
      text: 'Which of the following elements are noble gases? (Select all that apply)',
      html: '<p>Which of the following elements are noble gases? <em>(Select all that apply)</em></p>',
      hasmath: false,
      images: []
    },
    type: 'multiple',
    options: [
      { text: 'Helium (He)', html: '<p>Helium (He)</p>', hasmath: false, images: [] },
      { text: 'Nitrogen (N)', html: '<p>Nitrogen (N)</p>', hasmath: false, images: [] },
      { text: 'Argon (Ar)', html: '<p>Argon (Ar)</p>', hasmath: false, images: [] },
      { text: 'Neon (Ne)', html: '<p>Neon (Ne)</p>', hasmath: false, images: [] }
    ],
    correctAnswer: [0, 2, 3],
    explanationContent: {
      text: 'Noble gases are Helium, Neon, Argon, Krypton, Xenon, and Radon. They are chemically inert under normal conditions.',
      html: '<p>Noble gases are Helium, Neon, Argon, Krypton, Xenon, and Radon. They are chemically inert under normal conditions.</p>',
      hasmath: false,
      images: []
    },
    hint: 'Noble gases are in Group 18 of the periodic table',
    marks: 4,
    difficulty: 'medium',
    category: 'Chemistry',
    chapter: 'Periodic Table',
    topic: 'Noble Gases',
    hasImage: false,
    createdAt: '2024-01-15T13:30:00Z'
  },
  {
    id: '5',
    questionContent: {
      text: 'Calculate the area of a circle with radius 7 cm. Use π = 22/7',
      html: '<p>Calculate the area of a circle with radius 7 cm. Use <span class="math">π = 22/7</span></p>',
      hasmath: true,
      images: ['circle-diagram.png']
    },
    type: 'single',
    options: [
      { text: '154 cm²', html: '<p>154 cm²</p>', hasmath: false, images: [] },
      { text: '44 cm²', html: '<p>44 cm²</p>', hasmath: false, images: [] },
      { text: '22 cm²', html: '<p>22 cm²</p>', hasmath: false, images: [] },
      { text: '77 cm²', html: '<p>77 cm²</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Area = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm²',
      html: '<p>Area = <span class="math">πr²</span> = <span class="math">(22/7) × 7²</span> = <span class="math">(22/7) × 49</span> = <span class="math">22 × 7 = 154 cm²</span></p>',
      hasmath: true,
      images: []
    },
    hint: 'Use the formula A = πr²',
    marks: 3,
    difficulty: 'medium',
    category: 'Mathematics',
    chapter: 'Geometry',
    topic: 'Area and Perimeter',
    hasImage: true,
    createdAt: '2024-01-15T14:15:00Z'
  },
  {
    id: '6',
    questionContent: {
      text: 'What is the capital city of Australia?',
      html: '<p>What is the capital city of Australia?</p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Sydney', html: '<p>Sydney</p>', hasmath: false, images: [] },
      { text: 'Melbourne', html: '<p>Melbourne</p>', hasmath: false, images: [] },
      { text: 'Canberra', html: '<p>Canberra</p>', hasmath: false, images: [] },
      { text: 'Perth', html: '<p>Perth</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 2,
    explanationContent: {
      text: 'Canberra is the capital city of Australia, located in the Australian Capital Territory.',
      html: '<p>Canberra is the capital city of Australia, located in the Australian Capital Territory.</p>',
      hasmath: false,
      images: []
    },
    hint: 'It\'s not the largest city',
    marks: 1,
    difficulty: 'easy',
    category: 'Geography',
    chapter: 'World Capitals',
    topic: 'Australia and Oceania',
    hasImage: false,
    createdAt: '2024-01-15T15:00:00Z'
  },
  {
    id: '7',
    questionContent: {
      text: 'Fill in the blank: The mitochondria is known as the ______ of the cell.',
      html: '<p>Fill in the blank: The mitochondria is known as the ______ of the cell.</p>',
      hasmath: false,
      images: ['cell-diagram.jpg']
    },
    type: 'fillInBlanks',
    options: [
      { text: 'powerhouse', html: '<p>powerhouse</p>', hasmath: false, images: [] },
      { text: 'nucleus', html: '<p>nucleus</p>', hasmath: false, images: [] },
      { text: 'membrane', html: '<p>membrane</p>', hasmath: false, images: [] },
      { text: 'ribosome', html: '<p>ribosome</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Mitochondria are called the powerhouse of the cell because they produce ATP, which provides energy for cellular processes.',
      html: '<p>Mitochondria are called the powerhouse of the cell because they produce ATP, which provides energy for cellular processes.</p>',
      hasmath: false,
      images: []
    },
    hint: 'Think about energy production',
    marks: 2,
    difficulty: 'easy',
    category: 'Biology',
    chapter: 'Cell Biology',
    topic: 'Cell Organelles',
    hasImage: true,
    createdAt: '2024-01-15T16:45:00Z'
  },
  {
    id: '8',
    questionContent: {
      text: 'Solve the quadratic equation: x² - 5x + 6 = 0',
      html: '<p>Solve the quadratic equation: <span class="math">x² - 5x + 6 = 0</span></p>',
      hasmath: true,
      images: []
    },
    type: 'multiple',
    options: [
      { text: 'x = 2', html: '<p>x = 2</p>', hasmath: false, images: [] },
      { text: 'x = 3', html: '<p>x = 3</p>', hasmath: false, images: [] },
      { text: 'x = 1', html: '<p>x = 1</p>', hasmath: false, images: [] },
      { text: 'x = 6', html: '<p>x = 6</p>', hasmath: false, images: [] }
    ],
    correctAnswer: [0, 1],
    explanationContent: {
      text: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3',
      html: '<p>Factoring: <span class="math">(x-2)(x-3) = 0</span><br>So <span class="math">x = 2</span> or <span class="math">x = 3</span></p>',
      hasmath: true,
      images: []
    },
    hint: 'Try factoring the quadratic expression',
    marks: 4,
    difficulty: 'hard',
    category: 'Mathematics',
    chapter: 'Algebra',
    topic: 'Quadratic Equations',
    hasImage: false,
    createdAt: '2024-01-15T17:30:00Z'
  },
  {
    id: '9',
    questionContent: {
      text: 'Which of the following best describes the function of the heart?',
      html: '<p>Which of the following best describes the function of the heart?</p>',
      hasmath: false,
      images: ['heart-anatomy.png']
    },
    type: 'single',
    options: [
      { text: 'To filter blood', html: '<p>To filter blood</p>', hasmath: false, images: [] },
      { text: 'To pump blood throughout the body', html: '<p>To pump blood throughout the body</p>', hasmath: false, images: [] },
      { text: 'To produce red blood cells', html: '<p>To produce red blood cells</p>', hasmath: false, images: [] },
      { text: 'To store oxygen', html: '<p>To store oxygen</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 1,
    explanationContent: {
      text: 'The heart is a muscular organ that pumps blood throughout the circulatory system, delivering oxygen and nutrients to tissues.',
      html: '<p>The heart is a muscular organ that pumps blood throughout the circulatory system, delivering oxygen and nutrients to tissues.</p>',
      hasmath: false,
      images: []
    },
    hint: 'Think about circulation',
    marks: 2,
    difficulty: 'easy',
    category: 'Biology',
    chapter: 'Human Anatomy',
    topic: 'Circulatory System',
    hasImage: true,
    createdAt: '2024-01-15T18:00:00Z'
  },
  {
    id: '10',
    questionContent: {
      text: 'What is the derivative of f(x) = 3x² + 2x - 1?',
      html: '<p>What is the derivative of <span class="math">f(x) = 3x² + 2x - 1</span>?</p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: '6x + 2', html: '<p><span class="math">6x + 2</span></p>', hasmath: true, images: [] },
      { text: '3x + 2', html: '<p><span class="math">3x + 2</span></p>', hasmath: true, images: [] },
      { text: '6x - 1', html: '<p><span class="math">6x - 1</span></p>', hasmath: true, images: [] },
      { text: '3x² + 2', html: '<p><span class="math">3x² + 2</span></p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Using power rule: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(-1) = 0. So f\'(x) = 6x + 2',
      html: '<p>Using power rule:<br><span class="math">d/dx(3x²) = 6x</span><br><span class="math">d/dx(2x) = 2</span><br><span class="math">d/dx(-1) = 0</span><br>So <span class="math">f\'(x) = 6x + 2</span></p>',
      hasmath: true,
      images: []
    },
    hint: 'Use the power rule for differentiation',
    marks: 3,
    difficulty: 'medium',
    category: 'Mathematics',
    chapter: 'Calculus',
    topic: 'Differentiation',
    hasImage: false,
    createdAt: '2024-01-16T09:00:00Z'
  }
]
