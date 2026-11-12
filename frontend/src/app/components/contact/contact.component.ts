import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LandingService } from '../../services';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly landingService = inject(LandingService);

  contactForm: FormGroup = this.fb.group({
    storeName: ['', [Validators.required, Validators.minLength(2)]],
    representative: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    websiteSocial: [''],
    message: ['', [Validators.required, Validators.minLength(5)]],
  });

  isSubmitting = false;
  showSuccessModal = false;
  errorMessage = '';

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.errorMessage = 'Por favor completa correctamente los campos obligatorios (*).';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.landingService.sendContact(this.contactForm.value).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.success) {
          this.showSuccessModal = true;
          this.contactForm.reset();
        } else {
          this.errorMessage = res.message || 'Error al procesar la solicitud.';
        }
      },
      error: (err) => {
        console.error('Error al registrar contacto B2B:', err);
        this.isSubmitting = false;
        this.errorMessage =
          err?.error?.message || 'Error de conexión con el servidor. Verifica que el backend esté disponible.';
      },
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
  }
}
