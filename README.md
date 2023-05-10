# TextMod SDK for Node.js

[![codecov](https://codecov.io/gh/textmod/textmod-node/branch/master/graph/badge.svg?token=USRUTFK5KE)](https://codecov.io/gh/textmod/textmod-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an SDK for the [TextMod API](https://textmod.xyz/) that allows you to easily moderate text content for various sentiments such as spam, hate, and pornography.

## Installation

```bash
npm install @textmod/textmod-node
```


## Usage

To use the TextMod SDK, you'll need an API authentication token from the [TextMod website](https://textmod.xyz).
Once you have that, you can create an instance of the TextMod class:

```javascript
import { TextMod } from '@textmod/textmod-node';

const textmod = new TextMod({
  authToken: '<YOUR_AUTH_TOKEN>',
  filterSentiments: ['spam', 'hate', 'sexual/minors'],
});
```

The filterSentiments option is optional and defaults to allowing all sentiments.
If specified, only the specified sentiments will be moderated.

You can then use the moderate method to moderate text content:

```javascript
const result = await textmod.moderate('Hello world!');
console.log(result); // { spam: false, hate: false, sexualMinors: false, ... }
```

The moderate method returns a `Promise` that resolves to a `ModerationResult` object.
This object has a boolean property for each sentiment that has been moderated.
The property names are normalized to use camelCase instead of kebab-case.

## API Documentation

### TextMod

The TextMod class is the main class in this SDK. It has one method:

`moderate(text: string): Promise<ModerationResult>`

Moderates the specified text and returns a `ModerationResult` object.
The `text` parameter is a string representing the content to moderate.

### Types
This SDK defines the following types:

- `ModerationResult`: A type that represents the result returned by the moderate method. It is an object with boolean properties for each sentiment that has been moderated. The property names are normalized to use camelCase instead of kebab-case.
- `TextModApiRequestBody`: A type that represents the request body sent to the TextMod API when moderating content.
- `TextModSentiments`: A type that represents the response returned by the TextMod API when moderating content. It is an object with boolean properties for each sentiment that has been moderated.
- `TextModConfig`: A type that represents the configuration options for the `TextMod` class. It has two properties:
  - `authToken`: A string representing the TextMod API authentication token.
  - `filterSentiments`: An optional array of sentiment names to moderate. If specified, only the specified sentiments will be moderated.

## Example
Here's an example of how to use the TextMod class:

```typescript
import { TextMod } from 'textmod-sdk';

const textmod = new TextMod({
  authToken: '<YOUR_AUTH_TOKEN>',
  filterSentiments: ['spam', 'hate', 'sexual/minors'],
});

const result = await textmod.moderate('Hello world!');
console.log(result); // { spam: false, hate: false, sexualMinors: false, ... }
```


## Contributing
If you have suggestions for how this SDK could be improved, or want to report a bug, please open an issue! We welcome contributions from the community.

## License
This SDK is released under the [MIT License](./LICENSE.md).
