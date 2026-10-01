// ✏️ Edite aqui com suas informações — todo o site lê deste arquivo.

const GH = 'https://github.com/anacazarotto'

export const profile = {
  name: 'Ana Carla Londero Cazarotto',
  fullName: 'Ana Carla Londero Cazarotto',
  role: 'Desenvolvedora de Software Fullstack',
  tagline: 'react • typescript • tailwind • elixir • postgresql',
  location: 'Chapecó, SC',
  status: 'dev na Abensoft · Elixir & React',
  about: [
    'Desenvolvedora de software fullstack com experiência em ambientes corporativos. Hoje trabalho com TypeScript, Elixir, Tailwind e PostgreSQL — React no front-end e Phoenix no back-end. Antes, no estágio, trabalhei com C#, .NET, JavaScript e Bootstrap.',
    'Tenho forte vivência em metodologias ágeis (Scrum e Kanban) e em testes unitários e de integração, além de Python para ciência de dados e web.',
    'Também atuei com gestão de projetos junto ao PMO: estimativas de prazo, mapeamento de fluxos, KPIs e controle de horas.',
  ],
  links: {
    github: GH,
    linkedin: 'https://www.linkedin.com/in/ana-cl-cazarotto/',
    email: 'mailto:anaccazarotto@gmail.com',
    cv: '/curriculo-ana.pdf',
  },
}

export const skills = [
  { group: 'Linguagens', items: ['JavaScript', 'TypeScript', 'Elixir', 'C#', 'Python', 'SQL'] },
  { group: 'Front-end', items: ['React', 'Tailwind', 'Bootstrap', 'HTML & CSS'] },
  { group: 'Back-end', items: ['Phoenix', '.NET', 'NHibernate', 'Django', 'Node.js'] },
  { group: 'Banco de dados', items: ['PostgreSQL', 'MySQL', 'SQLite'] },
  { group: 'Práticas', items: ['Scrum', 'Kanban', 'Testes', 'QA', 'Deploy', 'Git'] },
]

// pattern: 'blank' | 'lines' | 'grid' | 'dots'
export const projects = [
  {
    id: 'heart',
    name: 'Heart AI',
    pattern: 'dots',
    title: 'Heart Disease Agent',
    description:
      'Une Machine Learning e IA generativa para estimar o risco de doença cardíaca a partir de exames clínicos e explicar o resultado em linguagem natural com um agente (Gemini). Feito em dupla com Vanessa da Silva.',
    stack: ['Python', 'Jupyter', 'Machine Learning', 'Gemini'],
    repo: `${GH}/heart_disease_agent`,
  },
  {
    id: 'estates',
    name: 'Imóveis',
    pattern: 'lines',
    title: 'Scraping de Imóveis',
    description:
      'Coleta automática de imóveis à venda em Chapecó/SC a partir de vários sites e APIs de imobiliárias, com os dados normalizados num banco SQLite.',
    stack: ['Python', 'Web Scraping', 'SQLite'],
    repo: `${GH}/scrapping-estates`,
  },
  {
    id: 'weather',
    name: 'ESP32',
    pattern: 'grid',
    title: 'Estação Meteorológica',
    description:
      'Estação meteorológica com ESP32 e sensor BMP280: temperatura, pressão e altitude exibidas em tempo real num servidor web na rede local.',
    stack: ['C', 'ESP32', 'IoT', 'I2C'],
    repo: `${GH}/EstacaoMetereologica`,
  },
  {
    id: 'library',
    name: 'Biblioteca',
    pattern: 'blank',
    title: 'Sistema de Biblioteca',
    description:
      'Sistema de biblioteca fullstack com API em Node.js + Express sobre PostgreSQL e front-end em React, modelado a partir de um diagrama ER.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    repo: `${GH}/BibliotecaNode`,
  },
  {
    id: 'exmon',
    name: 'ExMon',
    pattern: 'dots',
    title: 'ExMon',
    description: 'Projeto de estudo em Elixir, explorando programação funcional.',
    stack: ['Elixir'],
    repo: `${GH}/ExMon`,
  },
  {
    id: 'chess',
    name: 'Xadrez',
    pattern: 'grid',
    title: 'Xadrez em C#',
    description: 'Jogo de xadrez simples para ser jogado no console, desenvolvido em C#.',
    stack: ['C#', '.NET', 'POO'],
    repo: `${GH}/JogoXadrezCSharp`,
  },
]

export const experience = [
  {
    period: 'jan 2025 — hoje',
    title: 'Desenvolvedora de Software',
    place: 'Abensoft',
    details: [
      'Aplicações em Elixir com o framework Phoenix e PostgreSQL.',
      'Interfaces em React com TypeScript, Tailwind e Bootstrap.',
      'Testes unitários e de integração.',
      'Investigação de bugs, QA manual, deploys em produção e acompanhamento de versões.',
      'Kanban, com foco em entregas contínuas.',
    ],
    stack: ['Elixir', 'Phoenix', 'React', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Bootstrap'],
  },
  {
    period: 'jan 2024 — dez 2024',
    title: 'Estagiária em Desenvolvimento e Projetos',
    place: 'MultiTMS',
    details: [
      'Back-end em C# com .NET, NHibernate e MySQL, em arquitetura MVC.',
      'Front-end em JavaScript e Bootstrap.',
      'Estimativas de demandas junto ao Escritório de Projetos (PMO).',
      'Mapeamento e melhoria de fluxos, KPIs e controle de horas por atividade.',
    ],
    stack: ['C#', '.NET', 'NHibernate', 'MySQL', 'JavaScript', 'Bootstrap'],
  }
]

export const education = [
  {
    period: '2023 — 2026',
    title: 'Sistemas de Informação',
    place: 'Unoesc',
    details: [
      'Certificação intermediária: Desenvolvimento de Sistemas Web (2024).',
      'Certificação intermediária: Análises e Processos de Sistemas (2025).',
      'Certificação intermediária: Gestão de Infraestrutura e Projeto de TIC (2026).',
    ],
  },
  {
    period: '2017 — 2022',
    title: 'Arquitetura e Urbanismo',
    place: 'Unoesc',
    details: ['Graduação concluída.'],
  },
]
