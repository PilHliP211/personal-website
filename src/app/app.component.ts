import { Component } from '@angular/core';
import { NavigationPaneComponent } from "./navigation-pane/navigation-pane.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationPaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-website';
}
