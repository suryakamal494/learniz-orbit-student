
import type { QuestionBankSubject, Question } from '@/types/questionBank'

export const mockQuestionBankSubjects: QuestionBankSubject[] = [
  {
    id: '1',
    institute: 'Science Academy',
    subject: 'Physics',
    code: 'PHY101',
    questionCount: 245,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    institute: 'Mathematics Institute',
    subject: 'Calculus',
    code: 'MATH201',
    questionCount: 189,
    lastUpdated: '2024-01-12'
  },
  {
    id: '3',
    institute: 'Chemistry Lab',
    subject: 'Organic Chemistry',
    code: 'CHEM301',
    questionCount: 156,
    lastUpdated: '2024-01-10'
  },
  {
    id: '4',
    institute: 'Biology Department',
    subject: 'Cell Biology',
    code: 'BIO201',
    questionCount: 203,
    lastUpdated: '2024-01-08'
  }
]

export const mockQuestions: Question[] = [
  {
    id: '1',
    questionContent: {
      text: 'What is the speed of light in vacuum?',
      html: '<p>What is the speed of light in vacuum?</p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: '299,792,458 m/s', html: '<p>299,792,458 m/s</p>', hasmath: false, images: [] },
      { text: '300,000,000 m/s', html: '<p>300,000,000 m/s</p>', hasmath: false, images: [] },
      { text: '186,282 miles/s', html: '<p>186,282 miles/s</p>', hasmath: false, images: [] },
      { text: '3 × 10^8 m/s', html: '<p>3 × 10<sup>8</sup> m/s</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'The speed of light in vacuum is exactly 299,792,458 meters per second, which is a fundamental physical constant.',
      html: '<p>The speed of light in vacuum is exactly <strong>299,792,458 meters per second</strong>, which is a fundamental physical constant.</p>',
      hasmath: false,
      images: []
    },
    hint: 'Think about fundamental physical constants',
    marks: 2,
    difficulty: 'medium',
    category: 'Physics Constants',
    chapter: 'Wave Optics',
    topic: 'Light Properties',
    hasImage: false,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    questionContent: {
      text: 'Evaluate the following limit: lim(x→0) [∫₀ˣ sin(t²)dt] / x³',
      html: '<p>Evaluate the following limit:</p><p class="ql-formula" data-value="\\lim_{x \\to 0} \\frac{\\int_0^x \\sin(t^2)\\,dt}{x^3}">$$\\lim_{x \\to 0} \\frac{\\int_0^x \\sin(t^2)\\,dt}{x^3}$$</p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: '0', html: '<p>0</p>', hasmath: false, images: [] },
      { text: '1/3', html: '<p class="ql-formula" data-value="\\frac{1}{3}">$$\\frac{1}{3}$$</p>', hasmath: true, images: [] },
      { text: '1', html: '<p>1</p>', hasmath: false, images: [] },
      { text: 'Does not exist', html: '<p>Does not exist</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 1,
    explanationContent: {
      text: 'Using L\'Hôpital\'s rule twice and expanding sin(t²) as a power series, we get 1/3.',
      html: '<p>Using <strong>L\'Hôpital\'s rule</strong> twice and expanding sin(t²) as a power series:</p><p class="ql-formula" data-value="\\sin(t^2) = t^2 - \\frac{t^6}{6} + O(t^{10})">$$\\sin(t^2) = t^2 - \\frac{t^6}{6} + O(t^{10})$$</p><p>Therefore, the limit evaluates to <strong>1/3</strong>.</p>',
      hasmath: true,
      images: []
    },
    marks: 4,
    difficulty: 'hard',
    category: 'Calculus',
    chapter: 'Limits and Continuity',
    topic: 'Advanced Limits',
    hasImage: false,
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    questionContent: {
      text: 'A uniform rod of length L and mass M is pivoted at one end. Find the moment of inertia about the pivot point.',
      html: '<p>A uniform rod of length <strong>L</strong> and mass <strong>M</strong> is pivoted at one end. Find the moment of inertia about the pivot point.</p><p><em>Consider the rod as a continuous distribution of mass.</em></p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'ML²/3', html: '<p class="ql-formula" data-value="\\frac{ML^2}{3}">$$\\frac{ML^2}{3}$$</p>', hasmath: true, images: [] },
      { text: 'ML²/12', html: '<p class="ql-formula" data-value="\\frac{ML^2}{12}">$$\\frac{ML^2}{12}$$</p>', hasmath: true, images: [] },
      { text: 'ML²/2', html: '<p class="ql-formula" data-value="\\frac{ML^2}{2}">$$\\frac{ML^2}{2}$$</p>', hasmath: true, images: [] },
      { text: 'ML²', html: '<p class="ql-formula" data-value="ML^2">$$ML^2$$</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'For a uniform rod pivoted at one end, I = ∫₀ᴸ (M/L)x² dx = ML²/3',
      html: '<p>For a uniform rod pivoted at one end:</p><p class="ql-formula" data-value="I = \\int_0^L \\frac{M}{L}x^2 \\, dx = \\frac{M}{L} \\cdot \\frac{L^3}{3} = \\frac{ML^2}{3}">$$I = \\int_0^L \\frac{M}{L}x^2 \\, dx = \\frac{M}{L} \\cdot \\frac{L^3}{3} = \\frac{ML^2}{3}$$</p>',
      hasmath: true,
      images: []
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Mechanics',
    chapter: 'Rotational Motion',
    topic: 'Moment of Inertia',
    hasImage: false,
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    questionContent: {
      text: 'In a galvanic cell, which electrode undergoes oxidation and which undergoes reduction? Explain the electron flow direction.',
      html: '<p>In a <strong>galvanic cell</strong>, which electrode undergoes <em>oxidation</em> and which undergoes <em>reduction</em>? Explain the electron flow direction.</p><p><u>Consider the following points:</u></p><ul><li>Electrode polarity</li><li>Electron movement</li><li>Ion movement in solution</li></ul>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Anode: oxidation, Cathode: reduction, electrons flow from anode to cathode', html: '<p><strong>Anode:</strong> oxidation<br><strong>Cathode:</strong> reduction<br>Electrons flow from anode to cathode</p>', hasmath: false, images: [] },
      { text: 'Anode: reduction, Cathode: oxidation, electrons flow from cathode to anode', html: '<p><strong>Anode:</strong> reduction<br><strong>Cathode:</strong> oxidation<br>Electrons flow from cathode to anode</p>', hasmath: false, images: [] },
      { text: 'Both electrodes undergo oxidation simultaneously', html: '<p>Both electrodes undergo oxidation simultaneously</p>', hasmath: false, images: [] },
      { text: 'Both electrodes undergo reduction simultaneously', html: '<p>Both electrodes undergo reduction simultaneously</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'In a galvanic cell, the anode is where oxidation occurs (loss of electrons), and the cathode is where reduction occurs (gain of electrons). Electrons flow from the anode to the cathode through the external circuit.',
      html: '<p>In a galvanic cell:</p><ul><li><strong>Anode:</strong> site of oxidation (loss of electrons) - negative terminal</li><li><strong>Cathode:</strong> site of reduction (gain of electrons) - positive terminal</li><li><strong>Electron flow:</strong> from anode to cathode through external circuit</li><li><strong>Current flow:</strong> opposite to electron flow (cathode to anode)</li></ul>',
      hasmath: false,
      images: []
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Electrochemistry',
    chapter: 'Galvanic Cells',
    topic: 'Cell Components',
    hasImage: false,
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    questionContent: {
      text: 'Find the eigenvalues and eigenvectors of the matrix A = [[3, 1], [0, 2]]',
      html: '<p>Find the eigenvalues and eigenvectors of the matrix:</p><p class="ql-formula" data-value="A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}">$$A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$$</p>',
      hasmath: true,
      images: []
    },
    type: 'multiple',
    options: [
      { text: 'λ₁ = 3, v₁ = [1, 0]', html: '<p class="ql-formula" data-value="\\lambda_1 = 3, \\quad \\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}">$$\\lambda_1 = 3, \\quad \\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$$</p>', hasmath: true, images: [] },
      { text: 'λ₂ = 2, v₂ = [1, -1]', html: '<p class="ql-formula" data-value="\\lambda_2 = 2, \\quad \\mathbf{v}_2 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}">$$\\lambda_2 = 2, \\quad \\mathbf{v}_2 = \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}$$</p>', hasmath: true, images: [] },
      { text: 'λ₃ = 1, v₃ = [0, 1]', html: '<p class="ql-formula" data-value="\\lambda_3 = 1, \\quad \\mathbf{v}_3 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}">$$\\lambda_3 = 1, \\quad \\mathbf{v}_3 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$$</p>', hasmath: true, images: [] },
      { text: 'λ₄ = 0, v₄ = [1, 1]', html: '<p class="ql-formula" data-value="\\lambda_4 = 0, \\quad \\mathbf{v}_4 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}">$$\\lambda_4 = 0, \\quad \\mathbf{v}_4 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}$$</p>', hasmath: true, images: [] }
    ],
    correctAnswer: [0, 1],
    explanationContent: {
      text: 'For upper triangular matrices, eigenvalues are diagonal elements. λ₁ = 3 with eigenvector [1, 0], λ₂ = 2 with eigenvector [1, -1].',
      html: '<p>For upper triangular matrices, eigenvalues are the diagonal elements:</p><p class="ql-formula" data-value="\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) = 0">$$\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) = 0$$</p><p>Therefore: <strong>λ₁ = 3</strong> and <strong>λ₂ = 2</strong></p><p>Eigenvectors are found by solving <strong>(A - λI)v = 0</strong></p>',
      hasmath: true,
      images: []
    },
    marks: 4,
    difficulty: 'hard',
    category: 'Linear Algebra',
    chapter: 'Eigenvalues and Eigenvectors',
    topic: 'Matrix Diagonalization',
    hasImage: false,
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    questionContent: {
      text: 'A projectile is launched from the ground at an angle θ with initial velocity v₀. Calculate the maximum height reached and the range of the projectile. Assume no air resistance and gravitational acceleration g.',
      html: '<p>A projectile is launched from the ground at an angle <strong>θ</strong> with initial velocity <strong>v₀</strong>. Calculate the maximum height reached and the range of the projectile.</p><p><em>Given:</em></p><ul><li>No air resistance</li><li>Gravitational acceleration: <strong>g</strong></li><li>Launch point: ground level</li></ul><p><em>Find expressions for both maximum height and horizontal range.</em></p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Height: v₀²sin²θ/2g, Range: v₀²sin(2θ)/g', html: '<p><strong>Height:</strong> <span class="ql-formula" data-value="\\frac{v_0^2\\sin^2\\theta}{2g}">$$\\frac{v_0^2\\sin^2\\theta}{2g}$$</span></p><p><strong>Range:</strong> <span class="ql-formula" data-value="\\frac{v_0^2\\sin(2\\theta)}{g}">$$\\frac{v_0^2\\sin(2\\theta)}{g}$$</span></p>', hasmath: true, images: [] },
      { text: 'Height: v₀²cosθ/2g, Range: v₀²sinθ/g', html: '<p><strong>Height:</strong> <span class="ql-formula" data-value="\\frac{v_0^2\\cos\\theta}{2g}">$$\\frac{v_0^2\\cos\\theta}{2g}$$</span></p><p><strong>Range:</strong> <span class="ql-formula" data-value="\\frac{v_0^2\\sin\\theta}{g}">$$\\frac{v_0^2\\sin\\theta}{g}$$</span></p>', hasmath: true, images: [] },
      { text: 'Height: v₀sinθ/g, Range: v₀cosθ/g', html: '<p><strong>Height:</strong> <span class="ql-formula" data-value="\\frac{v_0\\sin\\theta}{g}">$$\\frac{v_0\\sin\\theta}{g}$$</span></p><p><strong>Range:</strong> <span class="ql-formula" data-value="\\frac{v_0\\cos\\theta}{g}">$$\\frac{v_0\\cos\\theta}{g}$$</span></p>', hasmath: true, images: [] },
      { text: 'Height: v₀²/2g, Range: v₀²/g', html: '<p><strong>Height:</strong> <span class="ql-formula" data-value="\\frac{v_0^2}{2g}">$$\\frac{v_0^2}{2g}$$</span></p><p><strong>Range:</strong> <span class="ql-formula" data-value="\\frac{v_0^2}{g}">$$\\frac{v_0^2}{g}$$</span></p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'For projectile motion, decompose initial velocity into components. Maximum height occurs when vertical velocity is zero, range when projectile returns to ground level.',
      html: '<p><strong>Maximum Height Derivation:</strong></p><p>At maximum height, vertical velocity = 0:</p><p class="ql-formula" data-value="v_y = v_0\\sin\\theta - gt = 0 \\Rightarrow t = \\frac{v_0\\sin\\theta}{g}">$$v_y = v_0\\sin\\theta - gt = 0 \\Rightarrow t = \\frac{v_0\\sin\\theta}{g}$$</p><p class="ql-formula" data-value="h_{max} = v_0\\sin\\theta \\cdot t - \\frac{1}{2}gt^2 = \\frac{v_0^2\\sin^2\\theta}{2g}">$$h_{max} = v_0\\sin\\theta \\cdot t - \\frac{1}{2}gt^2 = \\frac{v_0^2\\sin^2\\theta}{2g}$$</p><p><strong>Range Derivation:</strong></p><p>Time of flight: <span class="ql-formula" data-value="T = \\frac{2v_0\\sin\\theta}{g}">$$T = \\frac{2v_0\\sin\\theta}{g}$$</span></p><p class="ql-formula" data-value="R = v_0\\cos\\theta \\cdot T = \\frac{v_0^2\\sin(2\\theta)}{g}">$$R = v_0\\cos\\theta \\cdot T = \\frac{v_0^2\\sin(2\\theta)}{g}$$</p>',
      hasmath: true,
      images: []
    },
    marks: 5,
    difficulty: 'hard',
    category: 'Mechanics',
    chapter: 'Projectile Motion',
    topic: 'Trajectory Analysis',
    hasImage: false,
    createdAt: '2024-01-10'
  },
  {
    id: '7',
    questionContent: {
      text: 'What is the primary function of mitochondria in eukaryotic cells?',
      html: '<p>What is the <strong>primary function</strong> of mitochondria in eukaryotic cells?</p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'ATP synthesis through cellular respiration', html: '<p>ATP synthesis through cellular respiration</p>', hasmath: false, images: [] },
      { text: 'Protein synthesis', html: '<p>Protein synthesis</p>', hasmath: false, images: [] },
      { text: 'DNA replication', html: '<p>DNA replication</p>', hasmath: false, images: [] },
      { text: 'Waste elimination', html: '<p>Waste elimination</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Mitochondria are the powerhouses of the cell, responsible for ATP production through cellular respiration.',
      html: '<p>Mitochondria are known as the <strong>"powerhouses of the cell"</strong> because they:</p><ul><li>Generate ATP through <em>cellular respiration</em></li><li>Contain the electron transport chain</li><li>House the citric acid cycle</li><li>Have their own DNA and ribosomes</li></ul>',
      hasmath: false,
      images: []
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Cell Biology',
    chapter: 'Cell Organelles',
    topic: 'Mitochondria',
    hasImage: false,
    createdAt: '2024-01-09'
  },
  {
    id: '8',
    questionContent: {
      text: 'Solve the differential equation: dy/dx + 2y = 3e^x with initial condition y(0) = 1',
      html: '<p>Solve the differential equation:</p><p class="ql-formula" data-value="\\frac{dy}{dx} + 2y = 3e^x">$$\\frac{dy}{dx} + 2y = 3e^x$$</p><p>with initial condition <strong>y(0) = 1</strong></p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: 'y = e^x + 2e^(-2x)', html: '<p class="ql-formula" data-value="y = e^x + 2e^{-2x}">$$y = e^x + 2e^{-2x}$$</p>', hasmath: true, images: [] },
      { text: 'y = 3e^x - 2e^(-2x)', html: '<p class="ql-formula" data-value="y = 3e^x - 2e^{-2x}">$$y = 3e^x - 2e^{-2x}$$</p>', hasmath: true, images: [] },
      { text: 'y = e^x - e^(-2x)', html: '<p class="ql-formula" data-value="y = e^x - e^{-2x}">$$y = e^x - e^{-2x}$$</p>', hasmath: true, images: [] },
      { text: 'y = 2e^x + e^(-2x)', html: '<p class="ql-formula" data-value="y = 2e^x + e^{-2x}">$$y = 2e^x + e^{-2x}$$</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'This is a first-order linear ODE. Using integrating factor method with μ(x) = e^(2x).',
      html: '<p>This is a first-order linear ODE of the form <strong>y\' + p(x)y = q(x)</strong></p><p><strong>Step 1:</strong> Find integrating factor</p><p class="ql-formula" data-value="\\mu(x) = e^{\\int 2 dx} = e^{2x}">$$\\mu(x) = e^{\\int 2 dx} = e^{2x}$$</p><p><strong>Step 2:</strong> Multiply equation by μ(x)</p><p class="ql-formula" data-value="e^{2x}y\' + 2e^{2x}y = 3e^{3x}">$$e^{2x}y\' + 2e^{2x}y = 3e^{3x}$$</p><p><strong>Step 3:</strong> Integrate and apply initial condition</p><p class="ql-formula" data-value="y = e^x + Ce^{-2x}">$$y = e^x + Ce^{-2x}$$</p><p>With y(0) = 1: <strong>C = 2</strong></p>',
      hasmath: true,
      images: []
    },
    marks: 4,
    difficulty: 'hard',
    category: 'Differential Equations',
    chapter: 'First Order ODEs',
    topic: 'Linear ODEs',
    hasImage: false,
    createdAt: '2024-01-08'
  },
  {
    id: '9',
    questionContent: {
      text: 'A chemist needs to prepare 500 mL of a 0.25 M NaCl solution from a 2.0 M stock solution. Calculate the volume of stock solution needed and the volume of water to be added.',
      html: '<p>A chemist needs to prepare <strong>500 mL</strong> of a <strong>0.25 M NaCl solution</strong> from a <strong>2.0 M stock solution</strong>.</p><p><em>Calculate:</em></p><ol><li>Volume of stock solution needed</li><li>Volume of water to be added</li></ol><p><u>Show all calculations with proper units.</u></p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Stock: 62.5 mL, Water: 437.5 mL', html: '<p><strong>Stock solution:</strong> 62.5 mL<br><strong>Water:</strong> 437.5 mL</p>', hasmath: false, images: [] },
      { text: 'Stock: 125 mL, Water: 375 mL', html: '<p><strong>Stock solution:</strong> 125 mL<br><strong>Water:</strong> 375 mL</p>', hasmath: false, images: [] },
      { text: 'Stock: 100 mL, Water: 400 mL', html: '<p><strong>Stock solution:</strong> 100 mL<br><strong>Water:</strong> 400 mL</p>', hasmath: false, images: [] },
      { text: 'Stock: 50 mL, Water: 450 mL', html: '<p><strong>Stock solution:</strong> 50 mL<br><strong>Water:</strong> 450 mL</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Use the dilution formula: M₁V₁ = M₂V₂. Solve for V₁ and subtract from total volume to find water needed.',
      html: '<p><strong>Dilution Formula:</strong> M₁V₁ = M₂V₂</p><p><strong>Given:</strong></p><ul><li>M₁ = 2.0 M (stock)</li><li>M₂ = 0.25 M (final)</li><li>V₂ = 500 mL (final volume)</li></ul><p><strong>Calculation:</strong></p><p>V₁ = (M₂ × V₂) / M₁ = (0.25 × 500) / 2.0 = <strong>62.5 mL</strong></p><p>Water needed = 500 - 62.5 = <strong>437.5 mL</strong></p>',
      hasmath: false,
      images: []
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Solution Chemistry',
    chapter: 'Molarity and Dilutions',
    topic: 'Solution Preparation',
    hasImage: false,
    createdAt: '2024-01-07'
  },
  {
    id: '10',
    questionContent: {
      text: 'In quantum mechanics, the time-independent Schrödinger equation for a particle in a one-dimensional infinite square well of width L is given by: -ℏ²/2m × d²ψ/dx² = Eψ. What are the allowed energy levels?',
      html: '<p>In quantum mechanics, the time-independent Schrödinger equation for a particle in a one-dimensional infinite square well of width <strong>L</strong> is given by:</p><p class="ql-formula" data-value="-\\frac{\\hbar^2}{2m} \\frac{d^2\\psi}{dx^2} = E\\psi">$$-\\frac{\\hbar^2}{2m} \\frac{d^2\\psi}{dx^2} = E\\psi$$</p><p>What are the allowed energy levels?</p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: 'E_n = n²π²ℏ²/2mL², n = 1,2,3,...', html: '<p class="ql-formula" data-value="E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2}, \\quad n = 1,2,3,...">$$E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2}, \\quad n = 1,2,3,...$$</p>', hasmath: true, images: [] },
      { text: 'E_n = nπℏ²/2mL², n = 0,1,2,...', html: '<p class="ql-formula" data-value="E_n = \\frac{n\\pi\\hbar^2}{2mL^2}, \\quad n = 0,1,2,...">$$E_n = \\frac{n\\pi\\hbar^2}{2mL^2}, \\quad n = 0,1,2,...$$</p>', hasmath: true, images: [] },
      { text: 'E_n = n²ℏ²/2mL², n = 1,2,3,...', html: '<p class="ql-formula" data-value="E_n = \\frac{n^2\\hbar^2}{2mL^2}, \\quad n = 1,2,3,...">$$E_n = \\frac{n^2\\hbar^2}{2mL^2}, \\quad n = 1,2,3,...$$</p>', hasmath: true, images: [] },
      { text: 'E_n = πℏ²/2mL², n = 1,2,3,...', html: '<p class="ql-formula" data-value="E_n = \\frac{\\pi\\hbar^2}{2mL^2}, \\quad n = 1,2,3,...">$$E_n = \\frac{\\pi\\hbar^2}{2mL^2}, \\quad n = 1,2,3,...$$</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'The boundary conditions require ψ(0) = ψ(L) = 0, leading to standing wave solutions with quantized energy levels.',
      html: '<p><strong>Boundary Conditions:</strong> ψ(0) = ψ(L) = 0</p><p><strong>General Solution:</strong></p><p class="ql-formula" data-value="\\psi(x) = A\\sin\\left(\\frac{n\\pi x}{L}\\right)">$$\\psi(x) = A\\sin\\left(\\frac{n\\pi x}{L}\\right)$$</p><p><strong>Energy Quantization:</strong></p><p class="ql-formula" data-value="k = \\frac{n\\pi}{L} \\quad \\text{and} \\quad E = \\frac{\\hbar^2 k^2}{2m}">$$k = \\frac{n\\pi}{L} \\quad \\text{and} \\quad E = \\frac{\\hbar^2 k^2}{2m}$$</p><p>Therefore: <strong>E_n = n²π²ℏ²/2mL²</strong> with n = 1,2,3,...</p>',
      hasmath: true,
      images: []
    },
    marks: 4,
    difficulty: 'hard',
    category: 'Quantum Mechanics',
    chapter: 'Schrödinger Equation',
    topic: 'Infinite Square Well',
    hasImage: false,
    createdAt: '2024-01-06'
  },
  {
    id: '11',
    questionContent: {
      text: 'Which of the following cellular processes occur in the nucleus of a eukaryotic cell?',
      html: '<p>Which of the following cellular processes occur in the <strong>nucleus</strong> of a eukaryotic cell?</p>',
      hasmath: false,
      images: []
    },
    type: 'multiple',
    options: [
      { text: 'DNA replication', html: '<p>DNA replication</p>', hasmath: false, images: [] },
      { text: 'Transcription', html: '<p>Transcription</p>', hasmath: false, images: [] },
      { text: 'Translation', html: '<p>Translation</p>', hasmath: false, images: [] },
      { text: 'RNA processing', html: '<p>RNA processing</p>', hasmath: false, images: [] }
    ],
    correctAnswer: [0, 1, 3],
    explanationContent: {
      text: 'DNA replication, transcription, and RNA processing all occur in the nucleus. Translation occurs in the cytoplasm.',
      html: '<p><strong>Nuclear processes:</strong></p><ul><li><strong>DNA replication:</strong> Occurs during S phase of cell cycle</li><li><strong>Transcription:</strong> RNA synthesis from DNA template</li><li><strong>RNA processing:</strong> Splicing, capping, and polyadenylation</li></ul><p><strong>Cytoplasmic process:</strong></p><ul><li><strong>Translation:</strong> Protein synthesis on ribosomes</li></ul>',
      hasmath: false,
      images: []
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Molecular Biology',
    chapter: 'Gene Expression',
    topic: 'Cellular Locations',
    hasImage: false,
    createdAt: '2024-01-05'
  },
  {
    id: '12',
    questionContent: {
      text: 'A conducting sphere of radius R carries a total charge Q. Find the electric field at a distance r from the center for both r < R and r > R cases.',
      html: '<p>A conducting sphere of radius <strong>R</strong> carries a total charge <strong>Q</strong>. Find the electric field at a distance <strong>r</strong> from the center for both cases:</p><ol><li><strong>r &lt; R</strong> (inside the sphere)</li><li><strong>r &gt; R</strong> (outside the sphere)</li></ol>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'E = 0 for r < R, E = kQ/r² for r > R', html: '<p><strong>For r &lt; R:</strong> E = 0</p><p><strong>For r &gt; R:</strong> <span class="ql-formula" data-value="E = \\frac{kQ}{r^2}">$$E = \\frac{kQ}{r^2}$$</span></p>', hasmath: true, images: [] },
      { text: 'E = kQ/R² for r < R, E = kQ/r² for r > R', html: '<p><strong>For r &lt; R:</strong> <span class="ql-formula" data-value="E = \\frac{kQ}{R^2}">$$E = \\frac{kQ}{R^2}$$</span></p><p><strong>For r &gt; R:</strong> <span class="ql-formula" data-value="E = \\frac{kQ}{r^2}">$$E = \\frac{kQ}{r^2}$$</span></p>', hasmath: true, images: [] },
      { text: 'E = kQ/r² for both cases', html: '<p><strong>For both cases:</strong> <span class="ql-formula" data-value="E = \\frac{kQ}{r^2}">$$E = \\frac{kQ}{r^2}$$</span></p>', hasmath: true, images: [] },
      { text: 'E = 0 for both cases', html: '<p><strong>For both cases:</strong> E = 0</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'In a conductor at equilibrium, the electric field inside is zero. All charge resides on the surface. Outside, it behaves like a point charge.',
      html: '<p><strong>Key Principles:</strong></p><ul><li>In a conductor at equilibrium, <strong>E = 0</strong> inside</li><li>All charge resides on the surface</li><li>Outside acts like a point charge</li></ul><p><strong>Using Gauss\'s Law:</strong></p><p><strong>Inside (r &lt; R):</strong> E = 0 (no enclosed charge)</p><p><strong>Outside (r &gt; R):</strong></p><p class="ql-formula" data-value="\\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{enc}}{\\epsilon_0}">$$\\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{enc}}{\\epsilon_0}$$</p><p class="ql-formula" data-value="E \\cdot 4\\pi r^2 = \\frac{Q}{\\epsilon_0} \\Rightarrow E = \\frac{Q}{4\\pi\\epsilon_0 r^2} = \\frac{kQ}{r^2}">$$E \\cdot 4\\pi r^2 = \\frac{Q}{\\epsilon_0} \\Rightarrow E = \\frac{Q}{4\\pi\\epsilon_0 r^2} = \\frac{kQ}{r^2}$$</p>',
      hasmath: true,
      images: []
    },
    marks: 4,
    difficulty: 'medium',
    category: 'Electromagnetism',
    chapter: 'Gauss\'s Law',
    topic: 'Conductors',
    hasImage: false,
    createdAt: '2024-01-04'
  },
  {
    id: '13',
    questionContent: {
      text: 'Consider the reaction: 2A + B → 3C + D. If the reaction rate is expressed as -d[A]/dt = k[A]²[B], what is the overall order of the reaction and the units of the rate constant k?',
      html: '<p>Consider the reaction:</p><p class="ql-formula" data-value="2A + B \\rightarrow 3C + D">$$2A + B \\rightarrow 3C + D$$</p><p>If the reaction rate is expressed as:</p><p class="ql-formula" data-value="-\\frac{d[A]}{dt} = k[A]^2[B]">$$-\\frac{d[A]}{dt} = k[A]^2[B]$$</p><p>What is the <strong>overall order</strong> of the reaction and the <strong>units of the rate constant k</strong>?</p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Order = 3, Units = M⁻²s⁻¹', html: '<p><strong>Order:</strong> 3</p><p><strong>Units:</strong> M⁻²s⁻¹</p>', hasmath: false, images: [] },
      { text: 'Order = 2, Units = M⁻¹s⁻¹', html: '<p><strong>Order:</strong> 2</p><p><strong>Units:</strong> M⁻¹s⁻¹</p>', hasmath: false, images: [] },
      { text: 'Order = 3, Units = M⁻¹s⁻¹', html: '<p><strong>Order:</strong> 3</p><p><strong>Units:</strong> M⁻¹s⁻¹</p>', hasmath: false, images: [] },
      { text: 'Order = 2, Units = M⁻²s⁻¹', html: '<p><strong>Order:</strong> 2</p><p><strong>Units:</strong> M⁻²s⁻¹</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Overall order = sum of all exponents = 2 + 1 = 3. Units of k are determined by dimensional analysis.',
      html: '<p><strong>Overall Order Calculation:</strong></p><p>Order = sum of all exponents = 2 (for [A]) + 1 (for [B]) = <strong>3</strong></p><p><strong>Units of Rate Constant:</strong></p><p>Rate has units of M·s⁻¹</p><p class="ql-formula" data-value="\\text{Rate} = k[A]^2[B]">$$\\text{Rate} = k[A]^2[B]$$</p><p class="ql-formula" data-value="M \\cdot s^{-1} = k \\cdot (M)^2 \\cdot (M)">$$M \\cdot s^{-1} = k \\cdot (M)^2 \\cdot (M)$$</p><p class="ql-formula" data-value="M \\cdot s^{-1} = k \\cdot M^3">$$M \\cdot s^{-1} = k \\cdot M^3$$</p><p>Therefore: <strong>k = M⁻²s⁻¹</strong></p>',
      hasmath: true,
      images: []
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Chemical Kinetics',
    chapter: 'Reaction Rates',
    topic: 'Rate Laws',
    hasImage: false,
    createdAt: '2024-01-03'
  },
  {
    id: '14',
    questionContent: {
      text: 'Find the Fourier series representation of the periodic function f(x) = x for -π ≤ x ≤ π, extended periodically with period 2π.',
      html: '<p>Find the Fourier series representation of the periodic function:</p><p class="ql-formula" data-value="f(x) = x \\quad \\text{for} \\quad -\\pi \\leq x \\leq \\pi">$$f(x) = x \\quad \\text{for} \\quad -\\pi \\leq x \\leq \\pi$$</p><p>extended periodically with period <strong>2π</strong>.</p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: 'f(x) = 2∑((-1)^(n+1)/n)sin(nx), n=1,2,3,...', html: '<p class="ql-formula" data-value="f(x) = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}\\sin(nx)">$$f(x) = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}\\sin(nx)$$</p>', hasmath: true, images: [] },
      { text: 'f(x) = ∑(1/n)cos(nx), n=1,2,3,...', html: '<p class="ql-formula" data-value="f(x) = \\sum_{n=1}^{\\infty} \\frac{1}{n}\\cos(nx)">$$f(x) = \\sum_{n=1}^{\\infty} \\frac{1}{n}\\cos(nx)$$</p>', hasmath: true, images: [] },
      { text: 'f(x) = π/2 + ∑((-1)^n/n)sin(nx), n=1,2,3,...', html: '<p class="ql-formula" data-value="f(x) = \\frac{\\pi}{2} + \\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n}\\sin(nx)">$$f(x) = \\frac{\\pi}{2} + \\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n}\\sin(nx)$$</p>', hasmath: true, images: [] },
      { text: 'f(x) = ∑(2/n²)cos(nx), n=1,2,3,...', html: '<p class="ql-formula" data-value="f(x) = \\sum_{n=1}^{\\infty} \\frac{2}{n^2}\\cos(nx)">$$f(x) = \\sum_{n=1}^{\\infty} \\frac{2}{n^2}\\cos(nx)$$</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Since f(x) = x is an odd function, only sine terms appear. Calculate coefficients using integration by parts.',
      html: '<p><strong>Function Analysis:</strong></p><p>f(x) = x is an <strong>odd function</strong>, so only sine terms appear in the Fourier series.</p><p><strong>Fourier Coefficients:</strong></p><p class="ql-formula" data-value="a_0 = 0, \\quad a_n = 0 \\quad \\text{(odd function)}">$$a_0 = 0, \\quad a_n = 0 \\quad \\text{(odd function)}$$</p><p class="ql-formula" data-value="b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} x \\sin(nx) dx">$$b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} x \\sin(nx) dx$$</p><p>Using integration by parts:</p><p class="ql-formula" data-value="b_n = \\frac{2(-1)^{n+1}}{n}">$$b_n = \\frac{2(-1)^{n+1}}{n}$$</p><p><strong>Final Result:</strong></p><p class="ql-formula" data-value="f(x) = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}\\sin(nx)">$$f(x) = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n}\\sin(nx)$$</p>',
      hasmath: true,
      images: []
    },
    marks: 5,
    difficulty: 'hard',
    category: 'Mathematical Analysis',
    chapter: 'Fourier Series',
    topic: 'Periodic Functions',
    hasImage: false,
    createdAt: '2024-01-02'
  },
  {
    id: '15',
    questionContent: {
      text: 'In photosynthesis, what is the role of chlorophyll and where does the light-dependent reaction occur?',
      html: '<p>In photosynthesis, what is the role of <strong>chlorophyll</strong> and where does the <em>light-dependent reaction</em> occur?</p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Chlorophyll absorbs light energy; reaction occurs in thylakoid membranes', html: '<p><strong>Chlorophyll:</strong> Absorbs light energy<br><strong>Location:</strong> Thylakoid membranes</p>', hasmath: false, images: [] },
      { text: 'Chlorophyll stores glucose; reaction occurs in stroma', html: '<p><strong>Chlorophyll:</strong> Stores glucose<br><strong>Location:</strong> Stroma</p>', hasmath: false, images: [] },
      { text: 'Chlorophyll produces oxygen; reaction occurs in cytoplasm', html: '<p><strong>Chlorophyll:</strong> Produces oxygen<br><strong>Location:</strong> Cytoplasm</p>', hasmath: false, images: [] },
      { text: 'Chlorophyll transports electrons; reaction occurs in mitochondria', html: '<p><strong>Chlorophyll:</strong> Transports electrons<br><strong>Location:</strong> Mitochondria</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Chlorophyll is the primary pigment that absorbs light energy. Light-dependent reactions occur in the thylakoid membranes where photosystems I and II are located.',
      html: '<p><strong>Chlorophyll Functions:</strong></p><ul><li>Primary <strong>light-absorbing pigment</strong></li><li>Converts light energy to chemical energy</li><li>Contains magnesium center for light capture</li></ul><p><strong>Light-Dependent Reactions:</strong></p><ul><li>Occur in <strong>thylakoid membranes</strong></li><li>Involve Photosystem I and II</li><li>Produce ATP and NADPH</li><li>Release oxygen as byproduct</li></ul>',
      hasmath: false,
      images: []
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Plant Biology',
    chapter: 'Photosynthesis',
    topic: 'Light Reactions',
    hasImage: false,
    createdAt: '2024-01-01'
  },
  {
    id: '16',
    questionContent: {
      text: 'A parallel plate capacitor has plates of area A separated by distance d with a dielectric material of constant κ. If the capacitor is connected to a battery of voltage V, find the energy stored in the capacitor.',
      html: '<p>A parallel plate capacitor has plates of area <strong>A</strong> separated by distance <strong>d</strong> with a dielectric material of constant <strong>κ</strong>. If the capacitor is connected to a battery of voltage <strong>V</strong>, find the energy stored in the capacitor.</p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'U = (1/2)κε₀AV²/d', html: '<p class="ql-formula" data-value="U = \\frac{1}{2}\\kappa\\epsilon_0\\frac{AV^2}{d}">$$U = \\frac{1}{2}\\kappa\\epsilon_0\\frac{AV^2}{d}$$</p>', hasmath: true, images: [] },
      { text: 'U = κε₀AV²/d', html: '<p class="ql-formula" data-value="U = \\kappa\\epsilon_0\\frac{AV^2}{d}">$$U = \\kappa\\epsilon_0\\frac{AV^2}{d}$$</p>', hasmath: true, images: [] },
      { text: 'U = (1/2)ε₀AV²/κd', html: '<p class="ql-formula" data-value="U = \\frac{1}{2}\\epsilon_0\\frac{AV^2}{\\kappa d}">$$U = \\frac{1}{2}\\epsilon_0\\frac{AV^2}{\\kappa d}$$</p>', hasmath: true, images: [] },
      { text: 'U = (1/2)ε₀AV²/d', html: '<p class="ql-formula" data-value="U = \\frac{1}{2}\\epsilon_0\\frac{AV^2}{d}">$$U = \\frac{1}{2}\\epsilon_0\\frac{AV^2}{d}$$</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'The capacitance with dielectric is C = κε₀A/d. Energy stored is U = (1/2)CV².',
      html: '<p><strong>Capacitance with Dielectric:</strong></p><p class="ql-formula" data-value="C = \\kappa\\epsilon_0\\frac{A}{d}">$$C = \\kappa\\epsilon_0\\frac{A}{d}$$</p><p><strong>Energy Formula:</strong></p><p class="ql-formula" data-value="U = \\frac{1}{2}CV^2">$$U = \\frac{1}{2}CV^2$$</p><p><strong>Substituting:</strong></p><p class="ql-formula" data-value="U = \\frac{1}{2} \\cdot \\kappa\\epsilon_0\\frac{A}{d} \\cdot V^2 = \\frac{1}{2}\\kappa\\epsilon_0\\frac{AV^2}{d}">$$U = \\frac{1}{2} \\cdot \\kappa\\epsilon_0\\frac{A}{d} \\cdot V^2 = \\frac{1}{2}\\kappa\\epsilon_0\\frac{AV^2}{d}$$</p>',
      hasmath: true,
      images: []
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Electromagnetism',
    chapter: 'Capacitance',
    topic: 'Energy Storage',
    hasImage: false,
    createdAt: '2023-12-31'
  },
  {
    id: '17',
    questionContent: {
      text: 'Balance the following chemical equation and identify the type of reaction: Fe + O₂ → Fe₂O₃',
      html: '<p>Balance the following chemical equation and identify the type of reaction:</p><p class="ql-formula" data-value="Fe + O_2 \\rightarrow Fe_2O_3">$$Fe + O_2 \\rightarrow Fe_2O_3$$</p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: '4Fe + 3O₂ → 2Fe₂O₃; Synthesis/Combination reaction', html: '<p><strong>Balanced equation:</strong></p><p class="ql-formula" data-value="4Fe + 3O_2 \\rightarrow 2Fe_2O_3">$$4Fe + 3O_2 \\rightarrow 2Fe_2O_3$$</p><p><strong>Type:</strong> Synthesis/Combination reaction</p>', hasmath: true, images: [] },
      { text: '2Fe + O₂ → Fe₂O₃; Decomposition reaction', html: '<p><strong>Balanced equation:</strong></p><p class="ql-formula" data-value="2Fe + O_2 \\rightarrow Fe_2O_3">$$2Fe + O_2 \\rightarrow Fe_2O_3$$</p><p><strong>Type:</strong> Decomposition reaction</p>', hasmath: true, images: [] },
      { text: '4Fe + 3O₂ → 2Fe₂O₃; Displacement reaction', html: '<p><strong>Balanced equation:</strong></p><p class="ql-formula" data-value="4Fe + 3O_2 \\rightarrow 2Fe_2O_3">$$4Fe + 3O_2 \\rightarrow 2Fe_2O_3$$</p><p><strong>Type:</strong> Displacement reaction</p>', hasmath: true, images: [] },
      { text: '2Fe + 3O₂ → Fe₂O₃; Combustion reaction', html: '<p><strong>Balanced equation:</strong></p><p class="ql-formula" data-value="2Fe + 3O_2 \\rightarrow Fe_2O_3">$$2Fe + 3O_2 \\rightarrow Fe_2O_3$$</p><p><strong>Type:</strong> Combustion reaction</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Balance by ensuring equal atoms on both sides. This is a synthesis reaction where two elements combine to form a compound.',
      html: '<p><strong>Balancing Steps:</strong></p><ol><li>Fe atoms: 2 on right, need 4 on left</li><li>O atoms: 6 on right (2×3), need 6 on left (3×2)</li></ol><p><strong>Balanced equation:</strong></p><p class="ql-formula" data-value="4Fe + 3O_2 \\rightarrow 2Fe_2O_3">$$4Fe + 3O_2 \\rightarrow 2Fe_2O_3$$</p><p><strong>Reaction Type:</strong></p><p>This is a <strong>synthesis (combination) reaction</strong> because two or more simple substances combine to form a more complex compound.</p>',
      hasmath: true,
      images: []
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Chemical Reactions',
    chapter: 'Balancing Equations',
    topic: 'Reaction Types',
    hasImage: false,
    createdAt: '2023-12-30'
  },
  {
    id: '18',
    questionContent: {
      text: 'Evaluate the triple integral ∭ᵣ xyz dV where R is the region bounded by the planes x = 0, y = 0, z = 0, and x + y + z = 1.',
      html: '<p>Evaluate the triple integral:</p><p class="ql-formula" data-value="\\iiint_R xyz \\, dV">$$\\iiint_R xyz \\, dV$$</p><p>where <strong>R</strong> is the region bounded by the planes:</p><p class="ql-formula" data-value="x = 0, \\quad y = 0, \\quad z = 0, \\quad x + y + z = 1">$$x = 0, \\quad y = 0, \\quad z = 0, \\quad x + y + z = 1$$</p>',
      hasmath: true,
      images: []
    },
    type: 'single',
    options: [
      { text: '1/120', html: '<p class="ql-formula" data-value="\\frac{1}{120}">$$\\frac{1}{120}$$</p>', hasmath: true, images: [] },
      { text: '1/60', html: '<p class="ql-formula" data-value="\\frac{1}{60}">$$\\frac{1}{60}$$</p>', hasmath: true, images: [] },
      { text: '1/24', html: '<p class="ql-formula" data-value="\\frac{1}{24}">$$\\frac{1}{24}$$</p>', hasmath: true, images: [] },
      { text: '1/6', html: '<p class="ql-formula" data-value="\\frac{1}{6}">$$\\frac{1}{6}$$</p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Set up the integral with proper limits and evaluate step by step. The region is a tetrahedron.',
      html: '<p><strong>Region Analysis:</strong></p><p>R is a tetrahedron with vertices at (0,0,0), (1,0,0), (0,1,0), (0,0,1)</p><p><strong>Integration Limits:</strong></p><p class="ql-formula" data-value="0 \\leq x \\leq 1, \\quad 0 \\leq y \\leq 1-x, \\quad 0 \\leq z \\leq 1-x-y">$$0 \\leq x \\leq 1, \\quad 0 \\leq y \\leq 1-x, \\quad 0 \\leq z \\leq 1-x-y$$</p><p><strong>Evaluation:</strong></p><p class="ql-formula" data-value="\\int_0^1 \\int_0^{1-x} \\int_0^{1-x-y} xyz \\, dz \\, dy \\, dx">$$\\int_0^1 \\int_0^{1-x} \\int_0^{1-x-y} xyz \\, dz \\, dy \\, dx$$</p><p class="ql-formula" data-value="= \\int_0^1 \\int_0^{1-x} xy \\cdot \\frac{(1-x-y)^2}{2} \\, dy \\, dx">$$= \\int_0^1 \\int_0^{1-x} xy \\cdot \\frac{(1-x-y)^2}{2} \\, dy \\, dx$$</p><p>After complete integration: <strong>1/120</strong></p>',
      hasmath: true,
      images: []
    },
    marks: 5,
    difficulty: 'hard',
    category: 'Multivariable Calculus',
    chapter: 'Triple Integrals',
    topic: 'Volume Integrals',
    hasImage: false,
    createdAt: '2023-12-29'
  },
  {
    id: '19',
    questionContent: {
      text: 'What is the mechanism of enzyme inhibition, and how do competitive and non-competitive inhibitors differ in their mode of action?',
      html: '<p>What is the mechanism of <strong>enzyme inhibition</strong>, and how do <em>competitive</em> and <em>non-competitive</em> inhibitors differ in their mode of action?</p><p><u>Discuss the following aspects:</u></p><ul><li>Binding sites</li><li>Effect on Km and Vmax</li><li>Reversibility</li><li>Structural requirements</li></ul>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Competitive: binds active site, increases Km; Non-competitive: binds allosteric site, decreases Vmax', html: '<p><strong>Competitive Inhibition:</strong></p><ul><li>Binds to active site</li><li>Increases Km, Vmax unchanged</li></ul><p><strong>Non-competitive Inhibition:</strong></p><ul><li>Binds to allosteric site</li><li>Decreases Vmax, Km unchanged</li></ul>', hasmath: false, images: [] },
      { text: 'Competitive: binds allosteric site, decreases Vmax; Non-competitive: binds active site, increases Km', html: '<p><strong>Competitive Inhibition:</strong></p><ul><li>Binds to allosteric site</li><li>Decreases Vmax</li></ul><p><strong>Non-competitive Inhibition:</strong></p><ul><li>Binds to active site</li><li>Increases Km</li></ul>', hasmath: false, images: [] },
      { text: 'Both bind to active site but with different effects on kinetics', html: '<p>Both bind to active site but with different effects on kinetics</p>', hasmath: false, images: [] },
      { text: 'Both bind to allosteric site with same kinetic effects', html: '<p>Both bind to allosteric site with same kinetic effects</p>', hasmath: false, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Competitive inhibitors compete with substrate for the active site, while non-competitive inhibitors bind elsewhere and change enzyme shape.',
      html: '<p><strong>Competitive Inhibition:</strong></p><ul><li><strong>Binding site:</strong> Active site (competes with substrate)</li><li><strong>Structure:</strong> Similar to substrate structure</li><li><strong>Kinetics:</strong> Increases Km, Vmax unchanged</li><li><strong>Reversibility:</strong> Can be overcome by increasing substrate concentration</li></ul><p><strong>Non-competitive Inhibition:</strong></p><ul><li><strong>Binding site:</strong> Allosteric site (different from active site)</li><li><strong>Structure:</strong> No similarity to substrate required</li><li><strong>Kinetics:</strong> Decreases Vmax, Km unchanged</li><li><strong>Reversibility:</strong> Cannot be overcome by increasing substrate</li></ul>',
      hasmath: false,
      images: []
    },
    marks: 4,
    difficulty: 'medium',
    category: 'Biochemistry',
    chapter: 'Enzyme Kinetics',
    topic: 'Enzyme Inhibition',
    hasImage: false,
    createdAt: '2023-12-28'
  },
  {
    id: '20',
    questionContent: {
      text: 'A long solenoid with n turns per unit length carries a current I. Find the magnetic field inside and outside the solenoid using Ampère\'s law.',
      html: '<p>A long solenoid with <strong>n</strong> turns per unit length carries a current <strong>I</strong>. Find the magnetic field inside and outside the solenoid using <strong>Ampère\'s law</strong>.</p><p><em>Consider the solenoid to be infinitely long for simplicity.</em></p>',
      hasmath: false,
      images: []
    },
    type: 'single',
    options: [
      { text: 'Inside: B = μ₀nI, Outside: B = 0', html: '<p><strong>Inside:</strong> <span class="ql-formula" data-value="B = \\mu_0 nI">$$B = \\mu_0 nI$$</span></p><p><strong>Outside:</strong> B = 0</p>', hasmath: true, images: [] },
      { text: 'Inside: B = μ₀I/n, Outside: B = μ₀I', html: '<p><strong>Inside:</strong> <span class="ql-formula" data-value="B = \\frac{\\mu_0 I}{n}">$$B = \\frac{\\mu_0 I}{n}$$</span></p><p><strong>Outside:</strong> <span class="ql-formula" data-value="B = \\mu_0 I">$$B = \\mu_0 I$$</span></p>', hasmath: true, images: [] },
      { text: 'Inside: B = 0, Outside: B = μ₀nI', html: '<p><strong>Inside:</strong> B = 0</p><p><strong>Outside:</strong> <span class="ql-formula" data-value="B = \\mu_0 nI">$$B = \\mu_0 nI$$</span></p>', hasmath: true, images: [] },
      { text: 'Inside: B = μ₀nI/2, Outside: B = μ₀nI/2', html: '<p><strong>Inside:</strong> <span class="ql-formula" data-value="B = \\frac{\\mu_0 nI}{2}">$$B = \\frac{\\mu_0 nI}{2}$$</span></p><p><strong>Outside:</strong> <span class="ql-formula" data-value="B = \\frac{\\mu_0 nI}{2}">$$B = \\frac{\\mu_0 nI}{2}$$</span></p>', hasmath: true, images: [] }
    ],
    correctAnswer: 0,
    explanationContent: {
      text: 'Apply Ampère\'s law using rectangular path. Inside the solenoid, field is uniform. Outside, field cancels due to symmetry.',
      html: '<p><strong>Ampère\'s Law:</strong></p><p class="ql-formula" data-value="\\oint \\mathbf{B} \\cdot d\\mathbf{l} = \\mu_0 I_{enc}">$$\\oint \\mathbf{B} \\cdot d\\mathbf{l} = \\mu_0 I_{enc}$$</p><p><strong>Inside the Solenoid:</strong></p><p>Using rectangular Amperian loop with one side inside:</p><p class="ql-formula" data-value="B \\cdot L = \\mu_0 (nL) I">$$B \\cdot L = \\mu_0 (nL) I$$</p><p>where nL is the number of turns enclosed.</p><p class="ql-formula" data-value="B = \\mu_0 nI">$$B = \\mu_0 nI$$</p><p><strong>Outside the Solenoid:</strong></p><p>For an infinitely long solenoid, the field outside is <strong>zero</strong> due to the cancellation of fields from opposite sides.</p>',
      hasmath: true,
      images: []
    },
    marks: 4,
    difficulty: 'medium',
    category: 'Electromagnetism',
    chapter: 'Ampère\'s Law',
    topic: 'Solenoids',
    hasImage: false,
    createdAt: '2023-12-27'
  }
]

export const mockFilterOptions = {
  questionBankType: [
    { value: 'neet', label: 'NEET' },
    { value: 'jee', label: 'JEE' },
    { value: 'boards', label: 'Board Exams' }
  ],
  chapters: {
    'neet': [
      { value: 'mechanics', label: 'Mechanics' },
      { value: 'thermodynamics', label: 'Thermodynamics' },
      { value: 'waves', label: 'Waves & Optics' }
    ],
    'jee': [
      { value: 'calculus', label: 'Calculus' },
      { value: 'algebra', label: 'Algebra' },
      { value: 'geometry', label: 'Coordinate Geometry' }
    ]
  },
  topics: {
    'mechanics': [
      { value: 'kinematics', label: 'Kinematics' },
      { value: 'dynamics', label: 'Dynamics' },
      { value: 'circular-motion', label: 'Circular Motion' }
    ],
    'calculus': [
      { value: 'limits', label: 'Limits' },
      { value: 'derivatives', label: 'Derivatives' },
      { value: 'integrals', label: 'Integrals' }
    ]
  },
  categories: [
    { value: 'conceptual', label: 'Conceptual' },
    { value: 'numerical', label: 'Numerical' },
    { value: 'application', label: 'Application' }
  ],
  difficulties: [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]
}
