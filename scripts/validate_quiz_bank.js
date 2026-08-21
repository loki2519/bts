import fs from 'fs';

const jsonPath = 'c:/Users/maddi/Desktop/bts/src/data/btsQuestionBank.json';
const quizData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function validateQuizBank() {
  console.log("=== RUNNING AUTOMATED AUDIT ON BTS 400-QUESTION QUIZ DATABASE ===");
  let errors = [];

  if (quizData.length !== 400) {
    errors.push(`Total question count error: Expected 400, got ${quizData.length}`);
  }

  const ids = new Set();
  const typeCounts = {
    'guess-song': 0,
    'guess-member': 0,
    'emoji': 0,
    'guess-era': 0
  };

  quizData.forEach((item, index) => {
    // 1. Check ID uniqueness & format
    if (!item.id) {
      errors.push(`Item at index ${index} is missing 'id'.`);
    } else if (ids.has(item.id)) {
      errors.push(`Duplicate ID found: ${item.id}`);
    } else {
      ids.add(item.id);
    }

    // 2. Check gameType
    if (!typeCounts.hasOwnProperty(item.gameType)) {
      errors.push(`Item ${item.id} has invalid gameType: ${item.gameType}`);
    } else {
      typeCounts[item.gameType]++;
    }

    // 3. Check question text presence
    if (!item.question || typeof item.question !== 'string' || item.question.trim() === '') {
      errors.push(`Item ${item.id} has empty question text.`);
    }

    // 4. Check options count & unique options
    if (!Array.isArray(item.options) || item.options.length !== 4) {
      errors.push(`Item ${item.id} does not have exactly 4 options (has ${item.options?.length}).`);
    } else {
      const uniqueOpts = new Set(item.options);
      if (uniqueOpts.size !== 4) {
        errors.push(`Item ${item.id} contains duplicate options: ${JSON.stringify(item.options)}`);
      }
    }

    // 5. Check correctAnswer validity
    if (!item.correctAnswer || !item.options.includes(item.correctAnswer)) {
      errors.push(`Item ${item.id} correctAnswer "${item.correctAnswer}" is not in options array: ${JSON.stringify(item.options)}`);
    }

    // 6. Check explanation
    if (!item.explanation || typeof item.explanation !== 'string' || item.explanation.trim() === '') {
      errors.push(`Item ${item.id} has missing explanation.`);
    }

    // 7. Check difficulty
    if (!['easy', 'medium', 'hard'].includes(item.difficulty)) {
      errors.push(`Item ${item.id} has invalid difficulty: ${item.difficulty}`);
    }

    // 8. Check emoji specific property
    if (item.gameType === 'emoji') {
      if (!item.emojis || typeof item.emojis !== 'string' || item.emojis.trim() === '') {
        errors.push(`Emoji item ${item.id} is missing 'emojis' property.`);
      }
    }
  });

  // Verify category counts
  console.log("Category counts:", typeCounts);
  if (typeCounts['guess-song'] !== 100) errors.push(`Expected 100 'guess-song', got ${typeCounts['guess-song']}`);
  if (typeCounts['guess-member'] !== 100) errors.push(`Expected 100 'guess-member', got ${typeCounts['guess-member']}`);
  if (typeCounts['emoji'] !== 100) errors.push(`Expected 100 'emoji', got ${typeCounts['emoji']}`);
  if (typeCounts['guess-era'] !== 100) errors.push(`Expected 100 'guess-era', got ${typeCounts['guess-era']}`);

  if (errors.length === 0) {
    console.log("SUCCESS! 400-Question Master Database passed all automated validation checks with 0 errors!");
  } else {
    console.error(`FAILED! Found ${errors.length} validation errors:`);
    errors.forEach(e => console.error(` - ${e}`));
    process.exit(1);
  }
}

validateQuizBank();
