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

const nextToClose = (ch: string): string => {
  switch (ch) {
    case ")":
      return "(";
    case "]":
      return "[";
    case "}":
      return "{";
    default:
      return "";
  }
};

const processChar = (stack: string[], ch: string): string[] => {
  if (R.includes(ch, "([{")) {
    return R.append(ch, stack); // if parentheses were open - save the type
  } else if (R.includes(ch, ")]}")) {
    // if close
    if (R.isEmpty(stack) || R.last(stack) !== nextToClose(ch)) {
      // check if its the type that needs to be
      return R.append("-1", stack);
    } else {
      return R.init(stack); // if close succ - remove the last type we opened
    }
  } else {
    return stack; // ignore
  }
};

export const isPaired = (str: string): boolean => {
  const arr = stringToArray(str);
  const stack = R.reduce(processChar, [], arr);
  return R.isEmpty(stack); // ensure stack is empty if all parentheses are paired correctly
};

/* Question 3 */
export type WordTree = {
  root: string;
  children: WordTree[];
};

const preorderTraversal = (node: WordTree | null): string[] =>
  node ? [node.root, " ", ...R.chain(preorderTraversal, node.children)] : [];

export const treeToSentence: (node: WordTree) => string = (node) => {
  const arr = preorderTraversal(node);
  return R.init(R.reduce((acc, cur) => acc + cur, "", arr));
};
