'use client'
import { FormControlLabel, FormGroup, Checkbox, Button } from "@mui/material";
import Q from "./questions.json";
import React from "react";
import dynamic from 'next/dynamic';
import { green, red, grey } from '@mui/material/colors';


export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})

function Home() {
  var question1 = Q.questions[0];

  const [isCorrect, setIsCorrect] = React.useState(2);
  const [options] = React.useState(Shuffle(question1.answers, question1.herrings));
  const [selected, setSelected] = React.useState<string[]>([]);

  function CheckAnswer(ans: string, isSelected: boolean) {
    var newSelected: string[] = [];
    if (isSelected && !selected.includes(ans)) {
      newSelected = selected.concat([ans]);
    } else if (!isSelected) {
      newSelected = selected;
      const index = newSelected.indexOf(ans, 0);
      if (index > -1) { // remove if contains ans
        newSelected.splice(index, 1);
      }
    }
    setSelected(newSelected);

    // colour grey
    setIsCorrect(2);
    if (question1.answers.every((a) => newSelected.includes(a))) {
      // colour green
      setIsCorrect(1);
    } 
    if (newSelected.some((s) => question1.herrings.includes(s))) {
      // colour red
      setIsCorrect(0);
    }
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <FormGroup>
          {question1.question}
          {options.map((ans, i) =>
            <FormControlLabel 
              key={i} 
              control={<Checkbox onChange={(event) => CheckAnswer(ans, event.target.checked)} />} 
              style={{
                color: isCorrect > 1 ? grey[600] // default state
                      : isCorrect > 0 ? green[600] 
                      : red[600]}}
              label={ans} 
            />
          )}
          <Button variant="outlined">Next</Button>
        </FormGroup>
      </main>
    </div>
  );
}

function Shuffle(list1: string[], list2: string[]) {
  // Fisher-Yates shuffle
  var choices = list1.concat(list2);
  var shuffled = [];
  while (choices.length > 0) {
    var k = getRandomIntUpTo(choices.length);
    if (k == choices.length) continue;
    shuffled.push(choices[k]);
    choices.splice(k, 1); // remove k
  }
  return shuffled
}

function getRandomIntUpTo(max: number) {
  return Math.floor(Math.random() * max);
}