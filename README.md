<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:5EE7FF,100:F5C561&height=200&section=header&text=Prism%20Timestamp%20Tool&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Unix%20%E2%87%84%20Date%20%C2%B7%20World%20clock%20%C2%B7%20Discord%20tags&descAlignY=58&descSize=16" width="100%" alt="Prism Timestamp Tool" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=5EE7FF&center=true&vCenter=true&width=680&lines=1793000000+%E2%86%92+a+real+date;Auto-detect+s%2C+ms%2C+%C2%B5s%2C+ns;Discord+%3Ct%3A%E2%80%A6%3AR%3E+tags;World+clock+for+10+zones" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-timestamp-tool/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-timestamp-tool/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-timestamp-tool/"><img src="https://img.shields.io/badge/Live_Demo-Open-5EE7FF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-5EE7FF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-timestamp-tool?style=for-the-badge&color=F5C561" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Timestamp Tool screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Timestamp Tool** converts between Unix time and human dates without guesswork. Paste a number and it detects whether it is seconds, milliseconds, microseconds or nanoseconds; paste an ISO string, `now`, or a relative value like `-2h` or `+3 days`. It shows the result in every useful format, including Discord timestamp tags, along with a live world clock and a date difference calculator.

## ✨ Features

- **Live Unix clock** with copy and pause
- **Smart input**: unix s/ms/µs/ns, ISO 8601, RFC 2822, `now`, relative (`-7d`, `+1 week`)
- **Formats**: Unix, ISO, RFC 2822, local, SQL DATETIME, Discord `<t:…:F>` and `<t:…:R>`
- **Relative time**, day of year, ISO week, quarter and leap year
- **World clock** across 10 time zones plus yours
- **Difference** between any two dates

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Timestamp Tool on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Timestamp Tool on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-timestamp-tool/](https://krishyaa06.github.io/prism-timestamp-tool/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-timestamp-tool.git
cd prism-timestamp-tool
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

| Input | Detected as |
| --- | --- |
| `1793000000` | Unix seconds |
| `1793000000000` | Unix milliseconds |
| `2026-10-26T10:00:00Z` | ISO 8601 |
| `-3d` | 3 days ago |

Click any format row to copy it.

## 📁 Project Structure

```
prism-timestamp-tool/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # parsing, formats, calendar math — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Timestamp Tool is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:F5C561,50:5EE7FF,100:07060f&height=110&section=footer" width="100%" />
