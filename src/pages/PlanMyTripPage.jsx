import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import BookingStepper, { bookingSteps } from '../components/booking/BookingStepper.jsx';
import DestinationStep from '../components/booking/DestinationStep.jsx';
import TravelStep from '../components/booking/TravelStep.jsx';
import TravellerStep from '../components/booking/TravellerStep.jsx';
import VehicleStep from '../components/booking/VehicleStep.jsx';
import ContactStep from '../components/booking/ContactStep.jsx';
import ReviewStep from '../components/booking/ReviewStep.jsx';
import TripSummary from '../components/booking/TripSummary.jsx';
import { destinations, getDestinationBySlug } from '../data/destinations.js';
import { getExperienceBySlug } from '../data/experiences.js';
import { getPackageBySlug } from '../data/packages.js';
import { getVehicleBySlug } from '../data/vehicles.js';
import { submitBooking } from '../services/bookingService.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

const initialFromParams = (params) => ({
  destination: params.get('destination') || destinations[0]?.slug || '',
  experience: params.get('experience') || '',
  package: params.get('package') || '',
  startDate: '',
  endDate: '',
  days: '',
  adults: '2',
  children: '0',
  specialRequirements: '',
  vehicle: params.get('vehicle') || '',
  tripType: '',
  fullName: '',
  phone: '',
  email: '',
  city: '',
  notes: '',
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PlanMyTripPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(() => initialFromParams(searchParams));
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePageMeta({
    title: 'Plan My Trip | Hornbill Journeys',
    description: 'Submit a guided Northeast India travel enquiry with destination, dates, travellers, vehicle preference, and contact details.',
  });

  const labels = useMemo(() => ({
    destination: getDestinationBySlug(form.destination)?.name,
    experience: getExperienceBySlug(form.experience)?.title,
    package: getPackageBySlug(form.package)?.title,
    vehicle: getVehicleBySlug(form.vehicle)?.name,
  }), [form.destination, form.experience, form.package, form.vehicle]);

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, travellers: undefined }));
    setSubmitError('');
  };

  const validateStep = (step) => {
    const nextErrors = {};
    if (step === 0 && !form.destination) nextErrors.destination = 'Please choose a destination.';
    if (step === 1) {
      if (!form.startDate) nextErrors.startDate = 'Start date is required.';
      if (!form.endDate) nextErrors.endDate = 'End date is required.';
      if (form.startDate && form.endDate && form.endDate < form.startDate) {
        nextErrors.endDate = 'End date cannot be before start date.';
      }
    }
    if (step === 2 && Number(form.adults || 0) + Number(form.children || 0) < 1) {
      nextErrors.travellers = 'At least one traveller is required.';
    }
    if (step === 4) {
      if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
      if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.';
      if (!form.email.trim()) nextErrors.email = 'Email address is required.';
      else if (!emailPattern.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(step + 1, bookingSteps.length - 1));
  };

  const previous = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
    setSubmitError('');
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      setCurrentStep(4);
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const result = await submitBooking(form, labels);
      navigate('/booking-confirmation', { state: { booking: result, form, labels } });
    } catch {
      setSubmitError('We could not submit your request right now. Please retry, call us, or send the enquiry by WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepProps = { form, update, errors };
  const panels = [
    <DestinationStep {...stepProps} />,
    <TravelStep {...stepProps} />,
    <TravellerStep {...stepProps} />,
    <VehicleStep {...stepProps} />,
    <ContactStep {...stepProps} />,
    <ReviewStep form={form} labels={labels} />,
  ];

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <div className="booking-hero-bg" />
        <div className="booking-hero-overlay" />
        <div className="booking-hero-inner">
          <Breadcrumbs items={[{ label: 'Plan My Trip', current: true }]} />
          <p className="label">Guided Enquiry</p>
          <h1>Plan a Northeast India Journey with Local Experts</h1>
          <p>Share the essentials. We will review your route, vehicle needs, dates, and travel style before contacting you.</p>
        </div>
      </section>

      <section className="booking-shell">
        <div className="booking-main">
          <BookingStepper currentStep={currentStep} />
          <div className="booking-errors" aria-live="polite">
            {Object.values(errors).filter(Boolean).slice(0, 1).map((error) => <p key={error}>{error}</p>)}
            {submitError ? <p>{submitError}</p> : null}
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            {panels[currentStep]}
            <div className="booking-nav-actions">
              <button type="button" className="btn btn-ghost" onClick={previous} disabled={currentStep === 0}>Previous</button>
              {currentStep < bookingSteps.length - 1 ? (
                <button type="button" className="btn btn-gold" onClick={next}>Next</button>
              ) : (
                <button type="button" className="btn btn-gold" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              )}
            </div>
          </form>
        </div>
        <TripSummary form={form} labels={labels} />
      </section>
    </main>
  );
}

