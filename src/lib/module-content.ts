export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ClassifyItem {
  text: string;
  correctCategory: string;
  explanation: string;
}

export interface InteractiveActivity {
  instructions: string;
  categories: string[];
  items: ClassifyItem[];
}

export interface ModuleResource {
  title: string;
  description: string;
  url?: string;
  licenceNote?: string;
}

export interface ModuleContent {
  introParagraphs: string[];
  video: { title: string; youtubeId: string; durationLabel: string } | null;
  keyConcepts: string[];
  interactive: InteractiveActivity | null;
  reflectionPrompt: string;
  quiz: QuizQuestion[];
  resources: ModuleResource[];
  references: string[];
}

// Content is drawn directly from the source OER proposal deck
// ("Assess with Purpose.pdf") wherever available. Where the deck had
// no material (Modules 4 & 5 read sections), content is grounded in
// externally verified sources, cited in full below — nothing here is
// invented. Quiz questions and the interactive classification
// activities are original instructional-design work written to test
// the concepts above; they are drafts pending your review.
export const moduleContent: Record<string, ModuleContent> = {
  "assessment-literacy": {
    introParagraphs: [
      "Assessment literacy refers to the knowledge and understanding required to design, implement, interpret, and use assessments effectively to support student learning and educational outcomes.",
      "It involves appreciating the relationship between assessment and learning, a conceptual understanding of assessment, understanding assessment criteria and standards, being skilful in peer and self-assessment, and being able to choose and apply suitable assessment methods.",
    ],
    video: {
      title: "Assessment Literacy (Educational Assessment, Episode 5)",
      youtubeId: "ELwqhZ-JQtA",
      durationLabel: "approximately 36 minutes",
    },
    keyConcepts: [
      "Knowledge of the purpose of the assessment",
      "Knowledge of what to assess",
      "Knowledge of assessment strategies",
      "Knowledge of assessment interpretation and action-taking",
    ],
    interactive: {
      instructions:
        "Each scenario below relates to one aspect of assessment literacy (Price et al., 2012). Sort each one into the aspect it best illustrates.",
      categories: [
        "Assessment purpose",
        "What to assess",
        "Assessment strategies",
        "Assessment interpretation",
      ],
      items: [
        {
          text: "A lecturer decides whether a quiz should be graded or ungraded, depending on whether she wants to check understanding or assign a final mark.",
          correctCategory: "Assessment purpose",
          explanation:
            "This is about appreciating *why* the assessment is happening — formative versus summative purpose.",
        },
        {
          text: "A lecturer chooses between a written exam, an oral presentation, and a portfolio to test the same learning outcome.",
          correctCategory: "Assessment strategies",
          explanation:
            "Choosing and applying a suitable method for the outcome is exactly what 'knowledge of assessment strategies' means.",
        },
        {
          text: "After marking, a lecturer notices most students struggled with one specific concept and adjusts next week's lecture.",
          correctCategory: "Assessment interpretation",
          explanation:
            "Interpreting results and taking action based on them is the fourth aspect of assessment literacy.",
        },
        {
          text: "A lecturer maps each assessment item back to the specific learning outcome it is meant to test.",
          correctCategory: "What to assess",
          explanation:
            "This reflects knowing precisely what content or outcome an assessment should target.",
        },
      ],
    },
    reflectionPrompt:
      "Think about the assessments you currently set. Which of the four aspects of assessment literacy above do you feel most confident in, and which would you like to develop further?",
    quiz: [
      {
        question:
          "According to Price et al. (2012), which of the following is NOT one of the core aspects of assessment literacy?",
        options: [
          "Knowledge of the purpose of the assessment",
          "Knowledge of assessment strategies",
          "Knowledge of the institution's marketing strategy",
          "Knowledge of assessment interpretation and action-taking",
        ],
        correctIndex: 2,
        explanation:
          "The four core aspects are purpose, what to assess, strategies, and interpretation/action-taking. Marketing strategy isn't part of assessment literacy.",
      },
      {
        question: "Assessment literacy is best described as:",
        options: [
          "The ability to design, implement, interpret and use assessment effectively to support learning",
          "The ability to write multiple-choice questions quickly",
          "A fixed score awarded after a training course",
          "A synonym for summative assessment",
        ],
        correctIndex: 0,
        explanation:
          "Assessment literacy is the broader knowledge and skill set needed to use assessment well — not a single skill or score.",
      },
      {
        question:
          "Which factor have Xu et al. (2024) linked to lecturers strengthening students' assessment literacy?",
        options: [
          "Timetable colour-coding",
          "An academic's autonomy support and students' critical reflection",
          "The number of windows in the lecture hall",
          "The price of the prescribed textbook",
        ],
        correctIndex: 1,
        explanation:
          "Xu et al. (2024) found that an academic's autonomy support, alongside students' self-efficacy and critical reflection, are key determinants of students' assessment literacy.",
      },
    ],
    resources: [
      {
        title: "Teacher assessment literacy: a systematic review",
        description:
          "Pastore, S. (2023). A systematic review of 42 studies on how assessment literacy has been defined and researched over the past decade.",
        url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2023.1217167/full",
        licenceNote: "Open access — Creative Commons Attribution (CC BY) licence.",
      },
    ],
    references: [
      "Price, M., Rust, C., O'Donovan, B., Handley, K. & Bryant, R., 2012, Assessment literacy: The foundation of improving student learning, ASKe, Oxford Centre for Staff and Learning Development, Oxford.",
      "DeLuca, C., Coombs, A. & LaPointe-McEwan, D., 2019, 'Assessment mindset: Exploring the relationship between teacher mindset and approaches to classroom assessment', Studies in Educational Evaluation, 61, 159–169.",
      "Zhu, X. and Evans, C., 2024. Enhancing the development and understanding of assessment literacy in higher education. European Journal of Higher Education, 14(1), pp.80-100.",
      "Xu, J., Zhang, S. and Chen, H., 2024. The impact of teacher autonomy support on students' assessment literacy. Heliyon, 10(14).",
      "Schneider, M., & Preckel, F., 2017, 'Variables associated with achievement in higher education', Psychological Bulletin, 143(6), 565–600.",
    ],
  },
  "role-of-assessment": {
    introParagraphs: [
      "Assessment is, in its broadest sense, the process of gathering information — and the purpose of an assessment influences the strategies, tools and methods used to carry it out.",
      "The Latin verb ad sedere or assidere, meaning 'to sit down beside', is the origin of the term 'assess'. This highlights the active role students play in the process: assessment is not something done to students, but a process they sit alongside and participate in.",
    ],
    video: {
      title: "What every teacher needs to know about assessment",
      youtubeId: "waRX-IOR5vE",
      durationLabel: "approximately 22 minutes",
    },
    keyConcepts: [
      "Assessment is pedagogical whether or not pedagogy is intended — how assessment is conducted has consequences for student engagement and learning.",
      "Students learn from the pedagogical practice itself, and also learn things about themselves through assessment.",
      "The relationship between learning and assessment is often still perceived by students as only a grade.",
    ],
    interactive: {
      instructions:
        "Sort each assessment practice according to whether it is done TO students, or WITH students (the 'sit down beside' idea of assessment).",
      categories: ["Assessment done TO students", "Assessment done WITH students"],
      items: [
        {
          text: "Students submit a test and receive only a percentage mark, with no explanation.",
          correctCategory: "Assessment done TO students",
          explanation:
            "There's no active involvement or dialogue — the mark is simply delivered.",
        },
        {
          text: "Students complete a self-assessment checklist before submitting, comparing their work to the criteria.",
          correctCategory: "Assessment done WITH students",
          explanation:
            "This invites active participation, echoing the 'sit down beside' origin of the word 'assess'.",
        },
        {
          text: "A lecturer sets a surprise test with no prior indication of what will be assessed.",
          correctCategory: "Assessment done TO students",
          explanation:
            "Students have no opportunity to engage with the purpose or criteria beforehand.",
        },
        {
          text: "Students discuss the marking rubric together before starting the assignment.",
          correctCategory: "Assessment done WITH students",
          explanation:
            "Discussing criteria together builds shared understanding and active involvement.",
        },
      ],
    },
    reflectionPrompt:
      "Consider one assessment task you use regularly. What might your students be learning about themselves — not just the subject — through that task?",
    quiz: [
      {
        question: "The word 'assess' originates from a Latin verb meaning:",
        options: [
          "To sit down beside",
          "To measure precisely",
          "To rank in order",
          "To punish",
        ],
        correctIndex: 0,
        explanation:
          "'Assess' comes from ad sedere / assidere — 'to sit down beside' — implying active involvement in the process.",
      },
      {
        question: "According to Hay et al. (2015), assessment is:",
        options: [
          "Only pedagogical when a lecturer intends it to be",
          "Pedagogical whether or not pedagogy is intended",
          "Unrelated to student engagement",
          "Only relevant at the end of a course",
        ],
        correctIndex: 1,
        explanation:
          "How assessment is conducted always has consequences for student engagement and learning, regardless of intent.",
      },
      {
        question:
          "A common way students perceive the relationship between learning and assessment is that it is:",
        options: [
          "An opportunity to learn about themselves",
          "Only about the grade",
          "A collaborative process",
          "A form of feedback",
        ],
        correctIndex: 1,
        explanation:
          "Research notes that students often still perceive assessment as being only about the grade, rather than as part of learning.",
      },
    ],
    resources: [
      {
        title: "Learning through assessment: An approach towards Self-Directed Learning",
        description:
          "Edited by Elsa Mentz & Anitia Lubbe (NWU Self-Directed Learning Series, Vol. 7). Open access book — includes the full 'Self-directed learning-oriented assessment and assessment literacy' chapter.",
        url: "https://books.aosis.co.za/index.php/ob/catalog/view/280/334/5061-1",
        licenceNote: "Open Access — freely downloadable via AOSIS Books.",
      },
    ],
    references: [
      "Lubbe, A. & Mentz, E., 2021, 'Self-directed learning-oriented assessment and assessment literacy', in E. Mentz & A. Lubbe (eds.), Learning through assessment, pp. 1–25, AOSIS, Cape Town.",
      "Hay, P. et al., 2015 (as cited in Lubbe & Mentz, 2021).",
      "Bachman, L. & Palmer, A., 2010 (as cited in Lubbe & Mentz, 2021).",
    ],
  },
  "basics-of-assessment": {
    introParagraphs: [
      "Assessment terminology can be confusing because the same ideas are described in several different, overlapping ways. This module unpacks the basic nomenclature: forms, types, approaches, methods, instruments and tools of assessment.",
      "Forms of assessment describe the function that evidence from an assessment serves — formative and summative assessment are the two key forms.",
    ],
    video: null,
    keyConcepts: [
      "Formative assessment: usually informal, ongoing, low stakes — used to improve teaching and learning and diagnose difficulties.",
      "Summative assessment: usually formal, cumulative, high stakes — used to evaluate learning outcomes and inform promotion decisions.",
      "Approaches to assessment: assessment of learning (AoL), assessment for learning (AfL), and assessment as learning (AaL).",
      "Assessment methods (e.g. peer, self- and co-assessment) are the tasks students undertake; assessment instruments (e.g. tests, portfolios) gauge knowledge or skill; assessment tools (e.g. rubrics, checklists) guide how work is evaluated.",
    ],
    interactive: {
      instructions:
        "Classify each example as primarily Formative or Summative assessment.",
      categories: ["Formative", "Summative"],
      items: [
        {
          text: "A weekly online quiz that doesn't count towards the final grade, used to check understanding.",
          correctCategory: "Formative",
          explanation: "Low stakes and ongoing — used to improve learning, not to grade it.",
        },
        {
          text: "A final invigilated exam at the end of the semester.",
          correctCategory: "Summative",
          explanation: "High stakes, cumulative, and used to evaluate the learning outcome.",
        },
        {
          text: "Students exchange essay drafts and give each other feedback before final submission.",
          correctCategory: "Formative",
          explanation: "Informal, ongoing, and aimed at improving the work before it counts.",
        },
        {
          text: "A national licensing exam required to qualify for a profession.",
          correctCategory: "Summative",
          explanation: "Formal and high-stakes, used for a placement/qualification decision.",
        },
        {
          text: "Question-and-answer discussion during a lecture to check who is following.",
          correctCategory: "Formative",
          explanation: "Informal, in-the-moment, and diagnostic rather than graded.",
        },
      ],
    },
    reflectionPrompt:
      "Pick one assessment you currently use. Is it primarily formative or summative — and does that match how you actually use the results?",
    quiz: [
      {
        question: "Which of these is a characteristic of formative assessment?",
        options: [
          "High stakes",
          "Usually informal and ongoing",
          "Occurs only after instruction",
          "Used for promotion decisions",
        ],
        correctIndex: 1,
        explanation:
          "Formative assessment is typically informal, low-stakes, and happens throughout instruction — not just at the end.",
      },
      {
        question: "Assessment FOR learning (AfL) is best described as:",
        options: [
          "A summative judgement resulting in a final grade",
          "A formative process where students track their own progress towards standards",
          "A test used only to rank students",
          "An assessment type used only in large classes",
        ],
        correctIndex: 1,
        explanation:
          "AfL involves students actively tracking their progress towards learning standards, making it more student-centred than formative assessment alone.",
      },
      {
        question:
          "Which of the following is an assessment TOOL, rather than an instrument or method?",
        options: ["A portfolio", "Peer assessment", "A rubric", "An examination"],
        correctIndex: 2,
        explanation:
          "Rubrics, checklists and exemplars are tools used alongside instruments/methods to guide how work is evaluated.",
      },
      {
        question: "Assessment AS learning (AaL) is centred on:",
        options: [
          "Instructor-only judgement",
          "Student-driven self-assessment, self-regulation and metacognition",
          "External moderation",
          "Norm-referencing",
        ],
        correctIndex: 1,
        explanation:
          "AaL empowers students to become active, self-monitoring participants in their own learning.",
      },
    ],
    resources: [
      {
        title: "Formative & Summative Assessments",
        description:
          "Poorvu Center for Teaching and Learning, Yale University — a concise practical guide to the two forms of assessment covered in this module.",
        url: "https://poorvucenter.yale.edu/teaching/teaching-resource-library/formative-summative-assessments",
        licenceNote: "External institutional resource — check licence before reuse or adaptation.",
      },
    ],
    references: [
      "Dixon, D.D. & Worrell, F.C., 2016 (formative/summative characteristics table).",
      "Wiliam, D., 2011 (forms of assessment).",
      "Killen, R., 2017 (types of assessment).",
    ],
  },
  feedback: {
    introParagraphs: [
      "The short answer is yes — feedback really is that important. What do you understand feedback to be? Whose responsibility is it to provide? When and how should it be given — and do your students actually use it?",
      "Henderson et al. (2019) analysed feedback practice across a large, multi-institution study and proposed a set of conditions that make feedback effective in higher education, grouped into three areas: capacity for feedback, designs for feedback, and culture of feedback.",
    ],
    video: {
      title: "Recess: Feedback with Professor Naomi Winstone",
      youtubeId: "dphgPQYIRM0",
      durationLabel: "approximately 2 minutes",
    },
    keyConcepts: [
      "Capacity for feedback: students and educators understand and value feedback, are active in the feedback process, and have access to appropriate space and technology (Henderson et al., 2019).",
      "Designs for feedback: information provided is usable, tailored to learners' needs, drawn from a variety of sources, and aligned with the outcomes of multiple tasks (Henderson et al., 2019).",
      "Culture of feedback: feedback is a valued, visible enterprise at all levels, with consistent processes and leadership commitment (Henderson et al., 2019).",
      "\"When we give a grade as part of our feedback, students routinely read (or listen) only as far as the grade.\" — Peter Johnston",
      "\"Effective feedback occurs during the learning while there is still time to act on it.\" — Jan Chappuis",
      "\"Students need to know their learning target — the specific skill they're supposed to learn — or the feedback is just telling them what to do.\" — Susan Brookhart",
      "The feedback loop: seeking feedback → understanding the feedback → using the feedback to learn.",
    ],
    interactive: {
      instructions:
        "Sort each feedback practice into 'Effective feedback practice' or 'Practice to avoid', based on the principles above.",
      categories: ["Effective feedback practice", "Practice to avoid"],
      items: [
        {
          text: "Feedback is given only as a percentage grade, with no accompanying comment.",
          correctCategory: "Practice to avoid",
          explanation:
            "Peter Johnston notes students routinely read only as far as the grade when one is given alongside feedback.",
        },
        {
          text: "Feedback is provided while there is still time for students to act on it before a similar task.",
          correctCategory: "Effective feedback practice",
          explanation: "This reflects Jan Chappuis's point that timing is central to effective feedback.",
        },
        {
          text: "Students are told the specific learning target before receiving feedback on their work.",
          correctCategory: "Effective feedback practice",
          explanation:
            "Susan Brookhart argues students need to know their learning target for feedback to be more than an instruction.",
        },
        {
          text: "Feedback is returned several weeks after submission, once the class has moved on to new content.",
          correctCategory: "Practice to avoid",
          explanation: "By the time feedback arrives, there is no opportunity left to act on it.",
        },
      ],
    },
    reflectionPrompt:
      "Think about the feedback you gave on your most recent assessment task. Using the three conditions above (capacity, design, culture) — which was strongest, and which would most improve your students' use of that feedback?",
    quiz: [
      {
        question:
          "According to Henderson et al. (2019), effective feedback depends on conditions across which three areas?",
        options: [
          "Capacity for feedback, designs for feedback, and culture of feedback",
          "Grades, rankings, and certificates",
          "Class size, room layout, and lighting",
          "Attendance, punctuality, and dress code",
        ],
        correctIndex: 0,
        explanation:
          "Henderson et al. (2019) group the conditions that enable effective feedback into capacity, design and culture.",
      },
      {
        question:
          "Peter Johnston observes that when a grade is given alongside feedback, students typically:",
        options: [
          "Read the comments closely and ignore the grade",
          "Read only as far as the grade",
          "Request a remark",
          "Share the feedback with peers",
        ],
        correctIndex: 1,
        explanation:
          "This is why many feedback-literacy approaches recommend withholding the grade until students have engaged with the comments.",
      },
      {
        question: "Jan Chappuis argues that effective feedback occurs:",
        options: [
          "Only in the final exam",
          "During the learning, while there is still time to act on it",
          "After the course has ended",
          "Once a year",
        ],
        correctIndex: 1,
        explanation: "Timing matters — feedback needs to arrive while it can still be used.",
      },
    ],
    resources: [
      {
        title: "Conditions that enable effective feedback",
        description:
          "Henderson, M., Phillips, M., Ryan, T., Boud, D., Dawson, P., Molloy, E. & Mahoney, P. (2019). Higher Education Research & Development, 38(7), 1401–1416.",
        url: "https://doi.org/10.1080/07294360.2019.1657807",
        licenceNote: "External academic publication — check publisher terms before reuse.",
      },
    ],
    references: [
      "Henderson, M., Phillips, M., Ryan, T., Boud, D., Dawson, P., Molloy, E. & Mahoney, P., 2019, 'Conditions that enable effective feedback', Higher Education Research & Development, 38(7), 1401–1416.",
      "Nash, R. & Winstone, N. (as cited in the Assessment Hub 'Feedback for Learning' infographic).",
      "Wiggins, G.; Wiliam, D.; Johnston, P.; Chappuis, J.; Brookhart, S. (quotes as compiled in the Assessment Hub 'Feedback for Learning' infographic).",
    ],
  },
  "large-classes": {
    introParagraphs: [
      "Large classes bring real constraints — limited marking time, staff shortages, and the challenge of giving each student meaningful, individual attention. But these constraints don't have to mean abandoning good assessment practice; they call for strategies designed to work at scale.",
      "This module draws on established large-class teaching resources to outline approaches that keep assessment fair, manageable and still learning-focused, even with very high student numbers.",
    ],
    video: {
      title: "Improving Learning Outcomes in Large Lecture Classes",
      youtubeId: "Q15KctKbgwI",
      durationLabel: "approximately 6 minutes",
    },
    keyConcepts: [
      "Peer assessment is often used as a time-saving device in large classes — while also building students' critical thinking and self-regulation skills.",
      "Classroom Assessment Techniques (CATs), such as the 'one-minute paper' or 'muddiest point' exercise, give quick, low-stakes insight into student understanding without individual marking.",
      "Two-stage exams let students complete an assessment individually first, then revisit sections collaboratively — combining individual accountability with peer learning.",
      "Shared rubrics and moderated sampling help multiple markers (or a single marker working at scale) apply criteria consistently and fairly.",
    ],
    interactive: {
      instructions:
        "Match each large-class challenge to the strategy best suited to address it.",
      categories: [
        "Classroom Assessment Technique (CAT)",
        "Two-stage exam",
        "Rubric-based sampling",
        "Peer assessment",
      ],
      items: [
        {
          text: "You want quick, low-stakes insight into what 300 students understood from today's lecture, without marking anything individually.",
          correctCategory: "Classroom Assessment Technique (CAT)",
          explanation:
            "A one-minute paper or similar CAT gives fast diagnostic insight with minimal marking load.",
        },
        {
          text: "You want students to benefit from peer discussion during a high-stakes exam, while still holding individuals accountable.",
          correctCategory: "Two-stage exam",
          explanation:
            "Two-stage exams combine an individual attempt with a follow-up collaborative stage.",
        },
        {
          text: "You need to mark 250 long-form assignments fairly and consistently within a tight turnaround.",
          correctCategory: "Rubric-based sampling",
          explanation:
            "A shared rubric plus moderated sampling helps maintain consistency at scale.",
        },
        {
          text: "You want to reduce your own marking load while helping students engage critically with the assessment criteria.",
          correctCategory: "Peer assessment",
          explanation:
            "Peer assessment shifts some evaluative work to students while deepening their understanding of the criteria.",
        },
      ],
    },
    reflectionPrompt:
      "Which of these strategies could you realistically trial in your largest class next semester — and what would need to change in your current assessment design to make it work?",
    quiz: [
      {
        question: "In large classes, peer assessment is often used primarily to:",
        options: [
          "Replace all lecturer input",
          "Save marking time while still providing students with feedback",
          "Reduce student engagement",
          "Avoid using rubrics",
        ],
        correctIndex: 1,
        explanation:
          "Peer assessment is valued as a time-saving device that still gives students feedback and builds their evaluative skills.",
      },
      {
        question: "A two-stage exam allows students to:",
        options: [
          "Only ever work alone",
          "Complete the exam individually, then revisit parts of it collaboratively",
          "Skip the exam if they attended all lectures",
          "Choose their own exam date",
        ],
        correctIndex: 1,
        explanation:
          "This structure balances individual accountability with the benefits of peer learning.",
      },
      {
        question:
          "Classroom Assessment Techniques (CATs) such as the 'one-minute paper' are useful because they:",
        options: [
          "Provide low-stakes, efficient insight into student understanding",
          "Replace the need for a final assessment",
          "Are only suitable for small classes",
          "Require no lecturer involvement at all",
        ],
        correctIndex: 0,
        explanation:
          "CATs are designed to be quick to administer and review, even with very large cohorts.",
      },
    ],
    resources: [
      {
        title: "A Guide to Large Classroom Assessments",
        description:
          "York University Teaching Commons — practical strategies including CATs, two-stage exams and peer/self-assessment for large enrolment classes.",
        url: "https://www.yorku.ca/teachingcommons/wp-content/uploads/sites/38/2021/02/Guide_large_classroom_assessments_FINALa.pdf",
        licenceNote: "External institutional resource — check licence before reuse or adaptation.",
      },
    ],
    references: [
      "York University Teaching Commons, A Guide to Large Classroom Assessments.",
      "University of Colorado Boulder Center for Teaching & Learning, Assessment in Large Enrollment Classes.",
    ],
  },
};
