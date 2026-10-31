import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { API_HEALTH_URL } from './core/api-config';

describe('App', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTestingController.expectOne(API_HEALTH_URL).flush({ status: 'UP' });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows when the API is available', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTestingController.expectOne(API_HEALTH_URL).flush({ status: 'UP' });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status-message')?.textContent).toContain('API disponible');
  });

  it('shows an actionable error when the API is unavailable', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpTestingController.expectOne(API_HEALTH_URL).flush('Unavailable', {
      status: 503,
      statusText: 'Service Unavailable',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status-message--error')?.textContent).toContain(
      'No se pudo conectar con la API',
    );
  });
});
