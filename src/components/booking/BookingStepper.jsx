export const bookingSteps = ['Destination', 'Travel Dates', 'Travellers', 'Vehicle', 'Contact', 'Review'];

export default function BookingStepper({ currentStep }) {
  return (
    <ol className="booking-stepper" aria-label="Booking progress">
      {bookingSteps.map((step, index) => {
        const status = index < currentStep ? 'complete' : index === currentStep ? 'current' : 'upcoming';
        return (
          <li className={status} key={step} aria-current={status === 'current' ? 'step' : undefined}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </li>
        );
      })}
    </ol>
  );
}
