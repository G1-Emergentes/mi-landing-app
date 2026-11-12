import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavbarComponent,
  HeroComponent,
  FeaturesComponent,
  HowItWorksComponent,
  ShowcaseComponent,
  B2bComponent,
  TeamComponent,
  ContactComponent,
  CtaBannerComponent,
  FooterComponent,
} from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    HowItWorksComponent,
    ShowcaseComponent,
    B2bComponent,
    TeamComponent,
    ContactComponent,
    CtaBannerComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Mirage by ReWear';
}
