# **node-addon-api module**
This module contains **header-only C++ wrapper classes** which simplify
the use of the C based [N-API](https://nodejs.org/dist/latest/docs/api/n-api.html)
provided by Node.js when using C++. It provides a C++ object model
and exception handling semantics with low overhead.

N-API is an ABI stable C interface provided by Node.js for building native
addons. It is independent from the underlying JavaScript runtime (e.g. V8 or ChakraCore)
and is maintained as part of Node.js itself. It is intended to insulate
native addons from changes in the underlying JavaScript engine and allow
modules compiled for one version to run on later versions of Node.js without
recompilation.

The `node-addon-api` module, which is not part of Node.js, preserves the benefits
of the N-API as it consists only of inline code that depends only on the stable API
provided by N-API. As such, modules built against one version of Node.js
using node-addon-api should run without having to be rebuilt with newer versions
of Node.js.

It is important to remember that *other* Node.js interfaces such as
`libuv` (included in a project via `#include <uv.h>`) are not ABI-stable across
Node.js major versions. Thus, an addon must use N-API and/or `node-addon-api`
exclusively and build against a version of Node.js that includes an
implementation of N-API (meaning an active LTS version of Node.js) in
order to benefit from ABI stability across Node.js major versions. Node.js
provides an [ABI stability guide][] containing a detailed explanation of ABI
stability in general, and the N-API ABI stability guarantee in particular.

As new APIs are added to N-API, node-addon-api must be updated to provide
wrappers for those new APIs. For this reason node-addon-api provides
methods that allow callers to obtain the underlying N-API handles so
direct calls to N-API and the use of the objects/methods provided by
node-addon-api can be used together. For example, in order to be able
to use an API for which the node-addon-api does not yet provide a wrapper.

APIs exposed by node-addon-api are generally used to create and
manipulate JavaScript values. Concepts and operations generally map
to ideas specified in the **ECMA262 Language Specification**.

- **[Setup](#setup)**
- **[API Documentation](#api)**
- **[Examples](#examples)**
- **[Tests](#tests)**
- **[More resource and info about native Addons](#resources)**
- **[Badges](#badges)**
- **[Code of Conduct](CODE_OF_CONDUCT.md)**
- **[Contributors](#contributors)**
- **[License](#license)**

## **Current version: 3.0.0**

(See [CHANGELOG.md](CHANGELOG.md) for complete Changelog)

[![NPM](https://nodei.co/npm/node-addon-api.png?downloads=true&downloadRank=true)](https://nodei.co/npm/node-addon-api/) [![NPM](https://nodei.co/npm-dl/node-addon-api.png?months=6&height=1)](https://nodei.co/npm/node-addon-api/)

<a name="setup"></a>

node-addon-api is based on [N-API](https://nodejs.org/api/n-api.html) and supports using different N-API versions. 
This allows addons built with it to run with Node.js versions which support the targeted N-API version. 
**However** the node-addon-api support model is to support only the active LTS Node.js versions. This means that
every year there will be a new major which drops support for the Node.js LTS version which has gone out of service.

The oldest Node.js version supported by the current version of node-addon-api is Node.js 10.x.

## Setup
  - [Installation and usage](doc/setup.md)
  - [node-gyp](doc/node-gyp.md)
  - [cmake-js](doc/cmake-js.md)
  - [Conversion tool](doc/conversion-tool.md)
  - [Checker tool](doc/checker-tool.md)
  - [Generator](doc/generator.md)
  - [Prebuild tools](doc/prebuild_tools.md)

<a name="api"></a>

### **API Documentation**

The following is the documentation for node-addon-api.

 - [Basic Types](doc/basic_types.md)
    - [Array](doc/basic_types.md#array)
    - [Symbol](doc/symbol.md)
    - [String](doc/string.md)
    - [Name](doc/basic_types.md#name)
    - [Number](doc/number.md)
    - [Date](doc/date.md)
    - [BigInt](doc/bigint.md)
    - [Boolean](doc/boolean.md)
    - [Env](doc/env.md)
    - [Value](doc/value.md)
    - [CallbackInfo](doc/callbackinfo.md)
    - [Reference](doc/reference.md)
    - [External](doc/external.md)
    - [Object](doc/object.md)
        - [ObjectReference](doc/object_reference.md)
        - [PropertyDescriptor](doc/property_descriptor.md)
 - [Error Handling](doc/error_handling.md)
    - [Error](doc/error.md)
    - [TypeError](doc/type_error.md)
    - [RangeError](doc/range_error.md)
 - [Object Lifetime Management](doc/object_lifetime_management.md)
    - [HandleScope](doc/handle_scope.md)
    - [EscapableHandleScope](doc/escapable_handle_scope.md)
 - [Working with JavaScript Values](doc/working_with_javascript_values.md)
    - [Function](doc/function.md)
        - [FunctionReference](doc/function_reference.md)
    - [ObjectWrap](doc/object_wrap.md)
        - [ClassPropertyDescriptor](doc/class_property_descriptor.md)
    - [Buffer](doc/buffer.md)
    - [ArrayBuffer](doc/array_buffer.md)
    - [TypedArray](doc/typed_array.md)
      - [TypedArrayOf](doc/typed_array_of.md)
    - [DataView](doc/dataview.md)
 - [Memory Management](doc/memory_management.md)
 - [Async Operations](doc/async_operations.md)
    - [AsyncWorker](doc/async_worker.md)
    - [AsyncContext](doc/async_context.md)
    - [AsyncProgressWorker](doc/async_progress_worker.md)
 - [Thread-safe Functions](doc/threadsafe_function.md)
 - [Promises](doc/promises.md)
 - [Version management](doc/version_management.md)

<a name="examples"></a>

### **Examples**

Are you new to **node-addon-api**? Take a look at our **[examples](https://github.com/nodejs/node-addon-examples)**

- **[Hello World](https://github.com/nodejs/node-addon-examples/tree/master/1_hello_world/node-addon-api)**
- **[Pass arguments to a function](https://github.com/nodejs/node-addon-examples/tree/master/2_function_arguments/node-addon-api)**
- **[Callbacks](https://github.com/nodejs/node-addon-examples/tree/master/3_callbacks/node-addon-api)**
- **[Object factory](https://github.com/nodejs/node-addon-examples/tree/master/4_object_factory/node-addon-api)**
- **[Function factory](https://github.com/nodejs/node-addon-examples/tree/master/5_function_factory/node-addon-api)**
- **[Wrapping C++ Object](https://github.com/nodejs/node-addon-examples/tree/master/6_object_wrap/node-addon-api)**
- **[Factory of wrapped object](https://github.com/nodejs/node-addon-examples/tree/master/7_factory_wrap/node-addon-api)**
- **[Passing wrapped object around](https://github.com/nodejs/node-addon-examples/tree/master/8_passing_wrapped/node-addon-api)**

<a name="tests"></a>

### **Tests**

To run the **node-addon-api** tests do:

```
npm install
npm test
```

To avoid testing the deprecated portions of the API run
```
npm install
npm test --disable-deprecated
```

### **Debug**

To run the **node-addon-api** tests with `--debug` option:

```
npm run-script dev
```

If you want faster build, you might use the following option:

```
npm run-script dev:incremental
```

Take a look and get inspired by our **[test suite](https://github.com/nodejs/node-addon-api/tree/master/test)**

### **Benchmarks**

You can run the available benchmarks using the following command:

```
npm run-script benchmark
```

See [benchmark/README.md](benchmark/README.md) for more details about running and adding benchmarks.

<a name="resources"></a>

### **More resource and info about native Addons**
- **[C++ Addons](https://nodejs.org/dist/latest/docs/api/addons.html)**
- **[N-API](https://nodejs.org/dist/latest/docs/api/n-api.html)**
- **[N-API - Next Generation Node API for Native Modules](https://youtu.be/-Oniup60Afs)**

As node-addon-api's core mission is to expose the plain C N-API as C++
wrappers, tools that facilitate n-api/node-addon-api providing more
convenient patterns on developing a Node.js add-ons with n-api/node-addon-api
can be published to NPM as standalone packages. It is also recommended to tag
such packages with `node-addon-api` to provide more visibility to the community.

Quick links to NPM searches: [keywords:node-addon-api](https://www.npmjs.com/search?q=keywords%3Anode-addon-api).

<a name="badges"></a>

### **Badges**

The use of badges is recommended to indicate the minimum version of N-API
required for the module. This helps to determine which Node.js major versions are
supported. Addon maintainers can consult the [N-API support matrix][] to determine
which Node.js versions provide a given N-API version. The following badges are
available:

![N-API v1 Badge](https://github.com/nodejs/abi-stable-node/blob/doc/assets/N-API%20v1%20Badge.svg)
![N-API v2 Badge](https://github.com/nodejs/abi-stable-node/blob/doc/assets/N-API%20v2%20Badge.svg)
![N-API v3 Badge](https://github.com/nodejs/abi-stable-node/blob/doc/assets/N-API%20v3%20Badge.svg)
![N-API v4 Badge](https://github.com/nodejs/abi-stable-node/blob/doc/assets/N-API%20v4%20Badge.svg)
![N-API v5 Badge](https://github.com/nodejs/abi-stable-node/blob/doc/assets/N-API%20v5%20Badge.svg)
![N-API v6 Badge](https://github.com/nodejs/abi-stable-node/blob/doc/assets/N-API%20v6%20Badge.svg)
![N-API Experimental Version Badge](https://github.com/nodejs/abi-stable-node/blob/doc/assets/N-API%20Experimental%20Version%20Badge.svg)

## **Contributing**

We love contributions from the community to **node-addon-api**!
See [CONTRIBUTING.md](CONTRIBUTING.md) for more details on our philosophy around extending this module.

<a name="contributors"></a>

## Team members

### Active
| Name                | GitHub Link                                           |
| ------------------- | ----------------------------------------------------- |
| Anna Henningsen     | [addaleax](https://github.com/addaleax)               |
| Chengzhong Wu       | [legendecas](https://github.com/legendecas)           |
| Gabriel Schulhof    | [gabrielschulhof](https://github.com/gabrielschulhof) |
| Hitesh Kanwathirtha | [digitalinfinity](https://github.com/digitalinfinity) |
| Jim Schlight        | [jschlight](https://github.com/jschlight)             |
| Michael Dawson      | [mhdawson](https://github.com/mhdawson)               |
| Kevin Eady          | [KevinEady](https://github.com/KevinEady)
| Nicola Del Gobbo    | [NickNaso](https://github.com/NickNaso)               |

### Emeritus
| Name                | GitHub Link                                           |
| ------------------- | ----------------------------------------------------- |
| Arunesh Chandra     | [aruneshchandra](https://github.com/aruneshchandra)   |
| Benjamin Byholm     | [kkoopa](https://github.com/kkoopa)                   |
| Jason Ginchereau    | [jasongin](https://github.com/jasongin)               |
| Sampson Gao         | [sampsongao](https://github.com/sampsongao)           |
| Taylor Woll         | [boingoing](https://github.com/boingoing)             |

<a name="license"></a>

Licensed under [MIT](./LICENSE.md)

[ABI stability guide]: https://nodejs.org/en/docs/guides/abi-stability/
[N-API support matrix]: https://nodejs.org/dist/latest/docs/api/n-api.html#n_api_n_api_version_matrix