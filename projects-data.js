/* ============================================================
   PROJECTS & RESEARCH DATA — the only file you edit to add or
   change a project page.

   HOW TO ADD A PAGE:
   1. Copy any entry below, give it a new key (the id).
   2. Fill in the fields (all text + image paths live here).
   3. Link to it from anywhere as:  project.html?id=YOUR_KEY

   FIELDS:
   - type      "Research Area" | "Project"        (breadcrumb label)
   - accent    "plum" | "blue" | "teal"           (page color theme)
   - eyebrow   small label above the title
   - title     page title
   - subtitle  one-sentence hook under the title
   - heroImage large image at the top (no video on detail pages)
   - intro     opening paragraph (blog-style lede)
   - stats     optional row of quick facts [{ value, label }]
   - vision    { text, image }   section 01
   - mission   { text }          section 02 (rendered on a color panel)
   - activities [{ title, text, image }]  section 03 cards
   - publications optional [{ title, venue, date, href }]
   - cta       { title, text, primaryLabel, primaryHref,
                 secondaryLabel, secondaryHref }

   Every section is optional: delete a field and the template
   simply skips that section.

   TODO: all copy below is a starting draft based on your site —
   rewrite it in your own voice and swap in real photos.
   ============================================================ */

const PROJECTS_DATA = {

  /* ---------------- RESEARCH AREAS ---------------- */

  "physical-ai": {
    type: "Research Area",
    accent: "plum",
    eyebrow: "The Body",
    title: "Physical AI",
    subtitle: "Embodied intelligence that perceives, touches, and manipulates the real world.",
    heroImage: "img/physical-ai.jpg",
    intro: "Intelligence is not only computation — it is contact. Physical AI studies how robots sense, grasp, and act in unstructured environments, from tactile perception to dual-arm manipulation, so that intelligent systems can be useful where life actually happens: homes, factories, and shared workplaces.",
    stats: [
      { value: "2+", label: "Robotic platforms in active use" },
      { value: "5", label: "Peer-reviewed articles in this line" },
      { value: "3", label: "Student internship projects hosted" }
    ],
    vision: {
      text: "A world where robots handle the physical work that is dull, dirty, or dangerous — with the dexterity to be genuinely helpful and the safety to share space with people. We believe embodiment is the missing ingredient for AI that matters beyond the screen.",
      image: "img/physical-ai.jpg"
    },
    mission: {
      text: "To develop perception and manipulation methods — tactile sensing, active inference, dual-arm coordination — that make embodied agents capable, robust, and verifiably safe in real deployments, not only in simulation."
    },
    activities: [
      {
        title: "Tactile-based active inference",
        text: "Teaching robots to explore and identify objects through touch, nominated for the Best Paper Award at IEEE/SICE SII 2026.",
        image: "img/sii-2026.png"
      },
      {
        title: "Dual-arm manipulation",
        text: "Coordinated UR5e + xArm7 control for real-world sorting and assembly tasks on the ROBOCYCLE platform.",
        image: "img/physical-ai.jpg"
      },
      {
        title: "Simulation-to-reality pipelines",
        text: "Benchmarking ROS-compatible simulators to close the gap between virtual training and physical deployment.",
        image: "img/ros.png"
      }
    ],
    publications: [
      { title: "Tactile-Based Active Inference", venue: "IEEE/SICE SII 2026 — Best Paper Award Nominee", date: "Jan 2026", href: "news/award-sii-nomination-jan-10-2026.html" },
      { title: "ROS-Compatible Robotics Simulators for Industry 4.0 and 5.0", venue: "Applied Sciences (MDPI)", date: "Aug 2025", href: "news/paper-simulators-august-04-2025.html" }
    ],
    cta: {
      title: "Build robots that touch the real world.",
      text: "Internship topics in tactile sensing, manipulation, and sim-to-real are open for 2026–2027.",
      primaryLabel: "Application Instructions",
      primaryHref: "join.html",
      secondaryLabel: "All Research Areas",
      secondaryHref: "index.html#research"
    }
  },

  "agentic-ai": {
    type: "Research Area",
    accent: "blue",
    eyebrow: "The Brain",
    title: "Agentic AI",
    subtitle: "Cognition for autonomy: agents that decide what to do next — and do it responsibly.",
    heroImage: "img/ros.png",
    intro: "Large language models can talk; agentic systems act. This research line studies the post-ChatGPT shift toward AI that plans, decides, and executes in the world — and builds the accountability frameworks that Industry 5.0 will demand of it.",
    stats: [
      { value: "RAR", label: "Responsible Agentic Robotics framework" },
      { value: "5.0", label: "Industry generation we design for" }
    ],
    vision: {
      text: "Autonomous agents that people can delegate to with confidence: transparent about their goals, predictable in their limits, and aligned with the humans and organizations they serve.",
      image: "img/ros.png"
    },
    mission: {
      text: "To define and validate the Responsible Agentic Robotics (RAR) framework — bridging LLM-based reasoning with embodied execution while keeping sustainability and human oversight at the core."
    },
    activities: [
      {
        title: "The RAR framework",
        text: "A published roadmap for responsible agentic robotics in Industry 5.0, in the journal Robotics.",
        image: "img/physical-ai.jpg"
      },
      {
        title: "Agent architectures",
        text: "Connecting language-model planners to real robot middleware through NEP+ and ROS.",
        image: "img/ros.png"
      },
      {
        title: "Accountability by design",
        text: "Methods for logging, explaining, and bounding autonomous decisions before deployment.",
        image: "img/teleop.png"
      }
    ],
    publications: [
      { title: "Post-ChatGPT Era: Agentic AI in Industry 5.0", venue: "Robotics (MDPI)", date: "Mar 2026", href: "news/paper-robotics-march-12-2026.html" }
    ],
    cta: {
      title: "Give agents judgment, not just power.",
      text: "Join us in shaping how autonomous AI earns trust in the physical world.",
      primaryLabel: "Application Instructions",
      primaryHref: "join.html",
      secondaryLabel: "All Research Areas",
      secondaryHref: "index.html#research"
    }
  },

  "people-centric-robotics": {
    type: "Research Area",
    accent: "teal",
    eyebrow: "The Heart",
    title: "People-Centric Robotics",
    subtitle: "Systems that work with people, not just for them.",
    heroImage: "img/teleop.png",
    intro: "The hardest problems in robotics are not mechanical — they are human. This line develops the measures, methods, and interaction designs that put well-being at the center of human-robot collaboration, from factory floors to hybrid offices.",
    vision: {
      text: "Robots evaluated not only on speed and accuracy, but on what they do to the people around them: attention, comfort, dignity, and quality of life.",
      image: "img/teleop.png"
    },
    mission: {
      text: "To create human-centered evaluation frameworks — award-recognized measures and metrics for HRI quality — and apply them in real studies with real users."
    },
    activities: [
      {
        title: "HRI quality metrics",
        text: "A systematic classification of performance and human-centered factors, recognized with the AIST ITH Best Paper Award.",
        image: "img/asit.png"
      },
      {
        title: "Social robots for well-being",
        text: "The Axobotl study: can a desk robot support concentration and emotional balance in hybrid work?",
        image: "img/heart1.png"
      },
      {
        title: "XR for human-robot interaction",
        text: "Virtual, mixed, and augmented reality tools that make robot programming and teleoperation accessible.",
        image: "img/teleop.png"
      }
    ],
    publications: [
      { title: "Evaluating Quality in Human-Robot Interaction", venue: "AIST ITH Best Paper Award", date: "Feb 2024", href: "news/award-aist-ith-best-paper-feb-29-2024.html" },
      { title: "Integrating VR, MR, and AR to HRI Applications Using Game Engines", venue: "Applied Sciences (MDPI)", date: "Jan 2023", href: "news/paper-xr-hri-jan-18-2023.html" }
    ],
    cta: {
      title: "Measure what matters to humans.",
      text: "User-study and interaction-design internships are open for 2026–2027.",
      primaryLabel: "Application Instructions",
      primaryHref: "join.html",
      secondaryLabel: "All Research Areas",
      secondaryHref: "index.html#research"
    }
  },

  "digital-twins": {
    type: "Research Area",
    accent: "blue",
    eyebrow: "Infrastructure",
    title: "Digital Twins & XR",
    subtitle: "Bridging NEP+ and ROS for accessible human-robot collaboration.",
    heroImage: "img/ros.png",
    intro: "Before a robot moves in the world, it should move in a model of it. This line builds accessible, distributed, platform-independent digital-twin architectures — and the XR interfaces that let anyone step inside them.",
    vision: {
      text: "Digital twins that are not a luxury of large factories but an everyday tool: open, distributed, and usable by students, SMEs, and researchers alike.",
      image: "img/ros.png"
    },
    mission: {
      text: "To bridge NEP+ and ROS into Industry 5.0 digital-twin architectures, and to map the game-engine XR toolchain that makes immersive robot programming practical."
    },
    activities: [
      {
        title: "NEP+ / ROS bridge",
        text: "A published framework for distributed, platform-independent digital twins for human-robot collaboration.",
        image: "img/ros.png"
      },
      {
        title: "XR toolchain reviews",
        text: "Identifying accessible software for VR, AR, and MR experiences across social robotics and teleoperation.",
        image: "img/teleop.png"
      }
    ],
    publications: [
      { title: "A Path to Industry 5.0 Digital Twins by Bridging NEP+ and ROS", venue: "Robotics (MDPI)", date: "Feb 2024", href: "news/paper-digital-twins-feb-13-2024.html" }
    ],
    cta: {
      title: "Model first, deploy safely.",
      text: "Software-focused internships in middleware and XR are open for 2026–2027.",
      primaryLabel: "Application Instructions",
      primaryHref: "join.html",
      secondaryLabel: "All Research Areas",
      secondaryHref: "index.html#research"
    }
  },

  /* ---------------- PROJECTS ---------------- */

  "robocycle": {
    type: "Project",
    accent: "teal",
    eyebrow: "Sustainability",
    title: "ROBOCYCLE",
    subtitle: "A dual-arm robotic platform for PET-oriented waste sorting.",
    heroImage: "img/physical-ai.jpg",
    intro: "Every minute, the world produces plastic faster than it can sort it. ROBOCYCLE integrates a UR5e and an xArm7 into one coordinated dual-arm platform that identifies, grasps, and separates PET waste — turning recycling from manual drudgery into a testbed for responsible physical AI.",
    stats: [
      { value: "2", label: "Coordinated robot arms (UR5e + xArm7)" },
      { value: "PET", label: "Primary target waste stream" },
      { value: "ROS 2", label: "Open middleware foundation" }
    ],
    vision: {
      text: "Recycling facilities where robots take over the repetitive, hazardous sorting work — improving recovery rates while protecting human workers — and a reusable platform that other labs can replicate.",
      image: "img/physical-ai.jpg"
    },
    mission: {
      text: "To demonstrate reliable dual-arm perception and manipulation on a real waste stream, publish the methods openly, and train students on an end-to-end physical AI system: vision, grasping, coordination, and evaluation."
    },
    activities: [
      {
        title: "Dual-arm coordination",
        text: "Synchronizing two heterogeneous arms for handover, bimanual grasps, and parallel sorting.",
        image: "img/physical-ai.jpg"
      },
      {
        title: "Perception for waste",
        text: "Detecting and classifying deformable, dirty, crushed PET items — far from lab-clean objects.",
        image: "img/ros.png"
      },
      {
        title: "Student challenges",
        text: "Internship projects on grasp planning and benchmark design run directly on the platform.",
        image: "img/sii-2026.png"
      }
    ],
    cta: {
      title: "Sort the future with us.",
      text: "ROBOCYCLE hosts hands-on internships in manipulation and perception every year.",
      primaryLabel: "Join this Project",
      primaryHref: "join.html",
      secondaryLabel: "All Projects",
      secondaryHref: "index.html#projects"
    }
  },

  "axobotl": {
    type: "Project",
    accent: "plum",
    eyebrow: "Well-being",
    title: "Axobotl",
    subtitle: "Can a social robot help you focus — and feel better — at work?",
    heroImage: "img/heart1.png",
    intro: "Hybrid work blurred the line between office and home, and our attention pays the price. Axobotl studies whether a small social robot on the desk can support concentration and emotional well-being — with real users, rigorous measures, and honest answers.",
    stats: [
      { value: "HRI", label: "Human-robot interaction user studies" },
      { value: "2", label: "Work contexts studied: office & home" }
    ],
    vision: {
      text: "Workplaces — physical and remote — where technology protects attention and emotional balance instead of eroding them.",
      image: "img/heart1.png"
    },
    mission: {
      text: "To evaluate social robots for concentration and well-being support using human-centered HRI metrics, and to publish what works, what doesn't, and why."
    },
    activities: [
      {
        title: "Longitudinal user studies",
        text: "Deploying the robot in real hybrid-work routines and measuring focus and mood over time.",
        image: "img/heart1.png"
      },
      {
        title: "Interaction design",
        text: "Designing robot behaviors that support without interrupting: presence, not noise.",
        image: "img/teleop.png"
      }
    ],
    cta: {
      title: "Study well-being, scientifically.",
      text: "Axobotl welcomes students interested in user studies, psychology, and social HRI.",
      primaryLabel: "Join this Project",
      primaryHref: "join.html",
      secondaryLabel: "All Projects",
      secondaryHref: "index.html#projects"
    }
  }

};
