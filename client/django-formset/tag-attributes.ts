// @ts-nocheck

// Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.3.1 )
//
// https://pegjs.org/   https://github.com/metadevpro/ts-pegjs

"use strict";

export interface IFilePosition {
  offset: number;
  line: number;
  column: number;
}

export interface IFileRange {
  start: IFilePosition;
  end: IFilePosition;
}

export interface ILiteralExpectation {
  type: "literal";
  text: string;
  ignoreCase: boolean;
}

export interface IClassParts extends Array<string | IClassParts> {}

export interface IClassExpectation {
  type: "class";
  parts: IClassParts;
  inverted: boolean;
  ignoreCase: boolean;
}

export interface IAnyExpectation {
  type: "any";
}

export interface IEndExpectation {
  type: "end";
}

export interface IOtherExpectation {
  type: "other";
  description: string;
}

export type Expectation = ILiteralExpectation | IClassExpectation | IAnyExpectation | IEndExpectation | IOtherExpectation;

export class SyntaxError extends Error {
  public static buildMessage(expected: Expectation[], found: string | null) {
    function hex(ch: string): string {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g,  "\\\"")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function classEscape(s: string): string {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/\]/g, "\\]")
        .replace(/\^/g, "\\^")
        .replace(/-/g,  "\\-")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,            (ch) => "\\x0" + hex(ch) )
        .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x"  + hex(ch) );
    }

    function describeExpectation(expectation: Expectation) {
      switch (expectation.type) {
        case "literal":
          return "\"" + literalEscape(expectation.text) + "\"";
        case "class":
          const escapedParts = expectation.parts.map((part) => {
            return Array.isArray(part)
              ? classEscape(part[0] as string) + "-" + classEscape(part[1] as string)
              : classEscape(part);
          });

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        case "any":
          return "any character";
        case "end":
          return "end of input";
        case "other":
          return expectation.description;
      }
    }

    function describeExpected(expected1: Expectation[]) {
      const descriptions = expected1.map(describeExpectation);
      let i: number;
      let j: number;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found1: string | null) {
      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  }

  public message: string;
  public expected: Expectation[];
  public found: string | null;
  public location: IFileRange;
  public name: string;

  constructor(message: string, expected: Expectation[], found: string | null, location: IFileRange) {
    super();
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof (Error as any).captureStackTrace === "function") {
      (Error as any).captureStackTrace(this, SyntaxError);
    }
  }
}

function peg$parse(input: string, options?: IParseOptions) {
  options = options !== undefined ? options : {};

  const peg$FAILED: Readonly<any> = {};

  const peg$startRuleIndices: {[id: string]: number}  = { Actions: 5, Expression: 0 };
  let peg$startRuleIndex = 5;

  const peg$consts = [
    function(head: any, tail: any): any {
          return tail.reduce(function(result, element) {
              return result + element[1] + element[3];
          }, head);
      },
    function(): any { return 'false'; },
    "===",
    peg$literalExpectation("===", false),
    "==",
    peg$literalExpectation("==", false),
    "!==",
    peg$literalExpectation("!==", false),
    "!=",
    peg$literalExpectation("!=", false),
    "<=",
    peg$literalExpectation("<=", false),
    ">=",
    peg$literalExpectation(">=", false),
    "<",
    peg$literalExpectation("<", false),
    ">",
    peg$literalExpectation(">", false),
    "+",
    peg$literalExpectation("+", false),
    "-",
    peg$literalExpectation("-", false),
    "*",
    peg$literalExpectation("*", false),
    "/",
    peg$literalExpectation("/", false),
    "&&",
    peg$literalExpectation("&&", false),
    "&",
    peg$literalExpectation("&", false),
    "||",
    peg$literalExpectation("||", false),
    "|",
    peg$literalExpectation("|", false),
    "!",
    peg$literalExpectation("!", false),
    "(",
    peg$literalExpectation("(", false),
    ")",
    peg$literalExpectation(")", false),
    function(expr: any): any { return '(' + expr + ')'; },
    function(s: any): any { return '\'' + s + '\''; },
    function(path: any): any {
        return 'this.getDataValue(\'' + path + '\')';
      },
    "!~",
    peg$literalExpectation("!~", false),
    function(successChain: any, rejectChain: any): any { return { successChain: successChain, rejectChain: rejectChain } },
    function(successChain: any): any { return { successChain: successChain, rejectChain: [] } },
    "->",
    peg$literalExpectation("->", false),
    function(lhs: any, rhs: any): any { return [lhs].concat(rhs) },
    function(func: any): any { return [func] },
    function(funcname: any, args: any): any { return { funcname: funcname, args: args } },
    "()",
    peg$literalExpectation("()", false),
    function(funcname: any): any { return { funcname: funcname, args: [] } },
    ",",
    peg$literalExpectation(",", false),
    function(arg: any): any { return [arg] },
    /^[ \t\n\r]/,
    peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
    "[",
    peg$literalExpectation("[", false),
    "{",
    peg$literalExpectation("{", false),
    "]",
    peg$literalExpectation("]", false),
    "}",
    peg$literalExpectation("}", false),
    ":",
    peg$literalExpectation(":", false),
    function(head: any, m: any): any { return m; },
    function(head: any, tail: any): any {
            var result = {};

            [head].concat(tail).forEach(function(element) {
              result[element.name] = element.value;
            });

            return result;
          },
    function(members: any): any { return members !== null ? members: {}; },
    function(name: any, value: any): any { return { name: name, value: value } },
    /^[$A-Za-z_]/,
    peg$classExpectation(["$", ["A", "Z"], ["a", "z"], "_"], false, false),
    /^[$0-9A-Za-z_]/,
    peg$classExpectation(["$", ["0", "9"], ["A", "Z"], ["a", "z"], "_"], false, false),
    function(head: any, v: any): any { return v; },
    function(head: any, tail: any): any { return [head].concat(tail); },
    function(values: any): any { return values !== null ? values : []; },
    peg$otherExpectation("number"),
    function(): any { return parseFloat(text()); },
    ".",
    peg$literalExpectation(".", false),
    /^[1-9]/,
    peg$classExpectation([["1", "9"]], false, false),
    /^[eE]/,
    peg$classExpectation(["e", "E"], false, false),
    "0",
    peg$literalExpectation("0", false),
    peg$otherExpectation("string"),
    "\"",
    peg$literalExpectation("\"", false),
    function(chars: any): any { return chars },
    "'",
    peg$literalExpectation("'", false),
    /^[^\0-\x1F"\\]/,
    peg$classExpectation([["\0", "\x1F"], "\"", "\\"], true, false),
    "\\\"",
    peg$literalExpectation("\\\"", false),
    function(): any { return '"' },
    /^[^\0-\x1F'\\]/,
    peg$classExpectation([["\0", "\x1F"], "'", "\\"], true, false),
    "\\'",
    peg$literalExpectation("\\'", false),
    function(): any { return "'" },
    "\\\\",
    peg$literalExpectation("\\\\", false),
    "\\b",
    peg$literalExpectation("\\b", false),
    "\\f",
    peg$literalExpectation("\\f", false),
    "\\n",
    peg$literalExpectation("\\n", false),
    "\\r",
    peg$literalExpectation("\\r", false),
    "\\t",
    peg$literalExpectation("\\t", false),
    "\\u",
    peg$literalExpectation("\\u", false),
    function(digits: any): any { return String.fromCharCode(parseInt(digits, 16)) },
    peg$otherExpectation("boolean"),
    function(): any { return true; },
    function(): any { return false; },
    function(): any { return null; },
    "false",
    peg$literalExpectation("false", false),
    "true",
    peg$literalExpectation("true", false),
    "null",
    peg$literalExpectation("null", false),
    function(head: any, tail: any): any {
          return tail.reduce(function(result, element) {
              return result + '.' + element[1];
          }, head);
      },
    function(var_starter: any, var_remainder: any): any {
       return var_starter + var_remainder;
    },
    /^[$a-zA-Z_]/,
    peg$classExpectation(["$", ["a", "z"], ["A", "Z"], "_"], false, false),
    /^[$a-zA-Z0-9_]/,
    peg$classExpectation(["$", ["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false),
    function(identifier: any): any {
        return identifier instanceof Array ? identifier.join('') : identifier;
      },
    /^[0-9]/,
    peg$classExpectation([["0", "9"]], false, false),
    /^[0-9a-f]/i,
    peg$classExpectation([["0", "9"], ["a", "f"]], false, true)
  ];

  const peg$bytecode = [
    peg$decode("%;*/\x9E#;#/\x95$;*/\x8C$$%;*/>#;!/5$;*/,$; /#$+$)($'#(#'#(\"'#&'#0H*%;*/>#;!/5$;*/,$; /#$+$)($'#(#'#(\"'#&'#&/2$;*/)$8%: %\"#!)(%'#($'#(#'#(\"'#&'#.. &%;*/& 8!:!! )"),
    peg$decode("2\"\"\"6\"7#.\xD1 &2$\"\"6$7%.\xC5 &2&\"\"6&7'.\xB9 &2(\"\"6(7).\xAD &2*\"\"6*7+.\xA1 &2,\"\"6,7-.\x95 &2.\"\"6.7/.\x89 &20\"\"6071.} &22\"\"6273.q &24\"\"6475.e &26\"\"6677.Y &28\"\"6879.M &2:\"\"6:7;.A &2<\"\"6<7=.5 &2>\"\"6>7?.) &2@\"\"6@7A"),
    peg$decode("2B\"\"6B7C"),
    peg$decode("%2D\"\"6D7E/R#;*/I$; /@$;*/7$2F\"\"6F7G/($8%:H%!\")(%'#($'#(#'#(\"'#&'#.A &;6.; &;D.5 &;$./ &%;@/' 8!:I!! )"),
    peg$decode("%;H/' 8!:J!! )"),
    peg$decode("%;&/\\#;*/S$2K\"\"6K7L/D$;*/;$;&/2$;*/)$8&:M&\"%!)(&'#(%'#($'#(#'#(\"'#&'#./ &%;&/' 8!:N!! )"),
    peg$decode("%;'/\\#;*/S$2O\"\"6O7P/D$;*/;$;&/2$;*/)$8&:Q&\"%!)(&'#(%'#($'#(#'#(\"'#&'#./ &%;'/' 8!:R!! )"),
    peg$decode("%;*/i#%;4/\"!&,)/Y$2D\"\"6D7E/J$;(/A$2F\"\"6F7G/2$;*/)$8&:S&\"$\")(&'#(%'#($'#(#'#(\"'#&'#.a &%%;4/\"!&,)/7#2T\"\"6T7U/($8\":V\"!!)(\"'#&'#.6 &%%;4/\"!&,)/' 8!:V!! )"),
    peg$decode("%;)/S#;*/J$2W\"\"6W7X/;$;*/2$;(/)$8%:Q%\"$ )(%'#($'#(#'#(\"'#&'#./ &%;)/' 8!:Y!! )"),
    peg$decode(";6./ &;@.) &;2.# &;5"),
    peg$decode("$4Z\"\"5!7[0)*4Z\"\"5!7[&"),
    peg$decode("%;*/;#2\\\"\"6\\7]/,$;*/#$+#)(#'#(\"'#&'#"),
    peg$decode("%;*/;#2^\"\"6^7_/,$;*/#$+#)(#'#(\"'#&'#"),
    peg$decode("%;*/;#2`\"\"6`7a/,$;*/#$+#)(#'#(\"'#&'#"),
    peg$decode("%;*/;#2b\"\"6b7c/,$;*/#$+#)(#'#(\"'#&'#"),
    peg$decode("%;*/;#2d\"\"6d7e/,$;*/#$+#)(#'#(\"'#&'#"),
    peg$decode("%;*/;#2W\"\"6W7X/,$;*/#$+#)(#'#(\"'#&'#"),
    peg$decode(";D.5 &;2./ &;5.) &;6.# &;@"),
    peg$decode("%;,/\x91#%;3/k#$%;0/2#;3/)$8\":f\"\"$ )(\"'#&'#0<*%;0/2#;3/)$8\":f\"\"$ )(\"'#&'#&/)$8\":g\"\"! )(\"'#&'#.\" &\"/1$;./($8#:h#!!)(#'#(\"'#&'#"),
    peg$decode("%;@/;#;//2$;1/)$8#:i#\"\" )(#'#(\"'#&'#.L &%%;4/\"!&,)/;#;//2$;1/)$8#:i#\"\" )(#'#(\"'#&'#"),
    peg$decode("%4j\"\"5!7k/?#$4l\"\"5!7m0)*4l\"\"5!7m&/#$+\")(\"'#&'#"),
    peg$decode("%;+/\x91#%;1/k#$%;0/2#;1/)$8\":n\"\"$ )(\"'#&'#0<*%;0/2#;1/)$8\":n\"\"$ )(\"'#&'#&/)$8\":o\"\"! )(\"'#&'#.\" &\"/1$;-/($8#:p#!!)(#'#(\"'#&'#"),
    peg$decode("<%;=.\" &\"/L#;</C$;;.\" &\"/5$;:.\" &\"/'$8$:r$ )($'#(#'#(\"'#&'#=.\" 7q"),
    peg$decode("2s\"\"6s7t"),
    peg$decode("4u\"\"5!7v"),
    peg$decode("4w\"\"5!7x"),
    peg$decode("%;9/M#;=.# &;>.\" &\"/9$$;L/&#0#*;L&&&#/#$+#)(#'#(\"'#&'#"),
    peg$decode("%;7/9#$;L/&#0#*;L&&&#/#$+\")(\"'#&'#"),
    peg$decode(";?.= &%;8/3#$;L0#*;L&/#$+\")(\"'#&'#"),
    peg$decode("24\"\"6475"),
    peg$decode("22\"\"6273"),
    peg$decode("2y\"\"6y7z"),
    peg$decode("<%2|\"\"6|7}/N#%$;A0#*;A&/\"!&,)/7$2|\"\"6|7}/($8#:~#!!)(#'#(\"'#&'#.^ &%2\x7F\"\"6\x7F7\x80/N#%$;B0#*;B&/\"!&,)/7$2\x7F\"\"6\x7F7\x80/($8#:~#!!)(#'#(\"'#&'#=.\" 7{"),
    peg$decode("4\x81\"\"5!7\x82.: &%2\x83\"\"6\x837\x84/& 8!:\x85! ).# &;C"),
    peg$decode("4\x86\"\"5!7\x87.: &%2\x88\"\"6\x887\x89/& 8!:\x8A! ).# &;C"),
    peg$decode("2\x8B\"\"6\x8B7\x8C.\xA9 &2\x8D\"\"6\x8D7\x8E.\x9D &2\x8F\"\"6\x8F7\x90.\x91 &2\x91\"\"6\x917\x92.\x85 &2\x93\"\"6\x937\x94.y &2\x95\"\"6\x957\x96.m &%2\x97\"\"6\x977\x98/]#%%;M/>#;M/5$;M/,$;M/#$+$)($'#(#'#(\"'#&'#/\"!&,)/($8\":\x99\"! )(\"'#&'#"),
    peg$decode("<%;F/& 8!:\x9B! ).? &%;E/& 8!:\x9C! ).. &%;G/& 8!:\x9D! )=.\" 7\x9A"),
    peg$decode("2\x9E\"\"6\x9E7\x9F"),
    peg$decode("2\xA0\"\"6\xA07\xA1"),
    peg$decode("2\xA2\"\"6\xA27\xA3"),
    peg$decode("%;I/k#$%2s\"\"6s7t/,#;I/#$+\")(\"'#&'#0<*%2s\"\"6s7t/,#;I/#$+\")(\"'#&'#&/)$8\":\xA4\"\"! )(\"'#&'#"),
    peg$decode("%;J/2#;K/)$8\":\xA5\"\"! )(\"'#&'#"),
    peg$decode("4\xA6\"\"5!7\xA7"),
    peg$decode("%$4\xA8\"\"5!7\xA90)*4\xA8\"\"5!7\xA9&/' 8!:\xAA!! )"),
    peg$decode("4\xAB\"\"5!7\xAC"),
    peg$decode("4\xAD\"\"5!7\xAE")
  ];

  let peg$currPos = 0;
  let peg$savedPos = 0;
  const peg$posDetailsCache = [{ line: 1, column: 1 }];
  let peg$maxFailPos = 0;
  let peg$maxFailExpected: Expectation[] = [];
  let peg$silentFails = 0;

  let peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleIndices)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleIndex = peg$startRuleIndices[options.startRule];
  }

  function text(): string {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location(): IFileRange {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description: string, location1?: IFileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location1
    );
  }

  function error(message: string, location1?: IFileRange) {
    location1 = location1 !== undefined
      ? location1
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location1);
  }

  function peg$literalExpectation(text1: string, ignoreCase: boolean): ILiteralExpectation {
    return { type: "literal", text: text1, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts: IClassParts, inverted: boolean, ignoreCase: boolean): IClassExpectation {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation(): IAnyExpectation {
    return { type: "any" };
  }

  function peg$endExpectation(): IEndExpectation {
    return { type: "end" };
  }

  function peg$otherExpectation(description: string): IOtherExpectation {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos: number) {
    let details = peg$posDetailsCache[pos];
    let p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos: number, endPos: number): IFileRange {
    const startPosDetails = peg$computePosDetails(startPos);
    const endPosDetails = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected1: Expectation) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildSimpleError(message: string, location1: IFileRange) {
    return new SyntaxError(message, [], "", location1);
  }

  function peg$buildStructuredError(expected1: Expectation[], found: string | null, location1: IFileRange) {
    return new SyntaxError(
      SyntaxError.buildMessage(expected1, found),
      expected1,
      found,
      location1
    );
  }

  function peg$decode(s: string): number[] {
    return s.split("").map((ch) =>  ch.charCodeAt(0) - 32 );
  }

  function peg$parseRule(index: number): any {
    const bc = peg$bytecode[index];
    let ip = 0;
    const ips: any[] = [];
    let end = bc.length;
    const ends: any[] = [];
    const stack: any[] = [];
    let params;

    while (true) {
      while (ip < end) {
        switch (bc[ip]) {
          case 0:
            stack.push(peg$consts[bc[ip + 1]]);
            ip += 2;
            break;

          case 1:
            stack.push(undefined);
            ip++;
            break;

          case 2:
            stack.push(null);
            ip++;
            break;

          case 3:
            stack.push(peg$FAILED);
            ip++;
            break;

          case 4:
            stack.push([]);
            ip++;
            break;

          case 5:
            stack.push(peg$currPos);
            ip++;
            break;

          case 6:
            stack.pop();
            ip++;
            break;

          case 7:
            peg$currPos = stack.pop();
            ip++;
            break;

          case 8:
            stack.length -= bc[ip + 1];
            ip += 2;
            break;

          case 9:
            stack.splice(-2, 1);
            ip++;
            break;

          case 10:
            stack[stack.length - 2].push(stack.pop());
            ip++;
            break;

          case 11:
            stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
            ip += 2;
            break;

          case 12:
            stack.push(input.substring(stack.pop(), peg$currPos));
            ip++;
            break;

          case 13:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (stack[stack.length - 1]) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 14:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (stack[stack.length - 1] === peg$FAILED) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 15:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (stack[stack.length - 1] !== peg$FAILED) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 16:
            if (stack[stack.length - 1] !== peg$FAILED) {
              ends.push(end);
              ips.push(ip);

              end = ip + 2 + bc[ip + 1];
              ip += 2;
            } else {
              ip += 2 + bc[ip + 1];
            }

            break;

          case 17:
            ends.push(end);
            ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

            if (input.length > peg$currPos) {
              end = ip + 3 + bc[ip + 1];
              ip += 3;
            } else {
              end = ip + 3 + bc[ip + 1] + bc[ip + 2];
              ip += 3 + bc[ip + 1];
            }

            break;

          case 18:
            ends.push(end);
            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

            if (input.substr(peg$currPos, (peg$consts[bc[ip + 1]] as string).length) === peg$consts[bc[ip + 1]]) {
              end = ip + 4 + bc[ip + 2];
              ip += 4;
            } else {
              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
              ip += 4 + bc[ip + 2];
            }

            break;

          case 19:
            ends.push(end);
            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

            if (input.substr(peg$currPos, (peg$consts[bc[ip + 1]] as string).length).toLowerCase() === peg$consts[bc[ip + 1]]) {
              end = ip + 4 + bc[ip + 2];
              ip += 4;
            } else {
              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
              ip += 4 + bc[ip + 2];
            }

            break;

          case 20:
            ends.push(end);
            ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

            if ((peg$consts[bc[ip + 1]] as RegExp).test(input.charAt(peg$currPos))) {
              end = ip + 4 + bc[ip + 2];
              ip += 4;
            } else {
              end = ip + 4 + bc[ip + 2] + bc[ip + 3];
              ip += 4 + bc[ip + 2];
            }

            break;

          case 21:
            stack.push(input.substr(peg$currPos, bc[ip + 1]));
            peg$currPos += bc[ip + 1];
            ip += 2;
            break;

          case 22:
            stack.push(peg$consts[bc[ip + 1]]);
            peg$currPos += (peg$consts[bc[ip + 1]] as string).length;
            ip += 2;
            break;

          case 23:
            stack.push(peg$FAILED);
            if (peg$silentFails === 0) {
              peg$fail(peg$consts[bc[ip + 1]] as ILiteralExpectation);
            }
            ip += 2;
            break;

          case 24:
            peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
            ip += 2;
            break;

          case 25:
            peg$savedPos = peg$currPos;
            ip++;
            break;

          case 26:
            params = bc.slice(ip + 4, ip + 4 + bc[ip + 3])
              .map(function(p) { return stack[stack.length - 1 - p]; });

            stack.splice(
              stack.length - bc[ip + 2],
              bc[ip + 2],
              (peg$consts[bc[ip + 1]] as ((...args: any[]) => any)).apply(null, params)
            );

            ip += 4 + bc[ip + 3];
            break;

          case 27:
            stack.push(peg$parseRule(bc[ip + 1]));
            ip += 2;
            break;

          case 28:
            peg$silentFails++;
            ip++;
            break;

          case 29:
            peg$silentFails--;
            ip++;
            break;

          default:
            throw new Error("Invalid opcode: " + bc[ip] + ".");
        }
      }

      if (ends.length > 0) {
        end = ends.pop();
        ip = ips.pop();
      } else {
        break;
      }
    }

    return stack[0];
  }

  peg$result = peg$parseRule(peg$startRuleIndex);

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

export interface IParseOptions {
  filename?: string;
  startRule?: string;
  tracer?: any;
  [key: string]: any;
}
export type ParseFunction = (input: string, options?: IParseOptions) => any;
export const parse: ParseFunction = peg$parse;
