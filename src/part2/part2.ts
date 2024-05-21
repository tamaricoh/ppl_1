import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
const isVow: (ch: string) => boolean = (ch) => {
  // const arr = stringToArray("AEIOUaeiou");
  return R.includes(ch, "AEIOUaeiou");
};

export const countVowels: (str: string) => number = (str) => {
  const arr = stringToArray(str);
  const f = R.pipe(
    R.filter(isVow),
    R.reduce((acc, _) => acc + 1, 0)
  );
  return f(arr);
};

/* Question 2 */
export const isPaired: undefined = undefined;

/* Question 3 */
export type WordTree = {
  root: string;
  children: WordTree[];
};

export const treeToSentence: undefined = undefined;
