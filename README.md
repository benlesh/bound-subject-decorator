# bound-subject-decorator
A decorator for reducing boilerplate around using RxJS 5 Subjects in Components (like React or similar)

## Installation

```sh
npm i -S bound-subject-decorator
```

## Usage

By decorating any property that returns a `Subject` (or `BehaviorSubject`, et al)
with `@boundSubject`, it binds the subject instance's `next`, `error` and `complete`
methods to the subject instance, so they can be used with less boilerplate in
components. This can be used in **any** framework or environment that might require
this behavior.

### React.js Basic Example

```js
import * as React from 'react';
import * as Rx from 'rxjs';
import { boundSubject } from 'bound-subject-decorator';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    this.sub = this.clicks
      .scan(x => x + 1, 0)
      .subscribe(count => this.setState({ count }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  // convert the `clicks` property to a function-subject!
  @boundSubject
  clicks = new Rx.Subject();

  render() {
    // now we can use `{this.clicks.next}` directly as a handler
    return (<div>
      <button onClick={this.clicks.next}>Click Me</button>
      <div>count: {this.state.count}</div>
    </div>);
  }
}
```
