# yc-ui: A Vue 3.3 and TypeScript Component Library

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![GitHub Releases](https://img.shields.io/badge/releases-latest-orange)

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

## Overview

yc-ui is a component library designed for Vue 3.3 and TypeScript. This library aims to simplify the development of user interfaces by providing reusable components. Each component is built with performance and usability in mind. 

The library leverages the capabilities of Vue 3.3, including its Composition API, and integrates seamlessly with TypeScript for type safety. This combination ensures that developers can create robust applications with less effort.

### Key Features

- **Modular Design**: Each component is self-contained, allowing for easy integration.
- **Type Safety**: Built with TypeScript to catch errors early in development.
- **Vue 3.3 Compatibility**: Utilizes the latest features of Vue 3.3.
- **Lightweight**: Designed to be minimalistic and efficient.

## Installation

To get started with yc-ui, you can install it via npm. Run the following command in your project directory:

```bash
npm install yc-ui
```

Once installed, you can import the components you need into your Vue application.

## Usage

To use yc-ui in your Vue project, you need to import the components. Here’s a simple example of how to do this:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { YcButton } from 'yc-ui';

const app = createApp(App);
app.component('YcButton', YcButton);
app.mount('#app');
```

You can then use the `<YcButton>` component in your templates:

```html
<template>
  <div>
    <YcButton label="Click Me!" @click="handleClick" />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('Button clicked!');
    }
  }
}
</script>
```

## Components

The library includes a variety of components. Here are some of the key components you can use:

### YcButton

A customizable button component.

**Props:**

- `label`: The text to display on the button.
- `type`: The type of button (e.g., primary, secondary).
- `disabled`: If true, disables the button.

### YcInput

A simple input field component.

**Props:**

- `placeholder`: Placeholder text for the input.
- `value`: The value of the input.
- `type`: The type of input (e.g., text, password).

### YcModal

A modal component for displaying content.

**Props:**

- `visible`: Controls the visibility of the modal.
- `title`: The title of the modal.
- `content`: The content to display inside the modal.

### YcCard

A card component for displaying information.

**Props:**

- `title`: The title of the card.
- `content`: The content to display inside the card.
- `footer`: Optional footer content.

### YcAlert

An alert component for displaying messages.

**Props:**

- `message`: The alert message.
- `type`: The type of alert (e.g., success, error, warning).

## Contributing

We welcome contributions to yc-ui. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

Please ensure your code follows the existing style and includes tests where applicable.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Links

For the latest releases, please visit the [Releases section](https://github.com/mahathir444/yc-ui/releases). You can download the latest version and follow the installation instructions.

If you have any questions or need further information, feel free to check the [Releases section](https://github.com/mahathir444/yc-ui/releases) for updates and notes.

## Resources

- [Vue.js Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [VueUse](https://vueuse.org/)

## Contact

For any inquiries or feedback, you can reach out via the GitHub Issues page.

---

This README provides a comprehensive guide to using the yc-ui component library. You can explore the components, installation process, and contributing guidelines to get started with your project.