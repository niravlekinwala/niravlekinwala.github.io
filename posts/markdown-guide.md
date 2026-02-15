---
title: "Markdown Features Guide"
date: "2024-03-20"
description: "A comprehensive guide to using Markdown features on this blog, including tables, math equations, code blocks, and more."
tags: ["Air Quality"]
---

This guide demonstrates the Markdown features available on this website. You can use this post as a reference or template when writing new content.

## 1. Typography

You can use standard Markdown for **bold**, *italic*, ~~strikethrough~~, and `inline code`.

> Blockquotes are styled like this. They are great for highlighting important information or quotes.

## 2. Lists

### Unordered List
- Item 1
- Item 2
  - Sub-item A
  - Sub-item B

### Ordered List
1. First step
2. Second step
3. Third step

### Task List
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## 3. Code Blocks

Syntax highlighting is supported for many languages.

```python
def hello_world():
    print("Hello, World!")
    return True
```

```javascript
const greeting = "Hello, World!";
console.log(greeting);
```

## 4. Tables (GFM)

Tables are supported using GitHub Flavored Markdown syntax.

| Feature | Support | Notes |
| :--- | :---: | :--- |
| Tables | ✅ | Auto-formatted |
| Alignment | ✅ | Left, Center, Right |
| Math | ✅ | LaTeX syntax |

## 5. Math Equations (LaTeX)

Math rendering is powered by KaTeX. You can use inline math like $E = mc^2$ or block math:

$$
\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

Maxwell's Equations:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

## 6. Links and Images

[Link to Google](https://google.com)

![Placeholder Image](https://placehold.co/600x400)

## 7. HTML Support

You can also use raw HTML if needed (use sparingly).

<div style="padding: 20px; background-color: rgba(0,0,0,0.1); border-radius: 8px;">
  This is a raw HTML div with custom inline styles.
</div>
