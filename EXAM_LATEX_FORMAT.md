# Exam LaTeX Format Guide

এই ডকুমেন্টে Math4Code ওয়েবসাইটে ব্যবহৃত Exam এর LaTeX ফরম্যাট বর্ণনা করা হয়েছে।

## Overview

ওয়েবসাইটে **MathJax v3** ব্যবহার করে LaTeX রেন্ডার করা হয়। আপনি `.tex` ফাইল আপলোড করে সম্পূর্ণ পরীক্ষা import করতে পারবেন।

## Basic Structure

```latex
\begin{exam}{Exam Title Here}

\textbf{Description:} Brief description of the exam
\textbf{Duration:} 180 minutes
\textbf{Total Marks:} 100
\textbf{Negative Marking:} 0.25
\textbf{Status:} draft
\textbf{Start Time:} 2024-01-01T10:00:00
\textbf{End Time:} 2024-01-01T13:00:00

\begin{examsection}{1}{Section Name}

\question{TYPE}{QUESTION_TEXT}{MARKS}{NEGATIVE_MARKS}{DIFFICULTY}{TOPIC}{TITLE}
\begin{options}
\item Option A text
\item Option B text
\item Option C text
\item Option D text
\end{options}
\answer{A}
\explanation{Detailed explanation here}

% More questions...

\end{examsection}

% More sections...

\end{exam}
```

## Metadata Fields

### Exam Level Metadata

- **Description**: পরীক্ষার সংক্ষিপ্ত বিবরণ
- **Duration**: মিনিটে সময় (শুধু সংখ্যা লিখুন, যেমন: `180`)
- **Total Marks**: মোট নম্বর
- **Negative Marking**: নেগেটিভ মার্কিং (যেমন: `0.25` মানে প্রতি ভুল উত্তরে 0.25 কাটা হবে)
- **Status**: `draft`, `published`, অথবা `archived`
- **Start Time**: (Optional) ISO format - `YYYY-MM-DDTHH:MM:SS`
- **End Time**: (Optional) ISO format - `YYYY-MM-DDTHH:MM:SS`

### Section Format

```latex
\begin{examsection}{ORDER}{TITLE}
% Questions here
\end{examsection}
```

- **ORDER**: Section এর ক্রম সংখ্যা (1, 2, 3...)
- **TITLE**: Section এর নাম (যেমন: "Mathematics", "Physics")

## Question Format

### Question Header

```latex
\question{TYPE}{QUESTION_TEXT}{MARKS}{NEGATIVE_MARKS}{DIFFICULTY}{TOPIC}{TITLE}
```

**Parameters:**

1. **TYPE**: Question type
   - `MCQ` - Multiple Choice (একটি সঠিক উত্তর)
   - `MSQ` - Multiple Select (একাধিক সঠিক উত্তর)
   - `NAT` - Numerical Answer Type (সংখ্যাসূচক উত্তর)

2. **QUESTION_TEXT**: প্রশ্নের টেক্সট (LaTeX math সমর্থিত)
   - Inline math: `$x^2 + y^2 = z^2$`
   - Display math: `$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$`

3. **MARKS**: এই প্রশ্নের জন্য নম্বর (যেমন: `2`, `4`)

4. **NEGATIVE_MARKS**: ভুল উত্তরের জন্য কাটা নম্বর (যেমন: `0.5`, `1`)

5. **DIFFICULTY**: কঠিনতার স্তর
   - `easy`
   - `medium`
   - `hard`

6. **TOPIC**: বিষয়/টপিক (যেমন: "Calculus", "Algebra")

7. **TITLE**: (Optional) প্রশ্নের শিরোনাম (খালি রাখলে exam title ব্যবহার হবে)

### Options (MCQ/MSQ only)

```latex
\begin{options}
\item First option with $\alpha = \beta$
\item Second option with $$\frac{d}{dx}(x^2) = 2x$$
\item Third option
\item Fourth option
\end{options}
```

### Answer

**For MCQ/MSQ:**
```latex
\answer{A}        % Single answer
\answer{A,C}      % Multiple answers
\answer{1}        % Number format (1-based)
\answer{1,3}      % Multiple with numbers
```

**For NAT:**
```latex
\answer{42}       % Numerical answer
\answer{3.14159}  % Decimal answer
```

### Explanation (Optional)

```latex
\explanation{
This is the detailed explanation.
You can use LaTeX math: $f(x) = x^2$
And display equations:
$$\int_a^b f(x)dx = F(b) - F(a)$$
}
```

## Complete Example

```latex
\begin{exam}{IIT-JAM Mathematics Mock Test 2024}

\textbf{Description:} Full-length mock test for IIT-JAM Mathematics preparation
\textbf{Duration:} 180 minutes
\textbf{Total Marks:} 100
\textbf{Negative Marking:} 0.33
\textbf{Status:} published

\begin{examsection}{1}{Calculus}

\question{MCQ}{Find the derivative of $f(x) = x^3 + 2x^2 - 5x + 3$}{2}{0.66}{easy}{Differentiation}{Basic Derivative}
\begin{options}
\item $f'(x) = 3x^2 + 4x - 5$
\item $f'(x) = 3x^2 + 2x - 5$
\item $f'(x) = x^2 + 4x - 5$
\item $f'(x) = 3x^2 + 4x + 5$
\end{options}
\answer{A}
\explanation{
Using the power rule: $\frac{d}{dx}(x^n) = nx^{n-1}$

$$f'(x) = 3x^2 + 4x - 5$$
}

\question{MSQ}{Which of the following functions are continuous at $x=0$?}{4}{1.33}{medium}{Continuity}{Continuity Check}
\begin{options}
\item $f(x) = \sin(x)/x$ for $x \neq 0$, $f(0) = 1$
\item $f(x) = |x|$
\item $f(x) = 1/x$
\item $f(x) = e^x$
\end{options}
\answer{A,B,D}
\explanation{
- Option A: $\lim_{x \to 0} \frac{\sin x}{x} = 1 = f(0)$ ✓
- Option B: $|x|$ is continuous everywhere ✓
- Option C: $1/x$ has discontinuity at $x=0$ ✗
- Option D: $e^x$ is continuous everywhere ✓
}

\question{NAT}{Evaluate: $\int_0^1 x^2 dx$ (Round to 2 decimal places)}{2}{0.66}{easy}{Integration}{}
\answer{0.33}
\explanation{
$$\int_0^1 x^2 dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1}{3} - 0 = 0.33$$
}

\end{examsection}

\begin{examsection}{2}{Linear Algebra}

\question{MCQ}{What is the rank of the matrix $A = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$?}{2}{0.66}{medium}{Matrices}{Matrix Rank}
\begin{options}
\item 0
\item 1
\item 2
\item 3
\end{options}
\answer{B}
\explanation{
The second row is $2 \times$ first row, so rows are linearly dependent.
Therefore, rank = 1.
}

\end{examsection}

\end{exam}
```

## LaTeX Math Syntax

### Common Symbols

```latex
% Greek letters
\alpha, \beta, \gamma, \delta, \theta, \lambda, \mu, \pi, \sigma

% Operators
\sum, \prod, \int, \lim, \frac{a}{b}, \sqrt{x}, \sqrt[n]{x}

% Relations
\leq, \geq, \neq, \approx, \equiv, \in, \subset, \subseteq

% Functions
\sin, \cos, \tan, \log, \ln, \exp

% Arrows
\rightarrow, \leftarrow, \Rightarrow, \Leftrightarrow

% Sets
\mathbb{R}, \mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{C}
```

### Matrices

```latex
% Matrix
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}

% Determinant
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix}

% System of equations
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
```

### Advanced Examples

```latex
% Limits
\lim_{x \to \infty} \frac{1}{x} = 0

% Summation
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}

% Integration
\int_a^b f(x)dx = F(b) - F(a)

% Partial derivatives
\frac{\partial f}{\partial x}

% Vector notation
\vec{v} = \langle x, y, z \rangle
```

## Important Notes

1. **LaTeX Comments**: `%` দিয়ে শুরু হওয়া লাইন ignore করা হবে
2. **Multiline Questions**: Question text এবং options multiline হতে পারে
3. **Math Rendering**: MathJax v3 ব্যবহার করা হয়, তাই standard LaTeX math commands সব কাজ করবে
4. **File Upload**: Admin panel থেকে `.tex` ফাইল আপলোড করতে পারবেন
5. **Validation**: Import এর সময় সব field validate করা হয়

## Rendering in Website

ওয়েবসাইটে LaTeX render করার জন্য:

- **Inline Math**: `$...$` দিয়ে wrap করুন
- **Display Math**: `$$...$$` দিয়ে wrap করুন
- **MathJax Config**: `app/layout.tsx` এ configured আছে
- **Helper Function**: `lib/renderWithLatex.tsx` ব্যবহার করা হয়

## Testing Your LaTeX

আপনার LaTeX ফাইল test করার জন্য:

1. উপরের format অনুসরণ করে `.tex` ফাইল তৈরি করুন
2. Admin panel এ যান
3. "Import Exam" অপশন select করুন
4. আপনার `.tex` ফাইল আপলোড করুন
5. Preview দেখুন এবং confirm করুন

## Common Errors

### ❌ Wrong Format
```latex
\question{MCQ, Find derivative, 2, 0.66, easy, Calculus}  % Wrong: comma-separated
```

### ✅ Correct Format
```latex
\question{MCQ}{Find derivative}{2}{0.66}{easy}{Calculus}{}  % Correct: curly braces
```

### ❌ Missing Braces
```latex
\question{MCQ}{What is 2+2?}{2}{0.66}{easy}{Arithmetic}  % Missing 7th parameter
```

### ✅ Correct
```latex
\question{MCQ}{What is 2+2?}{2}{0.66}{easy}{Arithmetic}{}  % Empty title is OK
```

## Support

যদি কোনো সমস্যা হয়, তাহলে:
1. LaTeX syntax check করুন
2. Curly braces `{}` সঠিকভাবে আছে কিনা দেখুন
3. Question type (MCQ/MSQ/NAT) সঠিক আছে কিনা verify করুন
4. Math expressions `$` অথবা `$$` দিয়ে wrap করা আছে কিনা check করুন

---

**Created for Math4Code Exam Platform**
