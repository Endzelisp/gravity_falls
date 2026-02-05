export const VOCABULARY = [
  { word: "Vanish", definition: "To disappear suddenly.", type: "Verb", example: "The author vanished without a trace." },
  { word: "Shelter", definition: "A safe place that protects you.", type: "Noun", example: "It looks like a fallout shelter." },
  { word: "Anxious", definition: "Feeling worried or nervous.", type: "Adjective", example: "Dipper felt anxious about talking to Wendy." },
  { word: "Genuine", definition: "Real, authentic. Not fake.", type: "Adjective", example: "It is genuine plastic!" },
  { word: "Regenerate", definition: "To grow back or heal again.", type: "Verb", example: "The monster can regenerate its body." },
  { word: "Flattered", definition: "Feeling happy because someone praised or liked you.", type: "Adjective", example: "Wendy was flattered, but she just wants to be friends." },
];

export const COMPREHENSION_QUESTIONS = [
  {
    question: "Why did Dipper and the gang go into the bunker?",
    options: [
      "To find a hidden treasure chest.",
      "To find the author of the Journal.",
      "To hide from zombies.",
      "To have a movie night."
    ],
    correct: 1,
    explanation: "Dipper believed the author's secret hiding place was down there."
  },
  {
    question: "Who was the 'Unknown Man' really?",
    options: [
      "The real author of the journals.",
      "Stan Pines in a costume.",
      "A Shape Shifter monster.",
      "Soos from the future."
    ],
    correct: 2,
    explanation: "It was a Shape Shifter (Experiment #210) pretending to be the author!"
  },
  {
    question: "What happened between Dipper and Wendy at the end?",
    options: [
      "Wendy got angry and left.",
      "They agreed to stay best friends.",
      "They started dating.",
      "Wendy forgot who Dipper was."
    ],
    correct: 1,
    explanation: "Wendy told Dipper she is too old for him, but their friendship is very important to her."
  },
  {
    question: "What is a 'Shape Shifter' able to do?",
    options: [
      "Travel through time.",
      "Turn invisible.",
      "Take the form of anyone or anything it sees.",
      "Read minds."
    ],
    correct: 2,
    explanation: "The Shape Shifter can copy any form it looks at."
  }
];

export const GRAMMAR_EXERCISES = [
  {
    topic: "Modals of Deduction (must've)",
    instruction: "Choose the correct word.",
    sentence: "This place is old and full of supplies. It _____ belonged to the author.",
    options: ["must've", "should've", "can't"],
    correct: "must've",
    explanation: "We use 'must have' (must've) when we are almost 100% sure about something in the past."
  },
  {
    topic: "Passive Voice (Present Continuous)",
    instruction: "Complete the sentence.",
    sentence: "Look! My face _____ eaten by zombies!",
    options: ["is being", "has been", "was"],
    correct: "is being",
    explanation: "Passive Voice: 'is being + past participle'. The action is happening right now to the subject."
  },
  {
    topic: "1st Conditional",
    instruction: "Fill in the blank.",
    sentence: "If you keep digging, you _____ a fate worse than you can imagine.",
    options: ["met", "will meet", "meeting"],
    correct: "will meet",
    explanation: "1st Conditional structure: If + Present Simple, ... + Will + Verb."
  },
  {
    topic: "2nd Conditional",
    instruction: "Complete the sentence.",
    sentence: "If you stopped being my friend, I _____ throw myself into the pit!",
    options: ["will", "would", "did"],
    correct: "would",
    explanation: "2nd Conditional (Hypothetical): If + Past Simple, ... + Would + Verb."
  }
];