## Services and Dependency Injection
GitHub Copilot: Angular services are a way to organize and share code across your application. They are typically used to encapsulate functionality that is not specific to a component, such as data access, logging, or authentication. Services are singletons, meaning that there is only one instance of a service in an application, and they can be injected into components, directives, and other services using Angular's dependency injection system. This allows you to easily share functionality across your application and keep your code modular and maintainable.

### Why would you need Services?

### Creating a Logging Service

### Injecting the Logging Service into Components

**new-account.component.ts**
```
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent {
    @Input() account: {name: string, status: string};
    @Input() id: number;
    @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

    constructor(private loggingService: LoggingService) {}

    onSetTo(status: string) {
        this.statusChanged.emit({id: this.id, newStatus: status});
        this.loggingService.logStatusChange(status);
    }
}
```


**logging.service.ts**
```
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
```

Services are provided to the component and all it's child components. If you want to provide a service to the entire application, you need to provide it in the AppModule. 
AppModule provides it's services to all components in the application *and other services*.
AppComponent will provide it's services to it's child components but not to other services.

### Injecting Services into Services

In order to use a service withing a service Import an add @Injectable to the service you want to inject INTO, NOT the service you want to inject. This gives it META data that Angular can work with.

**accounts.service.ts** -- Injecting LoggingService into AccountsService
```
import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountsService {
      accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) { }

  addAccount(name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
```

