import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingService } from '../../services';
import { TeamMember } from '../../models';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  private readonly landingService = inject(LandingService);

  team: TeamMember[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadTeam();
  }

  loadTeam(): void {
    this.isLoading = true;
    this.landingService.getTeam().subscribe({
      next: (data) => {
        this.team = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando equipo desde Express:', err);
        this.errorMessage = 'No se pudieron cargar los miembros del equipo.';
        this.isLoading = false;
      },
    });
  }
}
