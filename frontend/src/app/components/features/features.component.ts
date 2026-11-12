import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingService } from '../../services';
import { Feature } from '../../models';

export interface FeatureCardStyle {
  cardBg: string;
  badgeBg: string;
  badgeText: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
})
export class FeaturesComponent implements OnInit {
  private readonly landingService = inject(LandingService);

  features: Feature[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.isLoading = true;
    this.landingService.getFeatures().subscribe({
      next: (data) => {
        this.features = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar funcionalidades:', err);
        this.errorMessage = 'No se pudieron sincronizar las funcionalidades de la API.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Asigna los colores pastel oficiales de Figma (#E4DAF6, #D8F66D, #DFEBF3)
   */
  getStyleForFeature(feature: Feature, index: number): FeatureCardStyle {
    const title = feature.title?.toLowerCase() || '';

    // Armario Digital -> Lila (#E4DAF6)
    if (title.includes('armario')) {
      return { cardBg: 'bg-mirage-lila', badgeBg: 'bg-white/80', badgeText: 'text-mirage-dark' };
    }

    // Estilista IA -> Celeste (#DFEBF3)
    if (title.includes('estilista')) {
      return { cardBg: 'bg-mirage-blue', badgeBg: 'bg-white/80', badgeText: 'text-mirage-dark' };
    }

    // Avatar y Probador Virtual -> Crema (#F7F5EF)
    if (title.includes('avatar') || title.includes('probador')) {
      return { cardBg: 'bg-[#F7F5EF]', badgeBg: 'bg-white/80', badgeText: 'text-mirage-dark' };
    }

    // Realidad Aumentada -> Verde Lima (#D8F66D)
    if (title.includes('realidad') || title.includes('aumentada') || title.includes('ar')) {
      return { cardBg: 'bg-mirage-lime', badgeBg: 'bg-mirage-dark', badgeText: 'text-white' };
    }

    // Comunidad -> Lila (#E4DAF6)
    if (title.includes('comunidad')) {
      return { cardBg: 'bg-mirage-lila', badgeBg: 'bg-white/80', badgeText: 'text-mirage-dark' };
    }

    // Alternancia por defecto entre los 3 colores solicitados
    const styles: FeatureCardStyle[] = [
      { cardBg: 'bg-mirage-blue', badgeBg: 'bg-white/80', badgeText: 'text-mirage-dark' },
      { cardBg: 'bg-mirage-lila', badgeBg: 'bg-white/80', badgeText: 'text-mirage-dark' },
      { cardBg: 'bg-mirage-lime', badgeBg: 'bg-mirage-dark', badgeText: 'text-white' },
    ];
    return styles[index % styles.length];
  }

  /**
   * Mapea los iconos exportados de Figma (shirt-icon, cardigan-icon, glasses-feature)
   */
  getImageIcon(feature: Feature, index: number): string {
    const title = feature.title?.toLowerCase() || '';

    if (title.includes('armario')) {
      return 'images/shirt-icon.png';
    }
    if (title.includes('estilista')) {
      return 'images/cardigan-icon.png';
    }
    if (title.includes('avatar') || title.includes('probador') || title.includes('realidad') || title.includes('aumentada')) {
      return 'images/glasses-feature.png';
    }
    if (title.includes('comunidad')) {
      return 'images/shirt-icon.png';
    }

    const icons = ['images/shirt-icon.png', 'images/cardigan-icon.png', 'images/glasses-feature.png'];
    return icons[index % icons.length];
  }
}
