import React, { useState, useEffect } from 'react';
import { BookOpen, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, Star, RefreshCw, MessageCircle, MapPin, Brain } from 'lucide-react';

import Button from './components/Button';
import Card from './components/Card';
import ProgressBar from './components/ProgressBar';

import { VOCABULARY, COMPREHENSION_QUESTIONS, GRAMMAR_EXERCISES } from './data/lessonData';

// --- MAIN APP COMPONENT ---

export default function GravityFallsLesson() {
  const [stage, setStage] = useState('intro'); // intro, vocab, story, grammar, summary
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // null, 'correct', 'incorrect'
  const [selectedOption, setSelectedOption] = useState(null);

  // We rely on manual resetting in nextQuestion to prevent render crashes during transitions
  // But we keep a useEffect to clear selection/feedback just in case
  useEffect(() => {
    setFeedback(null);
    setSelectedOption(null);
  }, [stage, currentQuestionIndex]);

  const handleStart = () => {
    setStage('vocab');
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (isCorrect) => {
    if (feedback) return; // Prevent double clicking
    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    
    // Logic to move between stages based on index
    // IMPORTANT: We reset currentQuestionIndex BEFORE or WITH setStage to prevent
    // accessing undefined indexes in the next array during the render cycle.
    if (stage === 'vocab') {
      if (currentQuestionIndex < VOCABULARY.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStage('story');
        setCurrentQuestionIndex(0); // Explicit reset
      }
    } else if (stage === 'story') {
      if (currentQuestionIndex < COMPREHENSION_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStage('grammar');
        setCurrentQuestionIndex(0); // Explicit reset
      }
    } else if (stage === 'grammar') {
      if (currentQuestionIndex < GRAMMAR_EXERCISES.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStage('summary');
        setCurrentQuestionIndex(0); // Explicit reset
      }
    }
  };

  // --- RENDERERS ---

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
      <div className="bg-amber-900 text-amber-100 p-4 rounded-full shadow-xl mb-4">
        <BookOpen size={64} />
      </div>
      <h1 className="text-5xl font-extrabold text-stone-800 tracking-tight">
        Into the Bunker
        <span className="block text-2xl text-emerald-600 font-bold mt-2 font-mono uppercase tracking-widest">ESL Mystery Class</span>
      </h1>
      <p className="text-xl text-stone-600 max-w-2xl leading-relaxed">
        Join Dipper, Mabel, Wendy, and Soos! 
        <br/>
        We will learn new <strong>vocabulary</strong>, check your <strong>understanding</strong> of the episode, and practice <strong>English grammar</strong>.
      </p>
      <div className="flex gap-4">
        <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-lg border border-stone-200">
          <Brain className="text-purple-500" />
          <span className="text-stone-600 font-semibold">Level A1+ / A2</span>
        </div>
        <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-lg border border-stone-200">
          <RefreshCw className="text-blue-500" />
          <span className="text-stone-600 font-semibold">~45 Minutes</span>
        </div>
      </div>
      <Button onClick={handleStart} className="text-xl px-12 py-4 mt-8">
        Start The Adventure
      </Button>
    </div>
  );

  const renderVocab = () => {
    const item = VOCABULARY[currentQuestionIndex];
    // Guard clause to prevent crash during state transition
    if (!item) return <div className="p-12 text-center text-stone-400">Loading Vocabulary...</div>;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-700 flex items-center gap-2">
            <MapPin className="text-emerald-500" />
            Vocabulary Check
          </h2>
          <span className="text-stone-400 font-mono">Card {currentQuestionIndex + 1}/{VOCABULARY.length}</span>
        </div>
        
        <ProgressBar current={currentQuestionIndex} total={VOCABULARY.length} />

        <Card className="text-center py-12">
          <h3 className="text-4xl font-bold text-stone-800 mb-4">{item.word}</h3>
          <span className="inline-block bg-stone-100 text-stone-500 px-3 py-1 rounded-full text-sm font-bold mb-8 uppercase tracking-wide">
            {item.type}
          </span>
          
          {feedback === null ? (
            <div className="space-y-6">
              <p className="text-lg text-stone-500 italic">Do you know this word?</p>
              <div className="grid grid-cols-1 gap-4">
                 <Button variant="secondary" onClick={() => handleAnswer(true)}>Reveal Meaning</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <p className="text-xl font-medium text-emerald-800">{item.definition}</p>
              </div>
              <div className="text-left bg-stone-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="text-stone-600 font-serif text-lg">"{item.example}"</p>
              </div>
              <Button onClick={nextQuestion} className="w-full">Next Word <ArrowRight className="inline ml-2" size={18}/></Button>
            </div>
          )}
        </Card>
      </div>
    );
  };

  const renderStory = () => {
    const q = COMPREHENSION_QUESTIONS[currentQuestionIndex];
    // Guard clause to prevent crash during state transition
    if (!q) return <div className="p-12 text-center text-stone-400">Loading Story Question...</div>;

    return (
      <div className="max-w-2xl mx-auto">
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-700 flex items-center gap-2">
            <BookOpen className="text-blue-500" />
            Story Comprehension
          </h2>
          <span className="text-stone-400 font-mono">Question {currentQuestionIndex + 1}/{COMPREHENSION_QUESTIONS.length}</span>
        </div>

        <ProgressBar current={currentQuestionIndex} total={COMPREHENSION_QUESTIONS.length} />

        <Card>
          <h3 className="text-xl font-bold text-stone-800 mb-6 leading-relaxed">{q.question}</h3>
          
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
              if (selectedOption === null) {
                btnClass += "border-stone-200 hover:border-blue-400 hover:bg-blue-50";
              } else if (idx === q.correct) {
                btnClass += "bg-emerald-100 border-emerald-500 text-emerald-900";
              } else if (selectedOption === idx && idx !== q.correct) {
                btnClass += "bg-red-100 border-red-500 text-red-900 opacity-60";
              } else {
                btnClass += "opacity-50 border-stone-100";
              }

              return (
                <button 
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => {
                    setSelectedOption(idx);
                    handleAnswer(idx === q.correct);
                  }}
                  className={btnClass}
                >
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-stone-400">{String.fromCharCode(65 + idx)}.</div>
                    {opt}
                  </div>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className="mt-6 pt-6 border-t border-stone-100 animate-slide-up">
              <div className={`flex items-start gap-3 p-4 rounded-lg ${feedback === 'correct' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                {feedback === 'correct' ? <CheckCircle className="shrink-0" /> : <AlertTriangle className="shrink-0" />}
                <div>
                  <p className="font-bold mb-1">{feedback === 'correct' ? 'Excellent!' : 'Not quite right.'}</p>
                  <p className="text-sm opacity-90">{q.explanation}</p>
                </div>
              </div>
              <Button onClick={nextQuestion} className="w-full mt-4">Continue <ArrowRight className="inline ml-2" size={18}/></Button>
            </div>
          )}
        </Card>
      </div>
    );
  };

  const renderGrammar = () => {
    const ex = GRAMMAR_EXERCISES[currentQuestionIndex];
    // Guard clause
    if (!ex) return <div className="p-12 text-center text-stone-400">Loading Grammar...</div>;

    return (
      <div className="max-w-2xl mx-auto">
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-stone-700 flex items-center gap-2">
            <Brain className="text-purple-500" />
            Grammar Lab
          </h2>
          <span className="text-stone-400 font-mono">Task {currentQuestionIndex + 1}/{GRAMMAR_EXERCISES.length}</span>
        </div>

        <ProgressBar current={currentQuestionIndex} total={GRAMMAR_EXERCISES.length} />

        <Card>
          <div className="mb-4">
            <span className="text-xs font-bold tracking-wider text-purple-600 uppercase bg-purple-100 px-2 py-1 rounded">
              {ex.topic}
            </span>
          </div>
          
          <p className="text-stone-500 mb-6 text-sm flex items-center gap-2">
            <MessageCircle size={16} />
            {ex.instruction}
          </p>

          <div className="bg-stone-50 p-6 rounded-lg border-2 border-stone-200 mb-6 text-lg font-medium text-stone-800 text-center leading-loose">
            {ex.sentence.split('_____').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block min-w-[100px] border-b-2 border-dashed border-stone-400 mx-2 text-blue-600 font-bold">
                    {selectedOption !== null ? ex.options[selectedOption] : "?"}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {ex.options.map((opt, idx) => (
              <button 
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => {
                  setSelectedOption(idx);
                  handleAnswer(opt === ex.correct);
                }}
                className={`p-3 rounded-lg font-bold border-2 transition-colors ${
                  selectedOption === null 
                    ? "bg-white border-stone-200 hover:border-purple-400 hover:bg-purple-50 text-stone-600"
                    : opt === ex.correct 
                      ? "bg-emerald-100 border-emerald-500 text-emerald-900" 
                      : selectedOption === idx 
                        ? "bg-red-100 border-red-500 text-red-900" 
                        : "opacity-40 bg-stone-100 border-stone-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <div className="mt-6 animate-slide-up">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 text-blue-800 mb-4">
                 <p className="font-bold text-sm mb-1">GRAMMAR TIP:</p>
                 <p className="text-sm">{ex.explanation}</p>
              </div>
              <Button onClick={nextQuestion} className="w-full">Next Challenge <ArrowRight className="inline ml-2" size={18}/></Button>
            </div>
          )}
        </Card>
      </div>
    );
  };

  const renderSummary = () => {
    let rank = "Tourist";
    if (score > 150) rank = "Journal Author";
    else if (score > 100) rank = "Mystery Hunter";
    else if (score > 50) rank = "Pine Tree";

    return (
      <div className="max-w-md mx-auto text-center space-y-8 animate-scale-up">
        <div className="relative inline-block">
          <Star size={80} className="text-yellow-400 fill-current drop-shadow-lg mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center pt-2">
            <span className="font-bold text-yellow-700">{score}</span>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-stone-800">Class Complete!</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-emerald-100">
          <p className="text-stone-500 uppercase tracking-widest text-sm font-bold mb-2">Your Rank</p>
          <p className="text-3xl font-extrabold text-emerald-600">{rank}</p>
        </div>

        <div className="space-y-4">
          <p className="text-stone-600">
            Great job! You reviewed vocabulary, analyzed the story, and practiced complex grammar.
          </p>
          <p className="text-stone-600 font-serif italic">
            "Stay curious, stay weird, keep practicing English!"
          </p>
        </div>

        <Button onClick={() => window.location.reload()} variant="outline" className="mt-8">
          Restart Lesson
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-stone-800 selection:bg-emerald-200 selection:text-emerald-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b-2 border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">GF</div>
            <span className="font-bold text-stone-600 tracking-tight">ESL Learning Hub</span>
          </div>
          <div className="flex items-center gap-4 bg-white px-4 py-1.5 rounded-full shadow-sm border border-stone-200">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="font-bold text-stone-700">{score} pts</span>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="transition-all duration-300">
          {stage === 'intro' && renderIntro()}
          {stage === 'vocab' && renderVocab()}
          {stage === 'story' && renderStory()}
          {stage === 'grammar' && renderGrammar()}
          {stage === 'summary' && renderSummary()}
        </main>
      </div>
      
      {/* Background decoration */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-800 opacity-80"></div>
    </div>
  );
}