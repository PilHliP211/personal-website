import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationPaneComponent } from "./navigation-pane/navigation-pane.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationPaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-website';
}
