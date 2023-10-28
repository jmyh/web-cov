# WebCov

Chrome extension for visualizing test coverage

The project based on the [following talk](https://www.youtube.com/watch?v=UmEAj0u0Dsc) and the [repository](https://github.com/kurau/locators-hotspots-chrome-plugin).

## Installation

1. Download files from this repository
2. Turn on developer mode in Google Chrome
3. Click 'Load unpacked' button on Extension Tab
4. Choose directory with this source code

## Usage

This extension allows you to upload a json file with information about used locators in 
your web-tests.

### File format

```json
[
  {
    "fullPath": "<web element css selector>",
    "testNames": {
      "<session id>": "<test name>"
    },
    "count": "<number of time web element was used during the tests>"
  }
]
```

### File example

Works for https://www.saucedemo.com/
```json
[
  {
    "fullPath": ".inventory_list",
    "testNames": {
      "ecd758e5-31df-4760-ad47-565abbe9b4b2": "Success login test"
    },
    "count": 1
  },
  {
    "fullPath": ".error-message-container",
    "testNames": {
      "7e3e3b29-6561-4d20-8df6-a9cb61466a2c": "Failed login"
    },
    "count": 1
  },
  {
    "fullPath": "#password+svg",
    "testNames": {
      "7e3e3b29-6561-4d20-8df6-a9cb61466a2c": "Failed login"
    },
    "count": 1
  },
  {
    "fullPath": "#remove-sauce-labs-backpack",
    "testNames": {
      "4f745ee5-2868-4304-935a-90ac8802d634": "Remove backpack from the cart",
      "f9618245-233b-4c08-bb04-6614a98f927e": "Add backpack to the cart"
    },
    "count": 2
  },
  {
    "fullPath": "#login-button",
    "testNames": {
      "ecd758e5-31df-4760-ad47-565abbe9b4b2": "Success login test",
      "7e3e3b29-6561-4d20-8df6-a9cb61466a2c": "Failed login"
    },
    "count": 2
  },
  {
    "fullPath": "#user-name",
    "testNames": {
      "ecd758e5-31df-4760-ad47-565abbe9b4b2": "Success login test",
      "7e3e3b29-6561-4d20-8df6-a9cb61466a2c": "Failed login"
    },
    "count": 2
  },
  {
    "fullPath": "#user-name+svg",
    "testNames": {
      "7e3e3b29-6561-4d20-8df6-a9cb61466a2c": "Failed login"
    },
    "count": 1
  },
  {
    "fullPath": "#password",
    "testNames": {
      "ecd758e5-31df-4760-ad47-565abbe9b4b2": "Success login test",
      "7e3e3b29-6561-4d20-8df6-a9cb61466a2c": "Failed login"
    },
    "count": 2
  },
  {
    "fullPath": "#add-to-cart-sauce-labs-backpack",
    "testNames": {
      "4f745ee5-2868-4304-935a-90ac8802d634": "Remove backpack from the cart",
      "bceaf2c5-5b27-458d-b7cf-db9829f8ad85": "Check init status for the backpack",
      "f9618245-233b-4c08-bb04-6614a98f927e": "Add backpack to the cart"
    },
    "count": 3
  },
  {
    "fullPath": ".shopping_cart_badge",
    "testNames": {
      "f9618245-233b-4c08-bb04-6614a98f927e": "Add backpack to the cart"
    },
    "count": 1
  }
]

```

