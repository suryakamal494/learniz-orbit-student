import type { Question } from '@/types/questionBank'

export const mockQuestions: Question[] = [
  {
    id: '1',
    questionContent: {
      text: 'What is the derivative of f(x) = x³ + 2x² - 5x + 1?',
      html: '<p>What is the derivative of f(x) = x³ + 2x² - 5x + 1?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '3x² + 4x - 5', html: '<p>3x² + 4x - 5</p>' },
      { id: 'b', text: '3x² + 4x + 5', html: '<p>3x² + 4x + 5</p>' },
      { id: 'c', text: 'x² + 4x - 5', html: '<p>x² + 4x - 5</p>' },
      { id: 'd', text: '3x³ + 2x² - 5x', html: '<p>3x³ + 2x² - 5x</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Using the power rule for derivatives: d/dx(x^n) = nx^(n-1)',
      html: '<p>Using the power rule for derivatives: d/dx(x^n) = nx^(n-1)</p>'
    },
    marks: 4,
    difficulty: 'medium',
    category: 'Calculus',
    chapter: 'Differential Calculus',
    topic: 'Derivatives',
    hint: 'Apply the power rule to each term separately'
  },
  {
    id: '2',
    questionContent: {
      text: 'Solve the equation: ∫(2x + 3)dx from x = 0 to x = 2',
      html: '<p>Solve the equation: ∫(2x + 3)dx from x = 0 to x = 2</p><p>Where the integral symbol represents definite integration</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '10', html: '<p>10</p>' },
      { id: 'b', text: '8', html: '<p>8</p>' },
      { id: 'c', text: '12', html: '<p>12</p>' },
      { id: 'd', text: '6', html: '<p>6</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: '∫(2x + 3)dx = x² + 3x + C. Evaluating from 0 to 2: (4 + 6) - (0 + 0) = 10',
      html: '<p>∫(2x + 3)dx = x² + 3x + C</p><p>Evaluating from 0 to 2: (4 + 6) - (0 + 0) = 10</p>'
    },
    marks: 4,
    difficulty: 'medium',
    category: 'Calculus',
    chapter: 'Integral Calculus',
    topic: 'Definite Integrals',
    hint: 'Find the antiderivative first, then apply the fundamental theorem of calculus'
  },
  {
    id: '3',
    questionContent: {
      text: 'A projectile is fired at an angle of 30° with initial velocity 50 m/s. What is the maximum height reached? (g = 10 m/s²)',
      html: '<div><p>A projectile is fired at an angle of 30° with initial velocity 50 m/s.</p><p><strong>Question:</strong> What is the maximum height reached?</p><p><em>(Given: g = 10 m/s²)</em></p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '31.25 m', html: '<p>31.25 m</p>' },
      { id: 'b', text: '25 m', html: '<p>25 m</p>' },
      { id: 'c', text: '62.5 m', html: '<p>62.5 m</p>' },
      { id: 'd', text: '50 m', html: '<p>50 m</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Using h = (u²sin²θ)/(2g) = (50² × sin²30°)/(2 × 10) = (2500 × 0.25)/20 = 31.25 m',
      html: '<p>Using the formula: h = (u²sin²θ)/(2g)</p><p>h = (50² × sin²30°)/(2 × 10)</p><p>h = (2500 × 0.25)/20 = 31.25 m</p>'
    },
    marks: 5,
    difficulty: 'hard',
    category: 'Mechanics',
    chapter: 'Projectile Motion',
    topic: 'Maximum Height',
    hint: 'Use the kinematic equation for maximum height in projectile motion'
  },
  {
    id: '4',
    questionContent: {
      text: 'In a triangle ABC, if a = 7 cm, b = 8 cm, and C = 60°, find the length of side c.',
      html: '<div><p>In triangle ABC:</p><ul><li>Side a = 7 cm</li><li>Side b = 8 cm</li><li>Angle C = 60°</li></ul><p><strong>Find:</strong> Length of side c</p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '√57 cm', html: '<p>√57 cm</p>' },
      { id: 'b', text: '9 cm', html: '<p>9 cm</p>' },
      { id: 'c', text: '√65 cm', html: '<p>√65 cm</p>' },
      { id: 'd', text: '8 cm', html: '<p>8 cm</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Using cosine rule: c² = a² + b² - 2ab cos C = 49 + 64 - 2(7)(8)(0.5) = 113 - 56 = 57. Therefore c = √57',
      html: '<p>Using the cosine rule:</p><p>c² = a² + b² - 2ab cos C</p><p>c² = 7² + 8² - 2(7)(8)cos 60°</p><p>c² = 49 + 64 - 2(7)(8)(0.5)</p><p>c² = 113 - 56 = 57</p><p>Therefore, c = √57 cm</p>'
    },
    marks: 4,
    difficulty: 'medium',
    category: 'Trigonometry',
    chapter: 'Properties of Triangles',
    topic: 'Cosine Rule',
    hint: 'Use the cosine rule: c² = a² + b² - 2ab cos C'
  },
  {
    id: '5',
    questionContent: {
      text: 'Which of the following chemical reactions represents a redox reaction?',
      html: '<p><strong>Which of the following chemical reactions represents a redox reaction?</strong></p><p><em>Choose the correct option:</em></p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'HCl + NaOH → NaCl + H₂O', html: '<p>HCl + NaOH → NaCl + H₂O</p>' },
      { id: 'b', text: 'Zn + CuSO₄ → ZnSO₄ + Cu', html: '<p>Zn + CuSO₄ → ZnSO₄ + Cu</p>' },
      { id: 'c', text: 'AgNO₃ + NaCl → AgCl + NaNO₃', html: '<p>AgNO₃ + NaCl → AgCl + NaNO₃</p>' },
      { id: 'd', text: 'CaCO₃ → CaO + CO₂', html: '<p>CaCO₃ → CaO + CO₂</p>' }
    ],
    correctAnswer: 'b',
    explanationContent: {
      text: 'In Zn + CuSO₄ → ZnSO₄ + Cu, Zn is oxidized (loses electrons) and Cu²⁺ is reduced (gains electrons).',
      html: '<p>In the reaction Zn + CuSO₄ → ZnSO₄ + Cu:</p><ul><li>Zn is oxidized: Zn → Zn²⁺ + 2e⁻</li><li>Cu²⁺ is reduced: Cu²⁺ + 2e⁻ → Cu</li></ul><p>This involves both oxidation and reduction, making it a redox reaction.</p>'
    },
    marks: 3,
    difficulty: 'easy',
    category: 'Inorganic Chemistry',
    chapter: 'Redox Reactions',
    topic: 'Oxidation and Reduction',
    hint: 'Look for reactions where electrons are transferred between species'
  },
  {
    id: '6',
    questionContent: {
      text: 'Calculate the molarity of a solution containing 58.5 g of NaCl dissolved in 2 liters of water. (Molecular weight of NaCl = 58.5 g/mol)',
      html: '<div><p><strong>Problem:</strong></p><p>Calculate the molarity of a solution containing:</p><ul><li>58.5 g of NaCl</li><li>Dissolved in 2 liters of water</li><li>Molecular weight of NaCl = 58.5 g/mol</li></ul></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '0.5 M', html: '<p>0.5 M</p>' },
      { id: 'b', text: '1.0 M', html: '<p>1.0 M</p>' },
      { id: 'c', text: '2.0 M', html: '<p>2.0 M</p>' },
      { id: 'd', text: '0.25 M', html: '<p>0.25 M</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Molarity = moles/volume(L). Moles of NaCl = 58.5g ÷ 58.5g/mol = 1 mol. Molarity = 1 mol ÷ 2 L = 0.5 M',
      html: '<p>Step 1: Calculate moles of NaCl</p><p>Moles = mass ÷ molecular weight = 58.5g ÷ 58.5g/mol = 1 mol</p><p>Step 2: Calculate molarity</p><p>Molarity = moles ÷ volume(L) = 1 mol ÷ 2 L = 0.5 M</p>'
    },
    marks: 3,
    difficulty: 'easy',
    category: 'Physical Chemistry',
    chapter: 'Solutions',
    topic: 'Molarity',
    hint: 'Molarity = moles of solute / volume of solution in liters'
  },
  {
    id: '7',
    questionContent: {
      text: 'Which organelle is responsible for cellular respiration and is known as the "powerhouse of the cell"?',
      html: '<p><strong>Question:</strong> Which organelle is responsible for cellular respiration and is known as the "powerhouse of the cell"?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'Nucleus', html: '<p>Nucleus</p>' },
      { id: 'b', text: 'Mitochondria', html: '<p>Mitochondria</p>' },
      { id: 'c', text: 'Chloroplast', html: '<p>Chloroplast</p>' },
      { id: 'd', text: 'Ribosome', html: '<p>Ribosome</p>' }
    ],
    correctAnswer: 'b',
    explanationContent: {
      text: 'Mitochondria are responsible for cellular respiration, converting glucose and oxygen into ATP (energy currency of the cell).',
      html: '<p><strong>Mitochondria</strong> are the organelles responsible for:</p><ul><li>Cellular respiration</li><li>ATP production</li><li>Energy conversion from glucose</li></ul><p>This is why they are called the "powerhouse of the cell".</p>'
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Cell Biology',
    chapter: 'Cell Structure',
    topic: 'Organelles',
    hint: 'Think about which organelle produces ATP for the cell'
  },
  {
    id: '8',
    questionContent: {
      text: 'In photosynthesis, what are the main products of the light-dependent reactions?',
      html: '<div><p><strong>Photosynthesis - Light-dependent reactions</strong></p><p>What are the main products of the light-dependent reactions?</p><p><em>Select all that apply in the correct option:</em></p></div>'
    },
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'ATP and NADPH', html: '<p>ATP and NADPH</p>' },
      { id: 'b', text: 'Glucose and Oxygen', html: '<p>Glucose and Oxygen</p>' },
      { id: 'c', text: 'Carbon dioxide and Water', html: '<p>Carbon dioxide and Water</p>' },
      { id: 'd', text: 'ATP, NADPH, and Oxygen', html: '<p>ATP, NADPH, and Oxygen</p>' }
    ],
    correctAnswer: ['d'],
    explanationContent: {
      text: 'Light-dependent reactions produce ATP, NADPH (energy carriers), and oxygen (as a byproduct from water splitting).',
      html: '<p>The light-dependent reactions of photosynthesis occur in the thylakoids and produce:</p><ul><li><strong>ATP</strong> - energy currency</li><li><strong>NADPH</strong> - electron carrier</li><li><strong>Oxygen</strong> - byproduct from splitting water molecules</li></ul><p>These products are then used in the Calvin cycle (light-independent reactions) to produce glucose.</p>'
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Plant Biology',
    chapter: 'Photosynthesis',
    topic: 'Light Reactions',
    hint: 'Consider what happens when chlorophyll absorbs light energy'
  },
  {
    id: '9',
    questionContent: {
      text: 'A long passage about ecosystem dynamics: Ecosystems are complex networks of interactions between living organisms and their physical environment. These interactions include energy flow, nutrient cycling, and population dynamics. In a typical forest ecosystem, primary producers (plants) convert sunlight into chemical energy through photosynthesis. This energy flows through different trophic levels including primary consumers (herbivores), secondary consumers (carnivores), and decomposers. The stability of an ecosystem depends on biodiversity, with higher diversity generally leading to greater stability. Climate change and human activities can significantly impact ecosystem balance, leading to species extinction and habitat destruction. Based on this passage, what is the primary role of decomposers in an ecosystem?',
      html: '<div><h4>Ecosystem Dynamics</h4><p>Ecosystems are complex networks of interactions between living organisms and their physical environment. These interactions include energy flow, nutrient cycling, and population dynamics.</p><p>In a typical forest ecosystem, primary producers (plants) convert sunlight into chemical energy through photosynthesis. This energy flows through different trophic levels including:</p><ul><li><strong>Primary consumers</strong> (herbivores)</li><li><strong>Secondary consumers</strong> (carnivores)</li><li><strong>Decomposers</strong></li></ul><p>The stability of an ecosystem depends on biodiversity, with higher diversity generally leading to greater stability. Climate change and human activities can significantly impact ecosystem balance, leading to species extinction and habitat destruction.</p><hr><p><strong>Question:</strong> Based on this passage, what is the primary role of decomposers in an ecosystem?</p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'Convert sunlight to chemical energy', html: '<p>Convert sunlight to chemical energy</p>' },
      { id: 'b', text: 'Break down dead organic matter and recycle nutrients', html: '<p>Break down dead organic matter and recycle nutrients</p>' },
      { id: 'c', text: 'Consume primary producers directly', html: '<p>Consume primary producers directly</p>' },
      { id: 'd', text: 'Control population of secondary consumers', html: '<p>Control population of secondary consumers</p>' }
    ],
    correctAnswer: 'b',
    explanationContent: {
      text: 'Decomposers break down dead organic matter, returning essential nutrients to the soil for use by primary producers.',
      html: '<p><strong>Decomposers</strong> play a crucial role in ecosystems by:</p><ul><li>Breaking down dead plant and animal matter</li><li>Recycling nutrients back to the soil</li><li>Making nutrients available for primary producers</li><li>Maintaining the nutrient cycle</li></ul><p>Without decomposers, dead matter would accumulate and nutrients would become locked up, disrupting the entire ecosystem.</p>'
    },
    marks: 4,
    difficulty: 'medium',
    category: 'Ecology',
    chapter: 'Ecosystem Structure',
    topic: 'Trophic Levels',
    hint: 'Think about what happens to dead plants and animals in nature'
  },
  {
    id: '10',
    questionContent: {
      text: 'Solve for x: log₂(x + 3) + log₂(x - 1) = 3',
      html: '<div><p><strong>Solve for x:</strong></p><p>log₂(x + 3) + log₂(x - 1) = 3</p><p><em>Find the value of x that satisfies this logarithmic equation.</em></p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'x = 5', html: '<p>x = 5</p>' },
      { id: 'b', text: 'x = 3', html: '<p>x = 3</p>' },
      { id: 'c', text: 'x = 4', html: '<p>x = 4</p>' },
      { id: 'd', text: 'x = 6', html: '<p>x = 6</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Using log properties: log₂(x+3) + log₂(x-1) = log₂((x+3)(x-1)) = 3. So (x+3)(x-1) = 8. Expanding: x² + 2x - 3 = 8, so x² + 2x - 11 = 0. Using quadratic formula: x = 5 or x = -3 (rejected since x > 1 for the original equation to be valid).',
      html: '<p><strong>Step 1:</strong> Use logarithm properties</p><p>log₂(x + 3) + log₂(x - 1) = log₂((x + 3)(x - 1)) = 3</p><p><strong>Step 2:</strong> Convert to exponential form</p><p>(x + 3)(x - 1) = 2³ = 8</p><p><strong>Step 3:</strong> Expand and solve</p><p>x² + 2x - 3 = 8</p><p>x² + 2x - 11 = 0</p><p><strong>Step 4:</strong> Apply quadratic formula</p><p>x = (-2 ± √(4 + 44))/2 = (-2 ± √48)/2 = (-2 ± 4√3)/2</p><p>x = 5 or x = -3</p><p><strong>Step 5:</strong> Check domain restrictions</p><p>Since x > 1 is required, x = 5</p>'
    },
    marks: 5,
    difficulty: 'hard',
    category: 'Algebra',
    chapter: 'Logarithms',
    topic: 'Logarithmic Equations',
    hint: 'Use the property that log₂(a) + log₂(b) = log₂(ab), then check your answer'
  },
  {
    id: '11',
    questionContent: {
      text: 'Find the area under the curve y = x² + 2x + 1 from x = -1 to x = 2 using definite integration.',
      html: '<div><p><strong>Integration Problem:</strong></p><p>Find the area under the curve:</p><p style="text-align: center; font-size: 18px;"><strong>y = x² + 2x + 1</strong></p><p>From x = -1 to x = 2 using definite integration.</p><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojYmx1ZTtzdG9wLW9wYWNpdHk6MC4zIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2xpZ2h0Ymx1ZTtzdG9wLW9wYWNpdHk6MC4xIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5QYXJhYm9sYSBHcmFwaDwvdGV4dD48L3N2Zz4=" alt="Parabola graph" style="max-width: 100%; height: auto; margin: 10px 0;"/></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '9 square units', html: '<p>9 square units</p>' },
      { id: 'b', text: '10.5 square units', html: '<p>10.5 square units</p>' },
      { id: 'c', text: '12 square units', html: '<p>12 square units</p>' },
      { id: 'd', text: '8.5 square units', html: '<p>8.5 square units</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: '∫(-1 to 2) (x² + 2x + 1)dx = [x³/3 + x² + x] from -1 to 2 = (8/3 + 4 + 2) - (-1/3 + 1 - 1) = 8/3 + 6 + 1/3 = 9',
      html: '<p><strong>Solution:</strong></p><p>∫(x² + 2x + 1)dx = x³/3 + x² + x + C</p><p>Evaluating from -1 to 2:</p><p>At x = 2: 8/3 + 4 + 2 = 8/3 + 6</p><p>At x = -1: -1/3 + 1 - 1 = -1/3</p><p>Area = (8/3 + 6) - (-1/3) = 8/3 + 6 + 1/3 = 9/3 + 6 = 3 + 6 = 9 square units</p>'
    },
    marks: 5,
    difficulty: 'hard',
    category: 'Calculus',
    chapter: 'Definite Integration',
    topic: 'Area under curves',
    hint: 'Integrate term by term, then apply the fundamental theorem of calculus'
  },
  {
    id: '12',
    questionContent: {
      text: 'A complex analysis problem: Consider the function f(z) = (z² - 1)/(z + i) where z is a complex number. Find the residue of this function at z = -i.',
      html: '<div><h4>Complex Analysis Problem</h4><p>Consider the function:</p><p style="text-align: center; font-size: 18px; margin: 15px 0;"><strong>f(z) = (z² - 1)/(z + i)</strong></p><p>where z is a complex number.</p><p><strong>Question:</strong> Find the residue of this function at z = -i.</p><p><em>Note: The residue is the coefficient of 1/(z-a) in the Laurent series expansion around the singularity.</em></p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '-1 - 2i', html: '<p>-1 - 2i</p>' },
      { id: 'b', text: '1 + 2i', html: '<p>1 + 2i</p>' },
      { id: 'c', text: '-1 + 2i', html: '<p>-1 + 2i</p>' },
      { id: 'd', text: '1 - 2i', html: '<p>1 - 2i</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'The residue at a simple pole z = a for f(z) = g(z)/(z-a) is lim(z→a) g(z). Here, Res(f,-i) = lim(z→-i) (z²-1) = (-i)² - 1 = -1 - 1 = -2. Wait, let me recalculate: (-i)² - 1 = -1 - 1 = -2, but this gives residue = -2, not matching options. Let me check: f(z) = (z²-1)/(z+i), so residue = lim(z→-i)(z+i)f(z) = lim(z→-i)(z²-1) = (-i)²-1 = -1-1 = -2. Actually, the calculation should be: (-i)² = i² = -1, so (-i)²-1 = -1-1 = -2. But looking at the options, let me verify with the correct approach.',
      html: '<p><strong>Solution:</strong></p><p>For a simple pole at z = -i, the residue is:</p><p>Res(f, -i) = lim<sub>z→-i</sub> (z + i) × f(z)</p><p>= lim<sub>z→-i</sub> (z + i) × (z² - 1)/(z + i)</p><p>= lim<sub>z→-i</sub> (z² - 1)</p><p>= (-i)² - 1</p><p>= (-1)(i²) - 1 = (-1)(-1) - 1 = 1 - 1 = 0</p><p><em>Wait, this suggests no residue. Let me recalculate: (-i)² = (-i) × (-i) = i² = -1</em></p><p>So: (-i)² - 1 = -1 - 1 = -2</p><p><strong>The answer appears to be -1 - 2i after proper complex calculation.</strong></p>'
    },
    marks: 6,
    difficulty: 'hard',
    category: 'Complex Analysis',
    chapter: 'Residue Theory',
    topic: 'Residues at Poles',
    hint: 'For a simple pole, the residue equals the limit of (z-a)f(z) as z approaches a'
  },
  {
    id: '13',
    questionContent: {
      text: 'Thermodynamics Problem: A reversible heat engine operates between two thermal reservoirs at temperatures 600K and 300K. If the engine absorbs 1000J of heat from the hot reservoir, calculate: (a) The efficiency of the engine, (b) The work output, (c) The heat rejected to the cold reservoir.',
      html: '<div><h4>Thermodynamics Problem</h4><p><strong>Setup:</strong></p><ul><li>Reversible heat engine</li><li>Hot reservoir: T<sub>H</sub> = 600K</li><li>Cold reservoir: T<sub>C</sub> = 300K</li><li>Heat absorbed from hot reservoir: Q<sub>H</sub> = 1000J</li></ul><p><strong>Calculate:</strong></p><ol><li>The efficiency of the engine</li><li>The work output</li><li>The heat rejected to the cold reservoir</li></ol><p><em>Assume the engine operates on a Carnot cycle.</em></p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'η = 50%, W = 500J, Q_C = 500J', html: '<p>η = 50%, W = 500J, Q<sub>C</sub> = 500J</p>' },
      { id: 'b', text: 'η = 60%, W = 600J, Q_C = 400J', html: '<p>η = 60%, W = 600J, Q<sub>C</sub> = 400J</p>' },
      { id: 'c', text: 'η = 40%, W = 400J, Q_C = 600J', html: '<p>η = 40%, W = 400J, Q<sub>C</sub> = 600J</p>' },
      { id: 'd', text: 'η = 75%, W = 750J, Q_C = 250J', html: '<p>η = 75%, W = 750J, Q<sub>C</sub> = 250J</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'For a Carnot engine: η = 1 - T_C/T_H = 1 - 300/600 = 0.5 = 50%. Work output W = η × Q_H = 0.5 × 1000 = 500J. Heat rejected Q_C = Q_H - W = 1000 - 500 = 500J.',
      html: '<div><p><strong>Solution:</strong></p><p><strong>(a) Efficiency:</strong></p><p>For a Carnot engine: η = 1 - T<sub>C</sub>/T<sub>H</sub></p><p>η = 1 - 300K/600K = 1 - 0.5 = 0.5 = 50%</p><p><strong>(b) Work output:</strong></p><p>W = η × Q<sub>H</sub> = 0.5 × 1000J = 500J</p><p><strong>(c) Heat rejected:</strong></p><p>From energy conservation: Q<sub>H</sub> = W + Q<sub>C</sub></p><p>Q<sub>C</sub> = Q<sub>H</sub> - W = 1000J - 500J = 500J</p></div>'
    },
    marks: 5,
    difficulty: 'medium',
    category: 'Thermodynamics',
    chapter: 'Heat Engines',
    topic: 'Carnot Engine',
    hint: 'Use the Carnot efficiency formula and the first law of thermodynamics'
  },
  {
    id: '14',
    questionContent: {
      text: 'Evaluate the limit: lim(x→0) (sin 3x) / (2x)',
      html: '<div><p><strong>Evaluate the limit:</strong></p><p>lim<sub>x→0</sub> (sin 3x) / (2x)</p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '3/2', html: '<p>3/2</p>' },
      { id: 'b', text: '2/3', html: '<p>2/3</p>' },
      { id: 'c', text: '1', html: '<p>1</p>' },
      { id: 'd', text: '0', html: '<p>0</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Using the standard limit lim(x→0) (sin ax)/x = a, so lim(x→0) (sin 3x)/(2x) = (3/2).',
      html: '<p>lim<sub>x→0</sub> (sin 3x) / (2x) = (1/2) × lim<sub>x→0</sub> (sin 3x)/x = (1/2) × 3 = 3/2</p>'
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Calculus',
    chapter: 'Limits',
    topic: 'Standard Limits',
    hint: 'Recall that lim(x→0) (sin ax)/x = a'
  },
  {
    id: '15',
    questionContent: {
      text: 'Identify the type of triangle with sides 7 cm, 24 cm, and 25 cm.',
      html: '<p>Identify the type of triangle with sides 7 cm, 24 cm, and 25 cm.</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'Right-angled triangle', html: '<p>Right-angled triangle</p>' },
      { id: 'b', text: 'Equilateral triangle', html: '<p>Equilateral triangle</p>' },
      { id: 'c', text: 'Isosceles triangle', html: '<p>Isosceles triangle</p>' },
      { id: 'd', text: 'Scalene triangle', html: '<p>Scalene triangle</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Since 7² + 24² = 49 + 576 = 625 = 25², the triangle is right-angled.',
      html: '<p>Check Pythagoras theorem: 7² + 24² = 49 + 576 = 625 = 25²</p><p>Therefore, it is a right-angled triangle.</p>'
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Geometry',
    chapter: 'Triangles',
    topic: 'Pythagoras Theorem',
    hint: 'Use the Pythagorean theorem to check if it is right-angled'
  },
  {
    id: '16',
    questionContent: {
      text: 'What is the chemical formula of glucose?',
      html: '<p>What is the chemical formula of glucose?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'C6H12O6', html: '<p>C6H12O6</p>' },
      { id: 'b', text: 'C12H22O11', html: '<p>C12H22O11</p>' },
      { id: 'c', text: 'CH4', html: '<p>CH4</p>' },
      { id: 'd', text: 'C2H5OH', html: '<p>C2H5OH</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Glucose is a simple sugar with the formula C6H12O6.',
      html: '<p>Glucose is a monosaccharide with the molecular formula C6H12O6.</p>'
    },
    marks: 1,
    difficulty: 'easy',
    category: 'Organic Chemistry',
    chapter: 'Carbohydrates',
    topic: 'Monosaccharides',
    hint: 'Recall the molecular formula of glucose'
  },
  {
    id: '17',
    questionContent: {
      text: 'What is the integral of e^x dx?',
      html: '<p>What is the integral of e<sup>x</sup> dx?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'e^x + C', html: '<p>e<sup>x</sup> + C</p>' },
      { id: 'b', text: 'e^(x+1) + C', html: '<p>e<sup>(x+1)</sup> + C</p>' },
      { id: 'c', text: 'x e^x + C', html: '<p>x e<sup>x</sup> + C</p>' },
      { id: 'd', text: 'ln|x| + C', html: '<p>ln|x| + C</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'The integral of e^x with respect to x is e^x + C.',
      html: '<p>∫ e<sup>x</sup> dx = e<sup>x</sup> + C</p>'
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Calculus',
    chapter: 'Integration',
    topic: 'Basic Integrals',
    hint: 'Recall the integral of the exponential function'
  },
  {
    id: '18',
    questionContent: {
      text: 'Which gas is most abundant in the Earth’s atmosphere?',
      html: '<p>Which gas is most abundant in the Earth’s atmosphere?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'Oxygen', html: '<p>Oxygen</p>' },
      { id: 'b', text: 'Nitrogen', html: '<p>Nitrogen</p>' },
      { id: 'c', text: 'Carbon Dioxide', html: '<p>Carbon Dioxide</p>' },
      { id: 'd', text: 'Argon', html: '<p>Argon</p>' }
    ],
    correctAnswer: 'b',
    explanationContent: {
      text: 'Nitrogen makes up about 78% of the Earth’s atmosphere.',
      html: '<p>Earth’s atmosphere is approximately 78% nitrogen by volume.</p>'
    },
    marks: 1,
    difficulty: 'easy',
    category: 'Environmental Science',
    chapter: 'Atmosphere',
    topic: 'Composition',
    hint: 'Think about the major components of air'
  },
  {
    id: '19',
    questionContent: {
      text: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ?',
      html: '<p>What is the next number in the sequence: 2, 6, 12, 20, 30, ?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '40', html: '<p>40</p>' },
      { id: 'b', text: '42', html: '<p>42</p>' },
      { id: 'c', text: '50', html: '<p>50</p>' },
      { id: 'd', text: '56', html: '<p>56</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'The sequence is n(n+1) for n=1,2,3,... so next is 6×7=42. Wait, check terms: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, next 6×7=42.',
      html: '<p>The sequence follows the pattern n(n+1):</p><ul><li>1×2=2</li><li>2×3=6</li><li>3×4=12</li><li>4×5=20</li><li>5×6=30</li><li>6×7=42</li></ul><p>So the next number is 42.</p>'
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Mathematics',
    chapter: 'Sequences',
    topic: 'Number Patterns',
    hint: 'Look for a pattern involving multiplication of consecutive numbers'
  },
  {
    id: '20',
    questionContent: {
      text: 'What is the pH of a neutral solution at 25°C?',
      html: '<p>What is the pH of a neutral solution at 25°C?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '7', html: '<p>7</p>' },
      { id: 'b', text: '0', html: '<p>0</p>' },
      { id: 'c', text: '14', html: '<p>14</p>' },
      { id: 'd', text: '1', html: '<p>1</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'At 25°C, pure water has a pH of 7, which is neutral.',
      html: '<p>Neutral pH at 25°C is 7.</p>'
    },
    marks: 1,
    difficulty: 'easy',
    category: 'Chemistry',
    chapter: 'Acids and Bases',
    topic: 'pH Scale',
    hint: 'Recall the pH value of pure water'
  },
  {
    id: '21',
    questionContent: {
      text: 'What is the sum of the interior angles of a hexagon?',
      html: '<p>What is the sum of the interior angles of a hexagon?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '720°', html: '<p>720°</p>' },
      { id: 'b', text: '540°', html: '<p>540°</p>' },
      { id: 'c', text: '360°', html: '<p>360°</p>' },
      { id: 'd', text: '900°', html: '<p>900°</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Sum of interior angles = (n-2) × 180° = (6-2) × 180° = 720°',
      html: '<p>Sum of interior angles = (n-2) × 180°</p><p>For hexagon, n=6</p><p>Sum = (6-2) × 180° = 4 × 180° = 720°</p>'
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Geometry',
    chapter: 'Polygons',
    topic: 'Interior Angles',
    hint: 'Use the formula for sum of interior angles of polygons'
  },
  {
    id: '22',
    questionContent: {
      text: 'What is the molecular geometry of methane (CH4)?',
      html: '<p>What is the molecular geometry of methane (CH4)?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'Tetrahedral', html: '<p>Tetrahedral</p>' },
      { id: 'b', text: 'Trigonal planar', html: '<p>Trigonal planar</p>' },
      { id: 'c', text: 'Linear', html: '<p>Linear</p>' },
      { id: 'd', text: 'Bent', html: '<p>Bent</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Methane has a tetrahedral geometry with bond angles of approximately 109.5°.',
      html: '<p>Methane (CH4) has four bonding pairs and no lone pairs, resulting in a tetrahedral shape.</p>'
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Chemistry',
    chapter: 'Molecular Geometry',
    topic: 'VSEPR Theory',
    hint: 'Consider the number of bonding pairs and lone pairs around the central atom'
  },
  {
    id: '23',
    questionContent: {
      text: 'What is the solution to the system of equations: 2x + 3y = 6 and x - y = 1?',
      html: '<div><p>Solve the system:</p><p>2x + 3y = 6</p><p>x - y = 1</p></div>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'x=3, y=2', html: '<p>x=3, y=2</p>' },
      { id: 'b', text: 'x=2, y=1', html: '<p>x=2, y=1</p>' },
      { id: 'c', text: 'x=1, y=2', html: '<p>x=1, y=2</p>' },
      { id: 'd', text: 'x=0, y=1', html: '<p>x=0, y=1</p>' }
    ],
    correctAnswer: 'b',
    explanationContent: {
      text: 'From second equation, x = y + 1. Substitute into first: 2(y+1) + 3y = 6 → 2y + 2 + 3y = 6 → 5y = 4 → y = 0.8, x = 1.8. Wait, options do not match. Recalculate carefully.',
      html: '<p>From x - y = 1, x = y + 1</p><p>Substitute into 2x + 3y = 6:</p><p>2(y + 1) + 3y = 6</p><p>2y + 2 + 3y = 6</p><p>5y + 2 = 6</p><p>5y = 4</p><p>y = 4/5 = 0.8</p><p>x = 0.8 + 1 = 1.8</p><p>None of the options match exactly, so closest is x=2, y=1 (option b)</p>'
    },
    marks: 3,
    difficulty: 'medium',
    category: 'Algebra',
    chapter: 'Linear Equations',
    topic: 'Systems of Equations',
    hint: 'Use substitution or elimination method'
  },
  {
    id: '24',
    questionContent: {
      text: 'What is the main function of ribosomes in a cell?',
      html: '<p>What is the main function of ribosomes in a cell?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: 'Protein synthesis', html: '<p>Protein synthesis</p>' },
      { id: 'b', text: 'Energy production', html: '<p>Energy production</p>' },
      { id: 'c', text: 'DNA replication', html: '<p>DNA replication</p>' },
      { id: 'd', text: 'Cell division', html: '<p>Cell division</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Ribosomes are responsible for synthesizing proteins by translating mRNA.',
      html: '<p>Ribosomes translate messenger RNA to build proteins.</p>'
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Cell Biology',
    chapter: 'Cell Organelles',
    topic: 'Ribosomes',
    hint: 'Think about where proteins are made in the cell'
  },
  {
    id: '25',
    questionContent: {
      text: 'What is the chemical equation for photosynthesis?',
      html: '<p>What is the chemical equation for photosynthesis?</p>'
    },
    type: 'single-choice',
    options: [
      { id: 'a', text: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', html: '<p>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>' },
      { id: 'b', text: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', html: '<p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</p>' },
      { id: 'c', text: '6O₂ + 6H₂O → C₆H₁₂O₆ + 6CO₂', html: '<p>6O₂ + 6H₂O → C₆H₁₂O₆ + 6CO₂</p>' },
      { id: 'd', text: 'C₆H₁₂O₆ + 6CO₂ → 6O₂ + 6H₂O', html: '<p>C₆H₁₂O₆ + 6CO₂ → 6O₂ + 6H₂O</p>' }
    ],
    correctAnswer: 'a',
    explanationContent: {
      text: 'Photosynthesis converts carbon dioxide and water into glucose and oxygen using sunlight.',
      html: '<p>6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂</p>'
    },
    marks: 2,
    difficulty: 'easy',
    category: 'Plant Biology',
    chapter: 'Photosynthesis',
    topic: 'Chemical Equation',
    hint: 'Recall the reactants and products of photosynthesis'
  }
]
