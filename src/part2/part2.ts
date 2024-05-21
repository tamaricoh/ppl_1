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
const katlan: (num: number, ch: string) => number = (num, ch) => {
  return R.includes(ch, "({[") ? num + 1 : num > 0 ? num - 1 : 0.25;
};
export const isPaired: (str: string) => boolean = (str) => {
  const arr = stringToArray(str);
  const type1 = R.filter((ch) => R.includes(ch, "[]"), arr);
  const type2 = R.filter((ch) => R.includes(ch, "()"), arr);
  const type3 = R.filter((ch) => R.includes(ch, "{}"), arr);
  return (
    R.reduce(katlan, 0, type1) === 0 &&
    R.reduce(katlan, 0, type2) === 0 &&
    R.reduce(katlan, 0, type3) === 0
  );
};

/* Question 3 */
export type WordTree = {
  root: string;
  children: WordTree[];
};

const preorderTraversal = (node: WordTree | null): string[] =>
  node
      ? [node.root, " ", ...R.chain(preorderTraversal, node.children)]
       : [];


export const treeToSentence: (node: WordTree)=>string= (node)=>{
  const arr= preorderTraversal(node);
  return R.init(R.reduce((acc,cur)=> acc+cur,"",arr));
}  
