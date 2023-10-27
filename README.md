# Line-By-Line-Receipt-Parser
Google Cloud Vision API provides Optical Character Recognition service. When you extract text from receipt, it gives words seperately (not line by line) with coordinates. 

This project is sample application for parsing polygon coordinates by line by line.

![Line-By-Line-Receipt-Parser](https://github.com/mehmetnuribolat/Line-By-Line-Receipt-Parser/assets/145845943/c08bb7de-983d-4a9d-a702-4aa0ff224a07)

## 💻 Tech Stack

- Language: [TypeScript](https://www.typescriptlang.org/)

## ☀️ Proposed Algorithm

- Calculate the leftmost, rightmost, topmost, and bottommost vertices from the given vertices array for defining a bounding box around a text region represented by these vertices.
- Sort all text boxes in ascending order based on the y coordinate of leftbottom vertice property.
- For each textbox - check the vertical distance between them for adding them  into different paragraphs.

## ⌨️ Development

First, you need to install dependencies.

### Install dependencies:

```
npm install
```

### Execute application:

```
npm run build
```
```
npm run dev
```

### View Results:
You can check output in your console terminal.

![Line-By-Line-Receipt-Parser](https://github.com/mehmetnuribolat/Line-By-Line-Receipt-Parser/assets/145845943/73b400c0-22e6-4ab3-824c-b851563baaf6)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mehmetnuribolat/Line-By-Line-Receipt-Parser/issues).

## :pray: Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is under [MIT](https://github.com/mehmetnuribolat/Line-By-Line-Receipt-Parser/blob/main/LICENSE) license.
