import Q from "./questions.json";
import {Checkbox} from "@nextui-org/react";


export default function Home() {
  var question1 = Q.questions[0];
  return (
    <div>
        {question1.question}
        <ol>
          {question1.answers.map((ans, i) =>
            <li key={i}>
              <Checkbox>{ans}</Checkbox>
            </li>
          )}
        </ol>
    </div>
  );
}
