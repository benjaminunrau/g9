import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthService } from './core/health.service';

type ApiConnection = 'checking' | 'connected' | 'unavailable';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly healthService = inject(HealthService);
  protected readonly apiConnection = signal<ApiConnection>('checking');

  ngOnInit(): void {
    this.healthService.check().subscribe({
      next: (response) => {
        this.apiConnection.set(response.status === 'UP' ? 'connected' : 'unavailable');
      },
      error: () => {
        this.apiConnection.set('unavailable');
      },
    });
  }
}
