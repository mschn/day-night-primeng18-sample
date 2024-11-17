import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { Aura } from 'primeng/themes/aura';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToggleSwitchModule, FormsModule, CardModule],
  template: `
    <div
      class="w-32 m-3 p-3  border shadow-md rounded-md
           bg-gray-100 border-gray-300 text-gray-950
           dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
    >
      <div class="mb-3">
        @if (isDarkMode()) {
          Dark 🌚
        } @else {
          Light 🌞
        }
      </div>
      <p-toggleSwitch
        [ngModel]="isDarkMode()"
        (ngModelChange)="toggleDarkMode()"
        [dt]="darkThemeSwitchTokens"
      ></p-toggleSwitch>
    </div>
  `,
})
export class AppComponent {
  primeNgConfig = inject(PrimeNGConfig);
  isDarkMode = signal(false);

  darkThemeSwitchTokens = {
    width: '4.2rem',
    height: '2.3rem',
    checkedBackground: '#ccc',
    checkedHoverBackground: '#ddd',
    handle: {
      size: '2rem',
      background: 'transparent url("sun-emoji.png") 0 0 / 2rem no-repeat',
      hoverBackground: 'transparent url("sun-emoji.png") 0 0 / 2rem no-repeat',
      checkedBackground:
        'transparent url("moon-emoji.png") 0 0 / 2rem no-repeat',
      checkedHoverBackground:
        'transparent url("moon-emoji.png") 0 0 / 2rem no-repeat',
    },
  };

  constructor() {
    this.primeNgConfig.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    });
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isDarkMode.set(!this.isDarkMode());
  }
}
