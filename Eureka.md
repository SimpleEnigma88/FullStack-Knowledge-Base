###### Things to polish up and add to the appropriate section in the knowledge base.


###Component Styles
Application styling can be added to the `app.component.ts` file:

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['/app.component.css']
  styles: ['
  h3 {
    color:dodgerBlue;
  }
']
)}
export class AppComponent {
}
```

---------------------------------
