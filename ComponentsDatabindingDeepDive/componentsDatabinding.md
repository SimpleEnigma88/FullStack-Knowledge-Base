#### Splitting Apps into components

Splitting up the components and preparing to use binding techniques to update multiple components simultaneously.

#### Property and Event Binding Ooverview

![Alt text](/databinding.png)

### Binding to Custom Properties

So, you create an element

```
element: {
    type: string, name: string, content: string
  };
```

properties cannot be accesses from outside their components, by default.

@Input allows you to access these properties.

```
@Input element: {
    type: string, name: string, content: string
  };
```

Make sure to import @Input

```
import { Input } from '@angular/core';
```

#### Assigning an Alias to custom Events

You can change the name by which you bind to the property

```
@Input('srvElement') element: {
    type: string, name: string, content: string
  };
```

Which will change how other components access the element

```
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement"></app-server-element>
    </div>
  </div>
</div>
```

Do you have to use the Alias from within the element's home component?

#### Custom Property and Event Binding Summary
